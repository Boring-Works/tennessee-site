import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tilecache.rainviewer.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old /evidence/library to new /evidence/documents
      {
        source: '/evidence/library',
        destination: '/evidence/documents',
        permanent: true,
      },
      // Redirect old library document routes to new documents routes
      {
        source: '/evidence/library/treaty-of-holston-1791',
        destination: '/evidence/documents/treaty-holston-1791',
        permanent: true,
      },
      {
        source: '/evidence/library/washington-to-knox-1790',
        destination: '/evidence/documents/washington-to-knox-1790-08',
        permanent: true,
      },
      {
        source: '/evidence/library/washington-proclamation-1791',
        destination: '/evidence/documents/washington-proclamation-1791',
        permanent: true,
      },
      {
        source: '/evidence/library/jefferson-to-blount-1790',
        destination: '/evidence/documents/blount-commission-1790',
        permanent: true,
      },
      {
        source: '/evidence/library/cherokee-treaty-signatories',
        destination: '/evidence/documents/treaty-holston-1791',
        permanent: true,
      },
      // Catch-all redirect for any other library slugs to documents
      {
        source: '/evidence/library/:slug',
        destination: '/evidence/documents/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
