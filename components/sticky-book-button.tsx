"use client"

import { ArrowRight } from "lucide-react"

export function StickyBookButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <a
        href="#locations"
        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
      >
        Book Appointment
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}
