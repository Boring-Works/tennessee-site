/**
 * Rocky Mount SEO & Metadata Content
 * Master Source of Truth v4.0
 */

/**
 * Default site metadata
 */
export const DEFAULT_METADATA = {
  title: 'Tennessee Starts Here | Rocky Mount State Historic Site',
  titleTemplate: '%s | Tennessee Starts Here',
  description:
    "Where Tennessee's government began. Stand where Governor Blount governed and Andrew Jackson lodged. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
  siteName: 'Tennessee Starts Here',
  url: 'https://tennesseestartshere.com',
  locale: 'en_US',
  type: 'website',
} as const

/**
 * Page-specific metadata
 */
export const PAGE_METADATA = {
  home: {
    title: 'Tennessee Starts Here | Rocky Mount State Historic Site',
    description:
      "Where Tennessee's government began. Stand where Governor Blount governed and Andrew Jackson lodged at Rocky Mount State Historic Site.",
    ogTitle: 'Tennessee Starts Here | Rocky Mount State Historic Site',
    ogDescription: "Where Tennessee's government began. Stand where they stood.",
  },
  visit: {
    title: 'Plan Your Visit',
    description:
      "Visit Rocky Mount State Historic Site—where Tennessee's government began. Stand where Governor Blount governed and Andrew Jackson lodged. Living history tours daily.",
    ogTitle: 'Plan Your Visit | Tennessee Starts Here',
    ogDescription:
      "Stand where Tennessee's government began. Living history tours at Rocky Mount State Historic Site.",
  },
  events: {
    title: 'Events',
    description:
      "Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site. Stand where Tennessee's government began.",
    ogTitle: 'Events | Tennessee Starts Here',
    ogDescription: 'America 250 and Tennessee 230 events at Rocky Mount State Historic Site.',
  },
  welcome: {
    title: 'Rocky Mount State Historic Site',
    description:
      'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Before there was a Tennessee, there was this ground. Celebrating America 250 and Tennessee 230 in 2026.',
    ogTitle: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    ogDescription: 'Before there was a Tennessee, there was this ground. Stand where they stood.',
  },
  first250: {
    title: 'Join the First 250',
    description:
      'Join the First 250 and be part of history. Your name will be read aloud on the capital grounds, July 4, 2026.',
    ogTitle: 'Join the First 250 | Tennessee Starts Here',
    ogDescription:
      'Be part of history. Your name will be read aloud on the capital grounds, July 4, 2026.',
  },
  evidence: {
    title: 'The Evidence Room',
    description:
      "Primary source documents from Rocky Mount's history. Verified quotes from Founders Online, Tennessee Encyclopedia, and the National Archives.",
    ogTitle: 'The Evidence Room | Tennessee Starts Here',
    ogDescription:
      "Primary source documents proving Rocky Mount was where Tennessee's government began.",
  },
} as const

/**
 * Social media content
 */
export const SOCIAL_CONTENT = {
  twitter: {
    card: 'summary_large_image',
    site: '@RockyMountTN',
    creator: '@RockyMountTN',
  },
  facebook: {
    appId: '', // Add if needed
  },
} as const

/**
 * Structured data snippets
 */
export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Museum',
    name: 'Rocky Mount State Historic Site',
    alternateName: 'Tennessee Starts Here',
    description: "Where Tennessee's government began.",
    url: 'https://tennesseestartshere.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 Hyder Hill Road',
      addressLocality: 'Piney Flats',
      addressRegion: 'TN',
      postalCode: '37686',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.433,
      longitude: -82.3,
    },
    foundingDate: '1770',
  },
} as const
