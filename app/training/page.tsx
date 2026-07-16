import type { Metadata } from "next"
import { GraduationCap, Award, Clock, CheckCircle, Phone, ArrowRight, Scissors, Eye, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { STORES } from "@/lib/stores"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Beauty Training Programs | Brows & Lashes by UniqSwek NYC",
  description:
    "Learn eyebrow threading, waxing, and eyelash extensions from senior cosmetologists in NYC. Starter and advanced hands-on packages with certification available at our Upper East Side studio.",
}

const TRAINING_STORE = STORES[0]

const COURSES = [
  {
    id: "threading",
    name: "Eyebrow Threading",
    tagline: "The art of precise brow shaping",
    Icon: Scissors,
    accentClass: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900",
    iconClass: "text-rose-500",
    bookingUrl:
      "https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services/VRE2QVADLWXKLIEYQFIZPSTC",
    tiers: [
      {
        level: "Starter",
        hours: 4,
        price: 80,
        subtitle: "Cleanup Practice",
        includes: [
          "4 hours of hands-on practice",
          "Threading fundamentals & cleanup technique",
          "1-on-1 time with a senior cosmetologist",
          "Work on your own model",
        ],
        certificate: false,
      },
      {
        level: "Advanced",
        hours: 8,
        price: 150,
        subtitle: "Shaping & Design",
        includes: [
          "8 hours of intensive hands-on training",
          "Full shaping, arch design & cleanup",
          "Mentorship from a senior cosmetologist",
          "Work on your own model",
          "Certificate of completion",
          "Top performers considered for job opportunities",
        ],
        certificate: true,
        popular: true,
      },
    ],
  },
  {
    id: "waxing",
    name: "Waxing",
    tagline: "Face, body & intimate area techniques",
    Icon: Sparkles,
    accentClass: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
    iconClass: "text-amber-500",
    bookingUrl:
      "https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services/RGUK32IHJRPOBV6HU7J5X535",
    tiers: [
      {
        level: "Starter",
        hours: 4,
        price: 100,
        subtitle: "Foundation Package",
        includes: [
          "4 hours of hands-on practice",
          "Core waxing fundamentals & technique",
          "1-on-1 time with a senior cosmetologist",
          "Work on your own model",
        ],
        certificate: false,
      },
      {
        level: "Advanced",
        hours: 8,
        price: 200,
        subtitle: "Full Waxing Specialist",
        includes: [
          "8 hours of intensive hands-on training",
          "Face, underarms & body waxing",
          "Brazilian & intimate area waxing",
          "Mentorship from a senior cosmetologist",
          "Work on your own model",
          "Certificate of completion",
          "Top performers considered for job opportunities",
        ],
        certificate: true,
        popular: true,
      },
    ],
  },
  {
    id: "lashes",
    name: "Eyelash Extensions",
    tagline: "One of the most in-demand beauty skills",
    Icon: Eye,
    accentClass: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-900",
    iconClass: "text-violet-500",
    bookingUrl:
      "https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services/KUDEZGR7TQE7BAOZDC7HQVCB",
    tiers: [
      {
        level: "Starter",
        hours: 4,
        price: 400,
        subtitle: "Foundation Package",
        includes: [
          "4 hours of hands-on practice",
          "Lash fundamentals & application basics",
          "1-on-1 time with a senior cosmetologist",
          "Work on your own model",
        ],
        certificate: false,
      },
      {
        level: "Advanced",
        hours: 8,
        price: 700,
        subtitle: "Full Certification",
        includes: [
          "8 hours of intensive hands-on training",
          "Classic, volume & advanced application",
          "Mentorship from a senior cosmetologist",
          "Work on your own model",
          "Certificate of completion",
          "Top performers considered for job opportunities",
        ],
        certificate: true,
        popular: true,
      },
    ],
  },
]

export default function TrainingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="py-20 md:py-28 bg-card text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase font-medium">
                Professional Beauty Training · Upper East Side, NYC
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Train with the
              <span className="block italic">best in NYC</span>
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-lg max-w-2xl mx-auto mb-8">
              Hands-on, real-world training led by high-end senior cosmetologists. Learn eyebrow threading, waxing, or eyelash extensions — and walk away with skills you can use immediately.
            </p>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
              Available at Brows & Lashes · 1240 Lexington Ave, Upper East Side · Students must bring their own model
            </p>
          </div>
        </section>

        {/* ── Why train with us ── */}
        <section className="py-16 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  Icon: GraduationCap,
                  title: "Senior Cosmetologists",
                  body: "You'll be trained by experienced, high-end professionals — not assistants. Real expertise, passed directly to you.",
                },
                {
                  Icon: Award,
                  title: "Certificate Included",
                  body: "Advanced packages come with an official certificate of completion you can use to build your portfolio and clientele.",
                },
                {
                  Icon: CheckCircle,
                  title: "Job Opportunities",
                  body: "Top performers from our training program are considered for positions at our studios. Your career could start here.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">{title}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Course Sections ── */}
        {COURSES.map((course, courseIndex) => (
          <section
            key={course.id}
            className={`py-20 ${courseIndex % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="max-w-5xl mx-auto px-6">

              {/* Course header */}
              <div className="flex items-center gap-4 mb-12">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${course.accentClass}`}>
                  <course.Icon className={`w-6 h-6 ${course.iconClass}`} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-light">{course.name}</h2>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm mt-0.5">
                    {course.tagline}
                  </p>
                </div>
              </div>

              {/* Tier cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {course.tiers.map((tier) => (
                  <div
                    key={tier.level}
                    className={`relative border p-8 ${
                      tier.popular
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-8">
                        <span className="bg-primary text-primary-foreground font-[family-name:var(--font-montserrat)] text-[10px] tracking-widest uppercase px-3 py-1">
                          Includes Certificate
                        </span>
                      </div>
                    )}

                    {/* Tier name & duration */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                          {tier.level} Package
                        </p>
                        <h3 className="text-2xl font-light">{tier.subtitle}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-[family-name:var(--font-montserrat)] text-xs">{tier.hours} hrs</span>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-4xl font-light mt-4 mb-6">
                      ${tier.price}
                    </p>

                    {/* Includes */}
                    <ul className="space-y-2.5 mb-8">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${tier.popular ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="font-[family-name:var(--font-montserrat)] text-sm font-light text-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Book button */}
                    <a
                      href={course.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase transition-colors ${
                        tier.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-foreground hover:bg-foreground hover:text-background"
                      }`}
                    >
                      Book {tier.level} Package
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── Requirements ── */}
        <section className="py-20 bg-card">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Before You Book
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-10">What to know</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  title: "Bring your own model",
                  body: "All training sessions require you to bring a friend, family member, or client to practice on. They must be present for the full duration.",
                },
                {
                  title: "Studio location",
                  body: "All training takes place at our Brows & Lashes studio — 1240 Lexington Avenue, Upper East Side, Manhattan.",
                },
                {
                  title: "Book in advance",
                  body: "Training slots are limited. Book early through Square to secure your preferred date and time.",
                },
                {
                  title: "Questions?",
                  body: "Call or text us before booking and we'll help you pick the right package for your goals.",
                },
              ].map((item) => (
                <div key={item.title} className="border border-border bg-background p-6">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="max-w-2xl mx-auto px-6">
            <GraduationCap className="w-10 h-10 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-light mb-4">Ready to start your career?</h2>
            <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light mb-10 leading-relaxed">
              Book directly online, or call us — we'll help you choose the right package and answer any questions before you commit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={TRAINING_STORE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
              >
                Browse All Training Slots
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={TRAINING_STORE.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {TRAINING_STORE.phone}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
