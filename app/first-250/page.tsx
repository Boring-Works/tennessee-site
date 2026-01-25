import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import siteInfo from "@/data/siteInfo.json";

export const metadata: Metadata = {
  title: "First 250 Program",
  description:
    "Join 250 Tennesseans whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
  openGraph: {
    title: "First 250 Program | Tennessee Starts Here",
    description:
      "Join 250 Tennesseans whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
    url: "https://tennesseestartshere.com/first-250",
  },
};

// Current enrollment count (would be dynamic in production)
const CURRENT_ENROLLED = 147;
const TOTAL_SPOTS = 250;
const SPOTS_REMAINING = TOTAL_SPOTS - CURRENT_ENROLLED;
const PROGRESS_PERCENT = Math.round((CURRENT_ENROLLED / TOTAL_SPOTS) * 100);

export default function First250Page() {
  const { first250 } = siteInfo;

  // Tier names with emotional framing
  const tierFraming = [
    { name: "Participant", tagline: "Be counted" },
    { name: "Patron", tagline: "Be honored" },
    { name: "Founding Family", tagline: "Be remembered forever" },
  ];

  return (
    <>
      {/* ============================================
          HERO - Scarcity + Emotion
          ============================================ */}
      <section className="legacy-hero" aria-labelledby="legacy-heading">
        <div className="legacy-hero-content">
          {/* Eyebrow */}
          <p className="legacy-eyebrow">
            <time dateTime="2026-07-04">July 4, 2026</time> · America&apos;s 250th Birthday
          </p>

          {/* Main headline */}
          <h1 id="legacy-heading" className="legacy-headline">
            <span className="legacy-headline-small">Only</span>
            <span className="legacy-headline-large">250 Names</span>
          </h1>

          {/* Emotional hook */}
          <p className="legacy-hook">
            Your name, read aloud at Tennessee&apos;s first capital, on the day America turns 250.
          </p>

          {/* Progress bar - scarcity signal */}
          <div className="legacy-progress" role="progressbar" aria-valuenow={CURRENT_ENROLLED} aria-valuemin={0} aria-valuemax={TOTAL_SPOTS} aria-label="Enrollment progress">
            <div className="legacy-progress-bar">
              <div className="legacy-progress-fill" style={{ width: `${PROGRESS_PERCENT}%` }} />
            </div>
            <p className="legacy-progress-label">
              <strong>{CURRENT_ENROLLED}</strong> enrolled · <strong>{SPOTS_REMAINING}</strong> spots remaining
            </p>
          </div>

          {/* Early CTA */}
          <a href="#choose-your-legacy" className="legacy-hero-cta">
            Reserve Your Spot
          </a>

          {/* Deadline reminder */}
          <p className="legacy-deadline">
            Enrollment closes <time dateTime="2026-06-01">June 1, 2026</time>
          </p>
        </div>
      </section>

      {/* ============================================
          PICTURE THIS - Ceremony Visualization
          ============================================ */}
      <section className="legacy-vision" aria-labelledby="vision-heading">
        <div className="legacy-vision-inner">
          <h2 id="vision-heading" className="legacy-vision-headline">
            Picture This
          </h2>

          <div className="legacy-vision-scene">
            <p className="legacy-vision-text">
              It&apos;s <strong>July 4, 2026</strong>. You&apos;re standing on the grounds of Rocky Mount — the same soil where William Blount established Tennessee&apos;s first government 236 years ago.
            </p>
            <p className="legacy-vision-text">
              Around you, 250 Tennesseans have gathered. The American flag flies overhead. A voice begins to read names — and then you hear <em>yours</em>.
            </p>
            <p className="legacy-vision-text legacy-vision-text--emphasis">
              Your name, spoken aloud at a historic site, on the most significant Independence Day in 50 years.
            </p>
          </div>

          <p className="legacy-vision-question">
            Will your name be one of the 250?
          </p>
        </div>
      </section>

      {/* ============================================
          WHY THIS MATTERS - Historic Significance
          ============================================ */}
      <section className="legacy-why" aria-labelledby="why-heading">
        <div className="legacy-why-inner">
          <p className="legacy-why-eyebrow">Why This Matters</p>
          <h2 id="why-heading" className="legacy-why-headline">
            This Isn&apos;t Just Any Event
          </h2>

          <div className="legacy-why-grid">
            <article className="legacy-why-card">
              <span className="legacy-why-number" aria-hidden="true">1790</span>
              <h3 className="legacy-why-card-title">The First Capital</h3>
              <p className="legacy-why-card-text">
                Rocky Mount was the first seat of government west of the Appalachians. This is where Tennessee&apos;s story began.
              </p>
            </article>

            <article className="legacy-why-card">
              <span className="legacy-why-number" aria-hidden="true">250</span>
              <h3 className="legacy-why-card-title">A Once-in-Generations Moment</h3>
              <p className="legacy-why-card-text">
                America&apos;s 250th birthday happens once. Being part of this commemoration means joining a legacy.
              </p>
            </article>

            <article className="legacy-why-card">
              <span className="legacy-why-number" aria-hidden="true">You</span>
              <h3 className="legacy-why-card-title">Your Name in History</h3>
              <p className="legacy-why-card-text">
                The First 250 participants will be recorded as founding members of this commemoration — forever.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          CHOOSE YOUR LEGACY - Tiers
          ============================================ */}
      <section id="choose-your-legacy" className="legacy-tiers" aria-labelledby="tiers-heading">
        <div className="legacy-tiers-inner">
          <header className="legacy-tiers-header">
            <h2 id="tiers-heading" className="legacy-tiers-headline">
              Choose Your Legacy
            </h2>
            <p className="legacy-tiers-subtitle">
              Every participant&apos;s name will be read aloud. Choose how you&apos;ll be remembered.
            </p>

            {/* Repeated progress bar */}
            <div className="legacy-tiers-progress" role="progressbar" aria-valuenow={CURRENT_ENROLLED} aria-valuemin={0} aria-valuemax={TOTAL_SPOTS}>
              <div className="legacy-tiers-progress-bar">
                <div className="legacy-tiers-progress-fill" style={{ width: `${PROGRESS_PERCENT}%` }} />
              </div>
              <p className="legacy-tiers-progress-label">
                <strong>{SPOTS_REMAINING}</strong> of 250 spots remaining
              </p>
            </div>
          </header>

          <div className="legacy-tiers-grid">
            {first250.tiers.map((tier, index) => {
              const framing = tierFraming[index];
              const isFeatured = index === 1;

              return (
                <article
                  key={tier.name}
                  className={`legacy-tier ${isFeatured ? "legacy-tier--featured" : ""}`}
                >
                  {isFeatured && (
                    <p className="legacy-tier-badge">Most Popular</p>
                  )}

                  <header className="legacy-tier-header">
                    <p className="legacy-tier-tagline">{framing.tagline}</p>
                    <h3 className="legacy-tier-name">{framing.name}</h3>
                    <p className="legacy-tier-price">
                      {tier.price === 0 ? (
                        <span className="legacy-tier-price-free">Free</span>
                      ) : (
                        <>
                          <span className="legacy-tier-price-currency">$</span>
                          <span className="legacy-tier-price-amount">{tier.price}</span>
                        </>
                      )}
                    </p>
                  </header>

                  <ul className="legacy-tier-benefits">
                    {index === 0 && (
                      <>
                        <li className="legacy-tier-benefit legacy-tier-benefit--core">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Name read aloud July 4, 2026
                        </li>
                        <li className="legacy-tier-benefit">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Exclusive program updates
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li className="legacy-tier-benefit legacy-tier-benefit--inherited">
                          Everything in Participant, plus:
                        </li>
                        <li className="legacy-tier-benefit legacy-tier-benefit--core">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Commemorative certificate
                        </li>
                        <li className="legacy-tier-benefit">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Priority seating at ceremony
                        </li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li className="legacy-tier-benefit legacy-tier-benefit--inherited">
                          Everything in Patron, plus:
                        </li>
                        <li className="legacy-tier-benefit legacy-tier-benefit--core">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Founding Family dinner invitation
                        </li>
                        <li className="legacy-tier-benefit">
                          <svg className="legacy-tier-benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Permanent recognition at Rocky Mount
                        </li>
                      </>
                    )}
                  </ul>

                  <div className="legacy-tier-cta-wrapper">
                    {/* In production, these would link to enrollment forms */}
                    <button className="legacy-tier-cta" disabled aria-label={`Enroll as ${framing.name} - Coming March 4, 2026`}>
                      Enrollment Opens March 4
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          KEY DATES - Timeline
          ============================================ */}
      <section className="legacy-dates" aria-labelledby="dates-heading">
        <div className="legacy-dates-inner">
          <h2 id="dates-heading" className="legacy-dates-headline">
            Key Dates
          </h2>

          <ol className="legacy-dates-timeline">
            <li className="legacy-dates-item">
              <time dateTime="2026-03-04" className="legacy-dates-date">
                <span className="legacy-dates-month">Mar</span>
                <span className="legacy-dates-day">4</span>
              </time>
              <div className="legacy-dates-content">
                <p className="legacy-dates-label">Enrollment Opens</p>
                <p className="legacy-dates-desc">Be among the first to reserve your spot</p>
              </div>
            </li>

            <li className="legacy-dates-connector" aria-hidden="true" />

            <li className="legacy-dates-item legacy-dates-item--warning">
              <time dateTime="2026-06-01" className="legacy-dates-date">
                <span className="legacy-dates-month">Jun</span>
                <span className="legacy-dates-day">1</span>
              </time>
              <div className="legacy-dates-content">
                <p className="legacy-dates-label">Enrollment Closes</p>
                <p className="legacy-dates-desc">Final day to join the First 250</p>
              </div>
            </li>

            <li className="legacy-dates-connector" aria-hidden="true" />

            <li className="legacy-dates-item legacy-dates-item--highlight">
              <time dateTime="2026-07-04" className="legacy-dates-date">
                <span className="legacy-dates-month">Jul</span>
                <span className="legacy-dates-day">4</span>
              </time>
              <div className="legacy-dates-content">
                <p className="legacy-dates-label">The Ceremony</p>
                <p className="legacy-dates-desc">Your name read aloud at Rocky Mount</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ============================================
          EMAIL SIGNUP - Stay Informed
          ============================================ */}
      <section className="legacy-notify" aria-labelledby="notify-heading">
        <div className="legacy-notify-inner">
          <h2 id="notify-heading" className="legacy-notify-headline">
            Get Notified When Enrollment Opens
          </h2>
          <p className="legacy-notify-desc">
            Don&apos;t miss your chance. We&apos;ll email you the moment enrollment begins.
          </p>

          <div className="legacy-notify-form">
            <EmailSignup />
          </div>

          <p className="legacy-notify-privacy">
            One email when enrollment opens. No spam.
          </p>
        </div>
      </section>

      {/* ============================================
          FINAL CTA - Closing
          ============================================ */}
      <section className="legacy-closing" aria-labelledby="closing-heading">
        <div className="legacy-closing-inner">
          <p className="legacy-closing-question">250 years of America. 250 names.</p>
          <h2 id="closing-heading" className="legacy-closing-headline">
            Will yours be one of them?
          </h2>

          <div className="legacy-closing-progress" role="progressbar" aria-valuenow={CURRENT_ENROLLED} aria-valuemin={0} aria-valuemax={TOTAL_SPOTS}>
            <div className="legacy-closing-progress-bar">
              <div className="legacy-closing-progress-fill" style={{ width: `${PROGRESS_PERCENT}%` }} />
            </div>
            <p className="legacy-closing-progress-label">
              <strong>{SPOTS_REMAINING}</strong> spots remaining
            </p>
          </div>

          <a href="#choose-your-legacy" className="legacy-closing-cta">
            Reserve Your Spot
          </a>

          <Link href="/events#colonial-independence-day" className="legacy-closing-link">
            Learn more about Colonial Independence Day
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
