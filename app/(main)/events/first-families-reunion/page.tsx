import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingButton } from '@/components/booking'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'First Families of Tennessee Reunion | Tennessee Starts Here',
  description:
    'Your family built Tennessee. Now come home. The first-ever gathering of descendants from founding families—Cobbs, Shelbys, Seviers. September 11-13, 2026 at Rocky Mount.',
  openGraph: {
    title: 'First Families of Tennessee Reunion | Tennessee Starts Here',
    description:
      'Your family built Tennessee. Now come home. The first-ever gathering of descendants from founding families at Rocky Mount.',
    url: 'https://tennesseestartshere.com/events/first-families-reunion',
  },
}

// Known founding family surnames for "Am I a First Family?" section
const FOUNDING_FAMILIES = [
  'Cobb',
  'Sevier',
  'Shelby',
  'Robertson',
  'Blount',
  'Jackson',
  'White',
  'Ramsey',
  'Henderson',
  'Bean',
  'Carter',
  'Taylor',
  'Campbell',
  'Preston',
  'McDowell',
  'Tipton',
  'Love',
  'Christian',
  'Anderson',
  'Dunham',
  'Lane',
] as const

export default function FirstFamiliesReunionPage() {
  return (
    <>
      {/* ============================================
          HERO - Emotional Homecoming
          ============================================ */}
      <section className={styles['reunion-hero']} aria-labelledby="reunion-heading">
        <div className={styles['reunion-hero-content']}>
          {/* Eyebrow */}
          <p className={styles['reunion-eyebrow']}>
            <time dateTime="2026-09-11">September 11–13, 2026</time> · Rocky Mount State Historic
            Site
          </p>

          {/* Main headline */}
          <h1 id="reunion-heading" className={styles['reunion-headline']}>
            <span className={styles['reunion-headline-small']}>Your Family Built Tennessee.</span>
            <span className={styles['reunion-headline-large']}>Now Come Home.</span>
          </h1>

          {/* Emotional hook */}
          <p className={styles['reunion-hook']}>
            The first-ever gathering of descendants from Tennessee&apos;s founding families. Three
            days of genealogy, oral histories, and stories passed down through 236 years.
          </p>

          {/* Scarcity signal */}
          <p className={styles['reunion-scarcity']}>
            <strong>First-time event.</strong> Friday Heritage Evening limited to registered
            descendants.
          </p>

          {/* CTA */}
          <div className={styles['reunion-hero-cta-group']}>
            <BookingButton
              itemId="562813"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562813/"
              className={styles['reunion-hero-cta']}
              eventData={{
                id: 'first-families-reunion',
                title: 'First Families of Tennessee Reunion',
                fareHarborId: '562813',
                pricing: {
                  adult: 2500,
                  senior: 2000,
                  child: 1500,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Heritage
            </BookingButton>
            <a href="#am-i-first-family" className={styles['reunion-hero-cta-secondary']}>
              Am I a First Family?
            </a>
          </div>

          {/* Signature badge */}
          <p className={styles['reunion-badge']}>
            <span className={styles['reunion-badge-icon']} aria-hidden="true">
              ★
            </span>
            Signature Event
          </p>
        </div>
      </section>

      {/* ============================================
          PICTURE THIS - The Moment
          ============================================ */}
      <section className={styles['reunion-vision']} aria-labelledby="vision-heading">
        <div className={styles['reunion-vision-inner']}>
          <h2 id="vision-heading" className={styles['reunion-vision-headline']}>
            The Homecoming
          </h2>

          <div className={styles['reunion-vision-scene']}>
            <p className={styles['reunion-vision-text']}>
              You&apos;re standing on the same ground where your ancestors stood 236 years ago.
              Around you are cousins you&apos;ve never met—descendants of the same brave men and
              women who carved Tennessee from the wilderness.
            </p>
            <p className={styles['reunion-vision-text']}>
              Someone shares a story passed down through seven generations. Another pulls out a
              tattered family Bible. The genealogist finds a connection you never knew existed.
            </p>
            <p
              className={`${styles['reunion-vision-text']} ${styles['reunion-vision-text--emphasis']}`}
            >
              This is more than a reunion. This is a homecoming—236 years in the making.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          AM I A FIRST FAMILY - Surname Check
          ============================================ */}
      <section
        id="am-i-first-family"
        className={styles['reunion-surnames']}
        aria-labelledby="surnames-heading"
      >
        <div className={styles['reunion-surnames-inner']}>
          <p className={styles['reunion-surnames-eyebrow']}>Do You Belong?</p>
          <h2 id="surnames-heading" className={styles['reunion-surnames-headline']}>
            Am I a First Family?
          </h2>
          <p className={styles['reunion-surnames-intro']}>
            If your family tree includes any of these surnames, you may be descended from
            Tennessee&apos;s founding generation. Don&apos;t see your name? You may still qualify—
            our genealogists can help you trace your roots.
          </p>

          <div className={styles['reunion-surnames-grid']}>
            {FOUNDING_FAMILIES.map((name) => (
              <span key={name} className={styles['reunion-surname']}>
                {name}
              </span>
            ))}
            <span className={`${styles['reunion-surname']} ${styles['reunion-surname--more']}`}>
              + many more
            </span>
          </div>

          <p className={styles['reunion-surnames-note']}>
            Not sure if you qualify?{' '}
            <a href="tel:+14235387396" className={styles['reunion-surnames-link']}>
              Call (423) 538-7396
            </a>{' '}
            and we&apos;ll help you research your connection.
          </p>
        </div>
      </section>

      {/* ============================================
          WEEKEND SCHEDULE
          ============================================ */}
      <section className={styles['reunion-schedule']} aria-labelledby="schedule-heading">
        <div className={styles['reunion-schedule-inner']}>
          <h2 id="schedule-heading" className={styles['reunion-schedule-headline']}>
            Three Days. Generations of Stories.
          </h2>

          <div className={styles['reunion-schedule-grid']}>
            {/* Friday */}
            <article className={styles['reunion-day']}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-09-11" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Friday</span>
                  <span className={styles['reunion-day-number']}>Sep 11</span>
                </time>
                <span className={styles['reunion-day-badge']}>Descendants Only</span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Heritage Evening</h3>
                <ul className={styles['reunion-day-list']}>
                  <li>5:00 PM — Registration & welcome reception</li>
                  <li>6:00 PM — Oral history circle (share your family&apos;s stories)</li>
                  <li>7:30 PM — Candlelit dinner on the grounds</li>
                </ul>
                <p className={styles['reunion-day-note']}>
                  This intimate evening is reserved for registered descendants only.
                </p>
              </div>
            </article>

            {/* Saturday */}
            <article className={`${styles['reunion-day']} ${styles['reunion-day--featured']}`}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-09-12" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Saturday</span>
                  <span className={styles['reunion-day-number']}>Sep 12</span>
                </time>
                <span
                  className={`${styles['reunion-day-badge']} ${styles['reunion-day-badge--public']}`}
                >
                  Open to All
                </span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Genealogy Day</h3>
                <ul className={styles['reunion-day-list']}>
                  <li>10:00 AM — Grounds open to the public</li>
                  <li>10:30 AM — Genealogy help desk opens (bring your records!)</li>
                  <li>1:00 PM — &ldquo;Tracing Tennessee Roots&rdquo; workshop</li>
                  <li>3:00 PM — Family photo archive viewing</li>
                  <li>5:00 PM — Descendants ceremony at the Cobb cabin</li>
                </ul>
              </div>
            </article>

            {/* Sunday */}
            <article className={styles['reunion-day']}>
              <header className={styles['reunion-day-header']}>
                <time dateTime="2026-09-13" className={styles['reunion-day-date']}>
                  <span className={styles['reunion-day-weekday']}>Sunday</span>
                  <span className={styles['reunion-day-number']}>Sep 13</span>
                </time>
                <span
                  className={`${styles['reunion-day-badge']} ${styles['reunion-day-badge--public']}`}
                >
                  Open to All
                </span>
              </header>
              <div className={styles['reunion-day-content']}>
                <h3 className={styles['reunion-day-title']}>Stories & Celebration</h3>
                <ul className={styles['reunion-day-list']}>
                  <li>11:00 AM — Period worship service (optional)</li>
                  <li>12:30 PM — Founding families luncheon</li>
                  <li>2:00 PM — Living history demonstrations</li>
                  <li>4:00 PM — Closing ceremony & group photo</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT TO BRING
          ============================================ */}
      <section className={styles['reunion-bring']} aria-labelledby="bring-heading">
        <div className={styles['reunion-bring-inner']}>
          <h2 id="bring-heading" className={styles['reunion-bring-headline']}>
            What to Bring
          </h2>

          <div className={styles['reunion-bring-grid']}>
            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                📜
              </span>
              <h3 className={styles['reunion-bring-title']}>Family Documents</h3>
              <p className={styles['reunion-bring-text']}>
                Family Bibles with birth/death records, letters and correspondence pre-1850, land
                grants and deeds, military records (Revolutionary War, War of 1812), and marriage
                certificates. Our genealogists will help verify connections.
              </p>
            </div>

            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                📖
              </span>
              <h3 className={styles['reunion-bring-title']}>Your Stories</h3>
              <p className={styles['reunion-bring-text']}>
                Oral histories are preserved and recorded. What did your grandparents tell you?
              </p>
            </div>

            <div className={styles['reunion-bring-item']}>
              <span className={styles['reunion-bring-icon']} aria-hidden="true">
                👟
              </span>
              <h3 className={styles['reunion-bring-title']}>Walking Shoes</h3>
              <p className={styles['reunion-bring-text']}>
                Explore the same paths your ancestors traveled 236 years ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIAL / EMOTIONAL PULL
          ============================================ */}
      <section className={styles['reunion-quote']}>
        <div className={styles['reunion-quote-inner']}>
          <blockquote className={styles['reunion-blockquote']} aria-label="Visitor testimonial">
            <p className={styles['reunion-quote-text']}>
              &ldquo;It was like you got teleported back in time. The way the buildings are stocked
              and furnished is incredibly convincing—Rocky Mount looks like a place where people
              actually live. There is so much history here.&rdquo;
            </p>
            <footer className={styles['reunion-quote-footer']}>
              <cite className={styles['reunion-quote-cite']}>
                — Rocky Mount visitor, TripAdvisor
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className={styles['reunion-faq']} aria-labelledby="faq-heading">
        <div className={styles['reunion-faq-inner']}>
          <h2 id="faq-heading" className={styles['reunion-faq-headline']}>
            Questions?
          </h2>

          <div
            className={styles['reunion-faq-grid']}
            role="region"
            aria-label="Frequently asked questions"
          >
            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q1" className={styles['reunion-faq-question']}>
                Do I need to prove my ancestry to attend?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q1">
                Friday&apos;s Heritage Evening requires descendant registration. Saturday and Sunday
                are open to everyone—even if you&apos;re just curious about Tennessee history. Our
                genealogists can help verify connections at the event.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q2" className={styles['reunion-faq-question']}>
                What if I&apos;m not sure about my family history?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q2">
                That&apos;s exactly why we have genealogy experts on site. Bring whatever documents
                you have—birth certificates, old photos, family Bibles—and they&apos;ll help you
                trace your roots.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q3" className={styles['reunion-faq-question']}>
                Is this event suitable for children?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q3">
                Absolutely. Saturday and Sunday include activities for all ages. Children under 5
                attend free. It&apos;s a meaningful way to teach the next generation about their
                heritage.
              </p>
            </details>

            <details className={styles['reunion-faq-item']}>
              <summary id="reunion-faq-q4" className={styles['reunion-faq-question']}>
                Where should I stay?
              </summary>
              <p className={styles['reunion-faq-answer']} aria-labelledby="reunion-faq-q4">
                Hotels in Johnson City and Kingsport are 15-20 minutes away. We&apos;ll provide a
                list of recommended accommodations when you register.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className={styles['reunion-closing']} aria-labelledby="closing-heading">
        <div className={styles['reunion-closing-inner']}>
          <p className={styles['reunion-closing-question']}>236 years of family history.</p>
          <h2 id="closing-heading" className={styles['reunion-closing-headline']}>
            Isn&apos;t It Time You Came Home?
          </h2>
          <p className={styles['reunion-closing-subtext']}>
            Three days to reconnect with your roots, meet cousins you never knew existed, and walk
            the same paths your ancestors traveled—all while making new memories with people who
            share your blood and your history.
          </p>

          <div className={styles['reunion-closing-cta-group']}>
            <BookingButton
              itemId="562813"
              fallbackUrl="https://fareharbor.com/rockymountmuseum/items/562813/"
              className={styles['reunion-closing-cta']}
              eventData={{
                id: 'first-families-reunion',
                title: 'First Families of Tennessee Reunion',
                fareHarborId: '562813',
                pricing: {
                  adult: 2500,
                  senior: 2000,
                  child: 1500,
                  underFive: 0,
                  members: 0,
                },
              }}
            >
              Claim Your Heritage
            </BookingButton>
            <p className={styles['reunion-closing-note']}>
              Adult $25 · Senior $20 · Child $15 · Under 5 Free
            </p>
          </div>

          <p className={styles['reunion-closing-contact']}>
            Questions? Call{' '}
            <a href="tel:+14235387396" className={styles['reunion-closing-link']}>
              (423) 538-7396
            </a>
          </p>

          <Link href="/events" className={styles['reunion-closing-back']}>
            <span aria-hidden="true">←</span> Back to All Events
          </Link>
        </div>
      </section>
    </>
  )
}
