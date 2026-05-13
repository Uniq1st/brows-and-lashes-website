"use client"

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MembershipTier } from "@/lib/memberships"
import { trackMembershipClick } from "@/lib/analytics"

export interface StoreMembership {
  storeId: string
  storeName: string
  storeNeighborhood: string
  bookingUrl: string
  tiers: MembershipTier[]
}

interface MembershipTabsProps {
  stores: StoreMembership[]
}

const accentStyles: Record<string, {
  card: string
  badge: string
  check: string
  button: string
}> = {
  rose:  { card: "border-rose-200 hover:border-rose-300",    badge: "bg-rose-100 text-rose-700",    check: "text-rose-500",   button: "border-rose-300 text-rose-700 hover:bg-rose-50" },
  amber: { card: "border-amber-200 hover:border-amber-300",  badge: "bg-amber-100 text-amber-700",  check: "text-amber-500",  button: "border-amber-300 text-amber-700 hover:bg-amber-50" },
  violet:{ card: "border-violet-200 hover:border-violet-300",badge: "bg-violet-100 text-violet-700",check: "text-violet-500", button: "border-violet-300 text-violet-700 hover:bg-violet-50" },
  teal:  { card: "border-teal-200 hover:border-teal-300",    badge: "bg-teal-100 text-teal-700",    check: "text-teal-500",   button: "bg-primary text-primary-foreground hover:bg-primary/90" },
  sky:   { card: "border-sky-200 hover:border-sky-300",      badge: "bg-sky-100 text-sky-700",      check: "text-sky-500",    button: "border-sky-300 text-sky-700 hover:bg-sky-50" },
  gold:  {
    card:   "border-foreground/30 bg-foreground text-background hover:border-foreground/50",
    badge:  "bg-background/10 text-background",
    check:  "text-background",
    button: "border-background/40 text-background hover:bg-background/10",
  },
}

export function MembershipTabs({ stores }: MembershipTabsProps) {
  const [activeStore, setActiveStore] = useState(stores[0]?.storeId ?? "")
  const current = stores.find((s) => s.storeId === activeStore) ?? stores[0]

  if (!current) return null

  return (
    <div>
      {/* Store tabs */}
      {stores.length > 1 && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-border rounded-sm overflow-hidden">
            {stores.map((s) => (
              <button
                key={s.storeId}
                onClick={() => setActiveStore(s.storeId)}
                className={cn(
                  "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-colors",
                  activeStore === s.storeId
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-secondary"
                )}
              >
                {s.storeName}
                <span className="block text-[10px] font-light tracking-normal normal-case opacity-70 -mt-0.5">
                  {s.storeNeighborhood}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tier cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.tiers.map((tier) => {
          const styles = accentStyles[tier.accentColor] ?? accentStyles.teal
          const isGold = tier.accentColor === "gold"
          const isComingSoon = tier.squareUrl === "#"

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
              <span
                className={`self-start font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${styles.badge}`}
              >
                {tier.name}
              </span>

              {/* Price */}
              <div className="mb-2">
                <span className="text-5xl font-light">${tier.price}</span>
                <span
                  className={cn(
                    "font-[family-name:var(--font-montserrat)] text-sm ml-1",
                    isGold ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  /month
                </span>
              </div>
              <p
                className={cn(
                  "font-[family-name:var(--font-montserrat)] text-sm font-light mb-6",
                  isGold ? "text-background/70" : "text-muted-foreground"
                )}
              >
                {tier.tagline}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${styles.check}`} />
                    <span
                      className={cn(
                        "font-[family-name:var(--font-montserrat)] text-sm font-light",
                        isGold ? "text-background/90" : "text-foreground"
                      )}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <p
                className={cn(
                  "font-[family-name:var(--font-montserrat)] text-xs italic mb-6",
                  isGold ? "text-background/60" : "text-muted-foreground"
                )}
              >
                Best for: {tier.bestFor}
              </p>

              {/* CTA */}
              <a
                href={isComingSoon ? current.bookingUrl : tier.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMembershipClick(tier.name, current.storeId)}
                className={cn(
                  "w-full text-center font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase py-3 px-6 border transition-colors flex items-center justify-center gap-2",
                  styles.button
                )}
              >
                {isComingSoon ? (
                  <>Ask in store <ArrowRight className="w-3 h-3" /></>
                ) : (
                  <>Join {tier.name} <ArrowRight className="w-3 h-3" /></>
                )}
              </a>
              {isComingSoon && (
                <p className="text-center font-[family-name:var(--font-montserrat)] text-[10px] text-muted-foreground mt-2">
                  Online signup coming soon
                </p>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-center font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-8">
        Not sure which plan fits you?{" "}
        <a href="tel:+19173882434" className="text-primary hover:underline">
          Call us
        </a>{" "}
        and we&apos;ll help you choose.
      </p>
    </div>
  )
}
