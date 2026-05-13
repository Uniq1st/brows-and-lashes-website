import Link from "next/link"
import { Instagram } from "lucide-react"
import { STORES } from "@/lib/stores"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              UniqSwek
              <span className="block text-sm font-light tracking-[0.3em] text-background/70">Beauty Studios · NYC</span>
            </Link>
            <p className="font-[family-name:var(--font-montserrat)] text-background/70 font-light mt-4 max-w-sm leading-relaxed">
              Two NYC studios under one brand. Expert threading, lash extensions, waxing & facials — where beauty meets artistry.
            </p>
            <div className="flex gap-4 mt-6">
              {STORES.map((store) => (
                <a
                  key={store.id}
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={store.instagram}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">{store.instagram}</span>
                </a>
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
            © {new Date().getFullYear()} UniqSwek Beauty Studios · Founded by Swekchha Luitel. All rights reserved.
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
