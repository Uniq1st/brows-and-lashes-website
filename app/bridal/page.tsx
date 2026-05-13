"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Users, Sparkles, ArrowRight, Check, Phone, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { STORES } from "@/lib/stores"

const packages = [
  {
    icon: Heart,
    name: "Bridal Package",
    tagline: "For the bride",
    description: "Full bridal beauty prep including eyebrow threading, lash extensions or lift, facial, and waxing. Timed perfectly for your big day.",
    includes: [
      "Bridal brow shaping & threading",
      "Lash extensions or lash lift & tint",
      "Pre-wedding hydrating facial",
      "Full face threading (if needed)",
      "Complimentary brow consult 2 weeks before",
    ],
    note: "Booking 4–6 weeks in advance recommended",
  },
  {
    icon: Users,
    name: "Bridal Party",
    tagline: "For 3+ guests",
    description: "Coordinate your whole bridal party — bridesmaids, mothers of the bride/groom, and family. We'll schedule everyone seamlessly at one studio.",
    includes: [
      "Eyebrow threading or waxing for each guest",
      "Lash services available per guest",
      "Flexible scheduling for 3–10+ people",
      "Group discount applied automatically",
      "Both studios available for large parties",
    ],
    note: "Groups of 5+ receive an additional 10% off",
  },
  {
    icon: Sparkles,
    name: "Special Occasions",
    tagline: "Birthdays, proms & more",
    description: "Quinceaneras, proms, office parties, girls' days — any occasion worth looking your best for. We love being part of your special moments.",
    includes: [
      "Any combination of services",
      "Flexible group sizes",
      "Walk-in friendly for smaller groups",
      "Advance booking for guaranteed availability",
      "Memento card for the occasion on request",
    ],
    note: "Contact us for custom group packages",
  },
]

function InquiryForm({ store }: { store: typeof STORES[number] }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const studioEmail = store.id === "brows-and-lashes"
    ? "browsandlashesbyuniqswek@gmail.com"
    : "eyebrowshapebyuniqswek@gmail.com"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("https://formspree.io/f/xbdwbldn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Bridal/Group Inquiry — ${form.name} (${store.name})`,
          form_type: "bridal_inquiry",
          studio: store.name,
          studio_email: studioEmail,
          name: form.name,
          email: form.email,
          phone: form.phone,
          event_date: form.date,
          number_of_guests: form.guests,
          message: form.message,
        }),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", phone: "", date: "", guests: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "w-full px-4 py-3 border border-border bg-background font-[family-name:var(--font-montserrat)] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name *" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputClass} />
        <input required type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className={inputClass} />
        <input type="date" placeholder="Event date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} className={inputClass} />
      </div>
      <input placeholder="Number of guests" value={form.guests} onChange={e => setForm(f => ({...f, guests: e.target.value}))} className={inputClass} />
      <textarea
        placeholder="Tell us about your event — what services are you looking for?"
        value={form.message}
        onChange={e => setForm(f => ({...f, message: e.target.value}))}
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Opening email…" : "Send Inquiry"}
        <ArrowRight className="w-4 h-4" />
      </button>
      {status === "success" && (
        <div className="bg-primary/10 border border-primary/20 rounded-sm px-6 py-5 text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-primary font-medium mb-1">Inquiry received! ✨</p>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm font-light">
            We'll get back to you within 24 hours to confirm availability.
          </p>
        </div>
      )}
      {status === "error" && (
        <p className="font-[family-name:var(--font-montserrat)] text-sm text-red-500 text-center">
          Something went wrong. Please call us directly or email us below.
        </p>
      )}
    </form>
  )
}

export default function BridalPage() {
  const [activeStore, setActiveStore] = useState(0)

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 md:py-32 bg-card text-center">
          <div className="max-w-4xl mx-auto px-6">
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Bridal & Group Bookings
            </p>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Look stunning for
              <span className="block italic">every moment</span>
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Whether you're the bride, the bridal party, or a group celebrating a special occasion — we coordinate everything so you can focus on enjoying the day.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => {
                const Icon = pkg.icon
                return (
                  <div key={pkg.name} className="border border-border p-8 flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-2">{pkg.tagline}</p>
                    <h3 className="text-2xl font-light mb-3">{pkg.name}</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm font-light leading-relaxed mb-6">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/60 italic border-t border-border pt-4">
                      {pkg.note}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why UniqSwek for Bridal */}
        <section className="py-20 bg-card">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">Why UniqSwek</p>
                <h2 className="text-4xl font-light mb-6">The team brides<span className="block italic">trust in NYC</span></h2>
                <div className="space-y-5">
                  {[
                    ["200+ five-star reviews", "Real brides and clients who've trusted us for their most important moments."],
                    ["Licensed specialists", "Every team member is licensed in New York State. No exceptions."],
                    ["Flexible scheduling", "Early morning and late evening slots available for bridal timelines."],
                    ["Both Manhattan & Queens", "Large parties can split across both studios or we accommodate everyone at one location."],
                  ].map(([title, body]) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm mb-1">{title}</p>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/gallery-1.jpg')" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-20 bg-background">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">Get in Touch</p>
              <h2 className="text-4xl font-light mb-4">Book your group<span className="block italic">experience</span></h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
                Fill in your details below and we'll get back to you within 24 hours to confirm availability and answer any questions.
              </p>
            </div>

            {/* Studio selector */}
            <div className="flex gap-3 mb-8 justify-center">
              {STORES.map((store, i) => (
                <button
                  key={store.id}
                  onClick={() => setActiveStore(i)}
                  className={`px-5 py-2 font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase transition-all ${
                    activeStore === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {store.name}
                </button>
              ))}
            </div>

            <InquiryForm store={STORES[activeStore]} />

            {/* Direct contacts */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                { store: STORES[0], email: "browsandlashesbyuniqswek@gmail.com" },
                { store: STORES[1], email: "eyebrowshapebyuniqswek@gmail.com" },
              ].map(({ store, email }) => (
                <div key={store.id} className="border border-border p-5">
                  <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-primary mb-3">{store.neighborhood}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${email}`} className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" /> {email}
                    </a>
                    <a href={store.phoneHref} className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> {store.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
