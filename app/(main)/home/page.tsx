import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Ticket, GraduationCap, Users, BookOpen, Heart } from 'lucide-react'
import { AnimatedCounter } from '@/components/home/AnimatedCounter'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { DocumentTeaser } from '@/components/evidence'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { QuickBookingCard } from '@/components/QuickBookingCard'
import { NextEventBadge } from '@/components/home/NextEventBadge'
import { WeatherBadge } from '@/components/home/WeatherBadge'
import { GradientCategoryCard } from '@/components/home/GradientCategoryCard'
import { MYSTERY_NARRATIVE, HOOKS, BUTTONS } from '@/lib/copy'
import eventsData from '@/data/events.json'
import siteInfo from '@/data/siteInfo.json'

export const metadata: Metadata = {
  title: "Where Tennessee's Government Began | Rocky Mount State Historic Site",
  description:
    'In 1790, Governor Blount made this ground the first capital of the Southwest Territory. Stand where they stood. America 250 and Tennessee 230 commemorative events in 2026.',
}

// Static data for category counters
const lectures = eventsData.events.filter((e) => e.category === 'lecture')
const festivals = eventsData.events.filter(
  (e) => e.category === 'festival' || e.category === 'signature'
)
const seasonal = eventsData.events.filter((e) => e.category === 'seasonal')
const eventCount = eventsData.events.length

const AUDIENCE_CARDS = [
  {
    href: '/educators',
    icon: GraduationCap,
    title: 'Educators',
    description: 'Bring students to where Tennessee began. Curriculum-aligned to state standards.',
    cta: 'Plan a Field Trip',
  },
  {
    href: '/groups',
    icon: Users,
    title: 'Groups',
    description: 'Group rates for 10+, private tours, and special event bookings.',
    cta: 'Book Your Group',
  },
  {
    href: '/our-story',
    icon: BookOpen,
    title: 'Our Story',
    description: 'From frontier settlement to seat of power. The complete founding story.',
    cta: 'Read the Full Story',
  },
  {
    href: '/support',
    icon: Heart,
    title: 'Support',
    description: 'Help preserve where Tennessee began.',
    cta: 'Ways to Give',
  },
] as const

