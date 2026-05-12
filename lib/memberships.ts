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

export const MEMBERSHIPS: MembershipTier[] = [
  {
    id: "brow-club",
    name: "Brow Club",
    price: 35,
    tagline: "Perfect brows, every week",
    accentColor: "rose",
    benefits: [
      "Unlimited eyebrow threading (up to 4×/month)",
      "Priority booking — skip the wait",
      "10% off all other services",
      "Free brow consult with first visit",
    ],
    bestFor: "Threading regulars who want always-perfect brows",
    squareUrl: "#",
  },
  {
    id: "wax-club",
    name: "Wax Club",
    price: 59,
    tagline: "Smooth skin, year-round",
    accentColor: "amber",
    benefits: [
      "3 waxing services per month (mix & match)",
      "Choose from legs, arms, underarm, brazilian & more",
      "10% off threading and facial services",
      "Priority scheduling",
    ],
    bestFor: "Clients who want smooth, hair-free skin all year",
    squareUrl: "#",
  },
  {
    id: "glow-pass",
    name: "Glow Pass",
    price: 75,
    tagline: "Glowing skin, defined brows",
    accentColor: "violet",
    benefits: [
      "1 signature facial per month",
      "Unlimited eyebrow threading",
      "10% off lash extension services",
      "Personalized skincare recommendations",
    ],
    bestFor: "Clients focused on skincare + brow maintenance",
    squareUrl: "#",
  },
  {
    id: "beauty-pass",
    name: "Beauty Pass",
    price: 99,
    tagline: "Your complete beauty routine",
    accentColor: "teal",
    popular: true,
    benefits: [
      "2 threading sessions per month",
      "1 facial or waxing service of choice",
      "15% off all other services",
      "Priority booking + flexible cancellation",
    ],
    bestFor: "Clients who want a full, regular beauty routine",
    squareUrl: "#",
  },
  {
    id: "lash-club",
    name: "Lash Club",
    price: 150,
    tagline: "Always lash-ready",
    accentColor: "sky",
    benefits: [
      "1 lash fill per month (classic, volume, or hybrid)",
      "Unlimited eyebrow threading",
      "20% off full new lash sets",
      "Priority lash artist scheduling",
    ],
    bestFor: "Lash extension clients who want consistent, flawless lashes",
    squareUrl: "#",
  },
  {
    id: "vip-unlimited",
    name: "VIP Unlimited",
    price: 199,
    tagline: "The full UniqSwek experience",
    accentColor: "gold",
    benefits: [
      "Unlimited threading (brows, full face & more)",
      "1 facial per month",
      "1 lash fill per month",
      "20% off all additional services",
      "First-priority booking across both studios",
    ],
    bestFor: "Clients who want the absolute best of everything",
    squareUrl: "#",
  },
]
