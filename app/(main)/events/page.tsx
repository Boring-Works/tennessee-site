import type { Metadata } from 'next'
import Link from 'next/link'
import eventsData from '@/data/events.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '2026 Events Calendar',
  description:
    "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
  openGraph: {
    title: '2026 Events Calendar | Tennessee Starts Here',
    description:
      "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
    url: 'https://tennesseestartshere.com/events',
  },
}

// Month character lines - the personality of each month
const monthCharacters: Record<string, string> = {
  'March 2026': 'The journey begins',
  'April 2026': 'Stories come alive',
  'May 2026': 'The frontier awakens',
  'June 2026': 'Tennessee celebrates 230',
  'July 2026': 'America turns 250',
  'August 2026': 'Honoring all who shaped this land',
  'September 2026': 'Descendants gather',
  'October 2026': 'Harvest and haunting',
  'November 2026': 'Traditions begin',
  'December 2026': 'The year closes by candlelight',
}

// All months in order for the progress bar
const allMonths = [
  'March 2026',
  'April 2026',
  'May 2026',
  'June 2026',
  'July 2026',
  'August 2026',
  'September 2026',
  'October 2026',
  'November 2026',
  'December 2026',
]

function groupEventsByMonth(
  events: typeof eventsData.events
): Record<string, typeof eventsData.events> {
  const grouped: Record<string, typeof eventsData.events> = {}

  for (const event of events) {
    const date = new Date(event.date + 'T12:00:00')
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }
    grouped[monthKey].push(event)
  }

  return grouped
}

