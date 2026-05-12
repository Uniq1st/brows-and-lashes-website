"use client"

import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { STORES } from "@/lib/stores"

export function LocationSelector() {
  return (
    <section id="locations" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Our Locations
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Two studios,
            <span className="block italic">one standard of beauty</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            Choose your nearest location and book your appointment online in seconds.
          </p>
        </div>

        {/* Store Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {STORES.map((store) => (
            <div
              key={store.id}
              className="bg-card border border-border p-10 flex flex-col gap-6 hover:border-primary/40 transition-colors duration-300"
            >
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-2">
                  {store.neighborhood}
                </p>
                <h3 className="text-2xl md:text-3xl font-light">{store.name}</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                  by UniqSwek
                </p>
              </div>

              <div className="space-y-3 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    {store.address}, {store.cityStateZip}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={store.phoneHref} className="hover:text-foreground transition-colors">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Mon – Sat: 10am – 8pm</p>
                    <p>Sunday: 10am – 7pm</p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase mt-auto"
              >
                <a href={store.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book at {store.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
