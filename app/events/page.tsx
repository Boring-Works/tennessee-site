import type { Metadata } from "next";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import eventsData from "@/data/events.json";
import lecturesData from "@/data/lectures.json";

export const metadata: Metadata = {
  title: "2026 Events Calendar",
  description:
    "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
  openGraph: {
    title: "2026 Events Calendar | Tennessee Starts Here",
    description:
      "2026 events calendar at Rocky Mount State Historic Site. New programming for America's 250th anniversary and Tennessee's 230th birthday.",
    url: "https://tennesseestartshere.com/events",
  },
};

function groupEventsByMonth(
  events: typeof eventsData.events
): Record<string, typeof eventsData.events> {
  const grouped: Record<string, typeof eventsData.events> = {};

  for (const event of events) {
    const date = new Date(event.date + "T12:00:00");
    const monthKey = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(event);
  }

  return grouped;
}

export default function EventsPage() {
  const groupedEvents = groupEventsByMonth(eventsData.events);
  const eventCount = eventsData.events.length;
  const newEventCount = eventsData.events.filter(e => e.type === "new").length;

  return (
    <>
      {/* Moody Header */}
      <section className="hero-texture bg-primary text-white pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block">2026</span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Events Calendar
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Rocky Mount&apos;s most ambitious programming season. {newEventCount} new events
            for America 250.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12" aria-label="Event statistics">
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-serif font-bold text-accent">{eventCount}</span>
              <span className="text-xs text-white/80 uppercase tracking-[0.2em]">Events</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-serif font-bold text-accent">{newEventCount}</span>
              <span className="text-xs text-white/80 uppercase tracking-[0.2em]">New</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-serif font-bold text-accent">{lecturesData.lectures.length}</span>
              <span className="text-xs text-white/80 uppercase tracking-[0.2em]">Lectures</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="bg-cream border-b border-primary/10" aria-label="Event type legend">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6 justify-center text-xs uppercase tracking-[0.1em]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>
              <span className="text-foreground">New</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true"></span>
              <span className="text-foreground">Enhanced</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
              <span className="text-foreground">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-text-light" aria-hidden="true"></span>
              <span className="text-foreground">Annual</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events by Month */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4">
          {Object.entries(groupedEvents).map(([month, events]) => (
            <div key={month} className="mb-20 last:mb-0">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
                  {month}
                </h2>
                <div className="flex-1 h-px bg-primary/10" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    endDate={event.endDate}
                    time={event.time}
                    type={event.type as "new" | "enhanced" | "recurring" | "milestone"}
                    description={event.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* First 250 CTA */}
      <section className="hero-texture bg-burgundy text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block border-white/30 text-white">
            July 4, 2026
          </span>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Join the First 250
          </h2>

          <p className="text-lg text-white mb-10 max-w-xl mx-auto">
            Be one of 250 Tennesseans whose names will be read aloud on America&apos;s 250th birthday.
          </p>

          <Link
            href="/first-250"
            className="btn-primary inline-block bg-white text-burgundy font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
          >
            Enroll Now
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
            Questions?
          </h2>
          <p className="text-text-light mb-8">
            Contact us for group rates, special accommodations, or volunteer opportunities.
          </p>
          <a
            href="tel:+14235387396"
            className="btn-primary inline-block bg-primary text-white font-semibold px-10 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
          >
            Call (423) 538-7396
          </a>
        </div>
      </section>
    </>
  );
}
