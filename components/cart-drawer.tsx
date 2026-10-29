"use client"

import { useState } from "react"
import { Minus, Plus, X, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart, type Fulfillment } from "@/lib/cart-context"
import { getProduct } from "@/lib/products"
import { STORES } from "@/lib/stores"

// Keep in sync with app/api/checkout/route.ts
const SHIPPING_FLAT_CENTS = 700

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, totalCents } = useCart()
  const [fulfillment, setFulfillment] = useState<Fulfillment>({
    type: "PICKUP",
    storeId: "brows-and-lashes",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shippingCents = fulfillment.type === "SHIPMENT" ? SHIPPING_FLAT_CENTS : 0
  const orderTotalCents = totalCents + shippingCents

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          fulfillment,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed — please try again.")
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed — please try again.")
      setLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col overflow-y-auto">
        <div className="mt-8 px-4 flex-1 flex flex-col">
          <SheetTitle className="text-2xl font-light mb-6">Your Cart</SheetTitle>

          {lines.length === 0 ? (
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm">
              Your cart is empty. Browse the shop to add items.
            </p>
          ) : (
            <>
              <div className="flex-1 space-y-5 mb-6">
                {lines.map((line) => {
                  const product = getProduct(line.productId)
                  if (!product) return null
                  return (
                    <div
                      key={line.productId}
                      className="flex items-start justify-between gap-3 border-b border-border pb-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground mt-0.5">
                          {formatCents(product.priceCents)} each
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => setQuantity(line.productId, line.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{line.quantity}</span>
                          <button
                            onClick={() => setQuantity(line.productId, line.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-medium text-sm">
                          {formatCents(product.priceCents * line.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(line.productId)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Fulfillment */}
              <div className="mb-6">
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground mb-3">
                  Fulfillment
                </p>
                <div className="space-y-2">
                  {STORES.map((store) => (
                    <label key={store.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={fulfillment.type === "PICKUP" && fulfillment.storeId === store.id}
                        onChange={() => setFulfillment({ type: "PICKUP", storeId: store.id })}
                      />
                      Pick up at {store.name} ({store.neighborhood})
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillment.type === "SHIPMENT"}
                      onChange={() => setFulfillment({ type: "SHIPMENT" })}
                    />
                    Ship to me (+{formatCents(SHIPPING_FLAT_CENTS)} flat rate)
                  </label>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1 mb-6 font-[family-name:var(--font-montserrat)] text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCents(totalCents)}</span>
                </div>
                {shippingCents > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{formatCents(shippingCents)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatCents(orderTotalCents)}</span>
                </div>
              </div>

              {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full font-[family-name:var(--font-montserrat)] tracking-wider uppercase"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Checkout with Square"}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
