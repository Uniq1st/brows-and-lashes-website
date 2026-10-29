"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRODUCTS, getProductCategories } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function ShopSection() {
  const categories = getProductCategories()
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const { addItem, openCart } = useCart()

  const products = PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Shop
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Take the studio
            <span className="block italic">home with you</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            Wax supplies and handpicked goods from Nepal — ship to your door or pick up in-studio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/40" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-medium">{formatCents(product.priceCents)}</span>
                  {product.inStock ? (
                    <button
                      onClick={() => addItem(product.id)}
                      className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-primary hover:underline"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={openCart}
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Cart & Checkout
          </button>
        </div>
      </div>
    </section>
  )
}
