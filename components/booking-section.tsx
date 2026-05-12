"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { STORES } from "@/lib/stores"

export function BookingSection() {
  return (
    <section id="book" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-4">
            Book Your Visit
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Begin your beauty
            <span className="block italic">transformation</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light max-w-2xl mx-auto">
            Select your preferred studio and book online in just a few clicks. Walk-ins always welcome too.
          </p>
        </div>

        {/* Two Store Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {STORES.map((store) => (
            <div
              key={store.id}
              className="bg-card text-card-foreground p-10 flex flex-col items-center gap-6 text-center"
            >
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-2">
                  {store.neighborhood}
                </p>
                <h3 className="text-2xl md:text-3xl font-light">{store.name}</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">by UniqSwek</p>
              </div>

              <div className="space-y-2 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={store.phoneHref} className="hover:text-primary transition-colors">
                    {store.phone}
                  </a>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase px-8 w-full"
              >
                <a href={store.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Now
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
