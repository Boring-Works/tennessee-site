import type { Metadata } from 'next'
import Link from 'next/link'
import eventsData from '@/data/events.json'
import siteInfo from '@/data/siteInfo.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Programs | Rocky Mount State Historic Site',
  description:
    'Hands-on workshops, exclusive tours, and educational programs at Rocky Mount. Blacksmithing, hearth cooking, twilight tours, and more.',
  openGraph: {
    title: 'Programs & Workshops | Tennessee Starts Here',
    description:
      'Experience history hands-on with blacksmithing workshops, hearth cooking classes, twilight tours, and exclusive behind-the-scenes experiences.',
    url: 'https://tennesseestartshere.com/programs',
  },
}

// Program icons (simple SVG components)
const icons: Record<string, React.ReactNode> = {
  anvil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 16h16M6 12h12l2 4H4l2-4zM8 8h8l1 4H7l1-4zM10 4h4l1 4H9l1-4z" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2c0 4-4 6-4 10a4 4 0 108 0c0-4-4-6-4-10z" />
      <path d="M12 12c0 2-1.5 3-1.5 5a1.5 1.5 0 103 0c0-2-1.5-3-1.5-5z" />
    </svg>
  ),
  sunset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17h18M5 13l2 2M19 13l-2 2M12 3v4M7 8l1.5 1.5M17 8l-1.5 1.5" />
      <path d="M6 17a6 6 0 0112 0" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
}

// Section divider component
const SectionDivider = ({ variant = 'default' }: { variant?: 'default' | 'light' | 'dark' }) => (
  <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
    <span className="section-divider-line" />
    <span className="section-divider-flourish">❧</span>
    <span className="section-divider-ornament">✦</span>
    <span className="section-divider-flourish section-divider-flourish--flip">❧</span>
    <span className="section-divider-line" />
  </div>
)

