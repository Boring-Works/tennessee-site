import Link from "next/link";
import Countdown from "@/components/Countdown";
import { FeaturedEventCard } from "@/components/EventCard";
import EmailSignup from "@/components/EmailSignup";
import eventsData from "@/data/events.json";

const featuredEvents = eventsData.events.filter((event) => event.featured);

export default function Home() {
  return (
    <>
      {/* THE 1790 WATERMARK - Always present, barely visible */}
      <div className="watermark-1790" aria-hidden="true">
        1790
      </div>

      {/* ============================================
          CINEMATIC HERO - Full viewport, commanding
          ============================================ */}
      <section className="hero-cinematic">
        <div className="hero-gradient-overlay" />

        <div className="relative z-10 text-center px-4">
          {/* Tiny badge - understated */}
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent mb-8">
            America 250 | Tennessee 230
          </p>

          {/* THE HEADLINE - Massive, stacked, commanding */}
          <h1 className="text-white mb-8">
            <span className="block headline-massive">Tennessee</span>
            <span className="block headline-massive headline-light text-accent">
              starts here
            </span>
          </h1>

          {/* Single CTA - nothing else */}
          <Link
            href="/events"
            className="btn-primary inline-block bg-accent text-primary font-semibold px-12 py-5 rounded-sm text-sm uppercase tracking-[0.2em]"
          >
            Explore 2026
          </Link>
        </div>

        {/* Countdown - subtle, at bottom */}
        <div className="absolute bottom-24 left-0 right-0 z-10">
          <Countdown />
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator text-white/60" role="presentation" aria-hidden="true">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============================================
          BREATHING ROOM + FIRST QUOTE
          ============================================ */}
      <div className="h-[12vh] md:h-[20vh] bg-background" />

      <section className="quote-pause" aria-labelledby="quote-1">
        <blockquote className="max-w-3xl mx-auto">
          <p id="quote-1" className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-6">
            &ldquo;I have the honor to inform you that I arrived at this place on the 10th instant.&rdquo;
          </p>
          <footer className="text-accent text-sm tracking-[0.2em] uppercase">
            — William Blount
            <span className="block text-white/70 text-xs mt-1 tracking-normal normal-case">
              Letter to President Washington, October 1790
            </span>
          </footer>
        </blockquote>
      </section>

      <div className="h-[8vh] md:h-[10vh] bg-background" />

      {/* ============================================
          THE STORY - Dramatic whitespace, narrow text
          ============================================ */}
      <section className="py-20 md:py-32 lg:py-40 bg-cream relative z-10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="section-decorator">
            <span>Where Tennessee Began</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-12 leading-tight">
            The First Seat of Government
          </h2>

          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground">
            <p>
              In 1770, William Cobb and his family settled this land—six years before
              the Declaration of Independence was signed.
            </p>
            <p>
              Two decades later, President George Washington appointed William Blount to
              govern the Southwest Territory. Blount chose Rocky Mount as his headquarters,
              making this the first seat of government for what would become Tennessee.
            </p>
            <p>
              From 1790 to 1792, the business of a nation was conducted here—treaties
              negotiated, laws enacted, and the foundation laid for the 16th state.
            </p>
          </div>

          <div className="mt-16 pt-16 border-t border-primary/10">
            <p className="font-serif text-2xl md:text-3xl text-primary font-semibold leading-snug">
              In 2026, we celebrate 250 years of American independence at the place where Tennessee&apos;s story began.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECOND QUOTE - PAUSE
          ============================================ */}
      <section className="quote-pause" aria-labelledby="quote-2">
        <blockquote className="max-w-3xl mx-auto">
          <p id="quote-2" className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-6">
            &ldquo;The seat of government for the territory south of the river Ohio.&rdquo;
          </p>
          <footer className="text-accent text-sm tracking-[0.2em] uppercase">
            — Act of Congress
            <span className="block text-white/70 text-xs mt-1 tracking-normal normal-case">
              Establishing the Southwest Territory, 1790
            </span>
          </footer>
        </blockquote>
      </section>

      {/* ============================================
          FEATURED EVENTS
          ============================================ */}
      <section className="py-24 md:py-32 bg-cream-dark relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-decorator">
              <span>Commemorative Programming</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              2026: A Year of History
            </h2>

            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Rocky Mount has created entirely new programming for America&apos;s
              Semiquincentennial. Six new events, five lectures, and our first-ever
              community commemoration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredEvents.slice(0, 4).map((event) => (
              <FeaturedEventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                endDate={event.endDate}
                time={event.time}
                type={event.type as "new" | "enhanced" | "recurring" | "milestone"}
                description={event.description}
                featured={event.featured}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="btn-primary inline-block bg-primary text-white font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
            >
              View Full Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          FIRST 250 - BURGUNDY ACCENT
          ============================================ */}
      <section className="hero-texture bg-burgundy text-white py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block border-white/30 text-white">
            July 4, 2026
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Join the First 250
          </h2>

          <p className="text-xl text-white mb-4 max-w-2xl mx-auto">
            Be one of 250 Tennesseans whose names will be read aloud on July 4,
            2026—America&apos;s 250th birthday—at the site where Tennessee&apos;s
            government began.
          </p>

          <p className="text-white/90 mb-10">
            Enrollment closes June 1, 2026.
          </p>

          <Link
            href="/first-250"
            className="btn-primary inline-block bg-white text-burgundy font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
          >
            Enroll Now
          </Link>
        </div>
      </section>

      {/* ============================================
          THIRD QUOTE - PAUSE
          ============================================ */}
      <section className="quote-pause" aria-labelledby="quote-3">
        <blockquote className="max-w-3xl mx-auto">
          <p id="quote-3" className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-6">
            &ldquo;Here the work of building a state began.&rdquo;
          </p>
          <footer className="text-accent text-sm tracking-[0.2em] uppercase">
            — Rocky Mount Historical Association
          </footer>
        </blockquote>
      </section>

      {/* ============================================
          EMAIL SIGNUP
          ============================================ */}
      <section className="py-24 md:py-32 bg-cream relative z-10">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="section-decorator">
            <span>Stay Informed</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
            Get Updates
          </h2>

          <p className="text-lg text-text-light mb-10">
            Receive news about America 250 programming, events, and the First 250 enrollment.
          </p>

          <EmailSignup />
        </div>
      </section>

      {/* ============================================
          PLAN YOUR VISIT
          ============================================ */}
      <section className="hero-texture bg-primary text-white py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Plan Your Visit
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Step back in time at Rocky Mount State Historic Site. Our costumed
            interpreters bring frontier life to vivid reality.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="border border-white/30 rounded-sm p-6">
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">Hours</p>
              <p className="text-white font-serif">Tue-Sat: 10am-5pm</p>
              <p className="text-white font-serif">Sun: 1pm-5pm</p>
            </div>
            <div className="border border-white/30 rounded-sm p-6">
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">Admission</p>
              <p className="text-white font-serif">Adults: $8</p>
              <p className="text-white font-serif">Children: $5</p>
            </div>
            <div className="border border-white/30 rounded-sm p-6">
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">Location</p>
              <p className="text-white font-serif">200 Hyder Hill Rd</p>
              <p className="text-white font-serif">Piney Flats, TN</p>
            </div>
          </div>

          <Link
            href="/visit"
            className="btn-primary inline-block bg-accent text-primary font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>
    </>
  );
}
