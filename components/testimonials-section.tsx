"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Eliza Resutova",
    service: "Eyebrow Threading",
    text: "The best place to go for your eyebrows! Angel is amazing and so kind every single time. I always leave feeling so much more confident and put together. Highly recommend!!!",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Trina Herrera Whalen",
    service: "Brows & Lashes",
    text: "Love this place. Clean, nice, high quality of service.",
    rating: 5,
    date: "4 days ago"
  },
  {
    name: "PK",
    service: "Eyebrow Threading",
    text: "Stopped by for some eye brow threading after months of not being able to trust anyone after some bad experiences elsewhere. Angel was so gentle, and fast.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Lauren Young",
    service: "Regular Client",
    text: "Every time I come in the shop, I'm always met with kindness and generosity. These girls have great customer service and I'm always able to leave in a timely manner. Angel and Swek are the best! Elite Employees!",
    rating: 5,
    date: "10 weeks ago"
  },
  {
    name: "Liz Lavender",
    service: "Threading & Tinting",
    text: "One of the best brow experiences I've had on the UES! Had my brows threaded and dyed for only $33. Can't recommend this place enough!",
    rating: 5,
    date: "13 weeks ago"
  },
  {
    name: "Shannon Brien",
    service: "First-Time Threading",
    text: "Swek was so sweet and helpful today! I was very nervous as a first timer, but she made me feel assured and I left with super clean brows and I'm so glad I went! I'll definitely continue to go here.",
    rating: 5,
    date: "7 weeks ago"
  },
  {
    name: "Grecia Lobato",
    service: "Lash Extensions",
    text: "Clean beautiful aesthetic, and Sulona was so patient and invested in understanding and delivering the lash look and style I wanted! I have found my new go-to for lashes and eyebrow services! Ask for Sulona.",
    rating: 5,
    date: "39 weeks ago"
  },
  {
    name: "Lindsey Kelley",
    service: "Eyebrow Threading",
    text: "Looking for a convenient stop between my subway and The Met, and this place was great! Good prices, quick, and my brows went from unkempt to shapely in minutes.",
    rating: 5,
    date: "6 weeks ago"
  },
  {
    name: "Teresa Russell",
    service: "Threading & Waxing",
    text: "This is a GREAT place for brow shaping/coloring and threading/waxing. So professional, friendly and the prices are great. They will do what you need. Highly recommend them!",
    rating: 5,
    date: "7 weeks ago"
  },
  {
    name: "Dismery Pineiro",
    service: "Threading & Lash Lift",
    text: "Sulona is absolutely amazing and talented, with eight years of experience. She threaded my eyebrows, and I got a lash lift and tint, and the results and experience were 10/10. I highly recommend Sulona.",
    rating: 5,
    date: "43 weeks ago"
  },
  {
    name: "Matty Johns",
    service: "Walk-In",
    text: "I had an ingrown hair and popped in here asking for help and it took 3 seconds for her to fix me and she wouldn't accept money. Awesome place thank you for the help!",
    rating: 5,
    date: "17 weeks ago"
  },
  {
    name: "Retno Hadiatmodjo",
    service: "Seaweed Facial",
    text: "I had the most relaxing seaweed facial with Swek, my most attentive esthetician. My skin felt buttery smooth, and she was so gentle and thorough. Will absolutely be back.",
    rating: 5,
    date: "31 weeks ago"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Client Love
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            What our clients
            <span className="block italic">are saying</span>
          </h2>
        </div>

        {/* Google Rating Summary */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </div>
          <span className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
            5.0 · 60+ reviews on
          </span>
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </span>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-background border border-border rounded-sm py-12 px-6 md:px-16 text-center">
            {/* Google Icon */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-10 text-pretty">
              &ldquo;{current.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div>
              <p className="text-lg font-medium">{current.name}</p>
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-1">
                {current.service}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/60 mt-2">
                {current.date}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-border"
                  }`}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>

        {/* Leave a Review CTA */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/CUN4yeXaRdrwEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:underline underline-offset-4"
          >
            Leave us a Google Review →
          </a>
        </div>
      </div>
    </section>
  )
}
