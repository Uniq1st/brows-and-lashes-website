/**
 * POST /api/checkout
 *
 * Creates a Square Payment Link for a /shop cart and returns its checkout URL.
 * Prices are always resolved server-side from lib/products.ts — client-sent
 * prices are never trusted. Pickup orders are created against that studio's
 * own Square account (UES and Ridgewood are separate Square accounts);
 * shipped orders default to the Upper East Side account.
 */

import { NextRequest, NextResponse } from "next/server"
import { getProduct } from "@/lib/products"
import { createPaymentLink } from "@/lib/square"
import type { SquareStoreId } from "@/lib/square"
import { STORES } from "@/lib/stores"
import type { Fulfillment } from "@/lib/cart-context"

export const maxDuration = 25 // seconds — give Square's API room before Vercel cuts the request off

// $7.00 flat rate to start — adjust here once you've settled on real shipping rates,
// or move this to Square Shipping Profiles later for carrier-calculated rates.
const SHIPPING_FLAT_CENTS = 700
const DEFAULT_SHIPPING_STORE: SquareStoreId = "brows-and-lashes"

// NYC combined sales tax: 4% NY State + 4.5% NYC local + 0.375% MTA surcharge.
// Applied uniformly to every order for now (both studios are in NYC); shipped
// orders outside NY technically shouldn't carry this — revisit if out-of-state
// shipping volume becomes meaningful. Keep in sync with components/cart-drawer.tsx.
const NYC_SALES_TAX_PERCENT = "8.875"

type CheckoutItem = { productId: string; quantity: number }

interface CheckoutRequestBody {
  items?: CheckoutItem[]
  fulfillment?: Fulfillment
}

export async function POST(req: NextRequest) {
  let body: CheckoutRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const items = body.items ?? []
  const fulfillment = body.fulfillment

  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 })
  }
  if (!fulfillment || (fulfillment.type !== "PICKUP" && fulfillment.type !== "SHIPMENT")) {
    return NextResponse.json({ error: "Please choose pickup or shipping." }, { status: 400 })
  }

  // Resolve line items from the product catalog — never trust client-sent prices.
  const lineItems: CreatePaymentLinkLineItem[] = []
  for (const item of items) {
    const product = getProduct(item.productId)
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.productId}` }, { status: 400 })
    }
    if (!product.inStock) {
      return NextResponse.json({ error: `${product.name} is sold out.` }, { status: 400 })
    }
    const quantity = Math.max(1, Math.floor(item.quantity))
    lineItems.push({
      name: product.name,
      quantity: String(quantity),
      base_price_money: { amount: product.priceCents, currency: "USD" },
    })
  }

  let storeId: SquareStoreId
  let note: string
  let askForShippingAddress = false

  if (fulfillment.type === "PICKUP") {
    if (fulfillment.storeId !== "brows-and-lashes" && fulfillment.storeId !== "eyebrow-shape") {
      return NextResponse.json({ error: "Invalid pickup location." }, { status: 400 })
    }
    storeId = fulfillment.storeId
    const store = STORES.find((s) => s.id === storeId)
    note = `Pickup order — ${store?.fullName ?? storeId}`
  } else {
    storeId = DEFAULT_SHIPPING_STORE
    note = "Ship to customer (address collected at Square checkout)"
    askForShippingAddress = true
    lineItems.push({
      name: "Shipping (Flat Rate)",
      quantity: "1",
      base_price_money: { amount: SHIPPING_FLAT_CENTS, currency: "USD" },
    })
  }

  try {
    const paymentLink = await createPaymentLink(storeId, {
      lineItems,
      note,
      askForShippingAddress,
      taxes: [{ name: "NYC Sales Tax", percentage: NYC_SALES_TAX_PERCENT }],
    })
    return NextResponse.json({ url: paymentLink.url })
  } catch (err) {
    console.error("Square checkout error:", err)
    return NextResponse.json(
      { error: "Checkout failed — please try again or call the studio to order." },
      { status: 500 }
    )
  }
}

type CreatePaymentLinkLineItem = {
  name: string
  quantity: string
  base_price_money: { amount: number; currency: string }
}
