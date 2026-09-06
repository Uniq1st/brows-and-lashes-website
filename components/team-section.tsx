import Image from "next/image"
import { Scissors, Sparkles, Star, Eye, Mail, Phone } from "lucide-react"
import { STORES } from "@/lib/stores"

const team = [
  {
    name: "Swekchha Luitel",
    displayName: "Swek",
    role: "Founder & Licensed Cosmetologist",
    initials: "SL",
    color: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200",
    photo: "/images/team/swekchha.jpg",
    bio: "Swekchha founded UniqSwek with a clear vision: every client deserves a consistently exceptional experience. She personally trains each technician in the Brows & Lashes way — precision threading, waxing, facials, and eyelash extensions — ensuring the same high standard of service, every visit, every time.",
    bioNote: "Want to book with Swek? She takes clients by appointment only for eyebrow threading, tinting, and facials — call us to schedule your visit.",
    store: "Both Studios",
  },
  {
    name: "Babita Sharma",
    displayName: "Babita",
    role: "Senior Licensed Technician",
    initials: "BS",
    color: "bg-pink-100 text-pink-700",
    ring: "ring-pink-200",
    photo: "/images/team/babita.jpg",
    bio: "Babita is one of our most senior and talented technicians — her technique across threading, waxing, facials, and lash extensions is simply exceptional. Clients who experience her work keep coming back, and it's easy to see why. She brings both precision and warmth to every appointment.",
    store: "Upper East Side",
  },
  {
    name: "Sammy",
    role: "Store Manager & Lash Lift Specialist",
    initials: "SM",
    color: "bg-teal-100 text-teal-700",
    ring: "ring-teal-200",
    photo: "/images/team/sammy.jpg",
    bio: "Sammy is our go-to specialist for lash lifting — her precision and care leave clients with beautifully lifted lashes every time. As Store Manager, she also ensures every visit runs smoothly and every guest feels at home.",
    store: "Upper East Side",
  },
  {
    name: "Mala",
    role: "Licensed Technician & Wax Specialist",
    initials: "MA",
    color: "bg-indigo-100 text-indigo-700",
    ring: "ring-indigo-200",
    photo: "/images/team/mala.jpg",
    bio: "Mala is our waxing expert — clients trust her for smooth, precise results every single time. Her steady hands and deep knowledge of skin make her one of the most requested technicians at our Upper East Side studio.",
    store: "Upper East Side",
  },
  {
    name: "Gita",
    role: "Licensed Technician",
    initials: "GI",
    color: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-200",
    photo: null,
    bio: "Gita brings a warm, attentive energy to every service. Her careful, detail-oriented approach ensures clients always leave looking their best.",
    store: "Upper East Side",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            The People Behind the Magic
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Meet our
            <span className="block italic">specialists</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            Every member of our team is licensed, trained, and genuinely passionate about making you feel your best.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="group bg-background border border-border hover:border-primary/40 transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className={`w-24 h-24 rounded-full ring-4 ${member.ring} mb-6 overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0`}
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className={`w-full h-full ${member.color} flex items-center justify-center text-2xl font-semibold tracking-wide`}>
                    {member.initials}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-xl font-medium mb-1">{("displayName" in member && member.displayName) ? member.displayName : member.name}</h3>
              <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase text-primary mb-1">
                {member.role}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/70 mb-4">
                {member.store}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-primary/30 mb-4" />

              {/* Bio */}
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-light leading-relaxed">
                {member.bio}
                {("bioNote" in member && member.bioNote) && (
                  <strong className="block mt-2 font-semibold text-foreground">
                    {member.bioNote}
                  </strong>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Booking nudge */}
        <div className="text-center mt-16">
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light mb-4">
            Ready to experience their expertise firsthand?
          </p>
          <a
            href="#locations"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Choose Your Studio
          </a>
        </div>

        {/* ── We're Hiring ── */}
        <div className="mt-24 border border-primary/20 bg-primary/5 p-10 md:p-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Now Hiring · Upper East Side & Ridgewood
            </p>
            <h3 className="text-3xl md:text-4xl font-light leading-tight mb-4">
              Join our
              <span className="italic"> team</span>
            </h3>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light leading-relaxed mb-10 max-w-xl mx-auto">
              We're looking for two passionate beauty professionals to grow with us. If you take pride in your craft and love making clients feel their best, we want to hear from you.
            </p>

            {/* Skills grid */}
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-10 max-w-xl mx-auto">
              {[
                { Icon: Scissors, label: "Eyebrow Threading", note: "Experience or training required" },
                { Icon: Sparkles,  label: "Waxing",           note: "Waxing license or hands-on experience" },
                { Icon: Star,      label: "Facials",          note: "Skincare knowledge a plus" },
                { Icon: Eye,       label: "Eyelash Extensions", note: "Classic application experience" },
              ].map(({ Icon, label, note }) => (
                <div key={label} className="flex items-start gap-3 bg-background border border-border p-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mb-8">
              Cosmetology license preferred · Part-time & full-time considered · Competitive pay
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:uniqueupreti44@gmail.com?subject=Job Application — UniqSwek Beauty Studios"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Apply via Email
              </a>
              <a
                href={STORES[0].phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-foreground px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call to Inquire
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
