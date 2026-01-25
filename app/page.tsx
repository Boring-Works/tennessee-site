import Link from "next/link";
import Countdown from "@/components/Countdown";
import EmailSignup from "@/components/EmailSignup";
import eventsData from "@/data/events.json";

const featuredEvents = eventsData.events.filter((event) => event.featured);

export default function Home() {
  return (
    <>
      {/* THE 1790 WATERMARK - Always present, barely visible */}
      <div className="watermark-1790" aria-hidden="true">
        1790
      </div>

      {/* ============================================
          CINEMATIC HERO - Institutional Authority
          ============================================ */}
      <section className="hero-cinematic" aria-labelledby="hero-heading">
        {/* Atmospheric layers */}
        <div className="hero-gradient-overlay" />
        <div className="hero-grain" aria-hidden="true" />

        {/* Content */}
        <div className="hero-content">
          {/* Institutional kicker */}
          <p className="hero-kicker hero-animate" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            Tennessee State Historic Site
          </p>

          {/* THE HEADLINE */}
          <h1 id="hero-heading" className="hero-animate" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <span className="hero-headline-primary">Tennessee</span>
            <span className="hero-headline-accent">starts here</span>
          </h1>

          {/* Subheadline - value proposition */}
          <p className="hero-subheadline hero-animate" style={{ '--delay': '0.5s' } as React.CSSProperties}>
            The first capital of the Southwest Territory · Est. 1770
          </p>

          {/* Location badge */}
          <p className="hero-location hero-animate" style={{ '--delay': '0.6s' } as React.CSSProperties}>
            <svg className="hero-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Piney Flats, Tennessee
          </p>

          {/* Date block */}
          <div className="hero-date-block hero-animate" style={{ '--delay': '0.7s' } as React.CSSProperties}>
            <time dateTime="2026-07-04" className="hero-date">
              <span className="hero-date-month">July</span>
              <span className="hero-date-day">4</span>
              <span className="hero-date-year">2026</span>
            </time>
            <p className="hero-date-label">America&apos;s 250th Birthday</p>
            <div className="hero-countdown-inline">
              <Countdown />
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="hero-cta-group hero-animate" style={{ '--delay': '0.85s' } as React.CSSProperties}>
            <Link href="/visit" className="hero-cta hero-cta-primary">
              Plan Your Visit
            </Link>
            <Link href="/events" className="hero-cta hero-cta-secondary">
              Explore Events
            </Link>
          </div>

          {/* Institutional endorsement */}
          <p className="hero-endorsement hero-animate" style={{ '--delay': '1s' } as React.CSSProperties}>
            Part of the America 250 National Commemoration
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <span className="scroll-indicator-text">Scroll</span>
        </div>
      </section>

      {/* ============================================
          THE BLOUNT LETTER - Archival Document
          ============================================ */}
      <section className="blount-section" aria-labelledby="blount-heading">
        <div className="blount-document">
          {/* Decorative top rule */}
          <div className="blount-rule blount-rule-top" aria-hidden="true">
            <span className="blount-rule-corner" />
            <span className="blount-rule-line" />
            <span className="blount-rule-corner" />
          </div>

          {/* Document header */}
          <header className="blount-header">
            <p className="blount-recipient">Letter to President George Washington</p>
            <p className="blount-dateline">
              <span>Rocky Mount</span>
              <span className="blount-dateline-sep" aria-hidden="true">·</span>
              <time dateTime="1790-10-10">October 10, 1790</time>
            </p>
          </header>

          {/* The quote */}
          <blockquote className="blount-blockquote">
            <span className="blount-open-quote" aria-hidden="true">&ldquo;</span>
            <p id="blount-heading" className="blount-text">
              I have the honor to inform you that I arrived at this place on the 10th instant.
            </p>
          </blockquote>

          {/* Context line */}
          <p className="blount-context">
            With these words, William Blount established the first government west of the Appalachian Mountains.
          </p>

          {/* Attribution */}
          <footer className="blount-attribution">
            <cite className="blount-author">Governor William Blount</cite>
            <span className="blount-title">First Governor of the Southwest Territory</span>
          </footer>

          {/* Decorative bottom rule */}
          <div className="blount-rule blount-rule-bottom" aria-hidden="true">
            <span className="blount-rule-corner" />
            <span className="blount-rule-line" />
            <span className="blount-rule-corner" />
          </div>

          {/* Subtle CTA */}
          <Link href="/lectures" className="blount-cta">
            Explore Rocky Mount&apos;s founding story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ============================================
          THE STORY - Progressive Revelation
          ============================================ */}
      <section className="story-section" aria-labelledby="story-heading">
        <div className="story-container">
          {/* Section header with counter */}
          <header className="story-header">
            <p className="story-eyebrow">The Story</p>
            <h2 id="story-heading" className="story-headline">The Road to Tennessee</h2>
            <div className="story-counter">
              <span className="story-counter-number">26</span>
              <span className="story-counter-unit">Years</span>
            </div>
            <p className="story-counter-caption">From frontier settlement to American statehood</p>
          </header>

          {/* Progress bar */}
          <div className="story-progress" aria-hidden="true">
            <span className="story-progress-year">1770</span>
            <div className="story-progress-bar">
              <div className="story-progress-fill" />
              <span className="story-progress-marker story-progress-marker-1790" />
            </div>
            <span className="story-progress-year">1796</span>
          </div>

          {/* Timeline milestones */}
          <ol className="story-timeline" role="list" aria-label="Rocky Mount timeline">
            <li className="story-milestone">
              <span className="story-milestone-year">1770</span>
              <span className="story-milestone-label">Settlement</span>
              <p className="story-milestone-text">William Cobb stakes his claim on the Tennessee frontier.</p>
            </li>

            {/* THE 1790 MOMENT - Hero card */}
            <li className="story-milestone story-milestone-hero">
              <span className="story-milestone-year">1790</span>
              <span className="story-milestone-label">The First Capital</span>
              <blockquote className="story-milestone-quote">
                &ldquo;I have arrived at this place.&rdquo;
              </blockquote>
              <p className="story-milestone-text">
                Rocky Mount becomes the seat of the Southwest Territory. Tennessee&apos;s government begins here.
              </p>
            </li>

            <li className="story-milestone">
              <span className="story-milestone-year">1792</span>
              <span className="story-milestone-label">Transition</span>
              <p className="story-milestone-text">The capital moves to Knoxville; Rocky Mount&apos;s legacy endures.</p>
            </li>

            <li className="story-milestone">
              <span className="story-milestone-year">1796</span>
              <span className="story-milestone-label">Statehood</span>
              <p className="story-milestone-text">Tennessee joins the Union as the 16th state.</p>
            </li>
          </ol>

          {/* Closing with CTA */}
          <footer className="story-footer">
            <p className="story-footer-text">
              <strong>230 years later</strong>, we remember where it started.
            </p>
            <Link href="/events" className="story-footer-cta">
              Join the Celebration
              <span aria-hidden="true">→</span>
            </Link>
          </footer>
        </div>
      </section>

      {/* ============================================
          FEATURED EVENTS - The Gathering
          ============================================ */}
      <section className="gathering-section" aria-labelledby="gathering-heading">
        <div className="gathering-container">
          {/* Opening statement */}
          <p className="gathering-statement">
            On <time dateTime="2026-07-04">July 4, 2026</time>, Tennessee gathers at the place where it all began.
          </p>

          {/* The Signature Event */}
          <article className="gathering-event" aria-labelledby="gathering-heading">
            {/* Monumental date */}
            <div className="gathering-date" aria-hidden="true">
              <span className="gathering-date-month">July</span>
              <span className="gathering-date-day">4</span>
              <span className="gathering-date-year">2026</span>
            </div>

            {/* Event details */}
            <div className="gathering-details">
              <p className="gathering-badge">America&apos;s 250th Birthday</p>
              <h2 id="gathering-heading" className="gathering-title">Colonial Independence Day</h2>
              <p className="gathering-time">10:00 AM – 4:00 PM · Rocky Mount</p>
            </div>

            {/* The ceremony hook */}
            <div className="gathering-hook">
              <p className="gathering-hook-text">
                <strong>250 names</strong> will be read aloud — yours could be one of them.
              </p>

              {/* Enrollment progress */}
              <div className="gathering-progress" role="progressbar" aria-valuenow={147} aria-valuemin={0} aria-valuemax={250} aria-label="First 250 enrollment progress">
                <div className="gathering-progress-bar">
                  <div className="gathering-progress-fill" style={{ width: '59%' }} />
                </div>
                <p className="gathering-progress-label">
                  <strong>147</strong> of 250 spots claimed
                </p>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="gathering-cta-group">
              <Link href="/first-250" className="gathering-cta gathering-cta-primary">
                Join the First 250
              </Link>
              <Link href="/events#colonial-independence-day" className="gathering-cta gathering-cta-secondary">
                See Full Event Details
              </Link>
            </div>
          </article>

          {/* Supporting Events */}
          <div className="gathering-more">
            <h3 className="gathering-more-header">More 2026 Events</h3>

            <div className="gathering-more-grid">
              {featuredEvents
                .filter((e) => e.id !== "colonial-independence-day")
                .slice(0, 3)
                .map((event) => (
                  <Link key={event.id} href={`/events#${event.id}`} className="gathering-event-card">
                    <time dateTime={event.date} className="gathering-event-date">
                      {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <h4 className="gathering-event-title">{event.title}</h4>
                    <p className="gathering-event-desc">
                      {event.description.split(". ")[0]}.
                    </p>
                  </Link>
                ))}
            </div>

            {/* Footer */}
            <footer className="gathering-footer">
              <p className="gathering-footer-count">17 events throughout 2026</p>
              <Link href="/events" className="gathering-footer-cta">
                View Full Calendar
                <span aria-hidden="true">→</span>
              </Link>
            </footer>
          </div>
        </div>
      </section>

      {/* ============================================
          THE DECISION POINT - Choose Your Path
          ============================================ */}
      <section className="decision-section" aria-labelledby="decision-heading">
        <div className="decision-container">
          <h2 id="decision-heading" className="decision-headline">
            How Will You Be Part of History?
          </h2>

          <div className="decision-grid">
            {/* Option 1: Join the First 250 */}
            <article className="decision-card decision-card-primary">
              <div className="decision-card-badge">Recommended</div>
              <h3 className="decision-card-title">Be One of 250</h3>
              <p className="decision-card-desc">
                Your name, read aloud on America&apos;s 250th birthday at Tennessee&apos;s first capital.
              </p>

              {/* Progress bar */}
              <div className="decision-progress" role="progressbar" aria-valuenow={147} aria-valuemin={0} aria-valuemax={250}>
                <div className="decision-progress-bar">
                  <div className="decision-progress-fill" style={{ width: '59%' }} />
                </div>
                <p className="decision-progress-label">
                  <strong>147</strong> of 250 spots claimed
                </p>
              </div>

              <Link href="/first-250" className="decision-cta decision-cta-primary">
                Join the First 250
              </Link>
            </article>

            {/* Divider */}
            <div className="decision-divider" aria-hidden="true">
              <span>or</span>
            </div>

            {/* Option 2: Stay Informed */}
            <article className="decision-card decision-card-secondary">
              <h3 className="decision-card-title">Stay Informed</h3>
              <p className="decision-card-desc">
                Get event updates and enrollment reminders delivered to your inbox.
              </p>

              <div className="decision-form">
                <EmailSignup />
              </div>

              <p className="decision-privacy">No spam. Unsubscribe anytime.</p>
            </article>
          </div>

          {/* Shared deadline */}
          <footer className="decision-footer">
            <p className="decision-deadline">
              <svg className="decision-deadline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Enrollment closes <time dateTime="2026-06-01">June 1, 2026</time></span>
            </p>
          </footer>
        </div>
      </section>

      {/* ============================================
          THE HOMECOMING - Final Section
          ============================================ */}
      <section className="homecoming-section" aria-labelledby="homecoming-heading">
        <div className="homecoming-container">
          {/* Location eyebrow */}
          <p className="homecoming-eyebrow">
            <svg className="homecoming-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            200 Hyder Hill Road · Piney Flats, Tennessee
          </p>

          {/* Headline */}
          <h2 id="homecoming-heading" className="homecoming-headline">
            This Is Where It Started
          </h2>

          {/* Experiential hook */}
          <p className="homecoming-hook">
            Walk the same grounds as William Blount. Meet costumed interpreters living as 1790 settlers. Stand where Tennessee&apos;s government first convened.
          </p>

          {/* Location card */}
          <div className="homecoming-location">
            <p className="homecoming-location-name">Rocky Mount State Historic Site</p>
            <p className="homecoming-location-distances">
              30 min from Johnson City · 45 min from Knoxville
            </p>
            <a
              href="https://maps.google.com/?q=200+Hyder+Hill+Rd+Piney+Flats+TN"
              target="_blank"
              rel="noopener noreferrer"
              className="homecoming-location-link"
            >
              View on Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Info bar */}
          <div className="homecoming-info">
            <div className="homecoming-info-item">
              <span className="homecoming-info-label">Hours</span>
              <span>Tue–Sat 10am–5pm · Sun 1pm–5pm</span>
            </div>
            <div className="homecoming-info-divider" aria-hidden="true" />
            <div className="homecoming-info-item">
              <span className="homecoming-info-label">Admission</span>
              <span>Adults $8 · Children $5 · Under 6 free</span>
            </div>
          </div>

          {/* Single CTA */}
          <Link href="/visit" className="homecoming-cta">
            Visit Rocky Mount
          </Link>

          {/* Closing tagline */}
          <p className="homecoming-closing">
            Tennessee starts here. <em>Will you?</em>
          </p>
        </div>
      </section>
    </>
  );
}
