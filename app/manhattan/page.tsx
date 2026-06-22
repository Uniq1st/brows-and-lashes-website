import type { Metadata } from "next"
import { LocationPage } from "@/components/location-page"
import { STORES } from "@/lib/stores"

export const metadata: Metadata = {
  title: "Eyebrow Threading Upper East Side | #2 on Google Maps | Brows & Lashes by UniqSwek",
  description:
    "Ranked #2 beauty salon on Google Maps — Upper East Side Manhattan. Expert eyebrow threading & lash extensions at 1240 Lexington Ave. 200+ five-star reviews. Walk-ins welcome.",
  keywords: "eyebrow threading Upper East Side, threading salon Upper East Side NYC, lash extensions Upper East Side, beauty salon 10028, threading near me Manhattan, eyebrow threading Lexington Avenue, threading 86th street, waxing Upper East Side, facials Upper East Side, brow shaping Manhattan, Brows and Lashes by UniqSwek, best threading salon NYC",
  alternates: {
    canonical: "https://uniqswek.com/manhattan",
  },
  openGraph: {
    title: "Eyebrow Threading & Lash Extensions Upper East Side | Brows & Lashes by UniqSwek",
    description: "Best eyebrow threading & lash extensions on the Upper East Side. 1240 Lexington Ave, near 86th St. 200+ five-star reviews. Walk-ins welcome.",
    url: "https://uniqswek.com/manhattan",
    siteName: "UniqSwek Beauty Studios",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Brows & Lashes by UniqSwek — Upper East Side Manhattan" }],
  },
}

const uesTeam = [
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
    { "@type": "ListItem", "position": 2, "name": "Upper East Side Studio", "item": "https://uniqswek.com/manhattan" },
  ],
}

export default function ManhattanPage() {
  const store = STORES[0]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LocationPage
      store={store}
      storeId="brows-and-lashes"
      teamMembers={uesTeam}
      heroTagline="Ranked #2 beauty salon on Google Maps — Upper East Side Manhattan. Over 200 five-star reviews and counting."
      neighborhoodDesc="Located at 1240 Lexington Avenue in the heart of the Upper East Side, our Manhattan studio has served thousands of New Yorkers since opening. Whether you're a regular threading client or trying lash extensions for the first time, our licensed team ensures you leave looking and feeling your best. Steps from the 4/5/6 subway at 86th Street."
    />
    </>
  )
}
