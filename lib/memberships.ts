export type MembershipTier = {
  id: string
  name: string
  price: number
  tagline: string
  accentColor: string
  popular?: boolean
  benefits: string[]
  bestFor: string
  // TODO: Replace "#" with your Square subscription link once created in
  // Square Dashboard → Subscriptions → Create a plan
  squareUrl: string
}

// ─── UES (Brows & Lashes) membership tiers ────────────────────────────────────
// These reflect the plans already created in Square for the UES account.
// Once all plans are created and priced in Square Dashboard, this list is only
// used as a fallback — the live page pulls from Square automatically.
export const UES_MEMBERSHIPS: MembershipTier[] = [
  {
    id: "unlimited-threading",
    name: "Unlimited Threading",
    price: 29.99,
    tagline: "Perfect brows, every week",
    accentColor: "rose",
    benefits: [
      "Unlimited eyebrow threading",
      "Priority booking — skip the wait",
      "10% off all other services",
    ],
    bestFor: "Threading regulars who want always-perfect brows",
    squareUrl: "https://square.link/u/yHVmuqxb",
  },
  {
    id: "unlimited-facials",
    name: "Unlimited Regular Facials",
    price: 100,
    tagline: "Glowing skin, every month",
    accentColor: "violet",
    benefits: [
      "Unlimited regular facials",
      "Personalized skincare recommendations",
      "Priority scheduling",
      "10% off all other services",
    ],
    bestFor: "Skincare-focused clients who want consistent results",
    squareUrl: "https://square.link/u/n7ijmZS8",
  },
  // ── Add more tiers here as you create them in Square Dashboard ──
  // {
  //   id: "lash-club",
  //   name: "Lash Club",
  //   price: 150,
  //   tagline: "Always lash-ready",
  //   accentColor: "sky",
  //   benefits: ["1 lash fill per month", "Unlimited threading", "20% off full sets"],
  //   bestFor: "Lash extension regulars",
  //   squareUrl: "#",
  // },
]

// ─── Ridgewood (Eyebrow Shape) membership tiers ───────────────────────────────
// No plans in Square yet for this location — create them in Square Dashboard
// under the Eyebrow Shape account, then this list becomes the fallback only.
export const RIDGEWOOD_MEMBERSHIPS: MembershipTier[] = [
  {
    id: "rw-threading",
    name: "Unlimited Threading",
    price: 25,
    tagline: "Perfect brows, every week",
    accentColor: "rose",
    benefits: [
      "Unlimited eyebrow threading",
      "Priority booking",
      "10% off all other services",
    ],
    bestFor: "Threading regulars in Ridgewood & Glendale",
    squareUrl: "#",
  },
  {
    id: "rw-facials",
    name: "Unlimited Regular Facials",
    price: 100,
    tagline: "Glowing skin, every month",
    accentColor: "violet",
    benefits: [
      "Unlimited regular facials",
      "Personalized skincare recommendations",
      "10% off all other services",
    ],
    bestFor: "Clients focused on consistent skincare",
    squareUrl: "#",
  },
]

// ─── Legacy combined list (used as last-resort fallback) ──────────────────────
export const MEMBERSHIPS: MembershipTier[] = UES_MEMBERSHIPS
