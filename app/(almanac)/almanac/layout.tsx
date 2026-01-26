import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 1775 Almanac | Sullivan County Weather & Wisdom',
  description: 'Weather and agricultural intelligence for Sullivan County, Tennessee. Workability scores, soil temps, frost alerts, moon phases, and native seed tracking — from Tennessee\'s oldest documented farm, est. 1775.',
  keywords: [
    'weather',
    'Sullivan County',
    'Tennessee',
    'almanac',
    '1775',
    'Rocky Mount',
    'farming',
    'gardening',
    'planting calendar',
    'frost dates',
    'soil temperature',
    'native plants',
    'seed starting',
  ],
  authors: [{ name: 'Rocky Mount State Historic Site' }],
  openGraph: {
    title: 'The 1775 Almanac',
    description: 'Sullivan County weather & wisdom from Tennessee\'s oldest documented farm. Free workability scores, soil temps, and planting guidance.',
    type: 'website',
    siteName: 'The 1775 Almanac',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The 1775 Almanac - Sullivan County Weather & Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 1775 Almanac',
    description: 'Sullivan County weather from Tennessee\'s oldest farm. Est. 1775.',
    images: ['/og-image.svg'],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': '1775 Almanac',
  },
}

export default function AlmanacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
