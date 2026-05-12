import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LocationSelector } from "@/components/location-selector"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TeamSection } from "@/components/team-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BookingSection } from "@/components/booking-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyBookButton } from "@/components/sticky-book-button"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <LocationSelector />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
      <StickyBookButton />
    </main>
  )
}
