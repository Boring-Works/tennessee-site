import siteInfo from '@/data/siteInfo.json'

interface EventInput {
  id: string
  title: string
  date: string
  endDate?: string | null
  time?: string | null
  description: string
  requiresTicket: boolean
  ticketUrl?: string | null
}

function convertTo24Hour(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return '10:00:00'
  const [, hour, minute, period] = match
  let h = parseInt(hour)
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12
  if (period.toUpperCase() === 'AM' && h === 12) h = 0
  return `${h.toString().padStart(2, '0')}:${minute}:00`
}

export function generateEventSchema(event: EventInput) {
  const startDateTime = event.time ? `${event.date}T${convertTo24Hour(event.time)}` : event.date

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: startDateTime,
    endDate: event.endDate || undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: siteInfo.site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteInfo.location.address.street,
        addressLocality: siteInfo.location.address.city,
        addressRegion: 'TN',
        postalCode: siteInfo.location.address.zip,
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Museum',
      name: siteInfo.site.name,
      url: 'https://tennesseestartshere.com',
    },
    offers: event.requiresTicket
      ? {
          '@type': 'Offer',
          url: event.ticketUrl || 'https://fareharbor.com/embeds/book/rockymountmuseum/',
          availability: 'https://schema.org/InStock',
        }
      : {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
  }
}

export function generateEventsListSchema(events: EventInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '2026 Events at Rocky Mount State Historic Site',
    numberOfItems: events.length,
    itemListElement: events.slice(0, 20).map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        startDate: event.date,
        description: event.description.slice(0, 150),
        url: `https://tennesseestartshere.com/events#${event.id}`,
      },
    })),
  }
}
