'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '@/app/(main)/home/page.module.css'
import { BUTTONS, HOOKS } from '@/lib/copy'

/**
 * ConsolidatedExperience Section
 * Merges: ExperiencePreview + GroundStatement + HomecomingSection
 *
 * Content preserved:
 * - "What You'll Experience" preview items (all 4 experiences)
 * - "The buildings evolved. The ground endures."
 * - Visit info (hours, admission, location)
 * - Testimonial
 * - "Step Into 1790"
 */

interface ExperienceMoment {
  numeral: string
  title: string
  description: string
  icon: React.ReactNode
}

// Period-authentic engraving-style SVG icons
const GroundsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 52h48M12 52V32M52 32v20" />
    <path d="M12 32h40" />
    <path d="M16 32V22M24 32V22M32 32V22M40 32V22M48 32V22" />
    <path d="M10 22h44l-22-12-22 12z" />
    <circle cx="32" cy="16" r="2" />
    <path d="M4 56h56" strokeWidth="1" opacity="0.5" />
  </svg>
)

const SettlersIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="32" cy="18" rx="8" ry="9" />
    <path d="M24 14c-4-2-6 0-8 2h0c2 4 6 4 8 2" />
    <path d="M40 14c4-2 6 0 8 2h0c-2 4-6 4-8 2" />
    <path d="M26 22s2 4 6 4 6-4 6-4" />
    <path d="M24 27l-8 28h8l8-18 8 18h8l-8-28" />
    <path d="M28 27v12M36 27v12" />
    <circle cx="32" cy="32" r="1" fill="currentColor" />
    <circle cx="32" cy="38" r="1" fill="currentColor" />
    <circle cx="32" cy="44" r="1" fill="currentColor" />
  </svg>
)

const BuildingsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 32l24-16 24 16" />
    <path d="M12 32v22h40V32" />
    <path d="M26 54V40h12v14" />
    <circle cx="35" cy="47" r="1" fill="currentColor" />
    <rect x="16" y="38" width="8" height="8" />
    <path d="M20 38v8M16 42h8" />
    <rect x="40" y="38" width="8" height="8" />
    <path d="M44 38v8M40 42h8" />
    <path d="M44 20v-6h6v10" />
  </svg>
)

const ScrollIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8c-4 0-6 2-6 6v36c0 4 2 6 6 6" />
    <path d="M16 8h32c4 0 6 2 6 6v28c0 4-2 6-6 6H20" />
    <path d="M16 56c4 0 6-2 6-6V14c0-4-2-6-6-6" />
    <ellipse cx="18" cy="52" rx="4" ry="6" />
    <path d="M26 20h20" strokeWidth="1" />
    <path d="M26 26h18" strokeWidth="1" opacity="0.7" />
    <path d="M26 32h16" strokeWidth="1" opacity="0.5" />
    <path d="M26 38h14" strokeWidth="1" opacity="0.3" />
  </svg>
)

const experiences: ExperienceMoment[] = [
  {
    numeral: 'I',
    icon: <GroundsIcon />,
    title: 'Stand on Historic Ground',
    description:
      "The same ground where Governor Blount established Tennessee's government in 1790.",
  },
  {
    numeral: 'II',
    icon: <SettlersIcon />,
    title: 'Meet the Settlers',
    description: 'Costumed interpreters bring 1790s frontier life to vivid reality.',
  },
  {
    numeral: 'III',
    icon: <BuildingsIcon />,
    title: 'Enter the Past',
    description: "Historic structures on the ground where Tennessee's government began.",
  },
  {
    numeral: 'IV',
    icon: <ScrollIcon />,
    title: 'Hear the Story',
    description: "Guided tours reveal how Tennessee's government began at this frontier outpost.",
  },
]

