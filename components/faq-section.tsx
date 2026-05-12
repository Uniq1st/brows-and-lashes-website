"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    category: "Threading & Brows",
    questions: [
      {
        q: "Does eyebrow threading hurt?",
        a: "Threading involves a brief sensation that most clients describe as a light snap. It's generally much gentler than waxing and causes minimal irritation. Most clients find it very tolerable, and the discomfort decreases significantly after your first visit as you get used to it."
      },
      {
        q: "How often should I get my eyebrows threaded?",
        a: "We recommend every 3–4 weeks to maintain a clean, defined shape. Hair growth varies by person — some clients come every 2 weeks, others every 5–6 weeks. Your specialist will advise the best schedule for your hair type during your visit."
      },
      {
        q: "Is threading better than waxing?",
        a: "Threading is preferred by many clients because it's chemical-free, extremely precise, and gentler on sensitive skin. It removes hair at the root without pulling at the skin, making it a great option if you use retinol, Accutane, or have reactive skin. Waxing is also offered for clients who prefer it."
      },
    ]
  },
  {
    category: "Lash Extensions",
    questions: [
      {
        q: "How long do lash extensions last?",
        a: "With proper care, a full set lasts 3–4 weeks before a fill is needed. Natural lashes shed in cycles, taking extensions with them. We recommend a fill every 2–3 weeks to keep your lashes looking full. Avoid oil-based products around the eyes and don't rub them to maximize longevity."
      },
      {
        q: "What's the difference between Classic, Volume, and Hybrid lashes?",
        a: "Classic lashes place one extension on each natural lash — natural and defined. Volume lashes fan multiple lightweight extensions onto each natural lash for a dramatic, full look. Hybrid is a mix of both, giving texture and dimension that falls between the two. Your specialist can help you choose based on your natural lashes and desired look."
      },
      {
        q: "How do I care for my lash extensions at home?",
        a: "Avoid water and steam for the first 24 hours. After that: cleanse gently with an oil-free cleanser, brush daily with the spoolie we provide, avoid sleeping face-down, and stay away from oil-based makeup removers. Do not pull or pick at your extensions — this can damage your natural lashes."
      },
    ]
  },
  {
    category: "Booking & Policies",
    questions: [
      {
        q: "Do I need an appointment, or do you take walk-ins?",
        a: "Both! We welcome walk-ins at all times, though availability can vary especially on weekends. Booking online in advance through our Square Appointments system is the best way to guarantee your preferred time and specialist. Same-day appointments are often available too."
      },
      {
        q: "What is your cancellation policy?",
        a: "We kindly ask for at least 24 hours notice if you need to cancel or reschedule. This allows us to offer your time slot to another client. Repeated no-shows or late cancellations may require a deposit to book future appointments."
      },
      {
        q: "Do you offer gift cards?",
        a: "Yes! Our gift cards are available in any amount and can be used at either UniqSwek studio. They make a perfect gift for any occasion — birthdays, Mother's Day, holidays, and more. Purchase directly online through Square."
      },
    ]
  },
  {
    category: "Our Studios",
    questions: [
      {
        q: "Is there parking near the studios?",
        a: "Upper East Side (Manhattan): Street parking is available on nearby blocks. Several parking garages are within a 5-minute walk on Lexington and 3rd Avenue. The 4/5/6 subway stops at 86th Street are a short walk away. Ridgewood (Queens): Street parking is generally more available in Ridgewood. The M train (Forest Ave stop) is nearby, and multiple bus routes serve the area."
      },
      {
        q: "Are your specialists licensed?",
        a: "Yes — every specialist at UniqSwek is a licensed cosmetologist or licensed technician in New York State. Our team is led by founder Swekchha Luitel, who has over 8 years of experience. We maintain strict hygiene standards with new tools and sanitized equipment for every client."
      },
      {
        q: "Do you offer services for men?",
        a: "Absolutely. Male threading is one of our most popular services. We offer precise eyebrow shaping, beard line cleanup, and full facial threading for men. No appointment necessary — walk-ins are always welcome."
      },
    ]
  },
]

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)

  const activeQuestions = faqs.find(f => f.category === activeCategory)?.questions ?? []

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            FAQs
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Questions we get
            <span className="block italic">all the time</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            Can't find your answer? Call or text us — we're happy to help.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqs.map((f) => (
            <button
              key={f.category}
              onClick={() => { setActiveCategory(f.category); setOpenItem(null) }}
              className={`px-5 py-2 font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase transition-all ${
                activeCategory === f.category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {activeQuestions.map((item) => {
            const id = `${activeCategory}-${item.q}`
            const isOpen = openItem === id
            return (
              <div key={id} className="border border-border">
                <button
                  onClick={() => setOpenItem(isOpen ? null : id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-medium pr-8">{item.q}</span>
                  <span className="shrink-0 text-primary">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light leading-relaxed text-sm">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 bg-secondary rounded-sm">
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium mb-1">Still have a question?</p>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm font-light mb-4">
            Our team is happy to help before you book.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+19173882434"
              className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:underline"
            >
              Call UES: +1 (917) 388-2434
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a
              href="tel:+13478895027"
              className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:underline"
            >
              Call Ridgewood: (347) 889-5027
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
