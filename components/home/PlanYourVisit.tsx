'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { BUTTONS } from '@/lib/copy'

export function PlanYourVisit() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-primary leading-tight">
            Plan Your Visit
          </h2>
        </div>

        {/* Info grid */}
        <div
          className={`grid md:grid-cols-3 gap-8 mb-12 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          {/* Location */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-serif text-lg text-primary mb-1">Piney Flats, TN</p>
            <p className="text-sm text-text-light">15 min from Johnson City</p>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-serif text-lg text-primary mb-1">Tue–Sat 10am–5pm</p>
            <p className="text-sm text-text-light">Sun 1pm–5pm</p>
          </div>

          {/* Admission */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <p className="font-serif text-lg text-primary mb-1">Adults $12 · Seniors $10</p>
            <p className="text-sm text-text-light">Children $8 · Free parking</p>
          </div>
        </div>

        {/* Social proof */}
        <div
          className={`flex items-center justify-center gap-3 mb-10 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}
        >
          <span className="text-accent text-lg">★★★★★</span>
          <span className="text-sm text-text-light">TripAdvisor</span>
          <span className="text-text-light/30">·</span>
          <span className="text-sm text-text-light">50,000+ visitors annually</span>
          <span className="text-text-light/30">·</span>
          <span className="text-sm text-text-light italic">
            &ldquo;Tennessee&apos;s Hidden Gem&rdquo;
          </span>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
        >
          <Link
            href="/visit"
            className="inline-flex items-center justify-center bg-accent text-primary px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af37] hover:-translate-y-0.5 hover:shadow-lg"
          >
            {BUTTONS.primary}
          </Link>
          <a
            href="https://maps.google.com/?q=Rocky+Mount+State+Historic+Site+Piney+Flats+TN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-primary/20 text-primary px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
