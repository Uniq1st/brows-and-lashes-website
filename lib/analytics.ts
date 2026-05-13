/**
 * Google Analytics 4 event tracking helpers
 *
 * Usage (client components only):
 *   import { trackBooking, trackPhone, trackGiftCard, trackEmailSignup } from "@/lib/analytics"
 *
 * All functions are safe to call even if gtag hasn't loaded yet —
 * they check for window/gtag availability before firing.
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return
  if (typeof window.gtag !== "function") return
  window.gtag(...args)
}

// ─── Core event ───────────────────────────────────────────────────────────────

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  gtag("event", eventName, params)
}

// ─── Booking ─────────────────────────────────────────────────────────────────

/**
 * Fire when a user clicks any "Book Now" button.
 * @param store  "brows-and-lashes" | "eyebrow-shape"
 * @param source Where on the page the click came from, e.g. "hero", "nav", "services"
 */
export function trackBooking(
  store: "brows-and-lashes" | "eyebrow-shape" | string,
  source: string
) {
  gtag("event", "book_appointment", {
    store,
    source,
    // GA4 recommended event — treated as a conversion
    event_category: "engagement",
    event_label: `${store} · ${source}`,
  })
}

// ─── Phone ────────────────────────────────────────────────────────────────────

/**
 * Fire when a user taps/clicks a phone number link.
 */
export function trackPhone(store: string) {
  gtag("event", "click_phone", {
    store,
    event_category: "contact",
    event_label: store,
  })
}

// ─── Gift card ────────────────────────────────────────────────────────────────

/**
 * Fire when a user clicks a gift card link.
 */
export function trackGiftCard(store: string) {
  gtag("event", "click_gift_card", {
    store,
    event_category: "revenue",
    event_label: store,
  })
}

// ─── Email signup ─────────────────────────────────────────────────────────────

/**
 * Fire on successful email form submission.
 * GA4 maps "generate_lead" to the standard lead conversion event.
 */
export function trackEmailSignup() {
  gtag("event", "generate_lead", {
    event_category: "engagement",
    event_label: "email_signup",
  })
}

// ─── Instagram ────────────────────────────────────────────────────────────────

export function trackInstagram(store: string) {
  gtag("event", "click_instagram", {
    store,
    event_category: "social",
    event_label: store,
  })
}

// ─── Membership ───────────────────────────────────────────────────────────────

/**
 * Fire when a user clicks "Join [Plan]" on the memberships page.
 */
export function trackMembershipClick(planName: string, store: string) {
  gtag("event", "begin_checkout", {
    plan: planName,
    store,
    event_category: "revenue",
    event_label: `${store} · ${planName}`,
  })
}
