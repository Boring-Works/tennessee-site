'use client'

import Link from 'next/link'
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'
import styles from '@/app/(main)/home/page.module.css'

/**
 * ConsolidatedProof Section - ENHANCED VISUAL DESIGN
 * Pushes CSS/Tailwind limits for maximum visual impact
 *
 * Visual techniques:
 * - Portrait-frame styled figure cards with engraved borders
 * - Realistic wax seal effects
 * - Connection visualization between historical figures
 * - Dramatic timeline with animated "FIRST" callout
 * - Layered paper textures
 */

const figures = [
  {
    name: 'William Blount',
    title: 'Constitution Signer',
    role: 'Governor 1790-1792',
    quote: 'Commissioned by Washington to govern the frontier.',
    badge: null,
    initial: 'WB',
    connection: 'Governed from this ground',
  },
  {
    name: 'Andrew Jackson',
    title: 'Future President',
    role: 'Lodged here 1788',
    quote: 'Six weeks at age 21, studying law.',
    badge: '7th President',
    initial: 'AJ',
    connection: 'Studied law under these roofs',
  },
  {
    name: 'The Cobb Family',
    title: 'Three Generations',
    role: 'Settled ~1770',
    quote: 'Supplied the Revolution.',
    badge: null,
    initial: 'CF',
    connection: 'Built and owned this land',
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
    <section className="relative overflow-hidden">
      {/* === PART 1: FIGURE CARDS === */}
      <div className="relative py-24 md:py-32 bg-cream">
        {/* Subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Section header with decorative treatment */}
          <div
            ref={headerRef}
            className={`text-center mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Decorative opener */}
            <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-secondary/20" />
              <span className="text-burgundy/40 text-lg">✦</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-secondary/20" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.4em] text-secondary/50 mb-4">
              Who Walked This Ground
            </p>
            <h2
              className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] text-primary leading-tight"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              }}
            >
              The Record Is Clear
            </h2>

            {/* Decorative underline */}
            <div className="flex items-center justify-center gap-2 mt-6" aria-hidden="true">
              <div className="w-8 h-px bg-accent/40" />
              <div className="w-2 h-2 rotate-45 border border-accent/40" />
              <div className="w-8 h-px bg-accent/40" />
            </div>
          </div>

          {/* Figure cards with portrait frame styling */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-20">
            {figures.map((figure, index) => (
              <div
                key={figure.name}
                ref={cardRefs[index]}
                className={`group relative transition-all duration-700 ${cardsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card with portrait frame effect */}
                <div
                  className="relative bg-white p-8 md:p-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
                  style={{
                    border: '1px solid rgba(139, 69, 19, 0.1)',
                    boxShadow: `
                      0 4px 20px rgba(0, 0, 0, 0.05),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.5)
                    `,
                  }}
                >
                  {/* Decorative corner accents */}
                  <div
                    className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-burgundy/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-burgundy/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-burgundy/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-burgundy/20"
                    aria-hidden="true"
                  />

                  {/* Recognition badge */}
                  {figure.badge && (
                    <div
                      className="absolute -top-3 right-6 px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'linear-gradient(135deg, #c9a227 0%, #8b6914 100%)',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(201, 162, 39, 0.4)',
                      }}
                    >
                      {figure.badge}
                    </div>
                  )}

                  {/* Wax seal with realistic effect */}
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    {/* Seal shadow */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'radial-gradient(ellipse at 30% 30%, rgba(139, 69, 19, 0.8) 0%, rgba(100, 30, 22, 0.9) 50%, rgba(80, 20, 15, 1) 100%)',
                        boxShadow: `
                          0 4px 12px rgba(139, 69, 19, 0.4),
                          inset -2px -2px 4px rgba(0, 0, 0, 0.3),
                          inset 2px 2px 4px rgba(255, 200, 150, 0.2)
                        `,
                      }}
                    />
                    {/* Seal texture */}
                    <div
                      className="absolute inset-1 rounded-full flex items-center justify-center"
                      style={{
                        border: '1px solid rgba(255, 200, 150, 0.2)',
                      }}
                    >
                      <span
                        className="font-serif text-sm font-bold"
                        style={{
                          color: 'rgba(255, 220, 180, 0.8)',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {figure.initial}
                      </span>
                    </div>
                    {/* Drip effect */}
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-4 rounded-b-full"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(100, 30, 22, 1) 0%, rgba(80, 20, 15, 1) 100%)',
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Name with decorative treatment */}
                  <h3
                    className="font-serif text-xl md:text-2xl text-primary font-semibold mb-2 text-center"
                    style={{
                      letterSpacing: '0.02em',
                    }}
                  >
                    {figure.name}
                  </h3>

                  {/* Title and role */}
                  <p className="text-sm text-secondary font-medium text-center mb-1">
                    {figure.title}
                  </p>
                  <p className="text-xs text-text-light text-center mb-6">{figure.role}</p>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
                    <div className="w-8 h-px bg-secondary/20" />
                    <span className="text-secondary/30 text-[10px]">◆</span>
                    <div className="w-8 h-px bg-secondary/20" />
                  </div>

                  {/* Quote with elegant styling */}
                  <div className="relative">
                    <span
                      className="absolute -left-2 -top-2 text-3xl text-accent/20 font-serif"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className="text-sm text-text-light italic text-center leading-relaxed px-4">
                      {figure.quote}
                    </p>
                    <span
                      className="absolute -right-2 bottom-0 text-3xl text-accent/20 font-serif"
                      aria-hidden="true"
                    >
                      &rdquo;
                    </span>
                  </div>

                  {/* Connection line (hover reveal) */}
                  <div className="mt-6 pt-4 border-t border-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-accent text-center font-medium">
                      {figure.connection}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection visualization */}
          <div
            className="hidden md:flex items-center justify-center gap-4 mb-16"
            aria-hidden="true"
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/30" />
            <div className="px-4 py-2 border border-accent/30 rounded">
              <span className="text-xs uppercase tracking-wider text-accent/70">
                Connected by this ground
              </span>
            </div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/30" />
          </div>

          {/* Enhanced closing statement */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-serif-elegant text-lg md:text-xl text-primary/80 italic mb-8 leading-relaxed">
              &ldquo;A man who helped create the Constitution
              <br />
              would now implement it on the frontier.&rdquo;
            </p>

            <div className="space-y-2">
              <p className="font-serif text-base md:text-lg text-secondary">
                Governor Blount governed here. Andrew Jackson lodged here.
              </p>
              <p
                className="font-serif text-xl md:text-2xl text-accent font-semibold"
                style={{
                  textShadow: '0 0 30px rgba(201, 162, 39, 0.2)',
                }}
              >
                The State started here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === PART 2: BLOUNT LETTER === */}
      <section
        ref={letterRef}
        className={`${styles['blount-section']} ${letterVisible ? 'visible' : ''}`}
        aria-labelledby="blount-heading"
      >
        <div className={styles['blount-document']}>
          <div
            className={`${styles['blount-fold']} ${styles['blount-fold--horizontal']}`}
            aria-hidden="true"
          />
          <div
            className={`${styles['blount-fold']} ${styles['blount-fold--vertical']}`}
            aria-hidden="true"
          />
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

          <p className={styles['blount-context']}>
            Glass windows were rare on the frontier. Rocky Mount was no rough cabin—it was where
            federal power took root.
          </p>

          <footer className={styles['blount-attribution']}>
            <div className={styles['blount-seal']} aria-hidden="true">
              <span className={styles['blount-seal-inner']}>SW</span>
            </div>
            <cite className={`${styles['blount-author']} signature-text`}>Wm. Blount</cite>
            <span className={styles['blount-title']}>
              First Governor of the Southwest Territory
            </span>
          </footer>

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

          <Link href="/lectures" className={styles['blount-cta']}>
            Explore Rocky Mount&apos;s founding story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* === PART 3: THE DISTINCTION === */}
      <div ref={distinctionRef} className="relative py-20 md:py-28 overflow-hidden">
        {/* Background with subtle texture */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #e8e4dc 0%, #f5f0e6 50%, #e8e4dc 100%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Section label with flourishes */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${distinctionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <span className="text-secondary/30 transform -scale-x-100">❧</span>
              <div className="w-16 h-px bg-secondary/20" />
              <span className="text-secondary/40 text-xs">✦</span>
              <div className="w-16 h-px bg-secondary/20" />
              <span className="text-secondary/30">❧</span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-secondary/50">
              The Historical Record
            </p>
          </div>

          {/* Dramatic timeline visualization */}
          <div
            className={`mb-12 transition-all duration-1000 delay-200 ${distinctionVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Timeline bar with animated fill */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative h-4 bg-secondary/10 rounded-full overflow-hidden shadow-inner">
                {/* Rocky Mount segment with glow */}
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 delay-500 ${distinctionVisible ? 'w-[8%]' : 'w-0'}`}
                  style={{
                    background: 'linear-gradient(90deg, #c9a227 0%, #8b6914 100%)',
                    boxShadow: distinctionVisible
                      ? '0 0 20px rgba(201, 162, 39, 0.5), 0 0 40px rgba(201, 162, 39, 0.2)'
                      : 'none',
                  }}
                />
                {/* Knoxville segment */}
                <div
                  className={`absolute top-0 h-full bg-secondary/30 rounded-r-full transition-all duration-1000 delay-700`}
                  style={{ left: '8%', width: '92%' }}
                />
                {/* Statehood marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-primary/60"
                  style={{ left: '22%' }}
                  title="1796 - Statehood"
                />
              </div>

              {/* Year labels */}
              <div className="flex justify-between mt-3 text-xs text-text-light">
                <span className="font-medium text-accent">1790</span>
                <span className="absolute left-[22%] -translate-x-1/2">
                  <span className="text-primary/70 font-medium">1796</span>
                  <span className="block text-[10px] text-secondary/50">Statehood</span>
                </span>
                <span>1817</span>
              </div>
            </div>

            {/* FIRST callout */}
            <div
              className={`flex justify-center mt-6 transition-all duration-700 delay-800 ${distinctionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div
                className="px-4 py-2 border-2 border-accent/40 rounded"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, transparent 100%)',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  ★ First Territorial Capital ★
                </span>
              </div>
            </div>
          </div>

          {/* Timeline comparison with enhanced styling */}
          <div
            className={`space-y-6 mb-12 transition-all duration-700 delay-300 ${distinctionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Rocky Mount - emphasized */}
            <div className="flex items-center justify-center gap-6 p-4 rounded-lg bg-white/50">
              <span
                className="font-serif font-bold text-xl text-accent"
                style={{
                  textShadow: '0 0 20px rgba(201, 162, 39, 0.3)',
                }}
              >
                1790–1792
              </span>
              <div className="w-3 h-3 rotate-45 bg-accent" />
              <span className="font-serif text-lg text-primary font-medium">
                Rocky Mount: First Southwest territorial capital
              </span>
            </div>

            {/* Knoxville - subdued */}
            <div className="flex items-center justify-center gap-6 p-4">
              <span className="font-serif text-lg text-secondary/60">1792–1817</span>
              <div className="w-2 h-2 rotate-45 bg-secondary/30" />
              <span className="font-serif text-lg text-primary/60">
                Knoxville: Second territorial, then first state capital
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div className="w-16 h-px bg-secondary/20" />
            <span className="text-secondary/30">◆</span>
            <div className="w-16 h-px bg-secondary/20" />
          </div>

          {/* Closing statement with dramatic reveal */}
          <div
            className={`text-center transition-all duration-1000 delay-500 ${distinctionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="font-serif text-base md:text-lg text-text-light mb-4">
              Tennessee became the 16th state in 1796.
            </p>
            <p
              className="font-serif-elegant text-2xl md:text-3xl text-primary italic"
              style={{
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              The foundation was laid here.
            </p>

            {/* Final flourish */}
            <div
              className={`flex items-center justify-center gap-3 mt-10 transition-all duration-700 delay-700 ${distinctionVisible ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            >
              <span className="text-accent/30 transform -scale-x-100">❧</span>
              <div className="w-8 h-px bg-accent/30" />
              <span className="text-accent/40 text-sm">✦</span>
              <div className="w-8 h-px bg-accent/30" />
              <span className="text-accent/30">❧</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
