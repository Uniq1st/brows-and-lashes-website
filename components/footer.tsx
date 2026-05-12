import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              Brows & Lashes
              <span className="block text-sm font-light tracking-[0.3em] text-background/70">by UniqSwek</span>
            </Link>
            <p className="font-[family-name:var(--font-montserrat)] text-background/70 font-light mt-4 max-w-sm leading-relaxed">
              NYC&apos;s premier destination for exquisite brow and lash services. Where beauty meets artistry.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/browsandlashesnyc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/browsandlashesnyc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#gallery", label: "Gallery" },
                { href: "#testimonials", label: "Testimonials" },
                { href: "#book", label: "Book Now" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-montserrat)] text-background/70 font-light hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Eyebrow Threading",
                "Lash Extensions",
                "Facials",
                "Full Body Waxing",
                "Henna Tattoos",
              ].map((service) => (
                <li key={service}>
                  <span className="font-[family-name:var(--font-montserrat)] text-background/70 font-light">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[family-name:var(--font-montserrat)] text-sm text-background/50 font-light">
            © {new Date().getFullYear()} Brows and Lashes by UniqSwek. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-[family-name:var(--font-montserrat)] text-sm text-background/50 font-light hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
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
