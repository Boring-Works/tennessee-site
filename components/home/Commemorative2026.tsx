'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import eventsData from '@/data/events.json'

/**
 * Commemorative2026 Section
 * Merges: CampaignSection + EventsShowcase + LedgerSection
 *
 * Content preserved:
 * - "Tennessee 230 / America 250" framing
 * - First 250 enrollment CTA
 * - Key 2026 events highlight (3-4 featured)
 * - Promise vs Proof ledger comparison (condensed)
 * - All event categories and stats
 */

// Get categorized events
const lectures = eventsData.events.filter((e) => e.category === 'lecture')
const festivals = eventsData.events.filter(
  (e) => e.category === 'festival' || e.category === 'signature'
)
const seasonal = eventsData.events.filter((e) => e.category === 'seasonal')

function getNextEvent() {
  return eventsData.events[0]
}

// Animated counter hook
function useCountUp(end: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return count
}

// Icons
const LecternIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12h24l-2 8H14l-2-8z" />
    <path d="M14 20l-2 20h4l2-16h12l2 16h4l-2-20" />
    <path d="M18 40h12" />
  </svg>
)

const BannerIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 8v32" />
    <path d="M14 8h14c0 4-4 6 0 10H14" />
    <path d="M34 8v32" />
    <path d="M34 8h-14c0 4 4 6 0 10h14" />
  </svg>
)

const WreathIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="14" strokeWidth="1" opacity="0.3" />
    <path d="M24 8c-2 2-2 4 0 4s2-2 0-4" />
    <path d="M32 10c-1 2.5 0 4 2 3s1-3-2-3" />
    <path d="M38 16c0 2.5 1.5 4 3 2.5s0-3-3-2.5" />
    <path d="M24 20v8" strokeWidth="2" />
    <ellipse cx="24" cy="18" rx="1.5" ry="2" fill="currentColor" opacity="0.5" />
  </svg>
)

