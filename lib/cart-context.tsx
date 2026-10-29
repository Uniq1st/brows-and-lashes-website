"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { PRODUCTS } from "@/lib/products"
import type { SquareStoreId } from "@/lib/square"

export type CartLine = { productId: string; quantity: number }

export type Fulfillment =
  | { type: "PICKUP"; storeId: SquareStoreId }
  | { type: "SHIPMENT" }

type CartContextValue = {
  lines: CartLine[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalCents: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "uniqswek-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load any cart saved from a previous visit
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {
      // private browsing / storage blocked — start with an empty cart
    }
    setHydrated(true)
  }, [])

  // Persist on every change (but not before the initial load above runs,
  // or we'd overwrite the saved cart with an empty one)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // ignore
    }
  }, [lines, hydrated])

  const addItem = (productId: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId)
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + 1 } : l
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
    )
  }

  const clearCart = () => setLines([])

  const { totalItems, totalCents } = useMemo(() => {
    let items = 0
    let cents = 0
    for (const line of lines) {
      const product = PRODUCTS.find((p) => p.id === line.productId)
      if (!product) continue
      items += line.quantity
      cents += product.priceCents * line.quantity
    }
    return { totalItems: items, totalCents: cents }
  }, [lines])

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        totalItems,
        totalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
