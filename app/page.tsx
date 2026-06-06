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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does eyebrow threading hurt?",
      "acceptedAnswer": { "@type": "Answer", "text": "Threading involves a brief sensation that most clients describe as a light snap. It's generally much gentler than waxing and causes minimal irritation. Most clients find it very tolerable, and the discomfort decreases significantly after your first visit." }
    },
    {
      "@type": "Question",
      "name": "How often should I get my eyebrows threaded?",
      "acceptedAnswer": { "@type": "Answer", "text": "We recommend every 3–4 weeks to maintain a clean, defined shape. Hair growth varies by person — some clients come every 2 weeks, others every 5–6 weeks." }
    },
    {
      "@type": "Question",
      "name": "How long do lash extensions last?",
      "acceptedAnswer": { "@type": "Answer", "text": "With proper care, a full set lasts 3–4 weeks before a fill is needed. We recommend a fill every 2–3 weeks to keep your lashes looking full." }
    },
    {
      "@type": "Question",
      "name": "Do I need an appointment, or do you take walk-ins?",
      "acceptedAnswer": { "@type": "Answer", "text": "Both! We welcome walk-ins at all times, though availability can vary especially on weekends. Booking online in advance is the best way to guarantee your preferred time and specialist." }
    },
    {
      "@type": "Question",
      "name": "Are your specialists licensed?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — every specialist at UniqSwek is a licensed cosmetologist or licensed technician in New York State. Our team is led by founder Swekchha Luitel, who has over 8 years of experience." }
    },
    {
      "@type": "Question",
      "name": "Is threading better than waxing?",
      "acceptedAnswer": { "@type": "Answer", "text": "Threading is preferred by many clients because it's chemical-free, extremely precise, and gentler on sensitive skin. It removes hair at the root without pulling at the skin, making it a great option if you use retinol, Accutane, or have reactive skin." }
    },
    {
      "@type": "Question",
      "name": "Do you offer services for men?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Male threading is one of our most popular services. We offer precise eyebrow shaping, beard line cleanup, and full facial threading for men. Walk-ins always welcome." }
    },
  ],
}

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Beauty Services at UniqSwek — Upper East Side NYC",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Eyebrow Threading", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 2, "name": "Lash Extensions", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 3, "name": "Lash Lift & Tint", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 4, "name": "Eyebrow Tinting", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 5, "name": "Full Face Threading", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 6, "name": "Brazilian Wax", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 7, "name": "Classic Facial", "url": "https://uniqswek.com/#services" },
    { "@type": "ListItem", "position": 8, "name": "Male Threading", "url": "https://uniqswek.com/#services" },
  ],
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
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
