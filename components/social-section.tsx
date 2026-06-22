"use client"

import { useState } from "react"
import { Instagram, MapPin, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { STORES } from "@/lib/stores"

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.875c-.31.12-.31.555 0 .674l4.995 1.875c.405.15.794-.24.654-.63l-1.875-4.995c-.12-.31-.554-.31-.674 0l.895 1.201zM11.07 18.223l-.792 5.2c-.06.42.314.735.72.614l5.25-1.636c.42-.12.51-.645.15-.886l-4.455-3.563c-.33-.255-.813-.075-.873.27zM9.6 13.47l-5.415-1.08c-.42-.09-.735.33-.57.72l2.1 5.07c.15.375.645.45.9.15l3.315-3.99c.24-.285.075-.765-.33-.87zm.9-1.725l3.705 4.22c.27.3.735.24.93-.12l2.594-5.34c.18-.36-.09-.78-.48-.78h-5.25c-.435 0-.69.42-.435.78l-.064-.76zm-.556-.944l1.426-5.04c.12-.42-.27-.78-.69-.63L5.43 7.47c-.405.15-.48.69-.135.944l4.41 3.15c.315.225.75.045.87-.315l-.43-.498z" />
    </svg>
  )
}

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  )
}

const platforms = [
  {
    id: "instagram",
    label: "Instagram",
    description: "Follow our daily work — before/afters, behind-the-scenes, and new looks.",
    cta: "Follow Us",
    gradient: "from-rose-400 via-fuchsia-500 to-orange-400",
    Icon: Instagram,
    getUrl: (store: typeof STORES[number]) => store.instagramUrl,
    getHandle: (store: typeof STORES[number]) => store.instagram,
    always: true,
  },
  {
    id: "google-maps",
    label: "Google Maps",
    description: "Get directions and see our location on Google Maps.",
    cta: "Get Directions",
    gradient: "from-blue-500 via-sky-500 to-green-500",
    Icon: GoogleMapsIcon,
    getUrl: (store: typeof STORES[number]) => store.googleMapsUrl,
    getHandle: (store: typeof STORES[number]) => store.neighborhood,
    always: true,
  },
  {
    id: "yelp",
    label: "Yelp",
    description: "Read what our clients are saying and share your own experience.",
    cta: "Read Reviews",
    gradient: "from-red-500 to-rose-600",
    Icon: YelpIcon,
    getUrl: (store: typeof STORES[number]) => store.yelpUrl,
    getHandle: () => "See our reviews",
    always: false,
  },
]

export function SocialSection() {
  const [activeStore, setActiveStore] = useState(STORES[0].id)
  const store = STORES.find((s) => s.id === activeStore) ?? STORES[0]

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Connect With Us
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4">
            Find us
            <span className="block italic">everywhere</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light max-w-xl mx-auto">
            Follow, review, and find directions — all in one place.
          </p>
        </div>

        {/* Store tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-border rounded-sm overflow-hidden">
            {STORES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStore(s.id)}
                className={cn(
                  "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-colors",
                  activeStore === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-secondary"
                )}
              >
                {s.name}
                <span className="block text-[10px] font-light tracking-normal normal-case opacity-70 -mt-0.5">
                  {s.neighborhood.split(",")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Platform cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(({ id, label, description, cta, gradient, Icon, getUrl, getHandle, always }) => {
            const url = getUrl(store)
            if (!always && !url) return null

            return (
              <a
                key={id}
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white flex flex-col min-h-[280px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl",
                  gradient
                )}
              >
                {/* Decorative circle */}
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 relative z-10">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-2xl font-light mb-1">{label}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm mb-2">
                    {getHandle(store)}
                  </p>
                  <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm font-light leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-6">
                  <span className="inline-flex items-center gap-2 bg-white/20 group-hover:bg-white/30 transition-colors px-5 py-2.5 rounded-full font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase">
                    {cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
