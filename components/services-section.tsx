"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const services = [
  {
    category: "Brows",
    items: [
      {
        name: "Microblading",
        description: "Semi-permanent technique creating natural, hair-like strokes for fuller, defined brows.",
        price: "From $450",
        duration: "2-3 hours"
      },
      {
        name: "Brow Lamination",
        description: "Restructures brow hairs to create a fuller, more defined shape that lasts 6-8 weeks.",
        price: "From $120",
        duration: "45 mins"
      },
      {
        name: "Brow Tinting",
        description: "Semi-permanent dye enhances brow color for a naturally fuller appearance.",
        price: "From $35",
        duration: "20 mins"
      },
      {
        name: "Brow Shaping & Wax",
        description: "Expert sculpting to define and enhance your natural brow shape.",
        price: "From $45",
        duration: "30 mins"
      },
      {
        name: "Ombre Powder Brows",
        description: "Soft, powdered effect that gives a filled-in, makeup look.",
        price: "From $500",
        duration: "2-3 hours"
      },
    ]
  },
  {
    category: "Lashes",
    items: [
      {
        name: "Classic Lash Extensions",
        description: "One extension per natural lash for a subtle, natural enhancement.",
        price: "From $180",
        duration: "90 mins"
      },
      {
        name: "Volume Lash Extensions",
        description: "Multiple lightweight extensions per natural lash for dramatic fullness.",
        price: "From $250",
        duration: "2 hours"
      },
      {
        name: "Hybrid Lash Extensions",
        description: "Perfect blend of classic and volume techniques for textured dimension.",
        price: "From $220",
        duration: "2 hours"
      },
      {
        name: "Lash Lift & Tint",
        description: "Semi-permanent curl and color enhancement for your natural lashes.",
        price: "From $95",
        duration: "60 mins"
      },
      {
        name: "Lash Fill (2-3 weeks)",
        description: "Maintenance appointment to refresh your lash extensions.",
        price: "From $85",
        duration: "45-60 mins"
      },
    ]
  }
]

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("Brows")

  const activeServices = services.find(s => s.category === activeCategory)?.items || []

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Tailored treatments for
            <span className="block italic">your unique beauty</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            From subtle enhancements to bold transformations, discover our curated menu of brow and lash services.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {services.map((service) => (
            <button
              key={service.category}
              onClick={() => setActiveCategory(service.category)}
              className={cn(
                "px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all",
                activeCategory === service.category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {service.category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service, index) => (
            <div
              key={service.name}
              className="group bg-card p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium">{service.name}</h3>
                <span className="font-[family-name:var(--font-montserrat)] text-sm text-primary font-medium">
                  {service.price}
                </span>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                  {service.duration}
                </span>
                <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            Not sure which service is right for you?
          </p>
          <a
            href="#contact"
            className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:underline underline-offset-4"
          >
            Schedule a Consultation →
          </a>
        </div>
      </div>
    </section>
  )
}
