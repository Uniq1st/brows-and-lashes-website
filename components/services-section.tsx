"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { STORES } from "@/lib/stores"

type ServiceItem = {
  name: string
  description: string
  duration: string
  price: string
  bookingId: string
}

type ServiceCategory = {
  category: string
  items: ServiceItem[]
}

const uesServices: ServiceCategory[] = [
  {
    category: "Threading & Brows",
    items: [
      { name: "Eyebrow Threading",   description: "Precise hair removal using thread for perfectly shaped brows with clean, defined lines.", duration: "15 mins", price: "$13", bookingId: "" },
      { name: "Eyebrow Waxing",      description: "Quick brow shaping using premium wax for smooth, long-lasting results.", duration: "20 mins", price: "$15", bookingId: "" },
      { name: "Eyebrow Tinting",     description: "Semi-permanent dye enhances brow color for a naturally fuller, defined appearance.", duration: "20 mins", price: "$20", bookingId: "" },
      { name: "Eyebrow Lamination",  description: "Restructures brow hairs into a sleek, uniform shape that lasts 6–8 weeks.", duration: "45 mins", price: "$60", bookingId: "" },
      { name: "Male Threading",      description: "Specialized threading for men including brow shaping and facial hair grooming.", duration: "15 mins", price: "$13", bookingId: "" },
      { name: "Full Face Threading", description: "Complete facial hair removal — brows, upper lip, chin, and sides.", duration: "30 mins", price: "$45", bookingId: "" },
    ],
  },
  {
    category: "Lashes",
    items: [
      { name: "Classic Lash Extensions", description: "One extension per natural lash for a subtle, natural look that opens up your eyes.", duration: "90 mins", price: "$125", bookingId: "" },
      { name: "Volume Lash Extensions",  description: "Multiple lightweight extensions per natural lash for dramatic, full, glamorous lashes.", duration: "2 hours", price: "$150", bookingId: "" },
      { name: "Hybrid Lash Extensions",  description: "A blend of classic and volume techniques for beautiful textured dimension.", duration: "2 hours", price: "$150", bookingId: "" },
      { name: "Cluster Lash Extensions", description: "Pre-made fans for a quick, bold, full look at an accessible price.", duration: "45 mins", price: "$35", bookingId: "" },
      { name: "Lash Lift & Tint",        description: "Semi-permanent curl and color enhancement for your natural lashes, lasting 6–8 weeks.", duration: "60 mins", price: "$75", bookingId: "" },
      { name: "Eyelash Tinting",         description: "Darken and define your natural lashes for a mascara-free, polished look.", duration: "20 mins", price: "$30", bookingId: "" },
    ],
  },
  {
    category: "Waxing",
    items: [
      { name: "Brazilian Wax",      description: "Professional bikini waxing for a clean, smooth finish with minimal discomfort.", duration: "30 mins", price: "$45", bookingId: "" },
      { name: "CBD Brazilian Wax",  description: "Brazilian wax with CBD-infused formula for extra soothing and reduced redness.", duration: "30 mins", price: "$55", bookingId: "" },
      { name: "Upper Leg Wax",      description: "Waxing from knee to hip for smooth, hair-free upper legs.", duration: "30 mins", price: "$40", bookingId: "" },
      { name: "Lower Leg Wax",      description: "Waxing from ankle to knee for silky smooth lower legs.", duration: "30 mins", price: "$40", bookingId: "" },
      { name: "Full Leg Wax",       description: "Complete leg waxing from ankle to hip for fully smooth, hair-free legs.", duration: "45 mins", price: "$60", bookingId: "" },
      { name: "Half Arms Wax",      description: "Waxing from wrist to elbow for smooth, hair-free forearms.", duration: "30 mins", price: "$35", bookingId: "" },
      { name: "Full Arms Wax",      description: "Complete arm waxing from wrist to shoulder.", duration: "30 mins", price: "$45", bookingId: "" },
      { name: "Underarm Wax",       description: "Quick and effective underarm hair removal for lasting smoothness.", duration: "15 mins", price: "$20", bookingId: "" },
      { name: "Full Body Wax",      description: "Complete body waxing from head to toe.", duration: "90 mins", price: "$150", bookingId: "" },
    ],
  },
  {
    category: "Facials & More",
    items: [
      { name: "Regular Herbal Facial", description: "Deep cleansing herbal facial to rejuvenate and refresh your skin.", duration: "45 mins", price: "$40", bookingId: "" },
      { name: "Gold Facial",           description: "Luxurious gold-infused treatment to brighten, firm, and revitalize your complexion.", duration: "50 mins", price: "$65", bookingId: "" },
      { name: "Acne Facial",           description: "Intensive organic treatment targeting breakouts and congested pores for clear skin.", duration: "60 mins", price: "$90", bookingId: "" },
      { name: "Four Layer Facial",     description: "Advanced four-layer treatment targeting fine lines, uneven tone, and texture.", duration: "60 mins", price: "$85", bookingId: "" },
      { name: "Face Herbal Mask",      description: "Soothing herbal mask add-on to deeply nourish and calm the skin after any service.", duration: "20 mins", price: "$20", bookingId: "" },
      { name: "Henna Tattoos",         description: "Beautiful, intricate temporary henna designs for special occasions.", duration: "30 mins", price: "From $15", bookingId: "" },
    ],
  },
  {
    category: "Massage",
    items: [
      { name: "10 Min Head, Shoulder & Back",   description: "Quick tension-relief massage targeting head, shoulders, and upper back.", duration: "10 mins", price: "$15", bookingId: "" },
      { name: "15 Min Head, Shoulder & Back",   description: "Extended relaxation massage — perfect as a post-service add-on.", duration: "15 mins", price: "$25", bookingId: "" },
      { name: "30 Min Head, Shoulder & Back",   description: "Full relaxation session for complete tension release.", duration: "30 mins", price: "$40", bookingId: "" },
      { name: "10 Min Face Lifting Massage",    description: "Targeted facial massage to reduce puffiness and lift and tone the face.", duration: "10 mins", price: "$20", bookingId: "" },
      { name: "15 Min Face Lifting Massage",    description: "Extended facial lifting massage using sculpting techniques.", duration: "15 mins", price: "$28", bookingId: "" },
      { name: "30 Min Face Lifting Massage",    description: "Full contouring session for visible firming and a refreshed appearance.", duration: "30 mins", price: "$50", bookingId: "" },
    ],
  },
]

