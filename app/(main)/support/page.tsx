import type { Metadata } from 'next'
import Link from 'next/link'
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
  title: 'Support Rocky Mount | Tennessee Starts Here',
  description:
    "Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer to preserve Tennessee's origin story.",
  openGraph: {
    title: 'Support Rocky Mount | Tennessee Starts Here',
    description:
      'Support Rocky Mount State Historic Site. Become a member, make a gift, or volunteer.',
    url: 'https://tennesseestartshere.com/support',
  },
}

const IMPACT_STATEMENTS = [
  {
    stat: '10,000+',
    label: 'Annual Visitors',
    description:
      'Students, families, and history enthusiasts experience the birthplace of Tennessee.',
  },
  {
    stat: '250 Years',
    label: 'Preserving History',
    description:
      'From 1770s frontier home to the first territorial capital—maintained for future generations.',
  },
  {
    stat: '5,000+',
    label: 'Students Served',
    description:
      'Field trips bring Tennessee history to life through hands-on learning and primary sources.',
  },
]

const SUPPORT_OPTIONS = [
  {
    title: 'Become a Member',
    description: 'Join our community of history supporters',
    price: 'Memberships from $40/year',
    cta: 'Join Now',
    href: 'https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/membershipJoin.jsp',
    external: true,
    trustLabel: 'Opens membership portal',
  },
  {
    title: 'Make a Gift',
    description: 'Support preservation and education',
    price: 'Gifts of any amount welcome',
    cta: 'Donate',
    href: 'https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/donation.jsp',
    external: true,
    trustLabel: 'Secure checkout',
  },
  {
    title: 'Volunteer',
    description: 'Give time as interpreter or event support',
    price: 'Contact us to learn more',
    cta: 'Learn More',
    href: 'mailto:info@rockymountmuseum.com?subject=Volunteer%20Inquiry',
    external: false,
    trustLabel: '',
  },
]

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Support Rocky Mount</p>
          <h1 className={styles.headline}>Preserve Where Tennessee Began</h1>
          <p className={styles.subhead}>
            Rocky Mount preserves the place where Tennessee&apos;s government began. Your support
            maintains these historic grounds, expands educational programs, and shares this story
            with future generations.
          </p>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Your Impact */}
      <section className={styles.impact}>
        <div className={styles['impact-inner']}>
          <h2 className={styles['impact-headline']}>Your Impact</h2>
          <p className={styles['impact-intro']}>
            Your support helps preserve the place where Tennessee&apos;s government was born and
            share this story with thousands of visitors each year.
          </p>
          <div className={styles['impact-grid']}>
            {IMPACT_STATEMENTS.map((item) => (
              <article key={item.label} className={styles['impact-card']}>
                <p className={styles['impact-stat']}>{item.stat}</p>
                <h3 className={styles['impact-label']}>{item.label}</h3>
                <p className={styles['impact-desc']}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Ways to Support */}
      <section className={styles.options}>
        <div className={styles['options-inner']}>
          <h2 className={styles['options-headline']}>Ways to Support</h2>
          <div className={styles['options-grid']}>
            {SUPPORT_OPTIONS.map((option) => (
              <article key={option.title} className={styles['option-card']}>
                <h3 className={styles['option-title']}>{option.title}</h3>
                <p className={styles['option-desc']}>{option.description}</p>
                <p className={styles['option-price']}>{option.price}</p>
                <a
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className={`${styles['option-cta']} btn-small`}
                >
                  {option.cta} {option.external && '→'}
                </a>
                {option.trustLabel && <p className={styles['option-trust']}>{option.trustLabel}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* First 250 */}
      <section className={styles.first250}>
        <div className={styles['first250-inner']}>
          <h2 className={styles['first250-headline']}>The First 250</h2>
          <p className={styles['first250-desc']}>
            Join our founding circle for America&apos;s 250th.
          </p>
          <p className={styles['first250-limit']}>Limited to 250 members</p>
          <p className={styles['first250-opens']}>Enrollment opens March 4, 2026</p>
          <Link href="/first-250" className={`${styles['first250-cta']} btn-small`}>
            Learn More →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact}>
        <div className={styles['contact-inner']}>
          <p className={styles['contact-text']}>
            Questions? <a href="mailto:info@rockymountmuseum.com">info@rockymountmuseum.com</a> |{' '}
            <a href="tel:+14235387396">(423) 538-7396</a>
          </p>
        </div>
      </section>
    </>
  )
}
