'use client'

import Link from 'next/link'
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'
import styles from '@/app/(main)/home/page.module.css'

/**
 * ConsolidatedProof Section
 * Merges: ProofSection + DistinctionSection + Blount Letter
 *
 * Content preserved:
 * - Blount, Jackson, Cobbs cards with quotes
 * - Blount letter with "glass windows" quote
 * - Territorial vs State capital distinction (1790-1792 Rocky Mount, 1792-1817 Knoxville)
 * - "The State started here."
 * - "The foundation was laid here."
 */

const figures = [
  {
    name: 'William Blount',
    title: 'Constitution Signer',
    role: 'Governor 1790-1792',
    quote: 'Commissioned by Washington to govern the frontier.',
  },
  {
    name: 'Andrew Jackson',
    title: 'Future President',
    role: 'Lodged here 1788',
    quote: 'Six weeks at age 21, studying law.',
  },
  {
    name: 'The Cobb Family',
    title: 'Three Generations',
    role: 'Settled ~1770',
    quote: 'Supplied the Revolution.',
  },
]

export function ConsolidatedProof() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })
  const { refs: cardRefs, isVisible: cardsVisible } = useStaggeredReveal<HTMLDivElement>(
    figures.length,
    { threshold: 0.2 }
  )
  const { ref: letterRef, isVisible: letterVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.2,
  })
  const { ref: distinctionRef, isVisible: distinctionVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Part 1: Figure Cards */}
      <div className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 fade-in-up ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 mb-4">
              Who Walked This Ground
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-primary leading-tight">
              The Record Is Clear
            </h2>
          </div>

          {/* Figure cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {figures.map((figure, index) => (
              <div
                key={figure.name}
                ref={cardRefs[index]}
                className={`bg-white p-8 border border-secondary/10 fade-in-up ${cardsVisible[index] ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Wax seal decoration */}
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                  <span className="text-burgundy text-xl">✦</span>
                </div>

                <h3 className="font-serif text-xl text-primary font-semibold mb-1">
                  {figure.name}
                </h3>
                <p className="text-sm text-secondary font-medium mb-1">{figure.title}</p>
                <p className="text-xs text-text-light mb-4">{figure.role}</p>

                <p className="text-sm text-text-light italic border-l-2 border-accent/40 pl-4">
                  &ldquo;{figure.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced closing */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-serif-elegant text-lg md:text-xl text-primary/80 italic mb-6">
              &ldquo;A man who helped create the Constitution would now implement it on the
              frontier.&rdquo;
            </p>
            <p className="font-serif text-base md:text-lg text-secondary">
              Governor Blount governed here. Andrew Jackson lodged here.
              <br />
              <span className="text-accent font-semibold">The State started here.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Blount Letter - Document Aesthetic */}
      <section
        ref={letterRef}
        className={`${styles['blount-section']} ${letterVisible ? 'visible' : ''}`}
        aria-labelledby="blount-heading"
      >
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

          {/* Decorative top rule */}
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
                I
              </span>
              <span className={styles['blount-text-body']}>
                am very well accommodated with a Room with Glass Windows, Fireplace, etc., etc., at
                this place.
              </span>
            </p>
          </blockquote>

          {/* Context line */}
          <p className={styles['blount-context']}>
            Glass windows were rare on the frontier. Rocky Mount was no rough cabin—it was where
            federal power took root.
          </p>

          {/* Attribution with wax seal */}
          <footer className={styles['blount-attribution']}>
            <div className={styles['blount-seal']} aria-hidden="true">
              <span className={styles['blount-seal-inner']}>SW</span>
            </div>
            <cite className={`${styles['blount-author']} signature-text`}>Wm. Blount</cite>
            <span className={styles['blount-title']}>
              First Governor of the Southwest Territory
            </span>
          </footer>

          {/* Decorative bottom rule */}
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

      {/* Part 3: The Distinction - Timeline Footer */}
      <div ref={distinctionRef} className="py-16 md:py-20 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Section label */}
          <p
            className={`text-[10px] uppercase tracking-[0.3em] text-secondary/50 mb-8 fade-in-up ${distinctionVisible ? 'visible' : ''}`}
          >
            The Record Is Clear
          </p>

          {/* Timeline comparison */}
          <div
            className={`space-y-4 mb-10 fade-in-up stagger-1 ${distinctionVisible ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center gap-4 text-left">
              <span className="text-accent font-serif font-bold text-lg w-28 text-right shrink-0">
                1790–1792
              </span>
              <span className="text-primary font-serif text-lg">
                Rocky Mount: First Southwest territorial capital
              </span>
            </div>
            <div className="inline-flex items-center gap-4 text-left">
              <span className="text-secondary/60 font-serif text-lg w-28 text-right shrink-0">
                1792–1817
              </span>
              <span className="text-primary/70 font-serif text-lg">
                Knoxville: Second territorial, then first state capital
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`w-16 h-px bg-accent/30 mx-auto mb-10 fade-in-up stagger-2 ${distinctionVisible ? 'visible' : ''}`}
          />

          {/* Closing statement */}
          <p
            className={`font-serif text-base md:text-lg text-text-light mb-3 fade-in-up stagger-3 ${distinctionVisible ? 'visible' : ''}`}
          >
            Tennessee became the 16th state in 1796.
          </p>
          <p
            className={`font-serif-elegant text-xl md:text-2xl text-primary italic fade-in-up stagger-4 ${distinctionVisible ? 'visible' : ''}`}
          >
            The foundation was laid here.
          </p>
        </div>
      </div>
    </section>
  )
}