const ridgewoodServices: ServiceCategory[] = [
  {
    category: "Threading & Brows",
    items: [
      { name: "Eyebrow Threading",   description: "Precise hair removal using thread for perfectly shaped brows with clean, defined lines.", duration: "15 mins", price: "$7",  bookingId: "" },
      { name: "Full Face Threading", description: "Complete facial hair removal — brows, upper lip, chin, cheeks, and neck.", duration: "30 mins", price: "$25", bookingId: "" },
      { name: "Upper Lip Thread",    description: "Quick and precise upper lip hair removal using threading technique.", duration: "10 mins", price: "$5",  bookingId: "" },
      { name: "Chin Thread",         description: "Targeted chin hair removal for a clean, smooth finish.", duration: "10 mins", price: "$6",  bookingId: "" },
      { name: "Cheeks Thread",       description: "Precise cheek threading for smooth, defined facial lines.", duration: "10 mins", price: "$5",  bookingId: "" },
      { name: "Neck Thread",         description: "Clean neck hairline threading for a polished, defined look.", duration: "10 mins", price: "$6",  bookingId: "" },
      { name: "Forehead Thread",     description: "Forehead threading to clean up the hairline and stray hairs.", duration: "10 mins", price: "$5",  bookingId: "" },
      { name: "Sideburns Thread",    description: "Precise sideburn shaping using threading for clean, defined edges.", duration: "15 mins", price: "$10", bookingId: "" },
      { name: "Eyebrow Tinting",     description: "Semi-permanent dye enhances brow color for a naturally fuller, defined appearance.", duration: "20 mins", price: "$12", bookingId: "" },
    ],
  },
  {
    category: "Lashes",
    items: [
      { name: "Lash Lift & Tint",        description: "Semi-permanent curl and color enhancement for your natural lashes, lasting 6–8 weeks.", duration: "60 mins", price: "$55", bookingId: "" },
      { name: "Lash Lift",               description: "Semi-permanent curl that lifts and opens the eyes without extensions.", duration: "45 mins", price: "$50", bookingId: "" },
      { name: "Cluster Lash Extensions", description: "Pre-made fans for a quick, bold, full look at an accessible price.", duration: "45 mins", price: "$30", bookingId: "" },
      { name: "Eyelash Tinting",         description: "Darken and define your natural lashes for a mascara-free, polished look.", duration: "20 mins", price: "$18", bookingId: "" },
    ],
  },
  {
    category: "Waxing",
    items: [
      { name: "Brazilian Wax",       description: "Professional bikini waxing for a clean, smooth finish with minimal discomfort.", duration: "30 mins", price: "$35", bookingId: "" },
      { name: "Bikini Line Wax",     description: "Clean bikini line waxing for a neat, polished result.", duration: "20 mins", price: "$15", bookingId: "" },
      { name: "Deep Bikini Wax",     description: "Extended bikini waxing for a cleaner, more complete result.", duration: "25 mins", price: "$20", bookingId: "" },
      { name: "Full Legs Wax",       description: "Complete leg waxing from ankle to hip for fully smooth, hair-free legs.", duration: "45 mins", price: "$35", bookingId: "" },
      { name: "Half Legs Wax",       description: "Half leg waxing for smooth results on either upper or lower legs.", duration: "30 mins", price: "$25", bookingId: "" },
      { name: "Full Arms Wax",       description: "Complete arm waxing from wrist to shoulder.", duration: "30 mins", price: "$25", bookingId: "" },
      { name: "Under Arms Wax",      description: "Quick and effective underarm hair removal for lasting smoothness.", duration: "15 mins", price: "$10", bookingId: "" },
      { name: "Full Body Wax",       description: "Complete body waxing from head to toe.", duration: "90 mins", price: "$115", bookingId: "" },
      { name: "Full Back Wax",       description: "Complete back waxing for smooth, hair-free skin.", duration: "30 mins", price: "$30", bookingId: "" },
      { name: "Back Waist Line Wax", description: "Targeted lower back waxing along the waist line.", duration: "20 mins", price: "$15", bookingId: "" },
      { name: "Eyebrow Wax",         description: "Quick and clean brow shaping using premium wax.", duration: "15 mins", price: "$8",  bookingId: "" },
      { name: "Nose Wax",            description: "Fast and effective nose hair removal using wax.", duration: "10 mins", price: "$8",  bookingId: "" },
      { name: "Ear Wax",             description: "Gentle and effective ear hair removal using wax.", duration: "10 mins", price: "$12", bookingId: "" },
    ],
  },
  {
    category: "Facials & More",
    items: [
      { name: "Regular Facial",        description: "Deep cleansing facial to rejuvenate and refresh your skin.", duration: "45 mins", price: "$30", bookingId: "" },
      { name: "Herbal Facial",         description: "Nourishing herbal facial for a naturally glowing, healthy complexion.", duration: "45 mins", price: "$45", bookingId: "" },
      { name: "Gold Facial",           description: "Luxurious gold-infused treatment to brighten, firm, and revitalize your complexion.", duration: "50 mins", price: "$55", bookingId: "" },
      { name: "Acne Facial",           description: "Targeted treatment for active breakouts and congested pores.", duration: "60 mins", price: "$55", bookingId: "" },
      { name: "Seaweed Organic Facial",description: "Deeply hydrating organic seaweed treatment for nourished, balanced skin.", duration: "60 mins", price: "$65", bookingId: "" },
      { name: "4 Layer Facial",        description: "Advanced multi-layer treatment targeting fine lines, tone, and texture.", duration: "60 mins", price: "$75", bookingId: "" },
      { name: "Henna Tattoos",         description: "Beautiful, intricate temporary henna designs for special occasions.", duration: "30 mins", price: "From $15", bookingId: "" },
    ],
  },
  {
    category: "Massage",
    items: [
      { name: "10 Min Head, Shoulder & Back", description: "Quick tension-relief massage targeting head, shoulders, and upper back.", duration: "10 mins", price: "$10", bookingId: "" },
      { name: "10 Min Face Lifting Massage",  description: "Targeted facial massage to reduce puffiness and lift and tone the face.", duration: "10 mins", price: "$12", bookingId: "" },
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
