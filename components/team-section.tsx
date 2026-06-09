import Image from "next/image"
import { STORES } from "@/lib/stores"

const team = [
  {
    name: "Swekchha Luitel",
    displayName: "Swek",
    role: "Founder & Licensed Cosmetologist",
    initials: "SL",
    color: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200",
    photo: "/images/team/swekchha.JPG",
    bio: "With over 8 years of experience in precision threading and lash artistry, Swekchha founded UniqSwek to bring a higher standard of personalized beauty to NYC. Her vision combines advanced techniques with a relaxing, client-focused environment.",
    store: "Both Studios",
  },
  {
    name: "Sammy",
    role: "Store Manager & Lash Lift Specialist",
    initials: "SM",
    color: "bg-teal-100 text-teal-700",
    ring: "ring-teal-200",
    photo: null,
    bio: "Sammy is our go-to specialist for lash lifting — her precision and care leave clients with beautifully lifted lashes every time. As Store Manager, she also ensures every visit runs smoothly and every guest feels at home.",
    store: "Upper East Side",
  },
  {
    name: "Angel",
    role: "Licensed Technician",
    initials: "AN",
    color: "bg-amber-100 text-amber-700",
    ring: "ring-amber-200",
    photo: null,
    bio: "Our resident sweetheart — Angel's kind, soft-spoken nature puts every client instantly at ease. She's skilled in threading, waxing, and tinting, and her gentle touch paired with a sharp eye for detail means you always leave looking and feeling your best.",
    store: "Upper East Side",
  },
  {
    name: "Mala",
    role: "Licensed Technician & Wax Specialist",
    initials: "MA",
    color: "bg-indigo-100 text-indigo-700",
    ring: "ring-indigo-200",
    photo: null,
    bio: "Mala is our waxing expert — clients trust her for smooth, precise results every single time. Her steady hands and deep knowledge of skin make her one of the most requested technicians at our Upper East Side studio.",
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
      </div>
    </section>
  )
}
