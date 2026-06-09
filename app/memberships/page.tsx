import type { Metadata } from "next"
import { ArrowRight, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MembershipTabs } from "@/components/membership-tabs"
import type { StoreMembership } from "@/components/membership-tabs"
import { UES_MEMBERSHIPS, RIDGEWOOD_MEMBERSHIPS } from "@/lib/memberships"
import type { MembershipTier } from "@/lib/memberships"
import { STORES, GIFT_CARD_URL } from "@/lib/stores"
import { getSubscriptionPlans } from "@/lib/square"
import type { SquareStoreId, SquareSubscriptionPlan } from "@/lib/square"

export const metadata: Metadata = {
  title: "Beauty Memberships | UniqSwek Beauty Studios NYC",
  description:
    "Save every month with an UniqSwek membership. Unlimited threading, lash fills, facials & more starting at $25/month. Available at Upper East Side and Ridgewood locations.",
}

// Map Square subscription plan → MembershipTier shape so the UI reuses
// the same card component whether data comes from Square or from the fallback list.
function squarePlanToTier(plan: SquareSubscriptionPlan, index: number): MembershipTier {
  const colors = ["rose", "amber", "violet", "teal", "sky", "gold"]
  return {
    id: plan.id,
    name: plan.name,
    price: plan.priceCents != null ? Math.round(plan.priceCents / 100) : 0,
    tagline: plan.description ?? `${plan.cadence?.toLowerCase() ?? "monthly"} membership`,
    accentColor: colors[index % colors.length],
    popular: index === 3, // highlight the 4th tier (usually mid-range)
    benefits: [],         // Square plans don't carry benefit text — keep empty or extend later
    bestFor: "",
    squareUrl: "#",       // TODO: replace with Square subscription checkout URL per plan
  }
}

// Try to fetch live plans from Square; fall back to hardcoded tiers on any error.
async function getTiersForStore(
  storeSquareId: SquareStoreId,
  fallback: MembershipTier[]
): Promise<MembershipTier[]> {
  try {
    const plans = await getSubscriptionPlans(storeSquareId)
    if (plans.length > 0) {
      return plans.map((p, i) => {
        const base = squarePlanToTier(p, i)
        // Merge in squareUrl, benefits, and display metadata from the matching
        // fallback tier — the Square API doesn't expose subscription checkout URLs.
        const match = fallback.find(
          (f) => f.name.toLowerCase() === base.name.toLowerCase()
        )
        return match
          ? {
              ...base,
              squareUrl: match.squareUrl,
              benefits: match.benefits.length ? match.benefits : base.benefits,
              bestFor: match.bestFor || base.bestFor,
              tagline: match.tagline || base.tagline,
              accentColor: match.accentColor,
              popular: match.popular,
            }
          : base
      })
    }
  } catch (err) {
    console.warn(`Could not fetch Square subscription plans for ${storeSquareId}:`, err)
  }
  // No plans in Square yet — use the curated fallback list
  return fallback
}

const faqItems = [
  {
    q: "How do memberships work?",
    a: "You're charged monthly on your signup date. Each month your benefits reset — unused sessions don't roll over, which keeps the price low for everyone.",
  },
  {
    q: "Can I use my membership at both studios?",
    a: "Yes! Your membership works at both our Upper East Side and Ridgewood locations. Book whichever is most convenient.",
  },
  {
    q: "Can I pause or cancel?",
    a: "You can cancel anytime with 7 days notice before your next billing date. We don't lock you into contracts.",
  },
  {
    q: "What if I want to upgrade?",
    a: "Email us and we'll switch your plan at your next billing cycle. Upgrades always take effect immediately.",
  },
  {
    q: "Do members get priority booking?",
    a: "Yes — all members get access to priority booking slots not available to the general public, especially for popular times.",
  },
  {
    q: "Are gift cards and memberships stackable?",
    a: "Absolutely. A membership is a great self-care commitment; a gift card is perfect for someone you want to treat. Both work at checkout.",
  },
]

export default async function MembershipsPage() {
  // Fetch plans for each store in parallel, with per-store fallbacks
  const [uesTiers, ridgewoodTiers] = await Promise.all([
    getTiersForStore("brows-and-lashes", UES_MEMBERSHIPS),
    getTiersForStore("eyebrow-shape", RIDGEWOOD_MEMBERSHIPS),
  ])

  const storeData: StoreMembership[] = [
    {
      storeId: "brows-and-lashes",
      storeName: STORES[0].name,
      storeNeighborhood: "Upper East Side",
      bookingUrl: STORES[0].bookingUrl,
      tiers: uesTiers,
    },
    {
      storeId: "eyebrow-shape",
      storeName: STORES[1].name,
      storeNeighborhood: "Ridgewood, Queens",
      bookingUrl: STORES[1].bookingUrl,
      tiers: ridgewoodTiers,
    },
  ]

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="py-20 md:py-28 bg-card text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase font-medium">
                Monthly Memberships
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Beauty on
              <span className="block italic">autopilot</span>
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-lg max-w-2xl mx-auto mb-8">
              Join an UniqSwek membership and save every single month. Lock in your beauty routine, skip the mental math, and always look your best.
            </p>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
              Valid at both studios · Cancel anytime · No contracts
            </p>
          </div>
        </section>

        {/* ── Per-Store Membership Cards ── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <MembershipTabs stores={storeData} />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-20 bg-card">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Simple Process
              </p>
              <h2 className="text-4xl font-light">How memberships work</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                {
                  step: "01",
                  title: "Choose your plan",
                  body: "Pick the membership that matches your beauty routine. You can upgrade or switch plans anytime.",
                },
                {
                  step: "02",
                  title: "Subscribe via Square",
                  body: "Secure monthly billing through Square. No paperwork, no lock-in contracts.",
                },
                {
                  step: "03",
                  title: "Book & enjoy",
                  body: "Book online or walk in. Show your membership at checkout and your discount applies automatically.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <p className="text-5xl font-light text-primary/30 mb-4">{item.step}</p>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light mb-4">Membership FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="border border-border p-6">
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-light mb-4">Ready to start?</h2>
            <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light mb-8">
              Walk into either studio and ask about memberships, or call us to get started today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {STORES.map((store) => (
                <a
                  key={store.id}
                  href={store.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-primary-foreground/40 px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  {store.name}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-[family-name:var(--font-montserrat)] text-xs text-primary-foreground/50 mt-6">
              Want to give a membership as a gift?{" "}
              <a
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                Buy a gift card instead →
              </a>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
