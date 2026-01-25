import type { Metadata } from "next";
import Link from "next/link";
import siteInfo from "@/data/siteInfo.json";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Visit Rocky Mount State Historic Site—Tennessee's first capital. Walk where William Blount and Andrew Jackson walked. Living history tours daily.",
  openGraph: {
    title: "Plan Your Visit | Tennessee Starts Here",
    description:
      "Visit Rocky Mount State Historic Site—Tennessee's first capital. Walk where William Blount and Andrew Jackson walked. Living history tours daily.",
    url: "https://tennesseestartshere.com/visit",
  },
};

// Historical figures for the "Who Walked Here" section
const historicalFigures = [
  {
    name: "William Blount",
    title: "Governor of the Southwest Territory",
    years: "1790–1796",
    hook: "Signed the U.S. Constitution. Appointed by George Washington. Made Rocky Mount his headquarters.",
    highlight: "Constitution Signer",
  },
  {
    name: "Andrew Jackson",
    title: "Future 7th President",
    years: "1788",
    hook: "Lodged at Rocky Mount for six weeks while awaiting his law license. He was 21 years old.",
    highlight: "Future President",
  },
  {
    name: "William Cobb",
    title: "Original Settler",
    years: "c. 1770",
    hook: "Staked his claim on this land six years before the Declaration of Independence was signed.",
    highlight: "Pioneer",
  },
];

// Tour experience highlights
const experienceHighlights = [
  {
    moment: "Meet Mary Cobb",
    description: "At the weaving cabin, learn the skills that kept frontier families clothed and warm.",
  },
  {
    moment: "Enter the Cobb House",
    description: "Walk through the same door William Blount walked through in 1790.",
  },
  {
    moment: "See the Kitchen",
    description: "Discover how meals were prepared over open hearths—the same way they were 230 years ago.",
  },
  {
    moment: "Watch Demonstrations",
    description: "Costumed interpreters show blacksmithing, weaving, and frontier crafts (varies by day).",
  },
];

// Heritage Trail - nearby historic sites with narrative connection
const heritageTrail = [
  {
    name: "Sycamore Shoals State Historic Park",
    distance: "30 min",
    connection: "Where the Overmountain Men gathered before Kings Mountain",
  },
  {
    name: "Downtown Bristol (State Street)",
    distance: "20 min",
    connection: "Birthplace of Country Music",
  },
  {
    name: "Downtown Johnson City",
    distance: "20 min",
    connection: "Historic downtown with local dining",
  },
];

