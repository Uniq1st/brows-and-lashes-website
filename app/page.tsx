import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LocationSelector } from "@/components/location-selector"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TeamSection } from "@/components/team-section"
import { BeforeAfterSection } from "@/components/before-after-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { InstagramSection } from "@/components/instagram-section"
import { EmailCaptureSection } from "@/components/email-capture-section"
import { FaqSection } from "@/components/faq-section"
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
      <BeforeAfterSection />
      <GallerySection />
      <TestimonialsSection />
      <InstagramSection />
      <EmailCaptureSection />
      <FaqSection />
      <BookingSection />
      <ContactSection />
      <Footer />
      <StickyBookButton />
    </main>
  )
}
