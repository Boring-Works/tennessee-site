import type { Metadata } from 'next'
import Link from 'next/link'
import { Claim } from '@/components/evidence/Claim'
import siteInfo from '@/data/siteInfo.json'
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
  {
    tier: 'Groups of 10+',
    price: '$10/person',
    note: `(regular $${siteInfo.admission.adults.price})`,
  },
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
      <section className={styles.hero} aria-labelledby="groups-heading">
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Group Visits</p>
          <h1 id="groups-heading" className={styles.headline}>
            Bring Your Group
          </h1>
          <p className={styles.subhead}>Special rates for tours, reunions, and organizations</p>
        </div>
      </section>

      {/* We Welcome */}
      <section className={styles.welcome} aria-labelledby="welcome-heading">
        <div className={styles['welcome-inner']}>
          <h2 id="welcome-heading" className={styles['welcome-headline']}>
            We Welcome
          </h2>
          <ul className={styles['welcome-list']} role="list">
            {GROUP_TYPES.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Historical Context */}
      <section className={styles.history} aria-label="Historical context">
        <div className={styles['history-inner']}>
          <p className={styles['history-text']}>
            Your group will tour the home where{' '}
            <Claim doc="blount-arrival-1790" passage="glass-windows">
              Governor Blount noted the rare &quot;Glass Windows&quot;
            </Claim>{' '}
            in 1790—Tennessee&apos;s first capital. View{' '}
            <Link href="/evidence" className={styles['history-link']}>
              primary source documents
              <span className="sr-only"> (opens evidence page)</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Rates */}
      <section className={styles.rates} aria-labelledby="rates-heading">
        <div className={styles['rates-inner']}>
          <h2 id="rates-heading" className={styles['rates-headline']}>
            Group Rates
          </h2>
          <dl className={styles['rates-table']}>
            {RATES.map((rate) => (
              <div key={rate.tier} className={styles['rates-row']}>
                <dt className={styles['rates-tier']}>{rate.tier}</dt>
                <dd className={styles['rates-price']}>
                  {rate.price}
                  {rate.note && <span className={styles['rates-note']}> {rate.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className={styles['rates-includes']}>All visits include guided tour (~1 hour)</p>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className={styles.contact} aria-labelledby="contact-heading">
        <div className={styles['contact-inner']}>
          <h2 id="contact-heading" className={styles['contact-headline']}>
            Plan Your Group Visit
          </h2>
          <p className={styles['contact-desc']}>Contact us to schedule your group tour.</p>
          <div className={styles['contact-methods']} role="group" aria-label="Contact options">
            <a
              href={`tel:+1${siteInfo.contact.phone.replace(/[^0-9]/g, '')}`}
              className={styles['contact-btn-primary']}
              aria-label={`Call us at ${siteInfo.contact.phone}`}
            >
              Call {siteInfo.contact.phone}
            </a>
            <a
              href={`mailto:${siteInfo.contact.email}`}
              className={styles['contact-btn-secondary']}
              aria-label={`Email us at ${siteInfo.contact.email}`}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* What to Know */}
      <section className={styles.know} aria-labelledby="know-heading">
        <div className={styles['know-inner']}>
          <h2 id="know-heading" className={styles['know-headline']}>
            What to Know
          </h2>
          <ul className={styles['know-list']} role="list">
            {WHAT_TO_KNOW.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
