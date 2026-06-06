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

        {/* Trust badge */}
        <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-5 py-2.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] uppercase text-foreground/80">
              Ranked <strong className="text-foreground">#2 Beauty Salon</strong> on Google Maps · Upper East Side
            </span>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl font-[family-name:var(--font-montserrat)] font-light text-muted-foreground mb-10 animate-fade-up text-pretty" style={{ animationDelay: "0.2s" }}>
          Expert eyebrow threading, lash extensions, waxing &amp; facials by licensed cosmetologists.
          200+ five-star reviews. Walk-ins always welcome.
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
