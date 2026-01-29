import type { Metadata } from 'next'
import Link from 'next/link'
import { Claim } from '@/components/evidence/Claim'
import siteInfo from '@/data/siteInfo.json'
import styles from './page.module.css'

// Section divider component for period-authentic transitions
const SectionDivider = ({ variant = 'default' }: { variant?: 'default' | 'light' | 'dark' }) => (
  <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
    <span className="section-divider-line" />
    <span className="section-divider-flourish">❧</span>
    <span className="section-divider-ornament">✦</span>
    <span className="section-divider-flourish section-divider-flourish--flip">❧</span>
    <span className="section-divider-line" />
  </div>
)

export const metadata: Metadata = {
  title: 'For Educators | Tennessee Starts Here',
  description:
    'Field trip programs at Rocky Mount State Historic Site. TN Standards aligned, hands-on learning for all ages.',
  openGraph: {
    title: 'For Educators | Tennessee Starts Here',
    description:
      'Field trip programs at Rocky Mount State Historic Site. TN Standards aligned, hands-on learning for all ages.',
    url: 'https://tennesseestartshere.com/educators',
  },
}

const PROGRAMS = [
  {
    name: 'Living History Tour',
    duration: '~2 hours',
    capacity: 'Any group size',
    description:
      'Guided tour with costumed interpreters, introductory video, and museum gallery access.',
  },
  {
    name: 'Tour & Craft',
    duration: '~3.5 hours',
    capacity: 'Up to 80 students',
    description: 'Tour plus hands-on frontier craft activity.',
  },
  {
    name: 'Living History Sampler',
    duration: '3-4 hours',
    capacity: '80+ students',
    description: 'Multiple demonstration stations for larger groups.',
  },
  {
    name: 'Preschool Program',
    duration: '~1.5 hours',
    capacity: 'Ages 3-5',
    description: 'Stories, games, and sheep interaction.',
  },
  {
    name: 'Kindergarten Program',
    duration: '~1.5 hours',
    capacity: 'Kindergarten',
    description: 'Scavenger hunt, wool processing demo.',
  },
  {
    name: 'Virtual Programs',
    duration: '45-60 min',
    capacity: 'Zoom/WebEx',
    description: 'Bring Rocky Mount to your classroom remotely.',
  },
]

const STATS = [
  { label: 'TN Standards Aligned', icon: '📚' },
  { label: 'Hands-On Learning', icon: '🎓' },
  { label: 'Bus Parking Available', icon: '🚌' },
]

export default function EducatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>For Educators</p>
          <h1 className={styles.headline}>Tennessee&apos;s Government Started Here</h1>
          <p className={styles.subhead}>
            Give your students a tangible connection to Tennessee&apos;s founding.
          </p>
          <a
            href="https://form.jotform.com/230155675460152"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles['cta-primary']} btn-medium`}
          >
            Book a Field Trip
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.stats}>
        <div className={styles['stats-inner']}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles['stats-item']}>
              <span className={styles['stats-icon']}>{stat.icon}</span>
              <span className={styles['stats-label']}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Place */}
      <section className={styles.history}>
        <div className={styles['history-inner']}>
          <h2 className={styles['history-headline']}>Why This Place Matters</h2>
          <p className={styles['history-text']}>
            Rocky Mount is where{' '}
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Governor William Blount established the first seat of territorial government
            </Claim>{' '}
            in October 1790. Here, students stand where the{' '}
            <Claim doc="treaty-holston-1791" passage="article-1-peace">
              Treaty of Holston was planned
            </Claim>
            —a peace agreement between the United States and Cherokee Nation that shaped
            Tennessee&apos;s borders.
          </p>
          <Link href="/evidence" className={styles['history-link']}>
            Explore primary sources →
          </Link>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Programs */}
      <section className={styles.programs}>
        <div className={styles['programs-inner']}>
          <h2 className={styles['programs-headline']}>Programs</h2>
          <div className={styles['programs-grid']}>
            {PROGRAMS.map((program) => (
              <article key={program.name} className={styles['program-card']}>
                <h3 className={styles['program-name']}>{program.name}</h3>
                <div className={styles['program-meta']}>
                  <span>{program.duration}</span>
                  <span className={styles['program-divider']}>·</span>
                  <span>{program.capacity}</span>
                </div>
                <p className={styles['program-desc']}>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Book CTA */}
      <section className={styles.booking}>
        <div className={styles['booking-inner']}>
          <h2 className={styles['booking-headline']}>Book a Field Trip</h2>
          <a
            href="https://form.jotform.com/230155675460152"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles['cta-primary']} btn-medium`}
          >
            Book a Field Trip →
          </a>
          <p className={styles['booking-contact']}>
            Questions? <a href="mailto:rockymountmuseum@gmail.com">rockymountmuseum@gmail.com</a> |{' '}
            <a href={`tel:+1${siteInfo.contact.phone.replace(/[^0-9]/g, '')}`}>
              {siteInfo.contact.phone}
            </a>
          </p>
        </div>
      </section>

      {/* Funding */}
      <section className={styles.funding}>
        <div className={styles['funding-inner']}>
          <h2 className={styles['funding-headline']}>Funding Your Trip</h2>
          <ul className={styles['funding-list']}>
            <li>
              <strong>TN Arts Commission:</strong> Student Ticket Subsidy Grants (30-day advance
              application required)
            </li>
            <li>
              <strong>OVTA:</strong> Needs-based funding for transportation and admission
            </li>
            <li>
              <strong>Title I:</strong> Check with your district
            </li>
          </ul>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.resources}>
        <div className={styles['resources-inner']}>
          <h2 className={styles['resources-headline']}>Downloadable Resources</h2>
          <p className={styles['resources-coming']}>Classroom materials coming March 2026.</p>
          <p className={styles['resources-email']}>Or email us for current materials.</p>
        </div>
      </section>
    </>
  )
}
