"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Brows & Lashes
          <span className="block text-sm font-light tracking-[0.3em] text-muted-foreground">by UniqSwek</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-[family-name:var(--font-montserrat)] tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="ml-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase">
            <a href="https://simplebrows.trafft.com" target="_blank" rel="noopener noreferrer">Book Now</a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-[family-name:var(--font-montserrat)] tracking-wider text-foreground hover:text-primary transition-colors uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase">
                <a href="https://simplebrows.trafft.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Book Now</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
