"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
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

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#locations", label: "Locations" },
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
          UniqSwek
          <span className="block text-sm font-light tracking-[0.3em] text-muted-foreground">Beauty Studios</span>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase">
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
                    href={store.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-start gap-0.5 py-3 cursor-pointer"
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

              <div className="border-t border-border pt-6 space-y-3">
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-muted-foreground">
                  Book a Studio
                </p>
                {STORES.map((store) => (
                  <a
                    key={store.id}
                    href={store.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
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
    </header>
  )
}
