import type { Metadata } from "next"
import { LocationPage } from "@/components/location-page"
import { STORES } from "@/lib/stores"

export const metadata: Metadata = {
  title: "Brows & Lashes by UniqSwek | Upper East Side, Manhattan NYC",
  description:
    "Expert eyebrow threading, lash extensions, waxing & facials on the Upper East Side. Located at 1240 Lexington Ave. 200+ five-star Google reviews. Walk-ins welcome.",
  keywords: "eyebrow threading Upper East Side, lash extensions Manhattan, waxing NYC, beauty salon 10028, threading near me, UniqSwek Manhattan",
}

const uesTeam = [
  { name: "Swekchha Luitel", role: "Founder & Cosmetologist", initials: "SL", color: "bg-rose-100 text-rose-700" },
  { name: "Khushi",           role: "Licensed Cosmetologist", initials: "KH", color: "bg-violet-100 text-violet-700" },
  { name: "Angel",            role: "Licensed Technician",    initials: "AN", color: "bg-amber-100 text-amber-700" },
  { name: "Smarika",          role: "Store Manager & Tech",   initials: "SM", color: "bg-teal-100 text-teal-700" },
]

export default function ManhattanPage() {
  const store = STORES[0]
  return (
    <LocationPage
      store={store}
      storeId="brows-and-lashes"
      teamMembers={uesTeam}
      heroTagline="Your go-to threading and lash studio on the Upper East Side of Manhattan. Over 200 five-star reviews and counting."
      neighborhoodDesc="Located at 1240 Lexington Avenue in the heart of the Upper East Side, our Manhattan studio has served thousands of New Yorkers since opening. Whether you're a regular threading client or trying lash extensions for the first time, our licensed team ensures you leave looking and feeling your best. Steps from the 4/5/6 subway at 86th Street."
    />
  )
}
