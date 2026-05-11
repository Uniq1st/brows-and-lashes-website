"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Sparkles } from "lucide-react"

const services = [
  "Microblading",
  "Brow Lamination",
  "Brow Tinting",
  "Brow Shaping & Wax",
  "Ombre Powder Brows",
  "Classic Lash Extensions",
  "Volume Lash Extensions",
  "Hybrid Lash Extensions",
  "Lash Lift & Tint",
  "Lash Fill",
  "Consultation"
]

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="book" className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Thank you for your booking request!
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/80 font-light">
            We&apos;ll be in touch within 24 hours to confirm your appointment.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
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
              Ready to enhance your natural beauty? Fill out the form and we&apos;ll get back to you within 24 hours to confirm your appointment.
            </p>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Flexible Scheduling</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70">
                    Tuesday - Sunday, 10am - 7pm
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Easy Rescheduling</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70">
                    24-hour notice for free rescheduling
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-card text-card-foreground p-8 md:p-10 rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Service *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="font-[family-name:var(--font-montserrat)] text-sm">
                    Preferred Time *
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData({ ...formData, time: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-[family-name:var(--font-montserrat)] text-sm">
                  Additional Notes
                </Label>
                <Textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any special requests or information we should know?"
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Appointment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
