import Link from "next/link";
import Countdown from "@/components/Countdown";
import ExperiencePreview from "@/components/ExperiencePreview";
import EventsShowcase from "@/components/EventsShowcase";
import LedgerSection from "@/components/LedgerSection";
import StorySection from "@/components/StorySection";
import HomecomingSection from "@/components/HomecomingSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main id="main-content">
      {/* THE 1790 WATERMARK - Parallax depth effect */}
      <div className={styles["watermark-1790"]} aria-hidden="true">
        1790
      </div>

      {/* ============================================
          CINEMATIC HERO - Institutional Authority
          ============================================ */}
      <section className={styles["hero-cinematic"]} aria-labelledby="hero-heading">
        {/* Atmospheric layers */}
        <div className={styles["hero-gradient-overlay"]} />
        <div className={styles["hero-vignette"]} aria-hidden="true" />
        <div className={styles["hero-grain"]} aria-hidden="true" />

        {/* Content with corner bracket flourishes */}
        <div className={`${styles["hero-content"]} ${styles["hero-content--framed"]}`}>
          {/* Corner brackets */}
          <span className={`${styles["hero-corner"]} ${styles["hero-corner--tl"]}`} aria-hidden="true" />
          <span className={`${styles["hero-corner"]} ${styles["hero-corner--br"]}`} aria-hidden="true" />

          {/* Institutional kicker */}
          <p className={`${styles["hero-kicker"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.1s' } as React.CSSProperties}>
            Tennessee State Historic Site
          </p>

          {/* THE HEADLINE */}
          <h1 id="hero-heading" className={styles["hero-animate"]} style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <span className={styles["hero-headline-primary"]}>Tennessee</span>
            <span className={styles["hero-headline-accent"]}>starts here</span>
          </h1>

          {/* Subheadline - value proposition */}
          <p className={`${styles["hero-subheadline"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.5s' } as React.CSSProperties}>
            The first capital of the Southwest Territory · Est. 1770
          </p>

          {/* Location badge */}
          <p className={`${styles["hero-location"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.6s' } as React.CSSProperties}>
            <svg className={styles["hero-location-icon"]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Piney Flats, Tennessee
          </p>

          {/* Commemorative Year Block - Broader framing */}
          <div className={`${styles["hero-year-block"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.7s' } as React.CSSProperties}>
            <span className={styles["hero-year-badge"]}>2026</span>
            <span className={styles["hero-year-label"]}>The Commemorative Year</span>
            <p className={styles["hero-milestones"]}>
              America&apos;s 250th · Tennessee&apos;s 230th
            </p>
          </div>

          {/* Dual CTAs with wax seal accent */}
          <div className={`${styles["hero-cta-group"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.85s' } as React.CSSProperties}>
            <Link href="/visit" className={`${styles["hero-cta"]} ${styles["hero-cta-primary"]}`}>
              <span className={styles["hero-cta-seal"]} aria-hidden="true">★</span>
              Plan Your Visit
            </Link>
            <Link href="/events" className={`${styles["hero-cta"]} ${styles["hero-cta-secondary"]}`}>
              Explore Events
            </Link>
          </div>

          {/* Institutional endorsement */}
          <p className={`${styles["hero-endorsement"]} ${styles["hero-animate"]}`} style={{ '--delay': '1s' } as React.CSSProperties}>
            Part of the America 250 National Commemoration
          </p>
        </div>

        {/* Period-styled scroll indicator */}
        <div className={styles["scroll-indicator"]} aria-hidden="true">
          <span className={styles["scroll-indicator-ornament"]}>―</span>
          <span className={styles["scroll-indicator-text"]}>Scroll</span>
          <span className={styles["scroll-indicator-ornament"]}>―</span>
          <span className={styles["scroll-indicator-chevron"]}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </section>

      {/* ============================================
          THE BLOUNT LETTER - Archival Document
          ============================================ */}
      <section className={styles["blount-section"]} aria-labelledby="blount-heading">
        {/* Parchment document with aged edges */}
        <div className={styles["blount-document"]}>
          {/* Paper fold lines */}
          <div className={`${styles["blount-fold"]} ${styles["blount-fold--horizontal"]}`} aria-hidden="true" />
          <div className={`${styles["blount-fold"]} ${styles["blount-fold--vertical"]}`} aria-hidden="true" />

          {/* Burn/age edge effects */}
          <div className={`${styles["blount-edge"]} ${styles["blount-edge--top"]}`} aria-hidden="true" />
          <div className={`${styles["blount-edge"]} ${styles["blount-edge--bottom"]}`} aria-hidden="true" />
          <div className={`${styles["blount-edge"]} ${styles["blount-edge--left"]}`} aria-hidden="true" />
          <div className={`${styles["blount-edge"]} ${styles["blount-edge--right"]}`} aria-hidden="true" />

          {/* Decorative top rule - quill flourish style */}
          <div className={`${styles["blount-rule"]} ${styles["blount-rule-top"]}`} aria-hidden="true">
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--left"]}`}>❧</span>
            <span className={styles["blount-rule-line"]} />
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--center"]}`}>✦</span>
            <span className={styles["blount-rule-line"]} />
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--right"]}`}>❧</span>
          </div>

          {/* Document header */}
          <header className={styles["blount-header"]}>
            <p className={styles["blount-recipient"]}>Letter to President George Washington</p>
            <p className={styles["blount-dateline"]}>
              <span>Rocky Mount</span>
              <span className={styles["blount-dateline-sep"]} aria-hidden="true">·</span>
              <time dateTime="1790-10-10">October 10, 1790</time>
            </p>
          </header>

          {/* The quote with drop cap */}
          <blockquote className={styles["blount-blockquote"]}>
            <p id="blount-heading" className={`${styles["blount-text"]} ${styles["blount-text--dropcap"]}`}>
              <span className={styles["blount-dropcap"]} aria-hidden="true">H</span>
              <span className={styles["blount-text-body"]}>ere we have planted the grain of a new civilization, in soil untilled by law.</span>
            </p>
          </blockquote>

          {/* Context line */}
          <p className={styles["blount-context"]}>
            With these words, the first government west of the Appalachians took root at Rocky Mount.
          </p>

          {/* Attribution with wax seal */}
          <footer className={styles["blount-attribution"]}>
            {/* Wax seal */}
            <div className={styles["blount-seal"]} aria-hidden="true">
              <span className={styles["blount-seal-inner"]}>SW</span>
            </div>
            <cite className={`${styles["blount-author"]} signature-text`}>Wm. Blount</cite>
            <span className={styles["blount-title"]}>First Governor of the Southwest Territory</span>
          </footer>

          {/* Decorative bottom rule - quill flourish style */}
          <div className={`${styles["blount-rule"]} ${styles["blount-rule-bottom"]}`} aria-hidden="true">
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--left"]}`}>❧</span>
            <span className={styles["blount-rule-line"]} />
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--center"]}`}>✦</span>
            <span className={styles["blount-rule-line"]} />
            <span className={`${styles["blount-flourish"]} ${styles["blount-flourish--right"]}`}>❧</span>
          </div>

          {/* Subtle CTA */}
          <Link href="/lectures" className={styles["blount-cta"]}>
            Explore Rocky Mount&apos;s founding story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ============================================
          EXPERIENCE PREVIEW - What You'll Experience
          ============================================ */}
      <ExperiencePreview />

      {/* ============================================
          EVENTS SHOWCASE - The Commemorative Year
          ============================================ */}
      <EventsShowcase />

      {/* ============================================
          PROMISE VS PROOF - The Two Americas
          ============================================ */}
      <LedgerSection />

      {/* ============================================
          THE STORY - Progressive Revelation
          ============================================ */}
      <StorySection />

      {/* ============================================
          THE HOMECOMING - Final Section
          ============================================ */}
      <HomecomingSection />
    </main>
  );
}
