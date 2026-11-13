"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Gift, Users } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { GIFT_CARD_URL } from "@/lib/stores"
import { trackGiftCard } from "@/lib/analytics"

// Bump this id if you want the popup to show again for everyone who already
// dismissed an earlier version (e.g. when next year's holiday promo goes up).
const CAMPAIGN_ID = "holiday-2026"
const STORAGE_KEY = `uniqswek-popup-dismissed-${CAMPAIGN_ID}`
const SHOW_DELAY_MS = 1500

export function HolidayPromoPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "true"
    } catch {
      // private browsing / storage blocked — just show it
    }
    if (dismissed) return

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      try {
        localStorage.setItem(STORAGE_KEY, "true")
      } catch {
        // ignore
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-md gap-0">
        <DialogTitle className="sr-only">Holiday promotions</DialogTitle>

        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/images/gift-card-model.jpg"
            alt="UniqSwek gift card"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6">
          {/* Gift card promo */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium leading-snug mb-1">
                Buy a Holiday Gift Card for Loved Ones
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light leading-relaxed mb-3">
                Give the gift of beauty this season — redeemable at either studio.
              </p>
              <a
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGiftCard("popup")}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase hover:bg-primary/90 transition-colors"
              >
                Buy a Gift Card
              </a>
            </div>
          </div>

          <div className="h-px bg-border mb-5" />

          {/* Bring a friend promo */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium leading-snug mb-1">
                Bring a Friend, Get 10% Off
              </h3>
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light leading-relaxed">
                Bring a friend in with you this holiday season and you'll both get 10% off your service.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
