import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const GA_ID = 'G-0WNZS7QG0N'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: 'UniqSwek Beauty Studios | Best Eyebrow Threading & Lashes in NYC',
  description: 'Expert eyebrow threading, lash extensions, and facials by licensed cosmetologists at UniqSwek Beauty Studios. Locations in Upper East Side and Ridgewood.',
  keywords: 'eyebrow threading NYC, lash extensions, facials, waxing, UniqSwek, beauty studio, Upper East Side, Ridgewood Queens, licensed cosmetologist, Swekchha Luitel',
  metadataBase: new URL('https://uniqswek.com'),
  openGraph: {
    title: 'UniqSwek Beauty Studios | Best Eyebrow Threading & Lashes in NYC',
    description: 'Expert eyebrow threading, lash extensions, and facials by licensed cosmetologists at UniqSwek Beauty Studios. Locations in Upper East Side and Ridgewood.',
    url: 'https://uniqswek.com',
    siteName: 'UniqSwek Beauty Studios',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": "https://uniqswek.com/#brows-and-lashes",
      "name": "Brows & Lashes by UniqSwek",
      "url": "https://uniqswek.com",
      "telephone": "+19173882434",
      "priceRange": "$$",
      "image": "https://uniqswek.com/images/hero-bg.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1240 Lexington Avenue",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10028",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7825,
        "longitude": -73.9565
      },
      "openingHours": ["Mo-Sa 10:00-20:00", "Su 10:00-19:00"],
      "sameAs": ["https://www.instagram.com/browsandlashesnyc"],
      "hasMap": "https://maps.google.com/?q=1240+Lexington+Avenue+New+York+NY+10028",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "200",
        "bestRating": "5"
      },
      "founder": {
        "@type": "Person",
        "name": "Swekchha Luitel"
      }
    },
    {
      "@type": "BeautySalon",
      "@id": "https://uniqswek.com/#eyebrow-shape",
      "name": "Eyebrow Shape by UniqSwek",
      "url": "https://uniqswek.com",
      "telephone": "+13478895027",
      "priceRange": "$$",
      "image": "https://uniqswek.com/images/hero-bg.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "59-15 71st Ave",
        "addressLocality": "Ridgewood",
        "addressRegion": "NY",
        "postalCode": "11385",
        "addressCountry": "US"
      },
      "openingHours": ["Mo-Sa 10:00-20:00", "Su 10:00-19:00"],
      "sameAs": ["https://www.instagram.com/eyebrowshapenyc"],
      "hasMap": "https://maps.google.com/?q=59-15+71st+Ave+Ridgewood+NY+11385",
      "founder": {
        "@type": "Person",
        "name": "Swekchha Luitel"
      }
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-serif antialiased`}>
        {children}
        <Analytics />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
      </body>
    </html>
  )
}
