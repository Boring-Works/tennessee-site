import Link from 'next/link'
import events from '@/data/events.json'
import { getTicketUrl } from '@/lib/data'

interface QuickBookingCardProps {
  /** Optional CSS class */
  className?: string
}

/**
 * QuickBookingCard - Server Component
 *
 * Displays the next upcoming ticketed event with booking CTA.
 * Calculates next event at render time (no client-side logic needed).
 *
 * @example
 * <QuickBookingCard />
 * <QuickBookingCard className="max-w-sm" />
 */
export function QuickBookingCard({ className = '' }: QuickBookingCardProps) {
  // Calculate next event at render time
  const today = new Date().toISOString().split('T')[0]

  const nextEvent = events.events
    .filter((e) => e.requiresTicket && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  if (!nextEvent) {
    return (
      <div
        className={`rounded-lg border-2 border-[--gold-primary] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
      >
        <p className="text-center text-[--text-light]">Check back for upcoming ticketed events.</p>
      </div>
    )
  }

  // Format date
  const eventDate = new Date(nextEvent.date + 'T00:00:00')
  const todayDate = new Date(today + 'T00:00:00')
  const daysUntil = Math.ceil((eventDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24))
  const isThisWeekend = daysUntil > 0 && daysUntil <= 2

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const ticketUrl = getTicketUrl(nextEvent)

  // Extract price from pricing object (prefer child/member pricing if available)
  let displayPrice: string | null = null
  if (nextEvent.pricing) {
    const price = nextEvent.pricing.members || nextEvent.pricing.child || nextEvent.pricing.adult
    if (price) {
      displayPrice = `$${(price / 100).toFixed(2)}`
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border-2 border-[--gold-primary] bg-white shadow-[var(--shadow-md)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,162,39,0.15)] ${className}`}
    >
      {/* Gold accent bar at top */}
      <div className="h-1 bg-gradient-to-r from-[--gold-primary] to-[--gold-hover]" />

      <div className="p-6">
        {/* This Week Badge */}
        {isThisWeekend && (
          <div className="mb-3 inline-block rounded-full bg-[--gold-shimmer] px-3 py-1">
            <span className="text-sm font-semibold text-[--primary]">This Weekend!</span>
          </div>
        )}

        {/* Event Title */}
        <h3 className="mb-2 text-xl font-bold text-[--primary]">{nextEvent.title}</h3>

        {/* Date */}
        <p className="mb-1 text-sm text-[--text-light]">{formattedDate}</p>

        {/* Days Until */}
        {daysUntil > 0 && (
          <p className="mb-4 text-xs text-[--text-light] font-medium">
            In {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
          </p>
        )}

        {/* Price */}
        {displayPrice && (
          <p className="mb-4 text-lg font-bold text-[--gold-primary]">{displayPrice}</p>
        )}

        {/* CTA Button */}
        {ticketUrl && (
          <Link
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-md bg-[--gold-primary] px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-[--gold-hover] hover:shadow-[var(--shadow-gold-lg)] active:scale-95"
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  )
}
