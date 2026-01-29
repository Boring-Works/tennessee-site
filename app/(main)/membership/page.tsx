import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Membership | Rocky Mount State Historic Site',
  description:
    'Join Rocky Mount and support the preservation of where Tennessee began. Founding Member registration opens March 4, 2026.',
  openGraph: {
    title: 'Membership | Tennessee Starts Here',
    description:
      'Join Rocky Mount and support the preservation of where Tennessee began. Founding Member registration opens March 4, 2026.',
    url: 'https://tennesseestartshere.com/membership',
  },
}

// NeonCRM membership portal URL
const NEONCRM_URL =
  'https://rockymountmuseum.z2systems.com/np/clients/rockymountmuseum/membershipJoin.jsp'

// Founding Member deadline - March 4, 2026
const FOUNDING_MEMBER_DEADLINE = new Date('2026-03-04T23:59:59')

// Check if we're before the founding member deadline
function isBeforeFoundingDeadline(): boolean {
  return new Date() < FOUNDING_MEMBER_DEADLINE
}

// Membership tiers data - ordered high to low
const MEMBERSHIP_TIERS = [
  {
    id: 'governors-circle',
    name: "Governor's Circle",
    tagline: 'Your name alongside history',
    price: 2500,
    badge: null,
    benefits: [
      'All Patriot Pass benefits',
      'Name on permanent Founders Wall',
      'Private tour with Executive Director',
      "Exclusive Governor's Circle dinner (annual)",
      'Recognition in all 2026 publications',
      'Complimentary event tickets (4 per event)',
    ],
    cta: "Join Governor's Circle",
    highlighted: false,
  },
  {
    id: 'patriot-pass',
    name: 'Patriot Pass',
    tagline: 'For the devoted',
    price: 200,
    badge: 'BEST VALUE',
    badgeType: 'value' as const,
    benefits: [
      'All Frontier Family benefits',
      'Behind-the-scenes tours',
      'Invitation to annual Patron event',
      'Complimentary gift membership to share',
      'Recognition on website donor wall',
    ],
    cta: 'Join as Patriot',
    highlighted: false,
  },
  {
    id: 'frontier-family',
    name: 'Frontier Family',
    tagline: 'For the whole crew',
    price: 100,
    badge: 'MOST POPULAR',
    badgeType: 'popular' as const,
    benefits: [
      'Unlimited admission for household (up to 6)',
      'Original Seven Passport booklet',
      'Priority event registration',
      '10% gift shop discount',
      'Member newsletter',
    ],
    cta: 'Join as Family',
    highlighted: true,
  },
  {
    id: 'explorers-pass',
    name: "Explorer's Pass",
    tagline: 'For two',
    price: 75,
    badge: null,
    benefits: [
      'Unlimited admission for two adults',
      'Original Seven Passport booklet',
      '10% gift shop discount',
      'Member newsletter',
    ],
    cta: 'Join as Explorer',
    highlighted: false,
  },
  {
    id: 'settlers-pass',
    name: "Settler's Pass",
    tagline: 'For the curious',
    price: 50,
    badge: null,
    benefits: [
      'Unlimited admission for one adult',
      'Original Seven Passport booklet',
      '10% gift shop discount',
      'Member newsletter',
    ],
    cta: 'Join as Settler',
    highlighted: false,
  },
]

// FAQ data
const FAQ_ITEMS = [
  {
    question: 'Are membership benefits good at other historic sites?',
    answer:
      'Rocky Mount membership provides unlimited free admission to Rocky Mount only. However, every member receives the Original Seven Passport, which offers discounts at partner sites throughout the region.',
  },
  {
    question: "What's the Original Seven Passport?",
    answer:
      "A booklet that connects seven historic sites across Northeast Tennessee and Southwest Virginia. Visit all seven, get your passport stamped, and receive a commemorative pin. It's our way of encouraging you to explore the entire frontier story.",
  },
  {
    question: 'Can I upgrade my membership later?',
    answer:
      "Yes. Contact us any time and we'll credit your current membership toward an upgrade. The difference in price is prorated based on your remaining membership period.",
  },
  {
    question: 'Is my membership tax-deductible?',
    answer:
      'Rocky Mount is a 501(c)(3) nonprofit. The tax-deductible portion is the amount that exceeds the fair market value of benefits received. We provide a receipt for your records.',
  },
  {
    question: 'How do I use my membership when I visit?',
    answer:
      'Present your membership card at the admissions desk. First-time members can show their confirmation email until their card arrives by mail (typically 2-3 weeks after joining).',
  },
]

// Section divider component
const SectionDivider = ({ variant = 'default' }: { variant?: 'default' | 'light' | 'dark' }) => (
  <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
    <span className="section-divider-line" />
    <span className="section-divider-flourish">&#10087;</span>
    <span className="section-divider-ornament">&#10022;</span>
    <span className="section-divider-flourish section-divider-flourish--flip">&#10087;</span>
    <span className="section-divider-line" />
  </div>
)

// FAQ Accordion Item
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const id = `faq-${index}`
  return (
    <details className={styles['faq-item']}>
      <summary className={styles['faq-question']} id={`${id}-question`}>
        {question}
        <span className={styles['faq-icon']} aria-hidden="true">
          +
        </span>
      </summary>
      <div className={styles['faq-answer']} id={`${id}-answer`}>
        <p>{answer}</p>
      </div>
    </details>
  )
}

