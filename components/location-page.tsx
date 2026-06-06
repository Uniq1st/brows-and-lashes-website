import Link from "next/link"
import { MapPin, Phone, Clock, Instagram, ArrowRight, Star, Tag } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { Store } from "@/lib/stores"
import { getServices } from "@/lib/square"
import type { SquareStoreId, SquareService } from "@/lib/square"

interface LocationPageProps {
  store: Store
  storeId: SquareStoreId
  teamMembers?: { name: string; role: string; initials: string; color: string }[]
  heroTagline: string
  neighborhoodDesc: string
}

// Group services by category
function groupByCategory(services: SquareService[]) {
  const map = new Map<string, SquareService[]>()
  for (const svc of services) {
    const cat = svc.categoryName ?? "Services"
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push(svc)
  }
  return map
}

export async function LocationPage({
  store,
  storeId,
  teamMembers,
  heroTagline,
  neighborhoodDesc,
}: LocationPageProps) {
  // Fetch real services from Square — falls back to empty array on error
  let squareServices: SquareService[] = []
  try {
    squareServices = await getServices(storeId)
  } catch (err) {
    console.error(`Could not load Square services for ${storeId}:`, err)
  }

  const hasSquareServices = squareServices.length > 0
  const servicesByCategory = groupByCategory(squareServices)
  const categories = Array.from(servicesByCategory.keys())

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="relative py-28 md:py-36 bg-card overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
              {store.neighborhood}
            </p>
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
              {store.fullName}
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-lg max-w-2xl mx-auto mb-10">
              {heroTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={store.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={store.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-secondary transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </section>

        {/* ── Quick Info bar ── */}
        <section className="py-12 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium mb-1">Address</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">
                  {store.address}<br />{store.cityStateZip}
                </p>
              </div>
              <div>
                <Phone className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium mb-1">Phone</p>
                <a
                  href={store.phoneHref}
                  className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  {store.phone}
                </a>
              </div>
              <div>
                <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium mb-1">Hours</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light">
                  {store.hours.weekdays}<br />
                  {store.hours.saturday && <>{store.hours.saturday}<br /></>}
                  {store.hours.sunday}
                </p>
              </div>
              <div>
                <Instagram className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium mb-1">Instagram</p>
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  {store.instagram}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── About this location ── */}
        <section className="py-20 bg-card">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-secondary rounded-sm overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/about.jpg')" }}
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                About This Studio
              </p>
              <h2 className="text-4xl font-light mb-6">
                Your neighborhood<span className="block italic">beauty destination</span>
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light leading-relaxed mb-4">
                {neighborhoodDesc}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light leading-relaxed">
                Walk-ins always welcome. Book online for guaranteed availability with your preferred specialist.
              </p>
              <div className="flex items-center gap-3 mt-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
                <span className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                  5.0 on Google
                </span>
                <a
                  href={store.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-montserrat)] text-xs text-primary hover:underline"
                >
                  Leave a review →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Services
              </p>
              <h2 className="text-4xl font-light">
                Everything we offer
                <span className="block italic">at this studio</span>
              </h2>
              {hasSquareServices && (
                <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Tag className="w-3 h-3" /> Prices listed are for this location
                </p>
              )}
            </div>

            {hasSquareServices ? (
              /* ── Square-powered service list with prices ── */
              <div className="space-y-10 mb-10">
                {categories.map((cat) => {
                  const items = servicesByCategory.get(cat) ?? []
                  return (
                    <div key={cat}>
                      <h3 className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.25em] uppercase text-primary border-b border-border pb-3 mb-4">
                        {cat}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {items.map((svc) => (
                          <a
                            key={svc.variationId ?? svc.id}
                            href={store.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-4 p-4 border border-border hover:border-primary/40 hover:bg-card/50 transition-colors group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium leading-snug">
                                  {svc.name}
                                </span>
                              </div>
                              {svc.durationMinutes && (
                                <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground mt-1 ml-3.5">
                                  {svc.durationMinutes} min
                                </p>
                              )}
                            </div>
                            {svc.priceFormatted && (
                              <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-primary shrink-0">
                                {svc.priceFormatted}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* ── Static fallback when Square isn't connected yet ── */
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {[
                  "Eyebrow Threading", "Eyebrow Waxing", "Eyebrow Tinting",
                  "Full Face Threading", "Classic Lash Extensions", "Volume Lash Extensions",
                  "Hybrid Lash Extensions", "Lash Lift & Tint", "Brazilian Wax",
                  "Leg & Arm Wax", "Classic Facial", "Deep Cleanse Facial",
                  "Hydrating Facial", "Anti-Aging Facial", "Henna Tattoos",
                ].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 p-4 border border-border hover:border-primary/40 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="font-[family-name:var(--font-montserrat)] text-sm">{name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <a
                href={store.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
              >
                Book a Service <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        {teamMembers && teamMembers.length > 0 && (
          <section className="py-20 bg-card">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-12">
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                  Your Specialists
                </p>
                <h2 className="text-4xl font-light">
                  Meet the team<span className="block italic">at this studio</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="bg-background border border-border p-6"
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4 text-lg font-semibold`}
                    >
                      {member.initials}
                    </div>
                    <p className="font-medium mb-1">{member.name}</p>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground tracking-wider uppercase">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Map ── */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Find Us
              </p>
              <h2 className="text-4xl font-light">{store.address}</h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mt-2">
                {store.cityStateZip}
              </p>
            </div>
            <div className="aspect-video rounded-sm overflow-hidden border border-border">
              <iframe
                src={store.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${store.fullName} map`}
              />
            </div>
          </div>
        </section>

        {/* ── Memberships CTA ── */}
        <section className="py-16 bg-primary text-primary-foreground text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-light mb-4">Visit us monthly?</h2>
            <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light mb-6">
              Save every visit with an UniqSwek membership. Starting at $25/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/memberships"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                See Memberships <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bridal"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Bridal & Groups
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