// Format dates for display
function formatNextDate(dates: string[] | undefined): string {
  if (!dates || dates.length === 0) return 'By appointment'

  const today = new Date()
  const upcoming = dates
    .map((d) => new Date(d))
    .filter((d) => d >= today)
    .sort((a, b) => a.getTime() - b.getTime())

  if (upcoming.length === 0) return 'Check back for 2027 dates'

  const next = upcoming[0]
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function countUpcomingDates(dates: string[] | undefined): number {
  if (!dates) return 0
  const today = new Date()
  return dates.filter((d) => new Date(d) >= today).length
}

export default function ProgramsPage() {
  const { recurringPrograms } = eventsData
  const { contact } = siteInfo

  // Convert object to array for mapping
  const programs = Object.values(recurringPrograms)

  return (
    <>
      {/* ============================================
          HERO
          ============================================ */}
      <section className={styles['programs-hero']} aria-labelledby="programs-heading">
        <div className={styles['programs-hero-grain']} aria-hidden="true" />

        <div className={styles['programs-hero-content']}>
          <p className={styles['programs-hero-eyebrow']}>Beyond the Tour</p>
          <h1 id="programs-heading" className={styles['programs-hero-headline']}>
            Experience History
            <br />
            <span className={styles['programs-hero-headline-accent']}>Hands-On</span>
          </h1>
          <p className={styles['programs-hero-intro']}>
            Workshops, exclusive tours, and educational programs that go deeper than a regular
            visit. Learn frontier skills, handle real artifacts, and create lasting memories.
          </p>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          PROGRAMS GRID
          ============================================ */}
      <section className={styles['programs-grid-section']} aria-labelledby="offerings-heading">
        <div className={styles['programs-grid-inner']}>
          <header className={styles['programs-grid-header']}>
            <h2 id="offerings-heading" className={styles['programs-grid-title']}>
              Our Programs
            </h2>
            <p className={styles['programs-grid-subtitle']}>
              From hands-on workshops to exclusive tours, find your way to experience Rocky Mount.
            </p>
          </header>

          <div className={styles['programs-grid']}>
            {programs.map((program) => {
              const dates = 'dates' in program ? program.dates : undefined
              const upcomingCount = countUpcomingDates(dates)
              const nextDate = formatNextDate(dates)

              return (
                <article key={program.id} className={styles['program-card']}>
                  {/* Icon */}
                  <div className={styles['program-card-icon']} aria-hidden="true">
                    {icons[program.icon] || icons.key}
                  </div>

                  {/* Content */}
                  <div className={styles['program-card-content']}>
                    <div className={styles['program-card-header']}>
                      <h3 className={styles['program-card-title']}>{program.title}</h3>
                      <span className={styles['program-card-tagline']}>{program.tagline}</span>
                    </div>

                    <p className={styles['program-card-description']}>{program.description}</p>

                    {/* Highlights */}
                    <ul className={styles['program-card-highlights']}>
                      {program.highlights?.slice(0, 3).map((highlight) => (
                        <li key={highlight}>
                          <span className={styles['program-card-check']}>✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Schedule info */}
                    <div className={styles['program-card-schedule']}>
                      <div className={styles['program-card-schedule-item']}>
                        <span className={styles['program-card-schedule-label']}>Schedule</span>
                        <span className={styles['program-card-schedule-value']}>
                          {program.schedule}
                        </span>
                      </div>
                      <div className={styles['program-card-schedule-item']}>
                        <span className={styles['program-card-schedule-label']}>Duration</span>
                        <span className={styles['program-card-schedule-value']}>
                          {program.duration}
                        </span>
                      </div>
                      <div className={styles['program-card-schedule-item']}>
                        <span className={styles['program-card-schedule-label']}>Next Date</span>
                        <span className={styles['program-card-schedule-value']}>{nextDate}</span>
                      </div>
                      {'capacity' in program && program.capacity && (
                        <div className={styles['program-card-schedule-item']}>
                          <span className={styles['program-card-schedule-label']}>Capacity</span>
                          <span className={styles['program-card-schedule-value']}>
                            {program.capacity} guests
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upcoming dates badge */}
                    {upcomingCount > 0 && (
                      <p className={styles['program-card-dates-remaining']}>
                        {upcomingCount} date{upcomingCount !== 1 ? 's' : ''} remaining in 2026
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className={styles['program-card-cta']}>
                    {program.ticketUrl ? (
                      <a
                        href={program.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles['program-card-btn']} btn-small`}
                      >
                        Reserve Your Spot
                      </a>
                    ) : (
                      <a
                        href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                        className={`${styles['program-card-btn']} ${styles['program-card-btn--secondary']} btn-small`}
                      >
                        Call to Register
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          GROUP & PRIVATE BOOKINGS
          ============================================ */}
      <section className={styles['programs-groups']} aria-labelledby="groups-heading">
        <div className={styles['programs-groups-inner']}>
          <div className={styles['programs-groups-content']}>
            <h2 id="groups-heading" className={styles['programs-groups-headline']}>
              Private & Group Experiences
            </h2>
            <p className={styles['programs-groups-desc']}>
              Planning a team building event, birthday party, or private workshop? We offer
              customized experiences for groups of all sizes.
            </p>
            <ul className={styles['programs-groups-list']}>
              <li>Private blacksmithing sessions</li>
              <li>Group hearth cooking experiences</li>
              <li>After-hours exclusive tours</li>
              <li>Corporate team building</li>
            </ul>
          </div>

          <div className={styles['programs-groups-actions']}>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className={`${styles['programs-groups-btn']} ${styles['programs-groups-btn--primary']} btn-medium`}
            >
              Call {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}?subject=Private%20Group%20Experience%20Inquiry`}
              className={`${styles['programs-groups-btn']} ${styles['programs-groups-btn--secondary']} btn-medium`}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          FIELD TRIPS CTA
          ============================================ */}
      <section className={styles['programs-education']} aria-labelledby="education-heading">
        <div className={styles['programs-education-inner']}>
          <div className={styles['programs-education-icon']} aria-hidden="true">
            {icons.book}
          </div>
          <h2 id="education-heading" className={styles['programs-education-headline']}>
            Planning a Field Trip?
          </h2>
          <p className={styles['programs-education-desc']}>
            School groups receive special rates and curriculum-aligned programming. Our education
            team works with you to create the perfect experience.
          </p>
          <Link href="/educators" className={`${styles['programs-education-btn']} btn-medium`}>
            Educator Information
          </Link>
        </div>
      </section>
    </>
  )
}
