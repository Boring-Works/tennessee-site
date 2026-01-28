import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

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
          <h1 className={styles.headline}>Keep Tennessee&apos;s Origin Story Alive</h1>
          <p className={styles.subhead}>
            Rocky Mount preserves the place where Tennessee&apos;s government began. Your support
            maintains these historic grounds, expands educational programs, and shares this story
            with future generations.
          </p>
        </div>
      </section>

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
                  className={styles['option-cta']}
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
          <Link href="/first-250" className={styles['first250-cta']}>
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
