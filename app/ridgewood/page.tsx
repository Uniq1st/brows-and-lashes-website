import type { Metadata } from "next"
import { LocationPage } from "@/components/location-page"
import { STORES } from "@/lib/stores"

export const metadata: Metadata = {
  title: "Eyebrow Shape by UniqSwek | Ridgewood, Queens NYC",
  description:
    "Expert eyebrow threading, lash extensions, waxing & facials in Ridgewood, Queens. Located at 59-15 71st Ave. Licensed cosmetologists, walk-ins welcome.",
  keywords: "eyebrow threading Ridgewood Queens, lash extensions Queens, beauty salon Ridgewood NY 11385, threading near me Queens, UniqSwek Ridgewood, eyebrow shape",
}

const ridgewoodTeam = [
  { name: "Swekchha Luitel", role: "Founder & Cosmetologist", initials: "SL", color: "bg-rose-100 text-rose-700" },
]

export default function RidgewoodPage() {
  const store = STORES[1]
  return (
    <LocationPage
      store={store}
      teamMembers={ridgewoodTeam}
      heroTagline="Bringing UniqSwek's signature precision threading and lash artistry to Ridgewood, Queens."
      neighborhoodDesc="Our Ridgewood studio at 59-15 71st Avenue brings the same standard of expert beauty services to Queens. Founded by Swekchha Luitel with the same vision that made our Manhattan studio a neighborhood favorite — precision, care, and a genuinely welcoming environment. Easy street parking and close to the M train."
    />
  )
}
