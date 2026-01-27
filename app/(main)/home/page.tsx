import Link from "next/link";
import SmartCommemorativeCard from "@/components/SmartCommemorativeCard";
import ExperiencePreview from "@/components/ExperiencePreview";
import EventsShowcase from "@/components/EventsShowcase";
import LedgerSection from "@/components/LedgerSection";
import StorySection from "@/components/StorySection";
import HomecomingSection from "@/components/HomecomingSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* THE 1790 WATERMARK - Parallax depth effect */}
      <div className={styles["watermark-1790"]} aria-hidden="true">
        1790
      </div>

      {/* ============================================
          HERO SECTION - 60/40 Split Layout
          ============================================ */}
      <section className={styles["hero"]} aria-labelledby="hero-heading">
        {/* Background layers */}
        <div className={styles["hero-bg"]} />
        <div className={styles["hero-overlay"]} />

        {/* Content Grid */}
        <div className={styles["hero-content"]}>
          <div className={styles["hero-grid"]}>

            {/* LEFT COLUMN - 60% - Brand */}
            <div className={styles["hero-brand"]}>
              <p className={`${styles["hero-eyebrow"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Tennessee State Historic Site
              </p>

              <h1 id="hero-heading" className={`${styles["hero-headline"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.2s' } as React.CSSProperties}>
                TENNESSEE
              </h1>

              <p className={`${styles["hero-subhead"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.3s' } as React.CSSProperties}>
                starts here
              </p>

              <div className={`${styles["hero-divider"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.4s' } as React.CSSProperties} />

              <p className={`${styles["hero-tagline"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.5s' } as React.CSSProperties}>
                The first capital of the Southwest Territory · Est. 1770
              </p>

              <p className={`${styles["hero-location"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.6s' } as React.CSSProperties}>
                <span className={styles["hero-location-icon"]}>📍</span>
                Piney Flats, Tennessee
              </p>

              <div className={`${styles["hero-ctas"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.7s' } as React.CSSProperties}>
                <Link href="/visit" className={styles["hero-cta-primary"]}>
                  <span className={styles["hero-cta-icon"]}>★</span>
                  Plan Your Visit
                </Link>
                <Link href="/events" className={styles["hero-cta-secondary"]}>
                  Explore Events
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN - 40% - Card */}
            <div className={`${styles["hero-card-wrapper"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.5s' } as React.CSSProperties}>
              <SmartCommemorativeCard />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className={styles["hero-footer"]}>
          <p className={styles["hero-animate"]} style={{ '--delay': '0.9s' } as React.CSSProperties}>
            Part of the America 250 National Commemoration
          </p>
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
    </>
  );
}
