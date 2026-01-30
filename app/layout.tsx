import type { Metadata } from 'next'
import {
  Playfair_Display,
  Cormorant_Garamond,
  Great_Vibes,
  Cinzel,
  EB_Garamond,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { DEFAULT_METADATA } from '@/lib/copy'
import { SkipLinks } from '@/components/SkipLinks'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'], // Reduced from 6 weights to 2 (50% reduction)
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '700'], // Reduced from 5 weights to 2
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
  weight: ['400'],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '700'], // Reduced from 3 weights to 2
})

export const metadata: Metadata = {
  title: {
    default: DEFAULT_METADATA.title,
    template: DEFAULT_METADATA.titleTemplate,
  },
  description: DEFAULT_METADATA.description,
  metadataBase: new URL(DEFAULT_METADATA.url),
  openGraph: {
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    url: DEFAULT_METADATA.url,
    siteName: DEFAULT_METADATA.siteName,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: DEFAULT_METADATA.locale,
    type: DEFAULT_METADATA.type,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${cinzel.variable} ${ebGaramond.variable} antialiased`}
    >
      <head>
        {/* DNS prefetch for FareHarbor booking modal - reduces connection latency */}
        <link rel="dns-prefetch" href="https://fareharbor.com" />
        <link rel="preconnect" href="https://fareharbor.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SkipLinks />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
