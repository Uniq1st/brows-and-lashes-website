"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, X, Gift, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { STORES } from "@/lib/stores"
import { getActivePromo } from "@/lib/promotions"
import { trackBooking, trackPhone } from "@/lib/analytics"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === "/"

  // Prefix anchor links with "/" when not on home page
  const href = (anchor: string) => (isHome ? anchor : `/${anchor}`)

  const activePromo = getActivePromo()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Banner */}
      {showBanner && activePromo && (
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-center gap-3 relative">
          <Gift className="w-4 h-4 shrink-0 opacity-80" />
          <p className="font-[family-name:var(--font-montserrat)] text-xs md:text-sm text-center flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="font-medium">{activePromo.message}</span>
            {activePromo.promoCode && (
              <span className="inline-flex items-center px-2 py-0.5 bg-primary-foreground/20 border border-primary-foreground/40 rounded-sm font-mono font-bold tracking-widest text-xs">
                {activePromo.promoCode}
              </span>
            )}
            <Link
              href={activePromo.ctaHref}
              target={activePromo.ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={activePromo.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
            >
              {activePromo.ctaText}
            </Link>
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss offer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Nav Bar */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/images/brandlogo.JPG" alt="UniqSwek Beauty Studios" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={href(link.href)}
                className="text-sm font-[family-name:var(--font-montserrat)] tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}

            {/* Locations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-[family-name:var(--font-montserrat)] tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase flex items-center gap-1">
                Locations <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {STORES.map((store) => (
                  <DropdownMenuItem key={store.id} asChild>
                    <Link href={store.id === "brows-and-lashes" ? "/manhattan" : "/ridgewood"} className="flex flex-col items-start gap-0.5 py-2">
                      <span className="font-medium text-sm">{store.name}</span>
                      <span className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">{store.neighborhood}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Memberships highlight */}
            <Link
              href="/memberships"
              className="text-sm font-[family-name:var(--font-montserrat)] tracking-wider uppercase text-primary font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Sparkles className="w-3 h-3" />
              Memberships
            </Link>

            {/* Bridal highlight */}
            <Link
              href="/bridal"
              className="text-sm font-[family-name:var(--font-montserrat)] tracking-wider uppercase text-primary font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Heart className="w-3 h-3" />
              Bridal
            </Link>

            {/* Book Now dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-2 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase">
                  Book Now
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground py-2">
                  Choose a Location
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {STORES.map((store) => (
                  <DropdownMenuItem key={store.id} asChild>
                    <a
                      href={activePromo?.promoBookingUrls?.[store.id] ?? store.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-start gap-0.5 py-3 cursor-pointer"
                      onClick={() => trackBooking(store.id, "nav")}
                    >
                      <span className="font-medium text-sm">{store.name}</span>
                      <span className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                        {store.neighborhood}
                      </span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background overflow-y-auto">
              <div className="flex flex-col gap-5 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={href(link.href)}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-[family-name:var(--font-montserrat)] tracking-wider text-foreground hover:text-primary transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Location pages */}
                <div className="space-y-2">
                  <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                    Our Studios
                  </p>
                  {STORES.map((store) => (
                    <Link
                      key={store.id}
                      href={store.id === "brows-and-lashes" ? "/manhattan" : "/ridgewood"}
                      onClick={() => setIsOpen(false)}
                      className="block font-[family-name:var(--font-montserrat)] text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {store.fullName}
                    </Link>
                  ))}
                </div>

                {/* Memberships */}
                <Link
                  href="/memberships"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-lg tracking-wider uppercase text-primary font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  Memberships
                </Link>

                {/* Bridal */}
                <Link
                  href="/bridal"
                  onClick={() => setIsOpen(false)}
                  className="font-[family-name:var(--font-montserrat)] text-lg tracking-wider uppercase text-foreground hover:text-primary transition-colors"
                >
                  Bridal & Groups
                </Link>

                {/* Book buttons */}
                <div className="border-t border-border pt-5 space-y-3">
                  <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                    Book a Studio
                  </p>
                  {STORES.map((store) => (
                    <a
                      key={store.id}
                      href={activePromo?.promoBookingUrls?.[store.id] ?? store.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { setIsOpen(false); trackBooking(store.id, "nav-mobile") }}
                      className="flex items-center justify-between font-[family-name:var(--font-montserrat)] text-sm py-3 px-4 bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{store.name}</p>
                        <p className="text-xs text-muted-foreground">{store.neighborhood}</p>
                      </div>
                      <span className="text-primary text-xs uppercase tracking-wider">Book →</span>
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
