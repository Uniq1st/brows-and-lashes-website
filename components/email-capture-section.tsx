"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { trackEmailSignup } from "@/lib/analytics"

export function EmailCaptureSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")

    try {
      // Using Formspree — sign up free at formspree.io and replace YOUR_FORM_ID
      // with your actual form endpoint ID to start receiving emails.
      const res = await fetch("https://formspree.io/f/xbdwbldn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, _subject: "New subscriber — UniqSwek website" }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
        setName("")
        trackEmailSignup()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase font-medium">
            Exclusive Offer
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4">
          Get <span className="italic">10% off</span> your first visit
        </h2>
        <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mb-8 text-sm leading-relaxed">
          Join the UniqSwek community and receive your discount code, plus early access to seasonal promotions and new service announcements.
        </p>

        {status === "success" ? (
          <div className="bg-primary/10 border border-primary/20 rounded-sm px-6 py-5">
            <p className="font-[family-name:var(--font-montserrat)] text-primary font-medium mb-1">You're in! ✨</p>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm font-light">
              Show this to your specialist at checkout: <span className="font-medium text-foreground">WELCOME10</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-border bg-background font-[family-name:var(--font-montserrat)] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border bg-background font-[family-name:var(--font-montserrat)] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Claim My 10% Off"}
              {status !== "loading" && <ArrowRight className="w-4 h-4" />}
            </button>
            {status === "error" && (
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-red-500 text-center">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
            <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/60">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
