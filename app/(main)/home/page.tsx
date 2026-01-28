import dynamic from 'next/dynamic'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ExperiencePreview from '@/components/ExperiencePreview'
import HomecomingSection from '@/components/HomecomingSection'
import FinalCTA from '@/components/FinalCTA'
import {
  MysteryHook,
  ExperimentSection,
  ScrollTimeline,
  ContrastStatement,
  ProofSection,
  DistinctionSection,
  GroundStatement,
  PlanYourVisit,
  CampaignSection,
  IndigenousAcknowledgment,
} from '@/components/home'
import styles from './page.module.css'

// Dynamic imports for below-fold components (code splitting)
// Note: ssr is enabled by default, providing both code splitting and SSR benefits
const EventsShowcase = dynamic(() => import('@/components/EventsShowcase'), {
  loading: () => (
    <div
      style={{
        minHeight: '600px',
        background: '#0a1628',
      }}
    />
  ),
})

const LedgerSection = dynamic(() => import('@/components/LedgerSection'), {
  loading: () => (
    <div
      style={{
        minHeight: '700px',
        background: 'var(--parchment)',
      }}
    />
  ),
})

const StorySection = dynamic(() => import('@/components/StorySection'), {
  loading: () => (
    <div
      style={{
        minHeight: '800px',
        background: 'white',
      }}
    />
  ),
})

export default function Home() {
  return (
    <>
      {/* ============================================
          SECTION 1: HERO (Simplified - Above the Fold)
          ============================================ */}
      <HeroSection />

      {/* ============================================
          SECTION 2: MYSTERY HOOK
          "Before there was a Tennessee..."
          ============================================ */}
      <MysteryHook />

      {/* ============================================
          SECTION 3: THE EXPERIMENT
          "Could democracy survive beyond the Appalachians?"
          ============================================ */}
      <ExperimentSection />

      {/* ============================================
          SECTION 4: TIMELINE (Scroll-Triggered)
          1770, 1780, 1790 - Three beats
          ============================================ */}
      <ScrollTimeline />

      {/* ============================================
          SECTION 5: CONTRAST STATEMENT
          "This is where they governed."
          ============================================ */}
      <ContrastStatement />

      {/* ============================================
          SECTION 6: THE PROOF (Authority Section)
          Blount, Jackson, Cobbs
          ============================================ */}
      <ProofSection />

      {/* ============================================
          SECTION 7: THE DISTINCTION
          Territorial vs State capital clarification
          ============================================ */}
      <DistinctionSection />

      {/* ============================================
          SECTION 8: GROUND STATEMENT
          "The buildings evolved. The ground endures."
          ============================================ */}
      <GroundStatement />

      {/* ============================================
          SECTION 9: THE BLOUNT LETTER - Archival Document
          ============================================ */}
      <section className={styles['blount-section']} aria-labelledby="blount-heading">
        {/* Parchment document with aged edges */}
        <div className={styles['blount-document']}>
          {/* Paper fold lines */}
          <div
            className={`${styles['blount-fold']} ${styles['blount-fold--horizontal']}`}
            aria-hidden="true"
          />
          <div
            className={`${styles['blount-fold']} ${styles['blount-fold--vertical']}`}
            aria-hidden="true"
          />

          {/* Burn/age edge effects */}
          <div
            className={`${styles['blount-edge']} ${styles['blount-edge--top']}`}
            aria-hidden="true"
          />
          <div
            className={`${styles['blount-edge']} ${styles['blount-edge--bottom']}`}
            aria-hidden="true"
          />
          <div
            className={`${styles['blount-edge']} ${styles['blount-edge--left']}`}
            aria-hidden="true"
          />
          <div
            className={`${styles['blount-edge']} ${styles['blount-edge--right']}`}
            aria-hidden="true"
          />

          {/* Decorative top rule - quill flourish style */}
          <div
            className={`${styles['blount-rule']} ${styles['blount-rule-top']}`}
            aria-hidden="true"
          >
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--left']}`}>
              ❧
            </span>
            <span className={styles['blount-rule-line']} />
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--center']}`}>
              ✦
            </span>
            <span className={styles['blount-rule-line']} />
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--right']}`}>
              ❧
            </span>
          </div>

          {/* Document header */}
          <header className={styles['blount-header']}>
            <p className={styles['blount-recipient']}>Letter to President George Washington</p>
            <p className={styles['blount-dateline']}>
              <span>Rocky Mount</span>
              <span className={styles['blount-dateline-sep']} aria-hidden="true">
                ·
              </span>
              <time dateTime="1790-10-20">October 20, 1790</time>
            </p>
          </header>

          {/* The quote with drop cap */}
          <blockquote className={styles['blount-blockquote']}>
            <p
              id="blount-heading"
              className={`${styles['blount-text']} ${styles['blount-text--dropcap']}`}
            >
              <span className={styles['blount-dropcap']} aria-hidden="true">
                H
              </span>
              <span className={styles['blount-text-body']}>
                ere we have planted the grain of a new civilization, in soil untilled by law.
              </span>
            </p>
          </blockquote>

          {/* Context line */}
          <p className={styles['blount-context']}>
            With these words, the first government west of the Appalachians took root at Rocky
            Mount.
          </p>

          {/* Attribution with wax seal */}
          <footer className={styles['blount-attribution']}>
            {/* Wax seal */}
            <div className={styles['blount-seal']} aria-hidden="true">
              <span className={styles['blount-seal-inner']}>SW</span>
            </div>
            <cite className={`${styles['blount-author']} signature-text`}>Wm. Blount</cite>
            <span className={styles['blount-title']}>
              First Governor of the Southwest Territory
            </span>
          </footer>

          {/* Decorative bottom rule - quill flourish style */}
          <div
            className={`${styles['blount-rule']} ${styles['blount-rule-bottom']}`}
            aria-hidden="true"
          >
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--left']}`}>
              ❧
            </span>
            <span className={styles['blount-rule-line']} />
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--center']}`}>
              ✦
            </span>
            <span className={styles['blount-rule-line']} />
            <span className={`${styles['blount-flourish']} ${styles['blount-flourish--right']}`}>
              ❧
            </span>
          </div>

          {/* Subtle CTA */}
          <Link href="/lectures" className={styles['blount-cta']}>
            Explore Rocky Mount&apos;s founding story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION 10: EXPERIENCE PREVIEW
          What You'll Experience
          ============================================ */}
      <ExperiencePreview />

      {/* ============================================
          SECTION 11: PLAN YOUR VISIT
          Practical info consolidated
          ============================================ */}
      <PlanYourVisit />

      {/* ============================================
          SECTION 12: 2026 CAMPAIGN (Scarcity)
          First 250 enrollment
          ============================================ */}
      <CampaignSection />

      {/* ============================================
          SECTION 13: INDIGENOUS ACKNOWLEDGMENT
          ============================================ */}
      <IndigenousAcknowledgment />

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

      {/* ============================================
          FINAL CTA - Conversion Close
          ============================================ */}
      <FinalCTA />
    </>
  )
}
