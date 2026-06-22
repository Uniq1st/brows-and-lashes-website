import type { Metadata } from "next"
import { LocationPage } from "@/components/location-page"
import { STORES } from "@/lib/stores"

export const metadata: Metadata = {
  title: "Eyebrow Threading & Lash Extensions Ridgewood Queens | Eyebrow Shape by UniqSwek",
  description:
    "Top-rated eyebrow threading, lash extensions, waxing & facials in Ridgewood, Queens NYC. At 59-15 71st Ave. Licensed cosmetologists, competitive prices, walk-ins welcome.",
  keywords: "eyebrow threading Ridgewood Queens, threading salon Ridgewood NY, lash extensions Queens NYC, beauty salon Ridgewood 11385, threading near me Queens, eyebrow shape Ridgewood, waxing Ridgewood Queens, facials Ridgewood NY, brow shaping Queens, UniqSwek Ridgewood, eyebrow threading Maspeth, threading Glendale Queens",
  alternates: {
    canonical: "https://uniqswek.com/ridgewood",
  },
  openGraph: {
    title: "Eyebrow Threading & Lash Extensions Ridgewood Queens | Eyebrow Shape by UniqSwek",
    description: "Top-rated eyebrow threading, lash extensions, waxing & facials in Ridgewood, Queens. 59-15 71st Ave. Walk-ins welcome.",
    url: "https://uniqswek.com/ridgewood",
    siteName: "UniqSwek Beauty Studios",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Eyebrow Shape by UniqSwek — Ridgewood Queens NYC" }],
  },
}

const ridgewoodTeam = [
  { name: "Swekchha Luitel", displayName: "Swek", role: "Founder & Licensed Cosmetologist", initials: "SL", color: "bg-rose-100 text-rose-700",   ring: "ring-rose-200",   photo: "/images/team/swekchha.JPG" },
  { name: "Sammy",                                 role: "Store Manager & Lash Lift Specialist", initials: "SM", color: "bg-teal-100 text-teal-700",   ring: "ring-teal-200",   photo: null },
  { name: "Angel",                                 role: "Licensed Technician",              initials: "AN", color: "bg-amber-100 text-amber-700",  ring: "ring-amber-200",  photo: "/images/team/angel.jpg" },
  { name: "Mala",                                  role: "Licensed Technician & Wax Specialist", initials: "MA", color: "bg-indigo-100 text-indigo-700", ring: "ring-indigo-200", photo: null },
]

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uniqswek.com" },
    { "@type": "ListItem", "position": 2, "name": "Ridgewood Studio", "item": "https://uniqswek.com/ridgewood" },
  ],
}

export default function RidgewoodPage() {
  const store = STORES[1]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LocationPage
      store={store}
      storeId="eyebrow-shape"
      teamMembers={ridgewoodTeam}
      heroTagline="Bringing UniqSwek's signature precision threading and lash artistry to Ridgewood, Queens."
      neighborhoodDesc="Our Ridgewood studio at 59-15 71st Avenue brings the same standard of expert beauty services to Queens. Founded by Swekchha Luitel with the same vision that made our Manhattan studio a neighborhood favorite — precision, care, and a genuinely welcoming environment. Easy street parking and close to the M train."
    />
    </>
  )
}
