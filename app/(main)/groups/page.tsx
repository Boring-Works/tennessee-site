import type { Metadata } from 'next'
import Link from 'next/link'
import { Claim } from '@/components/evidence/Claim'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Group Visits | Tennessee Starts Here',
  description:
    'Special rates for bus tours, reunions, scouts, and groups of 10+ at Rocky Mount State Historic Site.',
  openGraph: {
    title: 'Group Visits | Tennessee Starts Here',
    description:
      'Special rates for bus tours, reunions, scouts, and groups of 10+ at Rocky Mount State Historic Site.',
    url: 'https://tennesseestartshere.com/groups',
  },
}

const GROUP_TYPES = [
  'Motor coach and bus tours (bus parking available)',
  'Family reunions',
  'Scout troops',
  'Church groups',
  'Senior organizations',
  'Historical societies',
]

const RATES = [
  { tier: 'Groups of 10+', price: '$10/person', note: '(regular $12)' },
  { tier: 'Groups of 25+', price: '$8/person', note: '' },
  { tier: 'Student groups', price: '$6/student', note: '' },
  { tier: 'Driver/escort', price: 'Complimentary', note: '' },
]

const WHAT_TO_KNOW = [
  'Book 2+ weeks in advance',
  'Tours are outdoors; dress for weather',
  'No air conditioning in historic house',
  'Museum gallery is ADA accessible with climate control',
  'Bus/RV parking available',
  'Picnic area for groups bringing lunch',
]

export default function GroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Group Visits</p>
          <h1 className={styles.headline}>Bring Your Group</h1>
          <p className={styles.subhead}>Special rates for tours, reunions, and organizations</p>
        </div>
      </section>

      {/* We Welcome */}
      <section className={styles.welcome}>
        <div className={styles['welcome-inner']}>
          <h2 className={styles['welcome-headline']}>We Welcome</h2>
          <ul className={styles['welcome-list']}>
            {GROUP_TYPES.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Historical Context */}
      <section className={styles.history}>
        <div className={styles['history-inner']}>
          <p className={styles['history-text']}>
            Your group will tour the home where{' '}
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Governor Blount noted the rare &quot;Glass Windows&quot;
            </Claim>{' '}
            in 1790—Tennessee&apos;s first capital. View{' '}
            <Link href="/evidence" className={styles['history-link']}>
              primary source documents →
            </Link>
          </p>
        </div>
      </section>

      {/* Rates */}
      <section className={styles.rates}>
        <div className={styles['rates-inner']}>
          <h2 className={styles['rates-headline']}>Group Rates</h2>
          <div className={styles['rates-table']}>
            {RATES.map((rate) => (
              <div key={rate.tier} className={styles['rates-row']}>
                <span className={styles['rates-tier']}>{rate.tier}</span>
                <span className={styles['rates-price']}>
                  {rate.price}
                  {rate.note && <span className={styles['rates-note']}> {rate.note}</span>}
                </span>
              </div>
            ))}
          </div>
          <p className={styles['rates-includes']}>All visits include guided tour (~1 hour)</p>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className={styles.contact}>
        <div className={styles['contact-inner']}>
          <h2 className={styles['contact-headline']}>Plan Your Group Visit</h2>
          <p className={styles['contact-desc']}>Contact us to schedule your group tour.</p>
          <div className={styles['contact-methods']}>
            <a href="tel:+14235387396" className={styles['contact-btn-primary']}>
              Call (423) 538-7396
            </a>
            <a href="mailto:info@rockymountmuseum.com" className={styles['contact-btn-secondary']}>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* What to Know */}
      <section className={styles.know}>
        <div className={styles['know-inner']}>
          <h2 className={styles['know-headline']}>What to Know</h2>
          <ul className={styles['know-list']}>
            {WHAT_TO_KNOW.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