export default function HomePage() {
  const { hero } = MYSTERY_NARRATIVE

  return (
    <main className="min-h-screen">
      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col bg-primary overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cobb-house.jpg"
            alt="The historic Cobb House at Rocky Mount State Historic Site"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/50" />
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none bg-noise"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center pt-28 pb-16 px-6 lg:px-20">
          <div className="w-full max-w-7xl mx-auto proclamation-frame">
            <div className="proclamation-frame-inner">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                {/* Left Column - 60% */}
                <div className="lg:col-span-3 text-center lg:text-left space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/30 rounded-sm animate-fade-in">
                    <span className="text-base">🇺🇸</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      {hero.badge}
                    </span>
                  </div>

                  {/* Eyebrow */}
                  <p className="text-[11px] uppercase tracking-[0.3em] text-accent/80 font-medium animate-fade-in animation-delay-100">
                    First Capital of the Southwest Territory · 1790
                  </p>

                  {/* Headline */}
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight animate-fade-in animation-delay-200">
                    {hero.headline}
                  </h1>

                  {/* Subhead */}
                  <p className="font-serif text-xl sm:text-2xl text-white/90 leading-relaxed max-w-xl animate-fade-in animation-delay-300">
                    {hero.subhead}
                  </p>

                  {/* Supporting */}
                  <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-lg animate-fade-in animation-delay-350">
                    {hero.supporting}
                  </p>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in animation-delay-350">
                    <div className="flex items-center gap-1.5">
                      <span className="text-accent text-sm">★★★★★</span>
                      <span className="text-white/50 text-xs">TripAdvisor</span>
                    </div>
                    <span className="text-white/20">·</span>
                    <span className="text-white/60 text-xs">50,000+ visitors annually</span>
                  </div>

                  {/* Next Event Badge */}
                  <div className="animate-fade-in animation-delay-375">
                    <NextEventBadge />
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 animate-fade-in animation-delay-400">
                    <Link
                      href="/visit"
                      className="group inline-flex items-center justify-center gap-2.5 bg-accent text-primary px-10 py-5 text-[15px] font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent/35"
                    >
                      {BUTTONS.primary}
                    </Link>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium">
                      Opens March 4
                    </span>
                  </div>
                </div>

                {/* Right Column - 40% - Commemorative Card */}
                <div className="lg:col-span-2 flex justify-center animate-slide-in-right animation-delay-500">
                  <div className="w-full max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80 mb-4">
                      The Commemorative Year
                    </p>
                    <p className="font-serif text-2xl text-white mb-2">Tennessee turns 230.</p>
                    <p className="font-serif text-2xl text-white mb-6">America turns 250.</p>
                    <Link
                      href="/first-250"
                      className="inline-flex items-center gap-2 text-accent text-sm uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Join the First 250
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 flex flex-col items-center animate-fade-in animation-delay-800">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 py-4 px-6 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 text-center sm:text-left">
            Part of the America 250 National Commemoration
          </p>
          <WeatherBadge />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          QUICK FACTS BAR
          ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-cream dark:bg-primary/95 border-y border-secondary/10 dark:border-white/10 py-3">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-light dark:text-white/70">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            {siteInfo.hours.formatted.short}
          </span>
          <span className="hidden sm:block text-secondary/30 dark:text-white/30">|</span>
          <span className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-accent" />
            Adults ${siteInfo.admission.adults.price}
          </span>
          <span className="hidden sm:block text-secondary/30 dark:text-white/30">|</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            {siteInfo.location.drivingDistances[0].time} from{' '}
            {siteInfo.location.drivingDistances[0].city.split(',')[0]}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          ORIGINAL SEVEN COUNTIES
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative bg-[#FDFCFA] py-20 md:py-28 border-t border-[#E8E0D4]"
          aria-labelledby="original-seven-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-primary)] mb-4 font-semibold">
                Sullivan County · Heritage Trail
              </p>
              <h2
                id="original-seven-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6 font-bold"
              >
                Where Blount Governed the Original Seven Counties
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed mb-4">
                From 1790 to 1792, Governor William Blount administered seven counties from Rocky
                Mount—Sullivan, Washington, Greene, and Hawkins in the east; Davidson, Sumner, and
                Tennessee in the Cumberland settlements. The heritage trail connecting these
                founding places begins here.
              </p>
              {/* Cherokee Context */}
              <div className="mt-6 pt-6 border-t border-primary/10">
                <p className="text-sm text-primary/60 italic leading-relaxed">
                  These lands were Cherokee territory. The Evidence Room includes Cherokee voices
                  documenting their diplomatic resistance to American expansion during this period.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mb-10">
              <figure className="relative max-w-4xl mx-auto">
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-primary/10">
                  <Image
                    src="/images/original-seven-map-1790.png"
                    alt="Map of Tennessee at the beginning of 1790, showing the seven original counties: Sullivan, Washington, Hawkins, Greene in the east, and Davidson, Sumner, Tennessee in the west."
                    width={900}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-primary/60 italic">
                  Tennessee at the beginning of 1790 — Map by L. Pork Danville
                </figcaption>
              </figure>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-[var(--gold-primary)] text-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#b89020] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore the Original Seven
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          AUDIENCE ROUTER
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary py-16 md:py-20" aria-labelledby="explore-heading">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-3">
              Explore Your Way
            </p>
            <h2 id="explore-heading" className="font-serif text-2xl md:text-3xl text-white">
              Find What You&apos;re Looking For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIENCE_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07] hover:-translate-y-1"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-radial-glow" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <card.icon className="w-6 h-6 text-accent/80 group-hover:text-accent transition-colors" />
                    <h3 className="font-serif text-lg text-white group-hover:text-accent transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{card.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-accent/80 group-hover:text-accent transition-colors">
                    {card.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          VISITORS SAY IT BEST - TESTIMONIALS (Data-Driven Carousel)
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative bg-white dark:bg-primary/50 border-t border-secondary/10 dark:border-white/10"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-20">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 dark:text-accent mb-4 font-semibold">
                Visitor Experiences
              </p>
              <h2
                id="testimonials-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary dark:text-white mb-4 font-bold"
              >
                Visitors Say It Best
              </h2>
              <p className="text-base text-primary/80 dark:text-white/80 leading-relaxed max-w-2xl mx-auto">
                Visitors consistently describe their experience as &ldquo;immersive,&rdquo;
                &ldquo;authentic,&rdquo; and &ldquo;unlike any other historic site.&rdquo;
              </p>
            </div>
          </div>

          {/* Data-driven testimonial carousel from testimonials.json */}
          <TestimonialCarousel interval={6000} showSource />

          {/* CTA */}
          <div className="text-center pt-8 pb-16 md:pb-20">
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-lg"
            >
              Plan Your Visit
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          2026 COMMEMORATIVE SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="relative bg-primary" aria-labelledby="commemorative-heading">
          {/* Star field background handled in CSS */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />

          <div className="relative z-10 py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
              {/* Decorative Header */}
              <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
                <span className="w-16 h-px bg-accent/40" />
                <span className="text-accent/60 text-sm tracking-[0.5em]">A·D·M·D·C·C·X·X·V·I</span>
                <span className="w-16 h-px bg-accent/40" />
              </div>

              {/* Main Headline */}
              <div className="text-center mb-10">
                <h2
                  id="commemorative-heading"
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 bg-gradient-to-b from-white to-accent bg-clip-text text-transparent"
                >
                  Tennessee turns 230.
                  <br />
                  America turns 250.
                </h2>

                {/* Declarations */}
                <div className="space-y-4 mb-10">
                  {[
                    'First capital of the Southwest Territory.',
                    'Where one of 39 Constitution signers governed the frontier.',
                    'The ground where Tennessee began.',
                  ].map((text, i) => (
                    <p key={i} className="font-serif text-lg text-white/80 italic">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Blount Quote */}
              <div className="relative max-w-2xl mx-auto mb-12 p-8 border border-accent/30 rounded-sm bg-gradient-to-br from-accent/5 to-transparent">
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/50" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/50" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/50" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/50" />

                <blockquote className="text-center">
                  <p className="font-serif text-lg md:text-xl italic text-white/90 leading-relaxed mb-4">
                    &ldquo;I am very well accommodated with a Room with Glass Windows, Fireplace,
                    etc., etc., at this place.&rdquo;
                  </p>
                  <footer className="text-sm text-accent/80">
                    <cite className="not-italic">— William Blount, October 20, 1790</cite>
                    <span className="block text-xs text-white/40 mt-1">
                      Constitution Signer · First Governor of the Southwest Territory
                    </span>
                  </footer>
                </blockquote>
              </div>

              {/* First 250 CTA */}
              <div className="text-center">
                <p className="font-serif text-xl md:text-2xl text-white/90 mb-2">
                  Be one of the <span className="text-accent font-semibold">First 250</span>.
                </p>
                <p className="text-sm text-white/60 mb-6 italic">
                  Your name will be read aloud on the capital grounds, July 4, 2026.
                </p>

                <Link
                  href="/first-250"
                  className="group inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 text-base font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/40"
                >
                  Join the First 250
                </Link>

                <p className="text-xs text-white/50 mt-4">
                  Enrollment closes June 1, 2026 · Charter member benefits included
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          SEE THE EVIDENCE SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <DocumentTeaser />
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          EVENTS CALENDAR SECTION — Redesigned for Visual Impact
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative bg-primary border-t border-white/10 py-20 md:py-24"
          aria-labelledby="events-heading"
        >
          {/* Subtle star field background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Header — Enhanced with commemorative messaging */}
            <div className="text-center mb-12">
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
                <span className="w-12 h-px bg-accent/30" />
                <span className="text-accent/60 text-sm tracking-[0.5em]">2026</span>
                <span className="w-12 h-px bg-accent/30" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/70 mb-3">
                The Commemorative Year
              </p>
              <h2
                id="events-heading"
                className="font-serif text-3xl md:text-4xl text-white mb-4 font-bold"
              >
                Experience Where Tennessee Began
              </h2>
              <p className="text-base text-white/70 mb-2">
                <AnimatedCounter end={eventCount} duration={1500} /> signature events celebrating
              </p>
              <p className="text-lg text-white/90 font-serif italic">
                America&apos;s 250th · Tennessee&apos;s 230th
              </p>
            </div>

            {/* Magazine-Style Event Grid — Asymmetric Layout */}
            <div className="grid lg:grid-cols-5 gap-5 mb-10">
              {/* Large Featured Booking Card — 60% width (3 columns) */}
              <div className="lg:col-span-3">
                <QuickBookingCard className="h-full min-h-[280px]" />
              </div>

              {/* Vertical Category Stack — 40% width (2 columns) */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <GradientCategoryCard
                  count={lectures.length}
                  label="Lecture Series"
                  icon="📜"
                  gradient="gold-burgundy"
                  href="/events?category=lecture"
                />
                <GradientCategoryCard
                  count={festivals.length}
                  label="Festivals & Events"
                  icon="🎭"
                  gradient="burgundy-navy"
                  href="/events?category=festival"
                />
                <GradientCategoryCard
                  count={seasonal.length}
                  label="Seasonal Programs"
                  icon="🕯️"
                  gradient="gold-navy"
                  href="/events?category=seasonal"
                />
              </div>
            </div>

            {/* Dual CTA Banner — Improved engagement */}
            <div className="relative border-t border-white/10 pt-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/[0.15] border border-white/20 hover:border-accent/50 text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-accent">📅</span>
                  View Full Calendar
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/visit"
                  className="group inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,162,39,0.4)]"
                >
                  <span className="text-lg">★</span>
                  Plan Your Visit
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Subtext */}
              <p className="text-center text-xs text-white/40 mt-6">
                Join 50,000+ annual visitors · Open Wed–Sat, March 4–December 20
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          PLAN YOUR VISIT
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative py-24 md:py-32 bg-white dark:bg-primary"
          aria-labelledby="visit-heading"
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
                <span className="w-12 h-px bg-secondary/20 dark:bg-white/20" />
                <span className="text-accent text-sm">✦</span>
                <span className="w-12 h-px bg-secondary/20 dark:bg-white/20" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-secondary/50 dark:text-white/50 mb-4">
                Your Invitation Awaits
              </p>

              <h2
                id="visit-heading"
                className="font-serif text-4xl md:text-5xl bg-gradient-to-b from-primary to-secondary dark:from-white dark:to-accent bg-clip-text text-transparent mb-4"
              >
                Plan Your Visit
              </h2>

              <p className="font-serif text-lg text-text-light dark:text-white/70 italic max-w-md mx-auto">
                Stand where they stood. Walk the ground where Tennessee began.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                {
                  icon: MapPin,
                  title: 'Piney Flats, TN',
                  lines: ['15 minutes from Johnson City', '36°26′N · 82°18′W'],
                },
                {
                  icon: Clock,
                  title: 'Visiting Hours',
                  lines: [
                    siteInfo.hours.formatted.short,
                    siteInfo.hours.tourNote,
                    `Closed ${['Sunday', 'Monday', 'Tuesday'].join('–')}`,
                  ],
                },
                {
                  icon: Ticket,
                  title: 'Admission',
                  lines: [
                    `Adults $${siteInfo.admission.adults.price} · Seniors $${siteInfo.admission.seniors.price}`,
                    `Children $${siteInfo.admission.children.price}`,
                    '✓ Free Parking',
                  ],
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group relative bg-cream dark:bg-white/5 border-2 border-dashed border-secondary/20 dark:border-white/20 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <card.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-primary dark:text-white text-center mb-2">
                    {card.title}
                  </h3>
                  <div className="space-y-1 text-center">
                    {card.lines.map((line, j) => (
                      <p
                        key={j}
                        className={`text-sm ${j === card.lines.length - 1 && card.title === 'Admission' ? 'text-accent' : 'text-text-light dark:text-white/60'}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-6 bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 rounded-sm mb-12">
              <div className="flex items-center gap-2">
                <span className="text-accent text-lg tracking-wider">★★★★★</span>
                <span className="text-sm text-text-light dark:text-white/60">TripAdvisor</span>
              </div>
              <span className="hidden sm:block w-px h-6 bg-primary/10 dark:bg-white/10" />
              <span className="text-sm text-text-light dark:text-white/60">
                <span className="font-semibold text-primary dark:text-white">50,000+</span> visitors
                annually
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/visit"
                className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 text-base font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/40"
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  ★
                </span>
                {BUTTONS.primary}
              </Link>

              <a
                href="https://maps.google.com/?q=Rocky+Mount+State+Historic+Site+Piney+Flats+TN"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center justify-center border-2 border-primary/20 dark:border-white/20 text-primary dark:text-white px-10 py-4 transition-all duration-300 hover:border-accent hover:bg-accent/5"
              >
                <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  Get Directions
                </span>
                <span className="text-xs text-text-light dark:text-white/50 mt-1">
                  Open in Google Maps
                </span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════════════════
          INDIGENOUS ACKNOWLEDGMENT
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 bg-cream dark:bg-primary border-t border-secondary/10 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="w-8 h-px bg-secondary/20 dark:bg-white/20" />
            <span className="text-secondary/30 dark:text-white/30">◆</span>
            <span className="w-8 h-px bg-secondary/20 dark:bg-white/20" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 dark:text-white/40 mb-4">
            A Note of Respect
          </p>

          <p className="font-serif text-base md:text-lg text-text-light dark:text-white/70 leading-relaxed italic">
            We acknowledge with respect that this valley was—and remains—ancestral homeland to the
            Cherokee and other Indigenous peoples, whose stewardship and stories continue today.
          </p>

          <p className="text-sm text-text-light/60 dark:text-white/50 mt-4">
            The history we share here honors, but does not replace, their enduring presence.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative bg-primary overflow-hidden py-24 md:py-32"
          aria-labelledby="cta-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-[#050d18]" />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 px-6">
            <div className="max-w-2xl mx-auto text-center">
              {/* Decorative */}
              <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
                <span className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <span className="text-accent text-sm">✦</span>
                <span className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              </div>

              {/* Washington Quote */}
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3">
                  George Washington asked
                </p>
                <blockquote className="font-serif text-lg md:text-xl italic text-white/60">
                  &ldquo;Where ought the Governor to reside?&rdquo;
                </blockquote>
                <p className="text-sm text-accent/60 mt-2">— August 13, 1790</p>
              </div>

              {/* Headline */}
              <h2
                id="cta-heading"
                className="font-serif text-4xl md:text-5xl leading-tight mb-6 bg-gradient-to-b from-white to-accent bg-clip-text text-transparent"
              >
                The Story Continues With You
              </h2>

              {/* Hook */}
              <p className="font-serif text-xl md:text-2xl italic text-white/70 mb-4">
                {HOOKS.primaryCTA}
              </p>

              {/* Social Proof */}
              <p className="text-sm text-white/40 mb-10">
                Join <span className="text-accent">50,000+</span> annual visitors who stand where
                Tennessee began
              </p>

              {/* CTA */}
              <Link
                href="/visit"
                className="group inline-flex items-center justify-center gap-3 bg-accent text-primary px-12 py-6 text-lg font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-accent-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/50"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  ★
                </span>
                {BUTTONS.primary}
              </Link>

              {/* Closing */}
              <p className="mt-12 font-serif text-lg md:text-xl italic bg-gradient-to-b from-accent/90 to-accent/60 bg-clip-text text-transparent">
                {HOOKS.closingTagline}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-center gap-4 mt-10" aria-hidden="true">
                <span className="text-accent/30 text-sm">❧</span>
                <span className="w-12 h-px bg-accent/20" />
                <span className="text-accent/50 text-xs">AD MDCCXC</span>
                <span className="w-12 h-px bg-accent/20" />
                <span className="text-accent/30 text-sm">❧</span>
              </div>

              <p className="mt-8 text-xs text-white/20">
                Rocky Mount State Historic Site · Piney Flats, Tennessee
                <br />
                <span className="text-white/15">
                  Capital of the Southwest Territory · 1790–1792
                </span>
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