export function ConsolidatedExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const groundRef = useRef<HTMLDivElement>(null)
  const [groundVisible, setGroundVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGroundVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    if (groundRef.current) {
      observer.observe(groundRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Part 1: Experience Preview - White background */}
      <div className={styles['experience-section']}>
        <div className={styles['experience-container']}>
          {/* Header with bracket flourishes */}
          <header className={styles['experience-header']}>
            <p className={styles['experience-eyebrow']}>The Living History Experience</p>

            <div className={styles['experience-headline-wrapper']}>
              <span
                className={`${styles['experience-bracket']} ${styles['experience-bracket--left']}`}
                aria-hidden="true"
              >
                [
              </span>
              <h2 id="experience-heading" className={styles['experience-headline']}>
                Step Into 1790
              </h2>
              <span
                className={`${styles['experience-bracket']} ${styles['experience-bracket--right']}`}
                aria-hidden="true"
              >
                ]
              </span>
            </div>

            <p className={styles['experience-intro']}>
              More than a museum. Rocky Mount is a living window into the birth of Tennessee.
            </p>

            {/* Audience tags */}
            <div className={styles['experience-audience']} aria-label="Perfect for">
              <span className={styles['experience-audience-tag']}>Perfect for families</span>
              <span className={styles['experience-audience-divider']} aria-hidden="true">
                •
              </span>
              <span className={styles['experience-audience-tag']}>History enthusiasts</span>
              <span className={styles['experience-audience-divider']} aria-hidden="true">
                •
              </span>
              <span className={styles['experience-audience-tag']}>School groups</span>
            </div>

            {/* Decorative rule */}
            <div className={styles['experience-rule']} aria-hidden="true">
              <span className={styles['experience-rule-line']} />
              <span className={styles['experience-rule-ornament']}>✦</span>
              <span className={styles['experience-rule-line']} />
            </div>

            {/* Visitor Testimonial */}
            <div className={styles['experience-testimonial-wrapper']}>
              <figure className={styles['experience-testimonial-photo']}>
                <div className={styles['experience-testimonial-photo-frame']}>
                  <svg
                    className={styles['experience-testimonial-photo-placeholder']}
                    viewBox="0 0 80 80"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="40" cy="28" r="14" opacity="0.3" />
                    <path d="M20 75c0-16 9-25 20-25s20 9 20 25" opacity="0.25" />
                    <path
                      d="M26 22c0-4 6-10 14-10s14 6 14 10c0 2-4 3-14 3s-14-1-14-3z"
                      opacity="0.2"
                    />
                  </svg>
                </div>
                <figcaption className={styles['experience-testimonial-photo-caption']}>
                  Meet our 1790 settlers
                </figcaption>
              </figure>

              <blockquote className={styles['experience-testimonial']}>
                <div
                  className={styles['experience-testimonial-stars']}
                  aria-label="5 out of 5 stars"
                >
                  <span aria-hidden="true">★★★★★</span>
                </div>
                <p className={styles['experience-testimonial-quote']}>
                  &ldquo;The kids were mesmerized — it felt like stepping back in time. The costumed
                  interpreters really brought 1790 to life.&rdquo;
                </p>
                <footer className={styles['experience-testimonial-attribution']}>
                  — Sarah M., Nashville
                </footer>
              </blockquote>
            </div>
          </header>

          {/* Experience cards grid */}
          <div
            className={`${styles['experience-grid']} ${isVisible ? styles['experience-grid--visible'] : ''}`}
          >
            {experiences.map((exp, i) => (
              <article
                key={i}
                className={styles['experience-card']}
                style={{ '--card-index': i } as React.CSSProperties}
              >
                <span className={styles['experience-card-curl']} aria-hidden="true" />
                <span className={styles['experience-numeral']} aria-hidden="true">
                  {exp.numeral}
                </span>
                <span className={styles['experience-icon']} aria-hidden="true">
                  {exp.icon}
                </span>
                <h3 className={styles['experience-title']}>{exp.title}</h3>
                <p className={styles['experience-desc']}>{exp.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Ground Statement - Dark background */}
      <div ref={groundRef} className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/images/ground-texture.jpg')`,
            filter: 'grayscale(50%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(10, 22, 40, 0.9) 0%, rgba(10, 22, 40, 0.7) 50%, rgba(10, 22, 40, 0.9) 100%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p
            className={`font-serif-elegant text-[clamp(1.5rem,4vw,2.5rem)] text-white/70 leading-relaxed mb-4 fade-in-up ${groundVisible ? 'visible' : ''}`}
          >
            The buildings evolved.
          </p>
          <p
            className={`font-serif-elegant text-[clamp(1.75rem,5vw,3rem)] text-accent leading-relaxed italic font-semibold fade-in-up stagger-1 ${groundVisible ? 'visible' : ''}`}
          >
            The ground endures.
          </p>

          <div
            className={`mt-12 flex items-center justify-center gap-4 fade-in-up stagger-2 ${groundVisible ? 'visible' : ''}`}
          >
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-accent/40 text-xs">✦</span>
            <div className="w-12 h-px bg-accent/30" />
          </div>
        </div>
      </div>

      {/* Part 3: Visit Info - Integrated from HomecomingSection */}
      <div className="relative py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Location info */}
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 mb-4">
              200 Hyder Hill Road · Piney Flats, Tennessee
            </p>
            <p className="text-sm text-text-light">
              30 min from Johnson City · 45 min from Knoxville
            </p>
          </div>

          {/* Fame Bridge with Testimonial */}
          <div className="bg-cream-dark rounded-lg p-6 mb-10">
            <p className="text-center font-serif-elegant text-lg md:text-xl text-primary/80 italic mb-4">
              {HOOKS.fameBridge} Meet costumed interpreters living as 1790 settlers.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-accent">★★★★★</span>
              <span className="text-text-light">
                &ldquo;The kids were mesmerized — it felt like stepping back in time.&rdquo;
              </span>
              <span className="text-text-light/60">— Sarah M.</span>
            </div>
          </div>

          {/* Quick info row */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-4 bg-cream rounded">
              <p className="text-sm text-secondary/60 uppercase tracking-wider mb-1">Hours</p>
              <p className="font-serif text-primary">Wed–Sat 10am–5pm</p>
              <p className="text-xs text-accent mt-1">Guided tours every hour</p>
            </div>
            <div className="text-center p-4 bg-cream rounded">
              <p className="text-sm text-secondary/60 uppercase tracking-wider mb-1">Admission</p>
              <p className="font-serif text-primary">Adults $12 · Seniors $10 · Children $8</p>
              <p className="text-xs text-text-light mt-1">Under 6 free</p>
            </div>
            <div className="text-center p-4 bg-cream rounded">
              <p className="text-sm text-secondary/60 uppercase tracking-wider mb-1">Duration</p>
              <p className="font-serif text-primary">Plan 2–3 hours</p>
              <p className="text-xs text-text-light mt-1">Comfortable walking shoes recommended</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center bg-accent text-primary px-10 py-5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af37] hover:-translate-y-0.5 hover:shadow-lg"
            >
              {BUTTONS.primary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
