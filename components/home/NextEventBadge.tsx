'use client'

import { Calendar } from 'lucide-react'
import Link from 'next/link'
import eventsData from '@/data/events.json'

/**
 * NextEventBadge - Shows the next upcoming event
 *
 * Automatically pulls from events.json and displays the soonest event
 * that hasn't passed yet.
 */
export function NextEventBadge() {
  // Get today's date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find next upcoming event (date >= today)
  const nextEvent = eventsData.events
    .filter((event) => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  if (!nextEvent) {
    return null
  }

  // Format date as "May 22" or "May 22-24" for multi-day
  const formatEventDate = () => {
    const start = new Date(nextEvent.date)
    const month = start.toLocaleDateString('en-US', { month: 'short' })
    const day = start.getDate()

    if (nextEvent.endDate) {
      const end = new Date(nextEvent.endDate)
      const endDay = end.getDate()
      return `${month} ${day}–${endDay}`
    }

    return `${month} ${day}`
  }

  return (
    <Link
      href={`/events/${nextEvent.id}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-sm transition-colors group"
    >
      <Calendar className="w-3.5 h-3.5 text-accent" />
      <span className="text-[11px] uppercase tracking-[0.15em] text-accent font-medium">
        {formatEventDate()}: {nextEvent.title}
      </span>
      <span className="text-accent/60 group-hover:text-accent transition-colors">→</span>
    </Link>
  )
}
