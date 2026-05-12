"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const services = [
  {
    category: "Threading & Brows",
    items: [
      {
        name: "Eyebrow Threading",
        description: "Precise hair removal technique using thread for perfectly shaped brows with clean, defined lines.",
        price: "From $15",
        duration: "15 mins"
      },
      {
        name: "Eyebrow Waxing",
        description: "Quick and effective brow shaping using premium wax for smooth, long-lasting results.",
        price: "From $20",
        duration: "20 mins"
      },
      {
        name: "Eyebrow Tinting",
        description: "Semi-permanent dye enhances brow color for a naturally fuller, defined appearance.",
        price: "From $25",
        duration: "20 mins"
      },
      {
        name: "Male Threading",
        description: "Specialized threading service for men, including brow shaping and facial hair grooming.",
        price: "From $15",
        duration: "15 mins"
      },
      {
        name: "Full Face Threading",
        description: "Complete facial hair removal including brows, upper lip, chin, and sides using threading technique.",
        price: "From $45",
        duration: "30 mins"
      },
    ]
  },
  {
    category: "Lashes",
    items: [
      {
        name: "Classic Lash Extensions",
        description: "One extension per natural lash for a subtle, natural enhancement that opens up your eyes.",
        price: "From $120",
        duration: "90 mins"
      },
      {
        name: "Volume Lash Extensions",
        description: "Multiple lightweight extensions per natural lash for dramatic, full, glamorous lashes.",
        price: "From $180",
        duration: "2 hours"
      },
      {
        name: "Hybrid Lash Extensions",
        description: "Perfect blend of classic and volume techniques for beautiful textured dimension.",
        price: "From $150",
        duration: "2 hours"
      },
      {
        name: "Lash Lift & Tint",
        description: "Semi-permanent curl and color enhancement for your natural lashes that lasts 6-8 weeks.",
        price: "From $85",
        duration: "60 mins"
      },
      {
        name: "Eyelash Tinting",
        description: "Darken and define your natural lashes for a mascara-free, polished look.",
        price: "From $25",
        duration: "20 mins"
      },
    ]
  },
  {
    category: "Waxing",
    items: [
      {
        name: "Full Body Wax",
        description: "Complete body waxing service for smooth, hair-free skin from head to toe.",
        price: "From $150",
        duration: "90 mins"
      },
      {
        name: "Brazilian Wax",
        description: "Professional bikini waxing for a clean, smooth finish with minimal discomfort.",
        price: "From $55",
        duration: "30 mins"
      },
      {
        name: "Leg Wax",
        description: "Full or half leg waxing for silky smooth, hair-free legs that last weeks.",
        price: "From $45",
        duration: "45 mins"
      },
      {
        name: "Arm Wax",
        description: "Complete arm waxing for smooth, touchable skin all day long.",
        price: "From $35",
        duration: "30 mins"
      },
      {
        name: "Underarm Wax",
        description: "Quick and effective underarm hair removal for lasting smoothness.",
        price: "From $20",
        duration: "15 mins"
      },
    ]
  },
  {
    category: "Facials & More",
    items: [
      {
        name: "Classic Facial",
        description: "Deep cleansing facial treatment to rejuvenate and refresh your skin for a healthy glow.",
        price: "From $65",
        duration: "45 mins"
      },
      {
        name: "Deep Cleanse Facial",
        description: "Intensive facial with extractions and deep pore cleansing for clear, radiant skin.",
        price: "From $85",
        duration: "60 mins"
      },
      {
        name: "Hydrating Facial",
        description: "Nourishing treatment to restore moisture and plump dehydrated skin.",
        price: "From $75",
        duration: "50 mins"
      },
      {
        name: "Henna Tattoos",
        description: "Beautiful, intricate temporary henna designs for special occasions and celebrations.",
        price: "From $25",
        duration: "30 mins"
      },
      {
        name: "Anti-Aging Facial",
        description: "Rejuvenating treatment targeting fine lines and wrinkles for youthful, firm skin.",
        price: "From $95",
        duration: "60 mins"
      },
    ]
  }
]

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("Threading & Brows")

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
            Beauty with the Thread
            <span className="block italic">and so much more</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            From expert threading to luxurious facials, discover our full menu of beauty services tailored for you.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service) => (
            <button
              key={service.category}
              onClick={() => setActiveCategory(service.category)}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all",
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
          {activeServices.map((service) => (
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
                <a 
                  href="https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services?rwg_token=AFd1xnFwA5c7P3Zb7Kpt8pLOgW-9UZc_586SRt9tceevn64d8khlN7HJIS6NLrdsj8cijlavItegsDD9Kw5iZkX95W13wCdprw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
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
            href="https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services?rwg_token=AFd1xnFwA5c7P3Zb7Kpt8pLOgW-9UZc_586SRt9tceevn64d8khlN7HJIS6NLrdsj8cijlavItegsDD9Kw5iZkX95W13wCdprw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  )
}
