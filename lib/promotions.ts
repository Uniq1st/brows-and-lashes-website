export type Promo = {
  id: string
  active: boolean
  message: string
  promoCode?: string
  ctaText: string
  ctaHref: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SEASONAL PROMO SYSTEM
// Set active: true on the promo you want to display.
// Only the FIRST active promo will be shown in the banner.
// Set all to false to hide the banner entirely.
// ─────────────────────────────────────────────────────────────────────────────
export const PROMOTIONS: Promo[] = [
  {
    id: "welcome",
    active: false,
    message: "10% off your first visit — mention this website when you book.",
    ctaText: "Book now →",
    ctaHref: "/#locations",
  },
  {
    id: "memberships",
    active: false,
    message: "🌟 New! Monthly memberships starting at $25 — unlimited brows, lashes & more.",
    ctaText: "See plans →",
    ctaHref: "/memberships",
  },
  {
    id: "mothers-day",
    active: false,
    message: "🌸 Mother's Day — 20% off gift cards & memberships this week only.",
    ctaText: "Gift now →",
    ctaHref: "/memberships",
  },
  {
    id: "valentines",
    active: false,
    message: "💕 Valentine's Week — treat yourself or someone you love.",
    ctaText: "Gift cards →",
    ctaHref: "/memberships",
  },
  {
    id: "summer",
    active: true,
    message: "☀️ Summer Glow — 15% off all waxing services this month. Book online or walk in.",
    promoCode: "SUMMERGLOW",
    ctaText: "Book now →",
    ctaHref: "/#book",
  },
  {
    id: "holiday",
    active: false,
    message: "🎁 Holiday Gift Cards — give the gift of beauty this season.",
    ctaText: "Buy now →",
    ctaHref: "/memberships",
  },
  {
    id: "new-year",
    active: false,
    message: "✨ New Year, New You — join a membership and glow all year.",
    ctaText: "See plans →",
    ctaHref: "/memberships",
  },
]

export function getActivePromo(): Promo | null {
  return PROMOTIONS.find((p) => p.active) ?? null
}
