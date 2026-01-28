'use client'

import Link from 'next/link'
import SmartCommemorativeCard from './SmartCommemorativeCard'
import { MYSTERY_NARRATIVE, BUTTONS } from '@/lib/copy'

export default function HeroSection() {
  const { hero } = MYSTERY_NARRATIVE

  return (
    <section className="relative min-h-screen bg-primary flex flex-col overflow-hidden">
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
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3 font-medium opacity-0 animate-[fadeUp_0.6s_ease-out_0.1s_forwards]">
                Tennessee 230 · America 250
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(3.5rem,12vw,6rem)] font-bold text-white leading-[1.05] tracking-tight mb-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.2s_forwards]">
                {hero.headline}
              </h1>

              {/* Subhead */}
              <p className="font-serif-elegant text-[clamp(1.25rem,3vw,1.75rem)] text-white/80 leading-relaxed mb-8 opacity-0 animate-[fadeUp_0.6s_ease-out_0.3s_forwards]">
                {hero.subhead}
              </p>

              {/* Single Primary CTA */}
              <div className="opacity-0 animate-[fadeUp_0.6s_ease-out_0.4s_forwards]">
                <Link
                  href="/visit"
                  className="group inline-flex items-center justify-center gap-2.5 bg-accent text-primary px-10 py-5 text-[15px] font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#d4af37] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,162,39,0.35)]"
                >
                  {BUTTONS.primary}
                </Link>
              </div>
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

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center opacity-0 animate-[fadeUp_0.6s_ease-out_0.8s_forwards]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Footer - Keep secondary reference */}
      <div className="relative z-10 py-4" style={{ padding: '1rem clamp(1.5rem, 5vw, 7.5rem)' }}>
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 text-center lg:text-left opacity-0 animate-[fadeUp_0.6s_ease-out_0.9s_forwards]">
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
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  )
}
