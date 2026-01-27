'use client'

import Link from 'next/link'
import SmartCommemorativeCard from './SmartCommemorativeCard'
import { MYSTERY_NARRATIVE, HOOKS, BUTTONS } from '@/lib/copy'

export default function HeroSection() {
  const { hero } = MYSTERY_NARRATIVE

  return (
    <section className="relative min-h-[90vh] bg-primary flex flex-col overflow-hidden">
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 30% 80%, rgba(139, 69, 19, 0.12) 0%, transparent 50%),
            linear-gradient(175deg, #050d18 0%, #0a1628 40%, #0d1f35 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Main Content - 60/40 Grid with Fixed Gap */}
      <div
        className="relative z-10 flex-1 flex items-center pt-28 pb-16"
        style={{ padding: '7rem clamp(1.5rem, 5vw, 7.5rem) 4rem' }}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center"
            style={{ gap: '3rem', columnGap: '64px' }}
          >
            {/* LEFT COLUMN (60%) - Hero Content */}
            <div className="text-center lg:text-left">
              {/* America 250 Badge - Elevated */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-accent/30 rounded-sm opacity-0 animate-[fadeUp_0.6s_ease-out_0.05s_forwards]">
                <span className="text-base">🇺🇸</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                  {hero.badge}
                </span>
              </div>

              {/* Eyebrow */}
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-6 font-medium opacity-0 animate-[fadeUp_0.6s_ease-out_0.1s_forwards]">
                Tennessee State Historic Site
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(3rem,10vw,5rem)] font-bold text-white leading-[1.1] tracking-tight mb-3 opacity-0 animate-[fadeUp_0.6s_ease-out_0.2s_forwards]">
                {hero.headline}
              </h1>

              {/* Subhead */}
              <p className="font-serif-elegant text-[clamp(1.5rem,4vw,2.5rem)] italic text-accent leading-tight mb-6 opacity-0 animate-[fadeUp_0.6s_ease-out_0.3s_forwards]">
                {hero.subhead}
              </p>

              {/* Divider */}
              <div className="w-[120px] h-[2px] bg-accent/50 mx-auto lg:mx-0 mb-6 opacity-0 animate-[fadeUp_0.6s_ease-out_0.35s_forwards]" />

              {/* Narrative Timeline */}
              <div className="space-y-2 mb-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.4s_forwards]">
                {hero.timeline.map((line, i) => (
                  <p key={i} className="font-serif-elegant text-sm md:text-base text-white/70">
                    {line}
                  </p>
                ))}
              </div>

              {/* Contrast Line */}
              <p className="font-serif-elegant text-base md:text-lg italic text-white/80 mb-3 border-l-2 border-accent/60 pl-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.45s_forwards]">
                {hero.contrast}
              </p>

              {/* Bridge */}
              <p className="text-sm text-white/60 mb-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.48s_forwards]">
                {hero.bridge}
              </p>

              {/* Location - Higher contrast + driving context */}
              <p className="text-sm text-white/60 mb-4 flex items-center justify-center lg:justify-start gap-1.5 opacity-0 animate-[fadeUp_0.6s_ease-out_0.5s_forwards]">
                <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Piney Flats, TN — 15 min from Johnson City
              </p>

              {/* Social Proof Line */}
              <p className="text-sm text-white/50 mb-8 flex items-center justify-center lg:justify-start gap-2 opacity-0 animate-[fadeUp_0.6s_ease-out_0.52s_forwards]">
                <span className="text-accent">★★★★★</span>
                <span>TripAdvisor</span>
                <span className="text-white/30">·</span>
                <span>50,000+ visitors annually</span>
                <span className="text-white/30">·</span>
                <span className="italic">Tennessee&apos;s Hidden Gem</span>
              </p>

              {/* CTAs - Specific and benefit-oriented */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-[fadeUp_0.6s_ease-out_0.55s_forwards]">
                <Link
                  href="/visit"
                  className="group inline-flex items-center justify-center gap-2.5 bg-accent text-primary px-8 py-4 text-[14px] font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#d4af37] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,162,39,0.35)]"
                >
                  <span className="text-base transition-transform duration-300 group-hover:scale-110">
                    ★
                  </span>
                  {BUTTONS.primary}
                  <span className="text-primary/70 font-medium normal-case tracking-normal">
                    — Free Parking
                  </span>
                </Link>
                <Link
                  href="/first-250"
                  className="inline-flex items-center justify-center border-2 border-white/25 text-white px-8 py-4 text-[14px] font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:border-white/50 hover:bg-white/5 hover:-translate-y-0.5"
                >
                  {BUTTONS.secondary}
                </Link>
              </div>

              {/* Stand where they stood CTA line */}
              <p className="mt-6 text-sm font-serif-elegant italic text-accent/80 opacity-0 animate-[fadeUp_0.6s_ease-out_0.6s_forwards]">
                {HOOKS.primaryCTA}
              </p>
            </div>

            {/* RIGHT COLUMN (40%) - Commemorative Card */}
            <div className="flex justify-center lg:justify-start opacity-0 animate-[fadeSlideLeft_0.8s_ease-out_0.5s_forwards]">
              <div className="w-full max-w-[400px]">
                <SmartCommemorativeCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Keep secondary reference */}
      <div className="relative z-10 py-6" style={{ padding: '1.5rem clamp(1.5rem, 5vw, 7.5rem)' }}>
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 text-center lg:text-left opacity-0 animate-[fadeUp_0.6s_ease-out_0.7s_forwards]">
            Part of the America 250 National Commemoration
          </p>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideLeft {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