export function Commemorative2026() {
  const sectionRef = useRef<HTMLElement>(null)
  const ledgerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [ledgerVisible, setLedgerVisible] = useState(false)

  const nextEvent = getNextEvent()
  const eventCount = eventsData.events.length

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
          setLedgerVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ledgerRef.current) {
      observer.observe(ledgerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Parse event date
  const eventDate = new Date(nextEvent.date + 'T12:00:00')
  const monthShort = eventDate.toLocaleDateString('en-US', { month: 'short' })
  const dayNum = eventDate.getDate()
  const year = eventDate.getFullYear()

  // Animated counters
  const animatedEventCount = useCountUp(eventCount, 1500, isVisible)
  const animatedMiles = useCountUp(600, 1500, ledgerVisible)
  const animatedYears = useCountUp(14, 1200, ledgerVisible)

  return (
    <section ref={sectionRef} className="relative bg-primary overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 100%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
                       linear-gradient(180deg, #0a1628 0%, #050d18 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Part 1: Campaign Header & First 250 CTA */}
      <div className="relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className={`text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-6 fade-in-up ${isVisible ? 'visible' : ''}`}
          >
            2026: The Commemorative Year
          </p>

          <h2
            className={`font-serif text-[clamp(2rem,6vw,3.5rem)] text-white leading-tight mb-6 fade-in-up stagger-1 ${isVisible ? 'visible' : ''}`}
          >
            Tennessee turns 230.
            <br />
            <span className="text-accent">America turns 250.</span>
          </h2>

          <div className={`space-y-3 mb-10 fade-in-up stagger-2 ${isVisible ? 'visible' : ''}`}>
            <p className="font-serif-elegant text-lg text-white/70 italic">
              First capital of the Southwest Territory.
            </p>
            <p className="font-serif-elegant text-lg text-white/70 italic">
              Where a Constitution signer governed the frontier.
            </p>
            <p className="font-serif-elegant text-lg text-white/70 italic">
              The ground where Tennessee began.
            </p>
          </div>

          <div
            className={`w-16 h-px bg-accent/30 mx-auto mb-10 fade-in-up stagger-3 ${isVisible ? 'visible' : ''}`}
          />

          <p
            className={`font-serif text-xl md:text-2xl text-white/90 mb-8 fade-in-up stagger-4 ${isVisible ? 'visible' : ''}`}
          >
            Be one of the <span className="text-accent font-semibold">First 250</span>.
          </p>

          <Link
            href="/first-250"
            className={`inline-flex flex-col sm:flex-row items-center justify-center bg-accent text-primary px-8 sm:px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af37] hover:-translate-y-0.5 hover:shadow-lg fade-in-up stagger-5 ${isVisible ? 'visible' : ''}`}
          >
            <span>Join the First 250</span>
            <span className="mt-1 sm:mt-0 sm:ml-2 text-primary/60 normal-case font-normal text-xs sm:text-sm">
              — Enrollment closes June 1
            </span>
          </Link>
        </div>
      </div>

      {/* Part 2: Events Showcase (Condensed) */}
      <div className="relative z-10 py-16 md:py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-3">
              2026 Programming
            </p>
            <p className="text-white/60">
              {eventCount} events celebrating America&apos;s 250th and Tennessee&apos;s 230th
            </p>
          </div>

          {/* Featured Event + Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Next Upcoming Event */}
            <div className="md:col-span-2 lg:col-span-1 bg-white/5 border border-white/10 rounded p-6">
              <p className="text-[10px] uppercase tracking-wider text-accent/80 mb-3">Coming Up</p>
              <div className="flex items-start gap-4">
                <div className="text-center bg-white/10 rounded p-2 min-w-[60px]">
                  <span className="block text-xs text-accent/80">{monthShort}</span>
                  <span className="block text-2xl font-bold text-white">{dayNum}</span>
                  <span className="block text-xs text-white/50">{year}</span>
                </div>
                <div>
                  <h3 className="font-serif text-white text-lg mb-1">{nextEvent.title}</h3>
                  <p className="text-sm text-white/50 line-clamp-2">
                    {nextEvent.description.split('. ')[0]}.
                  </p>
                </div>
              </div>
            </div>

            {/* Lectures */}
            <div className="bg-white/5 border border-white/10 rounded p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 text-accent/60">
                  <LecternIcon />
                </span>
                <div>
                  <span className="text-2xl font-bold text-accent">{lectures.length}</span>
                  <p className="text-xs text-white/50">Lecture Series</p>
                </div>
              </div>
              <p className="text-sm text-white/60">Historians explore the founding era</p>
            </div>

            {/* Festivals */}
            <div className="bg-white/5 border border-white/10 rounded p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 text-accent/60">
                  <BannerIcon />
                </span>
                <div>
                  <span className="text-2xl font-bold text-accent">{festivals.length}</span>
                  <p className="text-xs text-white/50">Festivals &amp; Events</p>
                </div>
              </div>
              <p className="text-sm text-white/60">Living history, trade fairs</p>
            </div>

            {/* Seasonal */}
            <div className="bg-white/5 border border-white/10 rounded p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 text-accent/60">
                  <WreathIcon />
                </span>
                <div>
                  <span className="text-2xl font-bold text-accent">{seasonal.length}</span>
                  <p className="text-xs text-white/50">Seasonal Traditions</p>
                </div>
              </div>
              <p className="text-sm text-white/60">Haunting tales &amp; candlelit holidays</p>
            </div>
          </div>

          {/* Stats footer */}
          <div className="flex items-center justify-center gap-6 text-center mb-8">
            <div>
              <span className="text-3xl font-bold text-accent">{animatedEventCount}</span>
              <span className="block text-xs text-white/40">Events</span>
            </div>
            <span className="text-accent/30">◆</span>
            <div>
              <span className="text-3xl font-bold text-accent">10</span>
              <span className="block text-xs text-white/40">Months</span>
            </div>
            <span className="text-accent/30">◆</span>
            <div>
              <span className="text-3xl font-bold text-accent">1</span>
              <span className="block text-xs text-white/40">Historic Site</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="text-sm text-accent hover:text-white transition-colors uppercase tracking-wider"
            >
              View Full 2026 Calendar →
            </Link>
          </div>
        </div>
      </div>

      {/* Part 3: Promise vs Proof Ledger (Condensed) */}
      <div
        ref={ledgerRef}
        className="relative z-10 py-16 md:py-20 border-t border-white/10"
        style={{ background: 'var(--parchment, #f5f0e6)' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 mb-3">
              The Official Record of Expansion
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-primary">Two Dates. One Story.</h3>
            <p className="text-text-light mt-2">
              Independence was declared in Philadelphia. It was <em>proven</em> on the frontier.
            </p>
          </div>

          {/* Side by side comparison */}
          <div
            className={`grid md:grid-cols-2 gap-8 mb-10 ${ledgerVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          >
            {/* 1776 - The Promise */}
            <div className="bg-white p-6 border border-secondary/10 rounded relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary/50 text-xs">US</span>
              </div>
              <span className="text-3xl font-bold text-secondary/30">1776</span>
              <span className="block text-sm text-secondary/60 uppercase tracking-wider mb-3">
                The Promise
              </span>
              <h4 className="font-serif text-xl text-primary mb-1">Philadelphia</h4>
              <p className="text-xs text-text-light mb-3">39°57&apos;N · 75°10&apos;W</p>
              <p className="text-sm text-text-light">Words on parchment. A promise made.</p>
            </div>

            {/* 1790 - The Proof */}
            <div className="bg-white p-6 border-2 border-accent/40 rounded relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-burgundy/20 flex items-center justify-center">
                <span className="text-burgundy text-xs font-bold">SW</span>
              </div>
              <span className="text-3xl font-bold text-accent">1790</span>
              <span className="block text-sm text-accent uppercase tracking-wider mb-3">
                The Proof
              </span>
              <h4 className="font-serif text-xl text-primary mb-1">Rocky Mount</h4>
              <p className="text-xs text-text-light mb-3">36°26&apos;N · 82°18&apos;W</p>
              <p className="text-sm text-text-light">Action on the frontier. A promise kept.</p>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className={`flex items-center justify-center gap-8 text-center ${ledgerVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 delay-300`}
          >
            <div>
              <span className="text-2xl font-bold text-accent">{animatedMiles}</span>
              <span className="block text-xs text-text-light">miles from Philadelphia</span>
            </div>
            <span className="text-accent/30">◆</span>
            <div>
              <span className="text-2xl font-bold text-accent">{animatedYears}</span>
              <span className="block text-xs text-text-light">years to prove the promise</span>
            </div>
            <span className="text-accent/30">◆</span>
            <div>
              <span className="text-2xl font-bold text-accent">16th</span>
              <span className="block text-xs text-text-light">state to join the Union</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
