"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone, ArrowRight } from "lucide-react"

export function BookingSection() {
  return (
    <section id="book" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-4">
              Book Your Visit
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Begin your beauty
              <span className="block italic">transformation</span>
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light leading-relaxed mb-12">
              Ready to enhance your natural beauty? Book your appointment online or give us a call. 
              We look forward to welcoming you to our Upper East Side studio.
            </p>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70">
                    1240 Lexington Avenue, New York, NY 10028
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <a 
                    href="tel:+19173882434"
                    className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    +1 (917) 388-2434
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Hours</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70">
                    Open 7 days a week
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking CTA */}
          <div className="bg-card text-card-foreground p-10 md:p-14 rounded-sm text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Schedule Your Appointment
            </h3>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mb-8 max-w-md mx-auto">
              Book online in just a few clicks. Choose your service, pick a time that works for you, and we&apos;ll take care of the rest.
            </p>
            <Button
              asChild
              size="lg"
              className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase px-10 py-6"
            >
              <a 
                href="https://simplebrows.trafft.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-6">
              Or call us at{" "}
              <a 
                href="tel:+19173882434"
                className="text-primary hover:underline"
              >
                +1 (917) 388-2434
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