function getEventDuration(event: (typeof eventsData.events)[0]): number {
  if (!event.endDate) return 1
  const start = new Date(event.date + 'T12:00:00')
  const end = new Date(event.endDate + 'T12:00:00')
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatDateRange(start: string, end?: string | null): string {
  if (!end) return formatDate(start)

  const startDate = new Date(start + 'T12:00:00')
  const endDate = new Date(end + 'T12:00:00')

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}–${endDate.getDate()}`
  }

  return `${formatDate(start)} – ${formatDate(end)}`
}

// Get next 3 upcoming events
function getUpcomingEvents(count: number = 3) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming: { event: (typeof eventsData.events)[0]; daysAway: number }[] = []

  for (const event of eventsData.events) {
    const eventDate = new Date(event.date + 'T12:00:00')
    if (eventDate >= today) {
      const diffTime = eventDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      upcoming.push({ event, daysAway: diffDays })
      if (upcoming.length >= count) break
    }
  }

  return upcoming
}

// Format price for display
function formatPrice(event: (typeof eventsData.events)[0]): string {
  if (!event.requiresTicket) return 'Free'
  if (event.ticketUrl) return 'Ticketed'
  return 'Ticketed'
}

export default function EventsPage() {
  const groupedEvents = groupEventsByMonth(eventsData.events)
  const upcomingEvents = getUpcomingEvents(3)

  return (
    <>
      {/* ============================================
          PAGE HEADER - The Commemorative Year
          ============================================ */}
      <section className={styles['calendar-header']} aria-labelledby="calendar-page-heading">
        <div className={styles['calendar-header-content']}>
          {/* Eyebrow */}
          <p className={styles['calendar-eyebrow']}>Rocky Mount State Historic Site</p>

          {/* Main headline */}
          <h1 id="calendar-page-heading" className={styles['calendar-headline']}>
            <span className={styles['calendar-headline-year']}>2026</span>
            <span className={styles['calendar-headline-text']}>The Commemorative Year</span>
          </h1>

          {/* Subheadline - Brand-approved tagline */}
          <p className={styles['calendar-subheadline']}>
            The nation turns 250. Tennessee turns 230.
            <br />
            <span className={styles['calendar-subheadline-tagline']}>
              This is where that story started.
            </span>
          </p>

          {/* Decorative divider */}
          <div className={styles['calendar-divider']} aria-hidden="true" />

          {/* Coming Up - Featured Strip with 3 events */}
          {upcomingEvents.length > 0 && (
            <div className={styles['coming-up']}>
              <h2 className={styles['coming-up-label']}>Coming Up</h2>
              <div className={styles['coming-up-grid']}>
                {upcomingEvents.map((item, index) => (
                  <a
                    key={item.event.id}
                    href={`#${item.event.id}`}
                    className={`${styles['coming-up-card']} ${index === 0 ? styles['coming-up-card--next'] : ''}`}
                  >
                    {index === 0 && <span className={styles['coming-up-card-badge']}>Next</span>}
                    <span className={styles['coming-up-card-title']}>{item.event.title}</span>
                    <span className={styles['coming-up-card-meta']}>
                      <span className={styles['coming-up-card-date']}>
                        {formatDate(item.event.date)}
                      </span>
                      <span className={styles['coming-up-card-price']}>
                        {formatPrice(item.event)}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Ticket note - clearer language */}
          <p className={styles['calendar-pricing-note']}>
            Most events require advance tickets · Separate from regular site admission
          </p>
        </div>
      </section>

      {/* ============================================
          YEAR PROGRESS BAR - Sticky Navigation
          ============================================ */}
      <nav className={styles['year-progress']} aria-label="Navigate by month">
        <div className={styles['year-progress-inner']}>
          <div className={styles['year-progress-track']}>
            {allMonths.map((month) => {
              const hasEvents = groupedEvents[month] && groupedEvents[month].length > 0
              const monthId = month.toLowerCase().replace(/\s+/g, '-')
              const shortMonth = month.split(' ')[0].slice(0, 3)

              return (
                <a
                  key={month}
                  href={hasEvents ? `#${monthId}` : undefined}
                  className={`${styles['year-progress-month']} ${hasEvents ? styles['year-progress-month--active'] : styles['year-progress-month--empty']}`}
                  aria-label={hasEvents ? `Jump to ${month}` : `No events in ${month}`}
                >
                  <span className={styles['year-progress-month-dot']} aria-hidden="true" />
                  <span className={styles['year-progress-month-label']}>{shortMonth}</span>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ============================================
          THE LIVING CALENDAR - Month by Month
          ============================================ */}
      <section className={styles['living-calendar']} aria-labelledby="living-calendar-heading">
        <h2 id="living-calendar-heading" className="sr-only">
          2026 Events by Month
        </h2>

        {Object.entries(groupedEvents).map(([month, events]) => {
          const monthId = month.toLowerCase().replace(/\s+/g, '-')
          const character = monthCharacters[month] || ''

          return (
            <article
              key={month}
              id={monthId}
              className={styles['calendar-month']}
              aria-labelledby={`${monthId}-heading`}
            >
              {/* Month header */}
              <header className={styles['calendar-month-header']}>
                <div className={styles['calendar-month-title-group']}>
                  <h3 id={`${monthId}-heading`} className={styles['calendar-month-title']}>
                    {month.split(' ')[0]}
                  </h3>
                  <p className={styles['calendar-month-character']}>{character}</p>
                </div>
                <span className={styles['calendar-month-count']}>
                  {events.length} event{events.length !== 1 ? 's' : ''}
                </span>
              </header>

              {/* Events grid */}
              <div className={styles['calendar-month-events']}>
                {events.map((event) => {
                  const duration = getEventDuration(event)
                  const isMultiDay = duration > 1
                  const isLecture = event.category === 'lecture'
                  const isSignature = event.category === 'signature'
                  const isMilestone = event.type === 'milestone'

                  // Determine card size class
                  let sizeClass = styles['calendar-event--standard']
                  if (isMultiDay && duration >= 3) {
                    sizeClass = styles['calendar-event--large']
                  } else if (isMultiDay || isSignature) {
                    sizeClass = styles['calendar-event--medium']
                  }

                  // Determine type class
                  let typeClass = ''
                  if (isSignature) typeClass = styles['calendar-event--signature']
                  else if (isLecture) typeClass = styles['calendar-event--lecture']
                  else if (isMilestone) typeClass = styles['calendar-event--milestone']
                  else if (event.type === 'new') typeClass = styles['calendar-event--new']

                  return (
                    <article
                      key={event.id}
                      id={event.id}
                      className={`${styles['calendar-event']} ${sizeClass} ${typeClass}`}
                    >
                      {/* Date block */}
                      <div className={styles['calendar-event-date']}>
                        <time dateTime={event.date} className={styles['calendar-event-date-inner']}>
                          {isMultiDay ? (
                            <>
                              <span className={styles['calendar-event-date-range']}>
                                {formatDateRange(event.date, event.endDate)}
                              </span>
                              <span className={styles['calendar-event-date-duration']}>
                                {duration} days
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={styles['calendar-event-date-month']}>
                                {new Date(event.date + 'T12:00:00').toLocaleDateString('en-US', {
                                  month: 'short',
                                })}
                              </span>
                              <span className={styles['calendar-event-date-day']}>
                                {new Date(event.date + 'T12:00:00').getDate()}
                              </span>
                            </>
                          )}
                        </time>
                      </div>

                      {/* Content */}
                      <div className={styles['calendar-event-content']}>
                        {/* Badge */}
                        <span
                          className={`${styles['calendar-event-badge']} ${styles[`calendar-event-badge--${event.type}`]}`}
                        >
                          {event.type === 'new' && 'New for 2026'}
                          {event.type === 'enhanced' && 'Enhanced'}
                          {event.type === 'recurring' && 'Annual Tradition'}
                          {event.type === 'milestone' && 'Milestone'}
                        </span>

                        {/* Title */}
                        <h4 className={styles['calendar-event-title']}>{event.title}</h4>

                        {/* Time */}
                        {event.time && (
                          <p className={styles['calendar-event-time']}>{event.time}</p>
                        )}

                        {/* Ticket Status */}
                        {'requiresTicket' in event && !event.requiresTicket && (
                          <p className={styles['calendar-event-price']}>
                            <span className={styles['calendar-event-price-free']}>
                              Free Event — No Ticket Required
                            </span>
                          </p>
                        )}

                        {/* Speaker (for lectures) */}
                        {isLecture && 'speaker' in event && event.speaker && (
                          <p className={styles['calendar-event-speaker']}>
                            <span className={styles['calendar-event-speaker-name']}>
                              {event.speaker}
                            </span>
                            {'speakerTitle' in event && event.speakerTitle && (
                              <span className={styles['calendar-event-speaker-title']}>
                                {event.speakerTitle}
                              </span>
                            )}
                          </p>
                        )}

                        {/* Description */}
                        <p className={styles['calendar-event-desc']}>{event.description}</p>

                        {/* Subtle link for July 4 signature event - softened from hard CTA */}
                        {isSignature && event.id === 'colonial-independence-day' && (
                          <p className={styles['calendar-event-note']}>
                            <Link href="/first-250" className={styles['calendar-event-note-link']}>
                              Learn about the First 250 Registry
                            </Link>
                          </p>
                        )}

                        {/* Event CTA */}
                        <div className={styles['calendar-event-cta']}>
                          {event.category === 'digital' ? (
                            <span className={styles['calendar-event-cta-btn-disabled']}>
                              Online Event
                            </span>
                          ) : event.requiresTicket ? (
                            <a
                              href={event.ticketUrl || `/events/${event.id}`}
                              className={styles['calendar-event-cta-btn']}
                            >
                              Reserve Your Spot <span aria-hidden="true">→</span>
                            </a>
                          ) : (
                            <Link
                              href="/visit"
                              className={styles['calendar-event-cta-btn-secondary']}
                            >
                              Plan Your Visit <span aria-hidden="true">→</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>

      {/* ============================================
          VISIT CTA - See It In Person
          ============================================ */}
      <section className={styles['calendar-cta']} aria-labelledby="calendar-cta-heading">
        <div className={styles['calendar-cta-inner']}>
          <div className={styles['calendar-cta-content']}>
            <p className={styles['calendar-cta-eyebrow']}>Experience History</p>
            <h2 id="calendar-cta-heading" className={styles['calendar-cta-headline']}>
              See Where Tennessee Began
            </h2>
            <p className={styles['calendar-cta-desc']}>
              Walk the same grounds as William Blount and Andrew Jackson. Living history tours
              daily.
            </p>
          </div>

          <div className={styles['calendar-cta-action']}>
            <Link href="/visit" className={styles['calendar-cta-btn']}>
              Plan Your Visit
            </Link>
            <p className={styles['calendar-cta-hours']}>Open Tue–Sat 10am–5pm, Sun 1pm–5pm</p>
            {/* Regular Site Admission */}
            <div className={styles['calendar-cta-admission']}>
              <p className={styles['calendar-cta-admission-label']}>
                Regular Site Admission (Non-Event Days)
              </p>
              <p className={styles['calendar-cta-admission-prices']}>
                Adults $12 · Seniors $10 · Children $8 · Under 6 Free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT - Group Visits
          ============================================ */}
      <section className={styles['calendar-contact']} aria-labelledby="calendar-contact-heading">
        <div className={styles['calendar-contact-inner']}>
          <h2 id="calendar-contact-heading" className={styles['calendar-contact-headline']}>
            Planning a Group Visit?
          </h2>
          <p className={styles['calendar-contact-desc']}>
            Group rates for 10+. School programs and private tours available.
          </p>
          <a href="tel:+14235387396" className={styles['calendar-contact-btn']}>
            (423) 538-7396
          </a>
        </div>
      </section>
    </>
  )
}
