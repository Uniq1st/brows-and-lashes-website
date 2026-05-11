"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Aleesha Maskey",
    service: "Eyebrow Threading",
    text: "I'm very picky with my brows, glad that I chose this place. Swek has done a fabulous job. Great customer experience, neat and tidy place. Highly recommended!",
    rating: 5
  },
  {
    name: "Manon Hallay",
    service: "Eyebrow Threading & Tinting",
    text: "Incredible place! Clean, fast and with some of the nicest staff members I've had. Went there for eyebrow threading and tinting and my brows were the best I've had! I will be back!",
    rating: 5
  },
  {
    name: "Emmanuelle Yeremou",
    service: "Eyebrow Threading",
    text: "This place is absolutely wonderful. Satisfactory and top tier service, and customer service. Swek was so friendly and nice. She did an amazing job and I will definitely be back.",
    rating: 5
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

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Client Love
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            What our clients
            <span className="block italic">are saying</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="text-center py-12 px-6 md:px-16">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-10 text-pretty">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </blockquote>

            {/* Author */}
            <div>
              <p className="text-lg font-medium">{testimonials[currentIndex].name}</p>
              <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-1">
                {testimonials[currentIndex].service}
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
      </div>
    </section>
  )
}
