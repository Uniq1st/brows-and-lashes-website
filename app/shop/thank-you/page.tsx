import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClearCartOnMount } from "@/components/clear-cart-on-mount"

export const metadata: Metadata = {
  title: "Order Received | UniqSwek Beauty Studios",
  description: "Thank you for your order from UniqSwek Beauty Studios.",
  robots: { index: false, follow: false },
}

export default function ShopThankYouPage() {
  return (
    <>
      <ClearCartOnMount />
      <Navigation />
      <main className="pt-20">
        <section className="py-32 text-center max-w-xl mx-auto px-6">
          <h1 className="text-4xl font-light mb-6">Thank you for your order!</h1>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mb-10">
            We've received your order and will be in touch with confirmation details. If you chose in-studio pickup, we'll let you know as soon as it's ready.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
