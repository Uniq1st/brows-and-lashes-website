import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock, Instagram, ArrowRight, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { Store } from "@/lib/stores"
import { getServices } from "@/lib/square"
import type { SquareStoreId, SquareService } from "@/lib/square"
import { getActivePromo } from "@/lib/promotions"

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.875c-.31.12-.31.555 0 .674l4.995 1.875c.405.15.794-.24.654-.63l-1.875-4.995c-.12-.31-.554-.31-.674 0l.895 1.201zM11.07 18.223l-.792 5.2c-.06.42.314.735.72.614l5.25-1.636c.42-.12.51-.645.15-.886l-4.455-3.563c-.33-.255-.813-.075-.873.27zM9.6 13.47l-5.415-1.08c-.42-.09-.735.33-.57.72l2.1 5.07c.15.375.645.45.9.15l3.315-3.99c.24-.285.075-.765-.33-.87zm.9-1.725l3.705 4.22c.27.3.735.24.93-.12l2.594-5.34c.18-.36-.09-.78-.48-.78h-5.25c-.435 0-.69.42-.435.78l-.064-.76zm-.556-.944l1.426-5.04c.12-.42-.27-.78-.69-.63L5.43 7.47c-.405.15-.48.69-.135.944l4.41 3.15c.315.225.75.045.87-.315l-.43-.498z" />
    </svg>
  )
}

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  )
}

interface LocationPageProps {
  store: Store
  storeId: SquareStoreId
  teamMembers?: { name: string; displayName?: string; role: string; initials: string; color: string; ring?: string; photo?: string | null }[]
  heroTagline: string
  neighborhoodDesc: string
  heroBg?: string
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
  heroBg = "/images/hero-bg.jpg",
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

  const activePromo = getActivePromo()
  const bookingUrl = activePromo?.promoBookingUrls?.[store.id] ?? store.bookingUrl

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="relative py-28 md:py-36 bg-card overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url('${heroBg}')` }}
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
                href={bookingUrl}
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
              <Image
                src="/images/swek-threading.jpg"
                alt="Swekchha Luitel threading a client"
                fill
                className="object-cover object-top"
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
                            href={bookingUrl}
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
                href={bookingUrl}
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
                    <div className={`w-20 h-20 rounded-full ring-4 ${member.ring ?? "ring-border"} mx-auto mb-4 overflow-hidden`}>
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.displayName ?? member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className={`w-full h-full ${member.color} flex items-center justify-center text-lg font-semibold`}>
                          {member.initials}
                        </div>
                      )}
                    </div>
                    <p className="font-medium mb-1">{member.displayName ?? member.name}</p>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground tracking-wider uppercase">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Find Us Online ── */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Connect With Us
              </p>
              <h2 className="text-4xl font-light">
                Find us<span className="block italic">online</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Instagram */}
              <a
                href={store.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-orange-400 p-8 text-white flex flex-col min-h-[220px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                  <Instagram className="w-7 h-7" />
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-light mb-1">Instagram</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm">{store.instagram}</p>
                </div>
                <span className="relative z-10 mt-4 inline-flex items-center gap-2 bg-white/20 group-hover:bg-white/30 transition-colors px-4 py-2 rounded-full font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase">
                  Follow Us <ArrowRight className="w-3 h-3" />
                </span>
              </a>

              {/* Google Maps */}
              <a
                href={store.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-green-500 p-8 text-white flex flex-col min-h-[220px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                  <GoogleMapsIcon className="w-7 h-7" />
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-light mb-1">Google Maps</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm">{store.neighborhood}</p>
                </div>
                <span className="relative z-10 mt-4 inline-flex items-center gap-2 bg-white/20 group-hover:bg-white/30 transition-colors px-4 py-2 rounded-full font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </span>
              </a>

              {/* Yelp — only shown if URL is set */}
              {store.yelpUrl && (
                <a
                  href={store.yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-8 text-white flex flex-col min-h-[220px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 relative z-10">
                    <YelpIcon className="w-7 h-7" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-xl font-light mb-1">Yelp</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm">Read our reviews</p>
                  </div>
                  <span className="relative z-10 mt-4 inline-flex items-center gap-2 bg-white/20 group-hover:bg-white/30 transition-colors px-4 py-2 rounded-full font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase">
                    Read Reviews <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-20 bg-card">
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

        {/* ── Commutes & Transit ── */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Getting Here
              </p>
              <h2 className="text-4xl font-light">
                Commutes &<span className="italic"> Transit</span>
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mt-3">
                Estimated travel times by car, subway, bus, walking, or bike
              </p>
            </div>
            <div className="rounded-sm overflow-hidden border border-border" style={{ height: "480px" }}>
              <iframe
                src={store.transitMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title={`Commutes and transit to ${store.fullName}`}
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
