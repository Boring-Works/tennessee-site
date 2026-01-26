import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rocky Mount Almanac',
    short_name: 'Almanac',
    description: 'Ad-free weather utility for Tennessee—from where Tennessee began.',
    start_url: '/almanac',
    display: 'standalone',
    background_color: '#0A1128',
    theme_color: '#0A1128',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
