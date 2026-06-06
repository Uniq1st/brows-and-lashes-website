import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const GA_ID   = 'G-0WNZS7QG0N'
const GADS_ID = 'AW-18219073341'

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
  title: 'UniqSwek Beauty Studios | #2 Beauty Salon Upper East Side NYC',
  description: 'Ranked #2 beauty salon on Google Maps — Upper East Side NYC. Expert eyebrow threading, lash extensions, waxing & facials. 200+ five-star reviews. Walk-ins welcome.',
  keywords: 'eyebrow threading Upper East Side, threading salon NYC, best threading NYC, lash extensions Upper East Side, beauty salon Upper East Side, threading near me Manhattan, eyebrow threading Lexington Avenue, threading 86th street, eyebrow waxing NYC, facials Upper East Side, lash extensions Manhattan, beauty studio 10028, brows and lashes NYC, UniqSwek, Swekchha Luitel, eyebrow threading Queens, lash extensions Ridgewood, beauty salon Ridgewood NY 11385',
  metadataBase: new URL('https://uniqswek.com'),
  alternates: {
    canonical: 'https://uniqswek.com',
  },
  openGraph: {
    title: 'UniqSwek Beauty Studios | #2 Beauty Salon Upper East Side NYC',
    description: 'Ranked #2 beauty salon on Google Maps — Upper East Side NYC. Expert eyebrow threading, lash extensions, waxing & facials. 200+ five-star reviews. Walk-ins welcome.',
    url: 'https://uniqswek.com',
    siteName: 'UniqSwek Beauty Studios',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'UniqSwek Beauty Studios — Eyebrow Threading & Lash Extensions, Upper East Side NYC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@browsandlashesnyc',
    title: 'UniqSwek Beauty Studios | Best Eyebrow Threading & Lashes in NYC',
    description: 'Top-rated eyebrow threading, lash extensions, waxing & facials on the Upper East Side of Manhattan. 200+ five-star reviews.',
    images: ['/images/hero-bg.jpg'],
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
      "openingHours": ["Mo-Fr 09:00-20:00", "Sa 10:00-20:00", "Su 10:00-19:00"],
      "sameAs": [
        "https://www.instagram.com/browsandlashesnyc",
        "https://maps.google.com/?cid=5062374397789282115"
      ],
      "hasMap": "https://maps.google.com/?q=1240+Lexington+Avenue+New+York+NY+10028",
      "areaServed": [
        { "@type": "City", "name": "New York" },
        { "@type": "Neighborhood", "name": "Upper East Side" },
        { "@type": "Neighborhood", "name": "Carnegie Hill" },
        { "@type": "Neighborhood", "name": "Yorkville" },
        { "@type": "Neighborhood", "name": "Lenox Hill" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": 200,
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
      "sameAs": [
        "https://www.instagram.com/eyebrowshapenyc",
        "https://maps.google.com/?cid=11390073009820246887"
      ],
      "hasMap": "https://maps.google.com/?q=59-15+71st+Ave+Ridgewood+NY+11385",
      "areaServed": [
        { "@type": "City", "name": "Ridgewood" },
        { "@type": "Neighborhood", "name": "Ridgewood Queens" },
        { "@type": "Neighborhood", "name": "Maspeth" },
        { "@type": "Neighborhood", "name": "Glendale" }
      ],
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
        {/* Google Analytics 4 + Google Ads */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            gtag('config', '${GADS_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
