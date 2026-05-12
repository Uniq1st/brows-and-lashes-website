"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { STORES } from "@/lib/stores"

export function ContactSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const store = STORES[activeIndex]

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Visit Us
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Find us across
            <span className="block italic">New York City</span>
          </h2>
        </div>

        {/* Store Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {STORES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(i)}
              className={`px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase transition-all ${
                activeIndex === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-secondary relative overflow-hidden rounded-sm">
            <iframe
              key={store.id}
              src={store.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${store.fullName} location`}
              className="absolute inset-0"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-1">
                {store.neighborhood}
              </p>
              <h3 className="text-2xl font-light">{store.fullName}</h3>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Location</h4>
                <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
                  {store.address}<br />
                  {store.cityStateZip}<br />
                  <span className="text-primary/80">{store.neighborhood}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Phone</h4>
                <a
                  href={store.phoneHref}
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  {store.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Website</h4>
                <a
                  href="https://uniqswek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  uniqswek.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Hours</h4>
                <div className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light space-y-1">
                  <p>{store.hours.weekdays}</p>
                  <p>{store.hours.sunday}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Follow Us</h4>
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  {store.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
