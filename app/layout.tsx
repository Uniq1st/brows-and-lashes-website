import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
  title: 'Brows & Lashes by UniqSwek | NYC Beauty Studio – Upper East Side',
  description: 'Premier brow and lash studio on the Upper East Side, New York City. Expert eyebrow threading, lash extensions, waxing, facials & henna. Book online at uniqswek.com.',
  keywords: 'brows, lashes, beauty salon, NYC, eyebrow threading, lash extensions, waxing, facials, henna tattoo, Upper East Side, New York beauty, uniqswek',
  metadataBase: new URL('https://uniqswek.com'),
  openGraph: {
    title: 'Brows & Lashes by UniqSwek | NYC Beauty Studio',
    description: 'Expert threading, lash extensions, waxing & facials in the Upper East Side, NYC. Book your appointment today.',
    url: 'https://uniqswek.com',
    siteName: 'Brows & Lashes by UniqSwek',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${cormorant.variable} ${montserrat.variable} font-serif antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
