"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cart-context"

// Clears the cart once the Square checkout redirects back here after a successful payment.
export function ClearCartOnMount() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
