"use client"

import { useState } from "react"
import { ArrowRight, Check, Phone, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { STORES } from "@/lib/stores"

const packages = [
  {
    tier: "Silver",
    regularPrice: 223,
    packagePrice: 199,
    image: "/images/bridal-silver.jpg",
    services: [
      "Eyebrow Threading",
      "Upper Lip Threading",
      "Herbal Facial",
      "Brazilian Wax",
      "Under Arms Wax",
      "Half Leg Wax",
      "Half Arm Wax",
      "Eyebrow Tinting",
    ],
  },
  {
    tier: "Gold",
    regularPrice: 335,
    packagePrice: 299,
    image: "/images/bridal-gold.jpg",
    services: [
      "Full Face Threading",
      "Gold Facial",
      "Cluster Eyelash Extension",
      "Full Leg Wax",
      "Full Arms Wax",
      "Brazilian Wax",
      "Under Arms Wax",
      "Eyebrow Tinting",
    ],
  },
  {
    tier: "Platinum",
    regularPrice: 455,
    packagePrice: 399,
    image: "/images/bridal-platinum.jpg",
    services: [
      "Full Face Threading",
      "30 min Head, Shoulder & Back Massage",
      "Seaweed Facial",
      "Full Body Wax incl. Brazilian",
      "Classic Individual Eyelash Extension",
      "Eyebrow Tinting",
    ],
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
        {status === "loading" ? "Sending…" : "Send Inquiry"}
        <ArrowRight className="w-4 h-4" />
      </button>
      {status === "success" && (
        <div className="bg-primary/10 border border-primary/20 rounded-sm px-6 py-5 text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-primary font-medium mb-1">Inquiry received!</p>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm font-light">
            We&apos;ll get back to you within 24 hours to confirm availability.
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
        <section className="relative py-32 md:py-44 text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bridal-hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-white/70 mb-4">
              Bridal Packages
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Look stunning for
              <span className="block italic">your big day</span>
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-white/80 font-light text-lg max-w-2xl mx-auto">
              Curated beauty packages designed for brides — combining threading, waxing, facials, and lash services at one exclusive price.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-3">Our Packages</p>
              <h2 className="text-4xl font-light">Choose your<span className="italic"> package</span></h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mt-3 text-sm">All prices plus tax. Book in advance for guaranteed availability.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => {
                const savings = pkg.regularPrice - pkg.packagePrice
                return (
                  <div key={pkg.tier} className="border border-border flex flex-col overflow-hidden">
                    {/* Package image */}
                    <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${pkg.image}')` }}
                      />
                      {/* Savings badge */}
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase">
                        Save ${savings}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      {/* Tier label */}
                      <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-2">
                        {pkg.tier} Package
                      </p>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-3xl font-light">${pkg.packagePrice}</span>
                          <span className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground uppercase tracking-wider">+ tax</span>
                        </div>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground/60">
                          Regular price{" "}
                          <span className="line-through">${pkg.regularPrice}</span>
                          {" "}+ tax
                        </p>
                      </div>

                      {/* Services */}
                      <ul className="space-y-2 flex-1">
                        {pkg.services.map((service) => (
                          <li key={service} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
              <h2 className="text-4xl font-light mb-4">Book your bridal<span className="block italic">experience</span></h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
                Fill in your details below and we&apos;ll get back to you within 24 hours to confirm availability and answer any questions.
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
