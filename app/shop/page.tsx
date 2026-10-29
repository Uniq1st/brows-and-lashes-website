import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ShopSection } from "@/components/shop-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Shop | UniqSwek Beauty Studios",
  description:
    "Shop wax supplies and handpicked Nepali goods from UniqSwek Beauty Studios — ship to your door or pick up at our Upper East Side or Ridgewood studio.",
  alternates: {
    canonical: "https://uniqswek.com/shop",
  },
  openGraph: {
    title: "Shop | UniqSwek Beauty Studios",
    description:
      "Wax supplies and handpicked goods from Nepal — ship to your door or pick up in-studio.",
    url: "https://uniqswek.com/shop",
    siteName: "UniqSwek Beauty Studios",
    locale: "en_US",
    type: "website",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uniqswek.com" },
    { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://uniqswek.com/shop" },
  ],
}

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navigation />
      <main className="pt-20">
        <ShopSection />
      </main>
      <Footer />
    </>
  )
}
