import Link from "next/link"
import { Instagram, MapPin } from "lucide-react"
import { STORES } from "@/lib/stores"

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.875c-.31.12-.31.555 0 .674l4.995 1.875c.405.15.794-.24.654-.63l-1.875-4.995c-.12-.31-.554-.31-.674 0l.895 1.201zM11.07 18.223l-.792 5.2c-.06.42.314.735.72.614l5.25-1.636c.42-.12.51-.645.15-.886l-4.455-3.563c-.33-.255-.813-.075-.873.27zM9.6 13.47l-5.415-1.08c-.42-.09-.735.33-.57.72l2.1 5.07c.15.375.645.45.9.15l3.315-3.99c.24-.285.075-.765-.33-.87zm.9-1.725l3.705 4.22c.27.3.735.24.93-.12l2.594-5.34c.18-.36-.09-.78-.48-.78h-5.25c-.435 0-.69.42-.435.78l-.064-.76zm-.556-.944l1.426-5.04c.12-.42-.27-.78-.69-.63L5.43 7.47c-.405.15-.48.69-.135.944l4.41 3.15c.315.225.75.045.87-.315l-.43-.498z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/">
              <img src="/brandlogo.JPG" alt="UniqSwek Beauty Studios" className="h-16 w-auto bg-white rounded-sm p-1" />
            </Link>
            <p className="font-[family-name:var(--font-montserrat)] text-background/70 font-light mt-4 max-w-sm leading-relaxed">
              Two NYC studios under one brand. Expert threading, lash extensions, waxing & facials — where beauty meets artistry.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {STORES.map((store) => (
                <div key={store.id}>
                  <p className="font-[family-name:var(--font-montserrat)] text-[10px] tracking-widest uppercase text-background/40 mb-2">
                    {store.name}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${store.instagram} on Instagram`}
                      className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="sr-only">{store.instagram}</span>
                    </a>
                    <a
                      href={store.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${store.name} on Google Maps`}
                      className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="sr-only">{store.name} on Google Maps</span>
                    </a>
                    {store.yelpUrl && (
                      <a
                        href={store.yelpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${store.name} on Yelp`}
                        className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                      >
                        <YelpIcon className="w-5 h-5" />
                        <span className="sr-only">{store.name} on Yelp</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Studios */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase mb-6">
              Our Studios
            </h4>
            <div className="space-y-6">
              {STORES.map((store) => (
                <div key={store.id}>
                  <p className="font-[family-name:var(--font-montserrat)] text-background/90 text-sm font-medium mb-1">
                    {store.name}
                  </p>
                  <p className="font-[family-name:var(--font-montserrat)] text-background/60 text-xs leading-relaxed">
                    {store.address}<br />{store.cityStateZip}
                  </p>
                  <a
                    href={store.phoneHref}
                    className="font-[family-name:var(--font-montserrat)] text-background/60 text-xs hover:text-background transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/memberships", label: "✦ Memberships" },
                { href: "/bridal", label: "Bridal & Groups" },
                { href: "/manhattan", label: "Upper East Side Studio" },
                { href: "/ridgewood", label: "Ridgewood Studio" },
                { href: "/#services", label: "Services" },
                { href: "/#team", label: "Our Team" },
                { href: "/#faq", label: "FAQs" },
                { href: "/#book", label: "Book Now" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-montserrat)] text-background/70 font-light hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[family-name:var(--font-montserrat)] text-sm text-background/50 font-light">
            © {new Date().getFullYear()} UniqSwek Beauty Studios · Founded by Swekchha Luitel (Swek). All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-[family-name:var(--font-montserrat)] text-sm text-background/50 font-light hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-[family-name:var(--font-montserrat)] text-sm text-background/50 font-light hover:text-background transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
