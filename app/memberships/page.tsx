import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MEMBERSHIPS } from "@/lib/memberships"
import { STORES, GIFT_CARD_URL } from "@/lib/stores"

export const metadata: Metadata = {
  title: "Beauty Memberships | UniqSwek Beauty Studios NYC",
  description:
    "Save every month with an UniqSwek membership. Unlimited threading, lash fills, facials & more starting at $35/month. Available at Upper East Side and Ridgewood locations.",
}

const accentStyles: Record<string, { card: string; badge: string; check: string; button: string }> = {
  rose:  { card: "border-rose-200 hover:border-rose-300",  badge: "bg-rose-100 text-rose-700",   check: "text-rose-500",  button: "border-rose-300 text-rose-700 hover:bg-rose-50" },
  amber: { card: "border-amber-200 hover:border-amber-300", badge: "bg-amber-100 text-amber-700", check: "text-amber-500", button: "border-amber-300 text-amber-700 hover:bg-amber-50" },
  violet:{ card: "border-violet-200 hover:border-violet-300",badge: "bg-violet-100 text-violet-700",check: "text-violet-500",button: "border-violet-300 text-violet-700 hover:bg-violet-50" },
  teal:  { card: "border-teal-200 hover:border-teal-300",  badge: "bg-teal-100 text-teal-700",   check: "text-teal-500",  button: "bg-primary text-primary-foreground hover:bg-primary/90" },
  sky:   { card: "border-sky-200 hover:border-sky-300",    badge: "bg-sky-100 text-sky-700",     check: "text-sky-500",   button: "border-sky-300 text-sky-700 hover:bg-sky-50" },
  gold:  { card: "border-foreground/30 bg-foreground text-background hover:border-foreground/50", badge: "bg-background/10 text-background", check: "text-background", button: "border-background/40 text-background hover:bg-background/10" },
}

const faqItems = [
  { q: "How do memberships work?", a: "You're charged monthly on your signup date. Each month your benefits reset — unused sessions don't roll over, which keeps the price low for everyone." },
  { q: "Can I use my membership at both studios?", a: "Yes! Your membership works at both our Upper East Side and Ridgewood locations. Book whichever is most convenient." },
  { q: "Can I pause or cancel?", a: "You can cancel anytime with 7 days notice before your next billing date. We don't lock you into contracts." },
  { q: "What if I want to upgrade?", a: "Email us and we'll switch your plan at your next billing cycle. Upgrades always take effect immediately." },
  { q: "Do members get priority booking?", a: "Yes — all members get access to priority booking slots not available to the general public, especially for popular times." },
  { q: "Are gift cards and memberships stackable?", a: "Absolutely. A membership is a great self-care commitment; a gift card is perfect for someone you want to treat. Both work at checkout." },
]

export default function MembershipsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* Hero */}
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

        {/* Membership Cards */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEMBERSHIPS.map((tier) => {
                const styles = accentStyles[tier.accentColor] ?? accentStyles.teal
                const isGold = tier.accentColor === "gold"
                return (
                  <div
                    key={tier.id}
                    className={`relative border-2 p-8 flex flex-col transition-all duration-300 ${styles.card}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase px-4 py-1">
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Badge */}
                    <span className={`self-start font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${styles.badge}`}>
                      {tier.name}
                    </span>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-5xl font-light">${tier.price}</span>
                      <span className={`font-[family-name:var(--font-montserrat)] text-sm ml-1 ${isGold ? "text-background/70" : "text-muted-foreground"}`}>/month</span>
                    </div>
                    <p className={`font-[family-name:var(--font-montserrat)] text-sm font-light mb-6 ${isGold ? "text-background/70" : "text-muted-foreground"}`}>
                      {tier.tagline}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${styles.check}`} />
                          <span className={`font-[family-name:var(--font-montserrat)] text-sm font-light ${isGold ? "text-background/90" : "text-foreground"}`}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Best for */}
                    <p className={`font-[family-name:var(--font-montserrat)] text-xs italic mb-6 ${isGold ? "text-background/60" : "text-muted-foreground"}`}>
                      Best for: {tier.bestFor}
                    </p>

                    {/* CTA */}
                    <a
                      href={tier.squareUrl}
                      target={tier.squareUrl !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`w-full text-center font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase py-3 px-6 border transition-colors ${styles.button} ${tier.squareUrl === "#" ? "opacity-60 cursor-not-allowed" : ""}`}
                      onClick={tier.squareUrl === "#" ? (e) => e.preventDefault() : undefined}
                    >
                      {tier.squareUrl === "#" ? "Coming Soon" : `Join ${tier.name}`}
                    </a>
                  </div>
                )
              })}
            </div>

            <p className="text-center font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-8">
              Not sure which plan fits you?{" "}
              <a href="tel:+19173882434" className="text-primary hover:underline">
                Call us
              </a>{" "}
              and we'll help you choose.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-card">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">Simple Process</p>
              <h2 className="text-4xl font-light">How memberships work</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                { step: "01", title: "Choose your plan", body: "Pick the membership that matches your beauty routine. You can upgrade or switch plans anytime." },
                { step: "02", title: "Subscribe via Square", body: "Secure monthly billing through Square. No paperwork, no lock-in contracts." },
                { step: "03", title: "Book & enjoy", body: "Book online or walk in. Show your membership at checkout and your discount applies automatically." },
              ].map((item) => (
                <div key={item.step}>
                  <p className="text-5xl font-light text-primary/30 mb-4">{item.step}</p>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light mb-4">Membership FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="border border-border p-6">
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
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
              <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
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
