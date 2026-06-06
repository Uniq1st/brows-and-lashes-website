"use client"

import { ArrowRight } from "lucide-react"
import { getActivePromo } from "@/lib/promotions"
import { trackEvent } from "@/lib/analytics"

export function StickyBookButton() {
  const activePromo = getActivePromo()
  // During a promo, send users straight to the booking section so they see
  // the per-salon promo URLs. Otherwise scroll to the location selector.
  const href = activePromo ? "/#book" : "#locations"

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <a
        href={href}
        onClick={() => trackEvent("sticky_book_click")}
        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
      >
        Book Appointment
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}
