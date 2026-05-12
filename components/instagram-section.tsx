"use client"

import Script from "next/script"
import { Instagram } from "lucide-react"
import { STORES } from "@/lib/stores"

// Tell TypeScript about the Behold custom element
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": {
        "feed-id": string
        className?: string
        style?: React.CSSProperties
      }
    }
  }
}

// Behold feed IDs — add the Ridgewood feed ID once connected
const BEHOLD_FEEDS: Record<string, string> = {
  "brows-and-lashes": "QNCGNAF2jxvm0ZquAIeX",
  // "eyebrow-shape": "YOUR_RIDGEWOOD_FEED_ID",  ← add when ready
}

export function InstagramSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Follow Along
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4">
            Daily inspiration
            <span className="block italic">on Instagram</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light max-w-xl mx-auto">
            Real results, every day. Follow our studios for before/afters, new looks, and behind-the-scenes moments.
          </p>
        </div>

        {/* Studio handle cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {STORES.map((store) => (
            <a
              key={store.id}
              href={store.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-500 to-orange-400 flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
                  {store.neighborhood}
                </p>
                <p className="font-medium text-lg group-hover:text-primary transition-colors">
                  {store.instagram}
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground">
                  Follow for daily content →
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Live Behold feed — Brows & Lashes */}
        <div className="mb-4">
          <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.25em] uppercase text-muted-foreground text-center mb-6">
            Latest from @browsandlashesnyc
          </p>
          <behold-widget feed-id={BEHOLD_FEEDS["brows-and-lashes"]} />
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-8">
          <a
            href={STORES[0].instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:opacity-70 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Follow @browsandlashesnyc
          </a>
        </div>

      </div>

      {/* Load Behold widget script once, globally */}
      <Script
        id="behold-widget-script"
        strategy="lazyOnload"
        src="https://w.behold.so/widget.js"
        type="module"
      />
    </section>
  )
}
