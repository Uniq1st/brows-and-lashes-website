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
