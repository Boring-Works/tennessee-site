import type { Metadata } from 'next'
import Link from 'next/link'
import siteInfo from '@/data/siteInfo.json'
import styles from './page.module.css'
import { PAGE_METADATA, HOOKS } from '@/lib/copy'

export const metadata: Metadata = {
  title: PAGE_METADATA.visit.title,
  description: PAGE_METADATA.visit.description,
  openGraph: {
    title: PAGE_METADATA.visit.ogTitle,
    description: PAGE_METADATA.visit.ogDescription,
    url: 'https://tennesseestartshere.com/visit',
  },
}

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

// Compass rose for heritage trail
const CompassRose = () => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={styles['compass-rose']}
  >
    <circle cx="30" cy="30" r="26" opacity="0.3" />
    <circle cx="30" cy="30" r="18" opacity="0.2" />
    <circle cx="30" cy="30" r="8" opacity="0.15" />
    {/* Cardinal directions */}
    <path d="M30 4v10M30 46v10M4 30h10M46 30h10" strokeWidth="1.5" />
    {/* North arrow */}
    <path d="M30 4l-3 8h6l-3-8z" fill="currentColor" opacity="0.6" />
    {/* Intercardinal directions */}
    <path d="M12 12l6 6M42 42l6 6M12 48l6-6M42 18l6-6" opacity="0.4" />
    {/* Center dot */}
    <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
    {/* Direction labels */}
    <text
      x="30"
      y="18"
      textAnchor="middle"
      fontSize="6"
      fill="currentColor"
      opacity="0.7"
      fontWeight="bold"
    >
      N
    </text>
    <text x="30" y="56" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.5">
      S
    </text>
    <text x="8" y="32" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.5">
      W
    </text>
    <text x="52" y="32" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.5">
      E
    </text>
  </svg>
)

// Portrait frame for historical figures
const PortraitFrame = ({ initials, highlight }: { initials: string; highlight: string }) => (
  <div className={styles['portrait-frame']}>
    <div className={styles['portrait-frame-outer']}>
      <div className={styles['portrait-frame-inner']}>
        <span className={styles['portrait-initials']}>{initials}</span>
      </div>
    </div>
    <div className={styles['portrait-badge']}>
      <span className={styles['portrait-badge-seal']}>★</span>
      <span className={styles['portrait-badge-text']}>{highlight}</span>
    </div>
  </div>
)

// Historical figures for the "Who Walked Here" section
const historicalFigures = [
  {
    name: 'William Blount',
    title: 'Governor of the Southwest Territory',
    years: '1790–1796',
    hook: 'Signed the U.S. Constitution. Appointed by George Washington. Made Rocky Mount his headquarters.',
    highlight: 'Constitution Signer',
  },
  {
    name: 'Andrew Jackson',
    title: 'Future 7th President',
    years: '1788',
    hook: 'Lodged at Rocky Mount for six weeks while awaiting his law license. He was 21 years old.',
    highlight: 'Future President',
  },
  {
    name: 'William Cobb',
    title: 'Original Settler',
    years: 'c. 1770',
    hook: 'Staked his claim on this land six years before the Declaration of Independence was signed.',
    highlight: 'Pioneer',
  },
]

// Tour experience highlights
const experienceHighlights = [
  {
    moment: 'Meet Mary Cobb',
    description:
      'At the weaving cabin, learn the skills that kept frontier families clothed and warm.',
  },
  {
    moment: 'Enter the Cobb House',
    description: 'Walk through the same door William Blount walked through in 1790.',
  },
  {
    moment: 'See the Kitchen',
    description:
      'Discover how meals were prepared over open hearths—the same way they were 230 years ago.',
  },
  {
    moment: 'Watch Demonstrations',
    description:
      'Costumed interpreters show blacksmithing, weaving, and frontier crafts (varies by day).',
  },
]

