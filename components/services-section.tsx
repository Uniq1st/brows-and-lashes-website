"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { STORES } from "@/lib/stores"
import { uesServices, ridgewoodServices } from "@/lib/services"

function buildBookingUrl(storeBookingUrl: string, bookingId?: string) {
  if (!bookingId) return storeBookingUrl
  const url = new URL(storeBookingUrl)
  url.searchParams.set("services", bookingId)
  return url.toString()
}

export function ServicesSection() {
  const [activeLocation, setActiveLocation] = useState<"ues" | "ridgewood">("ues")
  const [activeCategory, setActiveCategory] = useState("Threading & Brows")

  const currentServices = activeLocation === "ues" ? uesServices : ridgewoodServices
  const currentStore = activeLocation === "ues" ? STORES[0] : STORES[1]

  const activeServices = currentServices.find(s => s.category === activeCategory)?.items || []

  const availableCategories = currentServices.map(s => s.category)
  const resolvedCategory = availableCategories.includes(activeCategory)
    ? activeCategory
    : availableCategories[0]
  const resolvedServices = currentServices.find(s => s.category === resolvedCategory)?.items || []

  const handleLocationChange = (loc: "ues" | "ridgewood") => {
    setActiveLocation(loc)
    const newServices = loc === "ues" ? uesServices : ridgewoodServices
    const cats = newServices.map(s => s.category)
    if (!cats.includes(activeCategory)) setActiveCategory(cats[0])
  }

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Beauty with the Thread
            <span className="block italic">and so much more</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            From expert threading to luxurious facials, discover our full menu of beauty services tailored for you.
          </p>
        </div>

        {/* Location Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => handleLocationChange("ues")}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all",
                activeLocation === "ues"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-secondary"
              )}
            >
              Upper East Side
            </button>
            <button
              onClick={() => handleLocationChange("ridgewood")}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all border-l border-border",
                activeLocation === "ridgewood"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-secondary"
              )}
            >
              Ridgewood Queens
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {currentServices.map((service) => (
            <button
              key={service.category}
              onClick={() => setActiveCategory(service.category)}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all",
                resolvedCategory === service.category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {service.category}
            </button>
          ))}
        </div>

        {activeLocation === "ridgewood" && resolvedCategory === "Lashes" && (
          <p className="text-center font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mb-8 -mt-4">
            Lash services at our Ridgewood studio are by appointment only — please book online or call ahead.
          </p>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedServices.map((service) => (
            <div
              key={service.name}
              className="group bg-card p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium">{service.name}</h3>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                  {service.duration}
                </span>
                <a
                  href={buildBookingUrl(currentStore.bookingUrl, service.bookingId)}
                  target={service.bookingId ? "_blank" : undefined}
                  rel={service.bookingId ? "noopener noreferrer" : undefined}
                  className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            Ready to enhance your natural beauty?
          </p>
          <a
            href="#locations"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  )
}
