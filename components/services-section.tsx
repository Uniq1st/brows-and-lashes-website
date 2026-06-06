"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { STORES } from "@/lib/stores"

const services = [
  {
    category: "Threading & Brows",
    items: [
      {
        name: "Eyebrow Threading",
        description: "Precise hair removal technique using thread for perfectly shaped brows with clean, defined lines.",
        duration: "15 mins",
        price: "$13",
        bookingId: "",
      },
      {
        name: "Eyebrow Waxing",
        description: "Quick and effective brow shaping using premium wax for smooth, long-lasting results.",
        duration: "20 mins",
        price: "$15",
        bookingId: "",
      },
      {
        name: "Eyebrow Tinting",
        description: "Semi-permanent dye enhances brow color for a naturally fuller, defined appearance.",
        duration: "20 mins",
        price: "$20",
        bookingId: "",
      },
      {
        name: "Eyebrow Lamination",
        description: "Restructures brow hairs into a sleek, uniform shape for a defined, full look that lasts 6–8 weeks.",
        duration: "45 mins",
        price: "$60",
        bookingId: "",
      },
      {
        name: "Male Threading",
        description: "Specialized threading service for men, including brow shaping and facial hair grooming.",
        duration: "15 mins",
        price: "$13",
        bookingId: "",
      },
      {
        name: "Full Face Threading",
        description: "Complete facial hair removal including brows, upper lip, chin, and sides using threading technique.",
        duration: "30 mins",
        price: "$45",
        bookingId: "",
      },
    ],
  },
  {
    category: "Lashes",
    items: [
      {
        name: "Classic Lash Extensions",
        description: "One extension per natural lash for a subtle, natural enhancement that opens up your eyes.",
        duration: "90 mins",
        price: "$125",
        bookingId: "",
      },
      {
        name: "Volume Lash Extensions",
        description: "Multiple lightweight extensions per natural lash for dramatic, full, glamorous lashes.",
        duration: "2 hours",
        price: "$150",
        bookingId: "",
      },
      {
        name: "Hybrid Lash Extensions",
        description: "Perfect blend of classic and volume techniques for beautiful textured dimension.",
        duration: "2 hours",
        price: "$150",
        bookingId: "",
      },
      {
        name: "Cluster Lash Extensions",
        description: "Pre-made fans applied to natural lashes for a quick, bold, full look at an accessible price.",
        duration: "45 mins",
        price: "$35",
        bookingId: "",
      },
      {
        name: "Lash Lift & Tint",
        description: "Semi-permanent curl and color enhancement for your natural lashes that lasts 6–8 weeks.",
        duration: "60 mins",
        price: "$75",
        bookingId: "",
      },
      {
        name: "Eyelash Tinting",
        description: "Darken and define your natural lashes for a mascara-free, polished look.",
        duration: "20 mins",
        price: "$30",
        bookingId: "",
      },
    ],
  },
  {
    category: "Waxing",
    items: [
      {
        name: "Brazilian Wax",
        description: "Professional bikini waxing for a clean, smooth finish with minimal discomfort.",
        duration: "30 mins",
        price: "$45",
        bookingId: "",
      },
      {
        name: "CBD Brazilian Wax",
        description: "Brazilian wax with CBD-infused formula for extra soothing, reduced redness, and a calmer post-wax experience.",
        duration: "30 mins",
        price: "$55",
        bookingId: "",
      },
      {
        name: "Upper Leg Wax",
        description: "Waxing from the knee to the hip for smooth, hair-free skin on the upper leg.",
        duration: "30 mins",
        price: "$40",
        bookingId: "",
      },
      {
        name: "Lower Leg Wax",
        description: "Waxing from the ankle to the knee for silky smooth lower legs that last weeks.",
        duration: "30 mins",
        price: "$40",
        bookingId: "",
      },
      {
        name: "Full Leg Wax",
        description: "Complete leg waxing from ankle to hip for fully smooth, hair-free legs.",
        duration: "45 mins",
        price: "$60",
        bookingId: "",
      },
      {
        name: "Half Arms Wax",
        description: "Waxing from wrist to elbow for smooth, hair-free forearms.",
        duration: "30 mins",
        price: "$35",
        bookingId: "",
      },
      {
        name: "Full Arms Wax",
        description: "Complete arm waxing from wrist to shoulder for smooth, hair-free skin.",
        duration: "30 mins",
        price: "$45",
        bookingId: "",
      },
      {
        name: "Underarm Wax",
        description: "Quick and effective underarm hair removal for lasting smoothness.",
        duration: "15 mins",
        price: "$20",
        bookingId: "",
      },
      {
        name: "Full Body Wax",
        description: "Complete body waxing service for smooth, hair-free skin from head to toe.",
        duration: "90 mins",
        price: "$150",
        bookingId: "",
      },
    ],
  },
  {
    category: "Facials & More",
    items: [
      {
        name: "Regular Herbal Facial",
        description: "Deep cleansing herbal facial to rejuvenate and refresh your skin for a healthy, natural glow.",
        duration: "45 mins",
        price: "$40",
        bookingId: "",
      },
      {
        name: "Gold Facial",
        description: "Luxurious gold-infused treatment to brighten, firm, and revitalize your complexion.",
        duration: "50 mins",
        price: "$65",
        bookingId: "",
      },
      {
        name: "Acne Facial",
        description: "Intensive organic treatment targeting active breakouts and congested pores for clear, radiant skin.",
        duration: "60 mins",
        price: "$90",
        bookingId: "",
      },
      {
        name: "Four Layer Facial",
        description: "Advanced four-layer treatment targeting fine lines, uneven tone, and texture for visibly younger-looking skin.",
        duration: "60 mins",
        price: "$85",
        bookingId: "",
      },
      {
        name: "Face Herbal Mask",
        description: "Soothing herbal mask add-on to deeply nourish the skin and reduce redness after any service.",
        duration: "20 mins",
        price: "$20",
        bookingId: "",
      },
      {
        name: "Henna Tattoos",
        description: "Beautiful, intricate temporary henna designs for special occasions and celebrations.",
        duration: "30 mins",
        price: "$15",
        bookingId: "",
      },
    ],
  },
  {
    category: "Massage",
    items: [
      {
        name: "10 Min Head, Shoulder & Back",
        description: "Quick tension-relief massage targeting the head, shoulders, and upper back to melt away stress.",
        duration: "10 mins",
        price: "$15",
        bookingId: "",
      },
      {
        name: "15 Min Head, Shoulder & Back",
        description: "Extended relaxation massage for the head, shoulders, and back — perfect as a post-service add-on.",
        duration: "15 mins",
        price: "$25",
        bookingId: "",
      },
      {
        name: "30 Min Head, Shoulder & Back",
        description: "Full relaxation session covering head, neck, shoulders, and upper back for complete tension release.",
        duration: "30 mins",
        price: "$40",
        bookingId: "",
      },
      {
        name: "10 Min Face Lifting Massage",
        description: "Targeted facial massage to stimulate circulation, reduce puffiness, and lift and tone the face.",
        duration: "10 mins",
        price: "$20",
        bookingId: "",
      },
      {
        name: "15 Min Face Lifting Massage",
        description: "Extended facial lifting massage using sculpting techniques to naturally firm and contour the face.",
        duration: "15 mins",
        price: "$28",
        bookingId: "",
      },
      {
        name: "30 Min Face Lifting Massage",
        description: "Full face lifting and contouring session for visible firming, toning, and a refreshed appearance.",
        duration: "30 mins",
        price: "$50",
        bookingId: "",
      },
    ],
  },
]

function buildBookingUrl(storeBookingUrl: string, bookingId?: string) {
  if (!bookingId) return storeBookingUrl
  const url = new URL(storeBookingUrl)
  url.searchParams.set("services", bookingId)
  return url.toString()
}

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
                <h3 className="text-xl font-medium pr-4">{service.name}</h3>
                <span className="text-xl font-light text-primary shrink-0">{service.price}</span>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                  {service.duration}
                </span>
                <a
                  href={buildBookingUrl(STORES[0].bookingUrl, service.bookingId)}
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