// Heritage Trail - nearby historic sites with narrative connection
const heritageTrail = [
  {
    name: 'Sycamore Shoals State Historic Park',
    distance: '30 min',
    connection:
      'Where the Overmountain Men gathered — the Army gathered at the Shoals, the State started here',
  },
  {
    name: 'Downtown Bristol (State Street)',
    distance: '20 min',
    connection: 'Birthplace of Country Music',
  },
  {
    name: 'Downtown Johnson City',
    distance: '20 min',
    connection: 'Historic downtown with local dining',
  },
]

export default function VisitPage() {
  const { location, hours, admission, whatToExpect, contact } = siteInfo

  return (
    <>
      {/* ============================================
          HERO - Heritage Significance
          ============================================ */}
      <section className={styles['visit-hero']} aria-labelledby="visit-heading">
        {/* Decorative grain overlay */}
        <div className={styles['visit-hero-grain']} aria-hidden="true" />

        {/* Corner bracket flourishes */}
        <span
          className={`${styles['visit-hero-corner']} ${styles['visit-hero-corner--tl']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-hero-corner']} ${styles['visit-hero-corner--tr']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-hero-corner']} ${styles['visit-hero-corner--bl']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-hero-corner']} ${styles['visit-hero-corner--br']}`}
          aria-hidden="true"
        />

        <div className={styles['visit-hero-content']}>
          {/* Decorative top rule */}
          <div className={styles['visit-hero-rule']} aria-hidden="true">
            <span className={styles['visit-hero-rule-line']} />
            <span className={styles['visit-hero-rule-ornament']}>✦</span>
            <span className={styles['visit-hero-rule-line']} />
          </div>

          {/* Site designation badge */}
          <p className={styles['visit-hero-badge']}>
            <span>Tennessee State Historic Site</span>
          </p>

          {/* Main headline */}
          <h1 id="visit-heading" className={styles['visit-hero-headline']}>
            <span className={styles['visit-hero-headline-small']}>Stand Where</span>
            <span className={styles['visit-hero-headline-large']}>Tennessee Began</span>
          </h1>

          {/* Significance statement */}
          <p className={styles['visit-hero-significance']}>
            First capital of the Southwest Territory, 1790–1792.
          </p>

          {/* Decorative mid rule */}
          <div className={styles['visit-hero-mid-rule']} aria-hidden="true">
            <span className={styles['visit-hero-mid-rule-flourish']}>❧</span>
          </div>

          {/* Experience promise */}
          <p className={styles['visit-hero-promise']}>
            This is where federal power first reached west of the Appalachians. Walk the same
            grounds where Governor Blount governed the Southwest Territory and negotiated the Treaty
            of Holston with forty-one Cherokee chiefs.
          </p>

          {/* Quick facts row */}
          <div className={styles['visit-hero-facts']}>
            <div className={styles['visit-hero-fact']}>
              <span className={styles['visit-hero-fact-value']}>Wed–Sat</span>
              <span className={styles['visit-hero-fact-label']}>11am–4:30pm</span>
            </div>
            <div className={styles['visit-hero-fact-divider']} aria-hidden="true">
              <span className={styles['visit-hero-fact-star']}>★</span>
            </div>
            <div className={styles['visit-hero-fact']}>
              <span className={styles['visit-hero-fact-value']}>Hourly</span>
              <span className={styles['visit-hero-fact-label']}>Tours</span>
            </div>
            <div className={styles['visit-hero-fact-divider']} aria-hidden="true">
              <span className={styles['visit-hero-fact-star']}>★</span>
            </div>
            <div className={styles['visit-hero-fact']}>
              <span className={styles['visit-hero-fact-value']}>${admission.adults.price}</span>
              <span className={styles['visit-hero-fact-label']}>Adults</span>
            </div>
          </div>

          {/* Season note */}
          <p className={styles['visit-hero-season']}>
            Season opens March · See <Link href="/events">events</Link> for specific dates
          </p>

          {/* Primary CTA with wax seal */}
          <a
            href="https://fareharbor.com/embeds/book/rockymountmuseum/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles['visit-hero-cta']} btn-large`}
          >
            <span className={styles['visit-hero-cta-seal']} aria-hidden="true">
              ★
            </span>
            Book Your Tour
          </a>

          {/* Secondary link */}
          <a href="#plan-your-visit" className={styles['visit-hero-scroll']}>
            View hours &amp; admission
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          WHO WALKED HERE - Historical Figures
          ============================================ */}
      <section className={styles['visit-figures']} aria-labelledby="figures-heading">
        <div className={styles['visit-figures-inner']}>
          <header className={styles['visit-figures-header']}>
            <p className={styles['visit-figures-eyebrow']}>Capital Grounds</p>
            <h2 id="figures-heading" className={styles['visit-figures-headline']}>
              Who Walked These Grounds
            </h2>
            <p className={styles['visit-figures-intro']}>
              Before this was a museum, it was the center of frontier government. The ground
              endures.
            </p>
          </header>

          <div className={styles['visit-figures-grid']}>
            {historicalFigures.map((figure) => (
              <article key={figure.name} className={styles['visit-figure']}>
                {/* Portrait frame with initials */}
                <PortraitFrame
                  initials={figure.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                  highlight={figure.highlight}
                />
                <div className={styles['visit-figure-content']}>
                  <h3 className={styles['visit-figure-name']}>{figure.name}</h3>
                  <p className={styles['visit-figure-title']}>
                    {figure.title}
                    <span className={styles['visit-figure-years']}>{figure.years}</span>
                  </p>
                  <p className={styles['visit-figure-hook']}>{figure.hook}</p>
                </div>
                {/* Corner accents */}
                <span
                  className={`${styles['visit-figure-corner']} ${styles['visit-figure-corner--tl']}`}
                  aria-hidden="true"
                />
                <span
                  className={`${styles['visit-figure-corner']} ${styles['visit-figure-corner--br']}`}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>

          {/* Fame Bridge */}
          <p className={styles['visit-figures-fame-bridge']}>{HOOKS.fameBridge}</p>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          THE EXPERIENCE - Living History Preview
          ============================================ */}
      <section className={styles['visit-experience']} aria-labelledby="experience-heading">
        <div className={styles['visit-experience-inner']}>
          <header className={styles['visit-experience-header']}>
            <p className={styles['visit-experience-eyebrow']}>Your Visit</p>
            <h2 id="experience-heading" className={styles['visit-experience-headline']}>
              More Than a Museum
            </h2>
            <p className={styles['visit-experience-intro']}>
              This isn&apos;t a self-guided walk past dusty displays. It&apos;s a guided journey
              through living history, led by interpreters in period dress who bring 1790 to life.
            </p>
          </header>

          <div className={styles['visit-experience-grid']}>
            {experienceHighlights.map((highlight, index) => (
              <article key={highlight.moment} className={styles['visit-moment']}>
                {/* Period-styled number frame */}
                <div className={styles['visit-moment-number-frame']} aria-hidden="true">
                  <span className={styles['visit-moment-number']}>
                    {['I', 'II', 'III', 'IV'][index]}
                  </span>
                </div>
                <div className={styles['visit-moment-content']}>
                  <h3 className={styles['visit-moment-title']}>{highlight.moment}</h3>
                  <p className={styles['visit-moment-desc']}>{highlight.description}</p>
                </div>
              </article>
            ))}
          </div>

          <footer className={styles['visit-experience-footer']}>
            <div className={styles['visit-experience-footer-rule']} aria-hidden="true">
              <span className={styles['visit-experience-footer-line']} />
              <span className={styles['visit-experience-footer-star']}>★</span>
              <span className={styles['visit-experience-footer-line']} />
            </div>
            <p className={styles['visit-experience-note']}>
              Tour duration approximately 1 hour. Last tour begins one hour before closing.
            </p>
          </footer>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          EXPEDITION DATA - Practical Info (Field Briefing Style)
          ============================================ */}
      <section
        id="plan-your-visit"
        className={styles['visit-practical']}
        aria-labelledby="practical-heading"
      >
        <div className={styles['visit-practical-inner']}>
          <p className={styles['visit-practical-eyebrow']}>Expedition Data</p>
          <h2 id="practical-heading" className={styles['visit-practical-headline']}>
            Your Field Briefing
          </h2>

          <div className={styles['visit-practical-grid']}>
            {/* Hours Card */}
            <div className={styles['visit-card']}>
              {/* Card corner accents */}
              <span
                className={`${styles['visit-card-corner']} ${styles['visit-card-corner--tl']}`}
                aria-hidden="true"
              />
              <span
                className={`${styles['visit-card-corner']} ${styles['visit-card-corner--br']}`}
                aria-hidden="true"
              />
              <h3 className={styles['visit-card-title']}>
                <svg
                  className={styles['visit-card-icon']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Hours
              </h3>
              <dl className={styles['visit-hours']}>
                <div className={styles['visit-hours-row']}>
                  <dt>Tuesday – Saturday</dt>
                  <dd>{hours.regular.tuesday}</dd>
                </div>
                <div className={styles['visit-hours-row']}>
                  <dt>Sunday</dt>
                  <dd>{hours.regular.sunday}</dd>
                </div>
                <div
                  className={`${styles['visit-hours-row']} ${styles['visit-hours-row--closed']}`}
                >
                  <dt>Monday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
              <p className={styles['visit-card-note']}>{hours.note}</p>
            </div>

            {/* Admission Card */}
            <div className={styles['visit-card']}>
              {/* Card corner accents */}
              <span
                className={`${styles['visit-card-corner']} ${styles['visit-card-corner--tl']}`}
                aria-hidden="true"
              />
              <span
                className={`${styles['visit-card-corner']} ${styles['visit-card-corner--br']}`}
                aria-hidden="true"
              />
              <h3 className={styles['visit-card-title']}>
                <svg
                  className={styles['visit-card-icon']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Admission
              </h3>
              <dl className={styles['visit-admission']}>
                <div className={styles['visit-admission-row']}>
                  <dt>{admission.adults.label}</dt>
                  <dd>${admission.adults.price}</dd>
                </div>
                <div className={styles['visit-admission-row']}>
                  <dt>{admission.seniors.label}</dt>
                  <dd>${admission.seniors.price}</dd>
                </div>
                <div className={styles['visit-admission-row']}>
                  <dt>{admission.children.label}</dt>
                  <dd>${admission.children.price}</dd>
                </div>
                <div className={styles['visit-admission-row']}>
                  <dt>{admission.childrenFree.label}</dt>
                  <dd className={styles['visit-admission-free']}>Free</dd>
                </div>
              </dl>
              <p className={styles['visit-card-note']}>{admission.note}</p>
            </div>

            {/* Book Tour Card - Featured with wax seal */}
            <div className={`${styles['visit-card']} ${styles['visit-card--featured']}`}>
              {/* Wax seal accent */}
              <div className={styles['visit-book-seal']} aria-hidden="true">
                <span className={styles['visit-book-seal-inner']}>RM</span>
              </div>
              {/* Decorative border */}
              <div className={styles['visit-card-border']} aria-hidden="true" />
              <h3 className={styles['visit-card-title']}>Book Your Tour</h3>
              <p className={styles['visit-book-desc']}>
                Reserve your spot for a guided living history experience.
              </p>
              <ul className={styles['visit-book-includes']}>
                <li>Guided tour with costumed interpreters</li>
                <li>Access to all historic buildings</li>
                <li>Craft demonstrations (varies by day)</li>
                <li>Gift shop visit</li>
              </ul>
              <a
                href="https://fareharbor.com/embeds/book/rockymountmuseum/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles['visit-book-btn']} btn-medium`}
              >
                <span className={styles['visit-book-btn-seal']} aria-hidden="true">
                  ★
                </span>
                Book Now
                <span aria-hidden="true">→</span>
              </a>
              <p className={styles['visit-book-note']}>Walk-ins welcome when space allows</p>
            </div>
          </div>

          {/* Before You Arrive - Field Prep */}
          <div className={styles['visit-prepare']}>
            <h3 className={styles['visit-prepare-title']}>Field Preparation</h3>
            <ul className={styles['visit-prepare-list']}>
              {whatToExpect.recommendations.map((rec, index) => (
                <li key={index} className={styles['visit-prepare-item']}>
                  <svg
                    className={styles['visit-prepare-icon']}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
            <div className={styles['visit-prepare-accessibility']}>
              <strong>Accessibility:</strong>
              <p className="mt-2">{whatToExpect.accessibility.summary}</p>
              <div className="mt-3 space-y-2">
                <p className="text-sm">
                  <strong className="text-green-700">Museum Gallery:</strong>{' '}
                  {whatToExpect.accessibility.museumGallery.features.slice(0, 2).join(', ')}
                </p>
                <p className="text-sm">
                  <strong className="text-amber-700">Historic Site Tour:</strong>{' '}
                  {whatToExpect.accessibility.historicSiteTour.features.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ============================================
          YOUR ROUTE - Directions (Expedition Style)
          ============================================ */}
      <section className={styles['visit-journey']} aria-labelledby="journey-heading">
        <div className={styles['visit-journey-inner']}>
          <header className={styles['visit-journey-header']}>
            <p className={styles['visit-journey-eyebrow']}>Navigation</p>
            <h2 id="journey-heading" className={styles['visit-journey-headline']}>
              Your Route to 1790
            </h2>
            <p className={styles['visit-journey-intro']}>
              Follow the same paths settlers once traveled. Rocky Mount awaits at the crossroads of
              history.
            </p>
          </header>

          <div className={styles['visit-journey-content']}>
            {/* Address Card */}
            <div className={styles['visit-journey-address']}>
              <address className={styles['visit-address']}>
                <strong>Rocky Mount State Historic Site</strong>
                <span>{location.address.street}</span>
                <span>
                  {location.address.city}, {location.address.state} {location.address.zip}
                </span>
              </address>

              <p className={styles['visit-journey-directions']}>{location.directions}</p>

              <div className={styles['visit-journey-actions']}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles['visit-journey-btn']} ${styles['visit-journey-btn--primary']} btn-small`}
                >
                  Get Directions
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                  className={`${styles['visit-journey-btn']} ${styles['visit-journey-btn--secondary']} btn-small`}
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Distance indicators */}
            <div className={styles['visit-journey-distances']}>
              <p className={styles['visit-journey-distance']}>
                <span className={styles['visit-journey-distance-time']}>20 min</span>
                <span className={styles['visit-journey-distance-from']}>from Johnson City</span>
              </p>
              <p className={styles['visit-journey-distance']}>
                <span className={styles['visit-journey-distance-time']}>20 min</span>
                <span className={styles['visit-journey-distance-from']}>from Bristol</span>
              </p>
              <p className={styles['visit-journey-distance']}>
                <span className={styles['visit-journey-distance-time']}>45 min</span>
                <span className={styles['visit-journey-distance-from']}>from Knoxville</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          HERITAGE TRAIL - Nearby Historic Sites
          ============================================ */}
      <section className={styles['visit-trail']} aria-labelledby="trail-heading">
        <div className={styles['visit-trail-inner']}>
          <header className={styles['visit-trail-header']}>
            {/* Compass rose decoration */}
            <div className={styles['visit-trail-compass']} aria-hidden="true">
              <CompassRose />
            </div>
            <p className={styles['visit-trail-eyebrow']}>Make It a Day</p>
            <h2 id="trail-heading" className={styles['visit-trail-headline']}>
              The Heritage Trail
            </h2>
            <p className={styles['visit-trail-intro']}>
              Rocky Mount is part of a larger story. These nearby sites complete the picture of
              frontier Tennessee.
            </p>
          </header>

          <div className={styles['visit-trail-grid']}>
            {heritageTrail.map((site, index) => (
              <article key={site.name} className={styles['visit-trail-site']}>
                {/* Trail marker number */}
                <div className={styles['visit-trail-marker']} aria-hidden="true">
                  <span className={styles['visit-trail-marker-number']}>{index + 1}</span>
                </div>
                <div className={styles['visit-trail-site-content']}>
                  <div className={styles['visit-trail-site-header']}>
                    <h3 className={styles['visit-trail-site-name']}>{site.name}</h3>
                    <span className={styles['visit-trail-site-distance']}>{site.distance}</span>
                  </div>
                  <p className={styles['visit-trail-site-connection']}>{site.connection}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles['visit-trail-cta-text']}>
            Visiting from out of town? The Tri-Cities area offers plenty of lodging and dining
            options.
          </p>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* ============================================
          CONTACT - Groups & Schools
          ============================================ */}
      <section className={styles['visit-groups']} aria-labelledby="groups-heading">
        <div className={styles['visit-groups-inner']}>
          <div className={styles['visit-groups-content']}>
            <h2 id="groups-heading" className={styles['visit-groups-headline']}>
              Bringing a Group?
            </h2>
            <p className={styles['visit-groups-desc']}>
              School field trips, scout troops, family reunions, and groups of 10+ receive special
              rates. Educational programs available for all ages.
            </p>
          </div>

          <div className={styles['visit-groups-actions']}>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className={`${styles['visit-groups-btn']} ${styles['visit-groups-btn--primary']} btn-small`}
            >
              Call {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={`${styles['visit-groups-btn']} ${styles['visit-groups-btn--secondary']} btn-small`}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          CLOSING - Emotional CTA
          ============================================ */}
      <section className={styles['visit-closing']} aria-labelledby="closing-heading">
        {/* Corner brackets */}
        <span
          className={`${styles['visit-closing-corner']} ${styles['visit-closing-corner--tl']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-closing-corner']} ${styles['visit-closing-corner--tr']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-closing-corner']} ${styles['visit-closing-corner--bl']}`}
          aria-hidden="true"
        />
        <span
          className={`${styles['visit-closing-corner']} ${styles['visit-closing-corner--br']}`}
          aria-hidden="true"
        />

        <div className={styles['visit-closing-inner']}>
          {/* Top decorative rule */}
          <div className={styles['visit-closing-rule']} aria-hidden="true">
            <span className={styles['visit-closing-rule-flourish']}>❧</span>
            <span className={styles['visit-closing-rule-line']} />
            <span className={styles['visit-closing-rule-ornament']}>✦</span>
            <span className={styles['visit-closing-rule-line']} />
            <span
              className={`${styles['visit-closing-rule-flourish']} ${styles['visit-closing-rule-flourish--flip']}`}
            >
              ❧
            </span>
          </div>

          <p className={styles['visit-closing-lead']}>
            Tennessee&apos;s story started here in 1790.
          </p>
          <h2 id="closing-heading" className={styles['visit-closing-headline']}>
            Come See Where It Began
          </h2>

          <div className={styles['visit-closing-cta-group']}>
            <a
              href="https://fareharbor.com/embeds/book/rockymountmuseum/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles['visit-closing-cta']} ${styles['visit-closing-cta--primary']} btn-medium`}
            >
              <span className={styles['visit-closing-cta-seal']} aria-hidden="true">
                ★
              </span>
              Book Your Tour
            </a>
            <Link
              href="/events"
              className={`${styles['visit-closing-cta']} ${styles['visit-closing-cta--secondary']} btn-medium`}
            >
              View 2026 Events
            </Link>
          </div>

          <p className={styles['visit-closing-tagline']}>
            Tennessee starts here. <em>Will you?</em>
          </p>

          {/* Bottom decorative rule */}
          <div
            className={`${styles['visit-closing-rule']} ${styles['visit-closing-rule--bottom']}`}
            aria-hidden="true"
          >
            <span className={styles['visit-closing-rule-line']} />
            <span className={styles['visit-closing-rule-star']}>★</span>
            <span className={styles['visit-closing-rule-line']} />
          </div>
        </div>
      </section>
    </>
  )
}
