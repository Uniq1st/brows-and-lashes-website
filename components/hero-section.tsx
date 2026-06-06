"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.4em] uppercase text-muted-foreground mb-6 animate-fade-up">
          Upper East Side Manhattan · Ridgewood Queens
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8 animate-fade-up text-balance" style={{ animationDelay: "0.1s" }}>
          Beauty with
          <span className="block italic">the Thread</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl font-[family-name:var(--font-montserrat)] font-light text-muted-foreground mb-10 animate-fade-up text-pretty" style={{ animationDelay: "0.2s" }}>
          NYC&apos;s top-rated eyebrow threading, lash extensions, waxing &amp; facials.
          Licensed cosmetologists. 200+ five-star reviews. Walk-ins welcome.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button asChild size="lg" className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase px-8 py-6">
            <Link href="#locations">
              Choose Your Studio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase px-8 py-6 bg-transparent hover:bg-foreground hover:text-background">
            <Link href="#services">
              Explore Services
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
