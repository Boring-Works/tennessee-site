import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rocky Mount Almanac | Weather for Tennessee',
  description: 'Ad-free weather utility with workability scores for planting, livestock, construction, and property maintenance. Weather for all of Tennessee—from where Tennessee began.',
  keywords: ['weather', 'Tennessee', 'Sullivan County', 'almanac', 'farming', 'gardening', 'Tri-Cities', 'Rocky Mount'],
  authors: [{ name: 'Rocky Mount State Historic Site' }],
  openGraph: {
    title: 'Rocky Mount Almanac',
    description: 'Ad-free weather utility with frontier personality. Task scores tell you what to DO, not just what the weather is.',
    type: 'website',
    siteName: 'Rocky Mount Almanac',
    locale: 'en_US',
    images: [
      {
        url: '/og-almanac.png',
        width: 1200,
        height: 630,
        alt: 'Rocky Mount Almanac - Weather for Tennessee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocky Mount Almanac',
    description: 'Ad-free weather with frontier personality. From where Tennessee began.',
    images: ['/og-almanac.png'],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Almanac',
  },
}

export default function AlmanacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