export default function MembershipPage() {
  const showFoundingBanner = isBeforeFoundingDeadline()

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <p className={styles.eyebrow}>Membership</p>
          <h1 className={styles.headline}>Join the Story</h1>
          <p className={styles.subhead}>
            Rocky Mount preserves where Tennessee began. Your membership supports living history
            programs, educational outreach, and preservation of these hallowed grounds for future
            generations.
          </p>
        </div>
      </section>

      {/* Founding Member Banner - Conditional */}
      {showFoundingBanner && (
        <section className={styles['founding-banner']}>
          <div className={styles['founding-banner-inner']}>
            <div className={styles['founding-banner-content']}>
              <span className={styles['founding-banner-badge']}>Limited Opportunity</span>
              <h2 className={styles['founding-banner-headline']}>Founding Member Registry</h2>
              <p className={styles['founding-banner-desc']}>
                Join before March 4, 2026 and be recognized as a Founding Member in America&apos;s
                250th year. Your name will be permanently listed in our commemorative registry.
              </p>
              <Link href="/first-250" className={styles['founding-banner-link']}>
                Learn about the First 250 &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <SectionDivider variant="light" />

      {/* Membership Tiers */}
      <section className={styles.tiers}>
        <div className={styles['tiers-inner']}>
          <h2 className={styles['tiers-headline']}>Choose Your Level</h2>
          <p className={styles['tiers-intro']}>
            All memberships include unlimited admission and support our mission.
          </p>

          <div className={styles['tiers-grid']}>
            {MEMBERSHIP_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`${styles['tier-card']} ${tier.highlighted ? styles['tier-card--highlighted'] : ''}`}
              >
                {tier.badge && (
                  <span
                    className={`${styles['tier-badge']} ${styles[`tier-badge--${tier.badgeType}`]}`}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 className={styles['tier-name']}>{tier.name}</h3>
                <p className={styles['tier-tagline']}>{tier.tagline}</p>
                <p className={styles['tier-price']}>
                  <span className={styles['tier-price-amount']}>
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className={styles['tier-price-period']}>/year</span>
                </p>
                <ul className={styles['tier-benefits']}>
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className={styles['tier-benefit']}>
                      <span className={styles['tier-benefit-check']} aria-hidden="true">
                        &#10003;
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href={NEONCRM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles['tier-cta']} ${tier.highlighted ? styles['tier-cta--primary'] : ''}`}
                >
                  {tier.cta} &rarr;
                </a>
              </article>
            ))}
          </div>

          <p className={styles['tiers-note']}>
            Secure checkout via NeonCRM &bull; Questions?{' '}
            <a href="mailto:rockymountmuseum@gmail.com">Email us</a>
          </p>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Passport Bonus */}
      <section className={styles.passport}>
        <div className={styles['passport-inner']}>
          <div className={styles['passport-content']}>
            <span className={styles['passport-badge']}>Included With Every Membership</span>
            <h2 className={styles['passport-headline']}>The Original Seven Passport</h2>
            <p className={styles['passport-desc']}>
              Every member receives the Original Seven Passport &mdash; a booklet connecting seven
              historic sites across the frontier region. Visit all seven, collect your stamps, and
              earn a commemorative pin.
            </p>
            <Link href="/explore" className={styles['passport-link']}>
              Explore the Original Seven &rarr;
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Upgrade Comparison */}
      <section className={styles.comparison}>
        <div className={styles['comparison-inner']}>
          <h2 className={styles['comparison-headline']}>Family vs. Patriot</h2>
          <p className={styles['comparison-intro']}>
            Not sure which level is right for you? Here&apos;s a quick comparison.
          </p>

          <div className={styles['comparison-table-wrapper']}>
            <table className={styles['comparison-table']}>
              <thead>
                <tr>
                  <th className={styles['comparison-th']}>Benefit</th>
                  <th className={styles['comparison-th']}>Frontier Family</th>
                  <th className={styles['comparison-th']}>Patriot Pass</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles['comparison-td']}>Price</td>
                  <td className={styles['comparison-td']}>$100/year</td>
                  <td className={styles['comparison-td']}>$200/year</td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Household admission (up to 6)</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Original Seven Passport</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Priority event registration</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Behind-the-scenes tours</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-dash']}>&mdash;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Annual Patron event invitation</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-dash']}>&mdash;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Complimentary gift membership</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-dash']}>&mdash;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles['comparison-td']}>Website donor wall recognition</td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-dash']}>&mdash;</span>
                  </td>
                  <td className={styles['comparison-td']}>
                    <span className={styles['comparison-check']}>&#10003;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles['faq-inner']}>
          <h2 className={styles['faq-headline']}>Common Questions</h2>

          <div className={styles['faq-list']}>
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Emotional Close */}
      <section className={styles.close}>
        <div className={styles['close-inner']}>
          <h2 className={styles['close-headline']}>This Story Needs You</h2>
          <p className={styles['close-desc']}>
            Every member helps preserve the place where Tennessee&apos;s government was born. Join
            us in keeping this story alive for the next 250 years.
          </p>
          <a
            href={NEONCRM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['close-cta']}
          >
            Become a Member &rarr;
          </a>
          <p className={styles['close-note']}>
            Questions? <a href="mailto:rockymountmuseum@gmail.com">rockymountmuseum@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