export default function VisitPage() {
  const { location, hours, admission, whatToExpect, contact } = siteInfo;

  return (
    <>
      {/* ============================================
          HERO - Heritage Significance
          ============================================ */}
      <section className="visit-hero" aria-labelledby="visit-heading">
        <div className="visit-hero-content">
          {/* Establishment badge */}
          <p className="visit-hero-badge">
            <span className="visit-hero-badge-year">Est. 1770</span>
            <span className="visit-hero-badge-sep" aria-hidden="true">·</span>
            <span>Tennessee State Historic Site</span>
          </p>

          {/* Main headline */}
          <h1 id="visit-heading" className="visit-hero-headline">
            <span className="visit-hero-headline-small">Stand Where</span>
            <span className="visit-hero-headline-large">Tennessee Began</span>
          </h1>

          {/* Significance statement */}
          <p className="visit-hero-significance">
            The first seat of government west of the Appalachian Mountains.
          </p>

          {/* Experience promise */}
          <p className="visit-hero-promise">
            History isn&apos;t behind glass here. Costumed interpreters bring 1790 to life on the same grounds where William Blount governed and Andrew Jackson once stayed.
          </p>

          {/* Quick facts row */}
          <div className="visit-hero-facts">
            <div className="visit-hero-fact">
              <span className="visit-hero-fact-value">~1 hr</span>
              <span className="visit-hero-fact-label">Tour</span>
            </div>
            <div className="visit-hero-fact-divider" aria-hidden="true" />
            <div className="visit-hero-fact">
              <span className="visit-hero-fact-value">${admission.adults.price}</span>
              <span className="visit-hero-fact-label">Adults</span>
            </div>
            <div className="visit-hero-fact-divider" aria-hidden="true" />
            <div className="visit-hero-fact">
              <span className="visit-hero-fact-value">Tue–Sun</span>
              <span className="visit-hero-fact-label">Open</span>
            </div>
          </div>

          {/* Primary CTA */}
          <a
            href="https://fareharbor.com/embeds/book/rockymountmuseum/"
            target="_blank"
            rel="noopener noreferrer"
            className="visit-hero-cta"
          >
            Book Your Tour
          </a>

          {/* Secondary link */}
          <a href="#plan-your-visit" className="visit-hero-scroll">
            View hours &amp; admission
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ============================================
          WHO WALKED HERE - Historical Figures
          ============================================ */}
      <section className="visit-figures" aria-labelledby="figures-heading">
        <div className="visit-figures-inner">
          <header className="visit-figures-header">
            <p className="visit-figures-eyebrow">Hallowed Ground</p>
            <h2 id="figures-heading" className="visit-figures-headline">
              Who Walked These Grounds
            </h2>
            <p className="visit-figures-intro">
              Before this was a museum, it was the center of frontier government. These walls remember.
            </p>
          </header>

          <div className="visit-figures-grid">
            {historicalFigures.map((figure) => (
              <article key={figure.name} className="visit-figure">
                <span className="visit-figure-highlight">{figure.highlight}</span>
                <h3 className="visit-figure-name">{figure.name}</h3>
                <p className="visit-figure-title">
                  {figure.title}
                  <span className="visit-figure-years">{figure.years}</span>
                </p>
                <p className="visit-figure-hook">{figure.hook}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          THE EXPERIENCE - Living History Preview
          ============================================ */}
      <section className="visit-experience" aria-labelledby="experience-heading">
        <div className="visit-experience-inner">
          <header className="visit-experience-header">
            <p className="visit-experience-eyebrow">Your Visit</p>
            <h2 id="experience-heading" className="visit-experience-headline">
              More Than a Museum
            </h2>
            <p className="visit-experience-intro">
              This isn&apos;t a self-guided walk past dusty displays. It&apos;s a guided journey through living history, led by interpreters in period dress who bring 1790 to life.
            </p>
          </header>

          <div className="visit-experience-grid">
            {experienceHighlights.map((highlight, index) => (
              <article key={highlight.moment} className="visit-moment">
                <span className="visit-moment-number" aria-hidden="true">{index + 1}</span>
                <h3 className="visit-moment-title">{highlight.moment}</h3>
                <p className="visit-moment-desc">{highlight.description}</p>
              </article>
            ))}
          </div>

          <footer className="visit-experience-footer">
            <p className="visit-experience-note">
              Tour duration approximately 1 hour. Last tour begins one hour before closing.
            </p>
          </footer>
        </div>
      </section>

      {/* ============================================
          EXPEDITION DATA - Practical Info (Field Briefing Style)
          ============================================ */}
      <section id="plan-your-visit" className="visit-practical" aria-labelledby="practical-heading">
        <div className="visit-practical-inner">
          <p className="visit-practical-eyebrow">Expedition Data</p>
          <h2 id="practical-heading" className="visit-practical-headline">
            Your Field Briefing
          </h2>

          <div className="visit-practical-grid">
            {/* Hours Card */}
            <div className="visit-card">
              <h3 className="visit-card-title">
                <svg className="visit-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Hours
              </h3>
              <dl className="visit-hours">
                <div className="visit-hours-row">
                  <dt>Tuesday – Saturday</dt>
                  <dd>{hours.regular.tuesday}</dd>
                </div>
                <div className="visit-hours-row">
                  <dt>Sunday</dt>
                  <dd>{hours.regular.sunday}</dd>
                </div>
                <div className="visit-hours-row visit-hours-row--closed">
                  <dt>Monday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
              <p className="visit-card-note">{hours.note}</p>
            </div>

            {/* Admission Card */}
            <div className="visit-card">
              <h3 className="visit-card-title">
                <svg className="visit-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Admission
              </h3>
              <dl className="visit-admission">
                <div className="visit-admission-row">
                  <dt>{admission.adults.label}</dt>
                  <dd>${admission.adults.price}</dd>
                </div>
                <div className="visit-admission-row">
                  <dt>{admission.seniors.label}</dt>
                  <dd>${admission.seniors.price}</dd>
                </div>
                <div className="visit-admission-row">
                  <dt>{admission.children.label}</dt>
                  <dd>${admission.children.price}</dd>
                </div>
                <div className="visit-admission-row">
                  <dt>{admission.childrenFree.label}</dt>
                  <dd className="visit-admission-free">Free</dd>
                </div>
              </dl>
              <p className="visit-card-note">{admission.note}</p>
            </div>

            {/* Book Tour Card - Featured */}
            <div className="visit-card visit-card--featured">
              <h3 className="visit-card-title">Book Your Tour</h3>
              <p className="visit-book-desc">
                Reserve your spot for a guided living history experience.
              </p>
              <ul className="visit-book-includes">
                <li>Guided tour with costumed interpreters</li>
                <li>Access to all historic buildings</li>
                <li>Craft demonstrations (varies by day)</li>
                <li>Gift shop visit</li>
              </ul>
              <a
                href="https://fareharbor.com/embeds/book/rockymountmuseum/"
                target="_blank"
                rel="noopener noreferrer"
                className="visit-book-btn"
              >
                Book Now
                <span aria-hidden="true">→</span>
              </a>
              <p className="visit-book-note">
                Walk-ins welcome when space allows
              </p>
            </div>
          </div>

          {/* Before You Arrive - Field Prep */}
          <div className="visit-prepare">
            <h3 className="visit-prepare-title">Field Preparation</h3>
            <ul className="visit-prepare-list">
              {whatToExpect.recommendations.map((rec, index) => (
                <li key={index} className="visit-prepare-item">
                  <svg className="visit-prepare-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
            <p className="visit-prepare-accessibility">
              <strong>Accessibility:</strong> {whatToExpect.accessibility}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          YOUR ROUTE - Directions (Expedition Style)
          ============================================ */}
      <section className="visit-journey" aria-labelledby="journey-heading">
        <div className="visit-journey-inner">
          <header className="visit-journey-header">
            <p className="visit-journey-eyebrow">Navigation</p>
            <h2 id="journey-heading" className="visit-journey-headline">
              Your Route to 1790
            </h2>
            <p className="visit-journey-intro">
              Follow the same paths settlers once traveled. Rocky Mount awaits at the crossroads of history.
            </p>
          </header>

          <div className="visit-journey-content">
            {/* Address Card */}
            <div className="visit-journey-address">
              <address className="visit-address">
                <strong>Rocky Mount State Historic Site</strong>
                <span>{location.address.street}</span>
                <span>{location.address.city}, {location.address.state} {location.address.zip}</span>
              </address>

              <p className="visit-journey-directions">
                {location.directions}
              </p>

              <div className="visit-journey-actions">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-journey-btn visit-journey-btn--primary"
                >
                  Get Directions
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                  className="visit-journey-btn visit-journey-btn--secondary"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Distance indicators */}
            <div className="visit-journey-distances">
              <p className="visit-journey-distance">
                <span className="visit-journey-distance-time">20 min</span>
                <span className="visit-journey-distance-from">from Johnson City</span>
              </p>
              <p className="visit-journey-distance">
                <span className="visit-journey-distance-time">20 min</span>
                <span className="visit-journey-distance-from">from Bristol</span>
              </p>
              <p className="visit-journey-distance">
                <span className="visit-journey-distance-time">45 min</span>
                <span className="visit-journey-distance-from">from Knoxville</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HERITAGE TRAIL - Nearby Historic Sites
          ============================================ */}
      <section className="visit-trail" aria-labelledby="trail-heading">
        <div className="visit-trail-inner">
          <header className="visit-trail-header">
            <p className="visit-trail-eyebrow">Make It a Day</p>
            <h2 id="trail-heading" className="visit-trail-headline">
              The Heritage Trail
            </h2>
            <p className="visit-trail-intro">
              Rocky Mount is part of a larger story. These nearby sites complete the picture of frontier Tennessee.
            </p>
          </header>

          <div className="visit-trail-grid">
            {heritageTrail.map((site) => (
              <article key={site.name} className="visit-trail-site">
                <div className="visit-trail-site-header">
                  <h3 className="visit-trail-site-name">{site.name}</h3>
                  <span className="visit-trail-site-distance">{site.distance}</span>
                </div>
                <p className="visit-trail-site-connection">{site.connection}</p>
              </article>
            ))}
          </div>

          <p className="visit-trail-cta-text">
            Visiting from out of town? The Tri-Cities area offers plenty of lodging and dining options.
          </p>
        </div>
      </section>

      {/* ============================================
          CONTACT - Groups & Schools
          ============================================ */}
      <section className="visit-groups" aria-labelledby="groups-heading">
        <div className="visit-groups-inner">
          <div className="visit-groups-content">
            <h2 id="groups-heading" className="visit-groups-headline">
              Bringing a Group?
            </h2>
            <p className="visit-groups-desc">
              School field trips, scout troops, family reunions, and groups of 10+ receive special rates. Educational programs available for all ages.
            </p>
          </div>

          <div className="visit-groups-actions">
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
              className="visit-groups-btn visit-groups-btn--primary"
            >
              Call {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="visit-groups-btn visit-groups-btn--secondary"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          CLOSING - Emotional CTA
          ============================================ */}
      <section className="visit-closing" aria-labelledby="closing-heading">
        <div className="visit-closing-inner">
          <p className="visit-closing-lead">
            Tennessee&apos;s story started here in 1770.
          </p>
          <h2 id="closing-heading" className="visit-closing-headline">
            Come See Where It Began
          </h2>

          <div className="visit-closing-cta-group">
            <a
              href="https://fareharbor.com/embeds/book/rockymountmuseum/"
              target="_blank"
              rel="noopener noreferrer"
              className="visit-closing-cta visit-closing-cta--primary"
            >
              Book Your Tour
            </a>
            <Link href="/events" className="visit-closing-cta visit-closing-cta--secondary">
              View 2026 Events
            </Link>
          </div>

          <p className="visit-closing-tagline">
            Tennessee starts here. <em>Will you?</em>
          </p>
        </div>
      </section>
    </>
  );
}
