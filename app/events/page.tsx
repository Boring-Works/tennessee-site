import type { Metadata } from "next";
import Link from "next/link";
import eventsData from "@/data/events.json";
import lecturesData from "@/data/lectures.json";
import enrollmentData from "@/data/enrollment.json";

// Enrollment data from shared source
const CURRENT_ENROLLED = enrollmentData.currentEnrolled;
const TOTAL_SPOTS = enrollmentData.totalSpots;
const PROGRESS_PERCENT = Math.round((CURRENT_ENROLLED / TOTAL_SPOTS) * 100);

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

// Month character lines - the personality of each month
const monthCharacters: Record<string, string> = {
  "March 2026": "The journey begins",
  "April 2026": "Stories come alive",
  "May 2026": "The frontier awakens",
  "June 2026": "Tennessee celebrates 230",
  "July 2026": "America turns 250",
  "August 2026": "Honoring all who shaped this land",
  "September 2026": "Descendants gather",
  "October 2026": "Harvest and haunting",
  "November 2026": "Traditions begin",
  "December 2026": "The year closes by candlelight",
};

// All months in order for the progress bar
const allMonths = [
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

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

function getEventDuration(event: typeof eventsData.events[0]): number {
  if (!event.endDate) return 1;
  const start = new Date(event.date + "T12:00:00");
  const end = new Date(event.endDate + "T12:00:00");
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDateRange(start: string, end?: string | null): string {
  if (!end) return formatDate(start);

  const startDate = new Date(start + "T12:00:00");
  const endDate = new Date(end + "T12:00:00");

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}–${endDate.getDate()}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}

export default function EventsPage() {
  const groupedEvents = groupEventsByMonth(eventsData.events);
  const eventCount = eventsData.events.length;
  const newEventCount = eventsData.events.filter((e) => e.type === "new").length;
  const festivalCount = eventsData.events.filter((e) => e.category === "festival" || e.category === "signature").length;

  return (
    <>
      {/* ============================================
          PAGE HEADER - The Commemorative Year
          ============================================ */}
      <section className="calendar-header" aria-labelledby="calendar-page-heading">
        <div className="calendar-header-content">
          {/* Eyebrow */}
          <p className="calendar-eyebrow">Rocky Mount State Historic Site</p>

          {/* Main headline */}
          <h1 id="calendar-page-heading" className="calendar-headline">
            <span className="calendar-headline-year">2026</span>
            <span className="calendar-headline-text">The Commemorative Year</span>
          </h1>

          {/* Subheadline */}
          <p className="calendar-subheadline">
            America&apos;s 250th anniversary. Tennessee&apos;s 230th birthday. Our most ambitious season yet.
          </p>

          {/* Stats row */}
          <div className="calendar-stats">
            <div className="calendar-stat">
              <span className="calendar-stat-number">{eventCount}</span>
              <span className="calendar-stat-label">Events</span>
            </div>
            <div className="calendar-stat-divider" aria-hidden="true" />
            <div className="calendar-stat">
              <span className="calendar-stat-number">{newEventCount}</span>
              <span className="calendar-stat-label">New for 2026</span>
            </div>
            <div className="calendar-stat-divider" aria-hidden="true" />
            <div className="calendar-stat">
              <span className="calendar-stat-number">{lecturesData.lectures.length}</span>
              <span className="calendar-stat-label">Lectures</span>
            </div>
            <div className="calendar-stat-divider" aria-hidden="true" />
            <div className="calendar-stat">
              <span className="calendar-stat-number">{festivalCount}</span>
              <span className="calendar-stat-label">Festivals</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          YEAR PROGRESS BAR - Sticky Navigation
          ============================================ */}
      <nav className="year-progress" aria-label="Navigate by month">
        <div className="year-progress-inner">
          <div className="year-progress-track">
            {allMonths.map((month) => {
              const hasEvents = groupedEvents[month] && groupedEvents[month].length > 0;
              const monthId = month.toLowerCase().replace(/\s+/g, "-");
              const shortMonth = month.split(" ")[0].slice(0, 3);

              return (
                <a
                  key={month}
                  href={hasEvents ? `#${monthId}` : undefined}
                  className={`year-progress-month ${hasEvents ? "year-progress-month--active" : "year-progress-month--empty"}`}
                  aria-label={hasEvents ? `Jump to ${month}` : `No events in ${month}`}
                >
                  <span className="year-progress-month-dot" aria-hidden="true" />
                  <span className="year-progress-month-label">{shortMonth}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ============================================
          THE LIVING CALENDAR - Month by Month
          ============================================ */}
      <section className="living-calendar" aria-labelledby="living-calendar-heading">
        <h2 id="living-calendar-heading" className="sr-only">2026 Events by Month</h2>

        {Object.entries(groupedEvents).map(([month, events]) => {
          const monthId = month.toLowerCase().replace(/\s+/g, "-");
          const character = monthCharacters[month] || "";

          return (
            <article key={month} id={monthId} className="calendar-month" aria-labelledby={`${monthId}-heading`}>
              {/* Month header */}
              <header className="calendar-month-header">
                <div className="calendar-month-title-group">
                  <h3 id={`${monthId}-heading`} className="calendar-month-title">
                    {month.split(" ")[0]}
                  </h3>
                  <p className="calendar-month-character">{character}</p>
                </div>
                <span className="calendar-month-count">
                  {events.length} event{events.length !== 1 ? "s" : ""}
                </span>
              </header>

              {/* Events grid */}
              <div className="calendar-month-events">
                {events.map((event) => {
                  const duration = getEventDuration(event);
                  const isMultiDay = duration > 1;
                  const isLecture = event.category === "lecture";
                  const isSignature = event.category === "signature";
                  const isMilestone = event.type === "milestone";

                  // Determine card size class
                  let sizeClass = "calendar-event--standard";
                  if (isMultiDay && duration >= 3) {
                    sizeClass = "calendar-event--large";
                  } else if (isMultiDay || isSignature) {
                    sizeClass = "calendar-event--medium";
                  }

                  // Determine type class
                  let typeClass = "";
                  if (isSignature) typeClass = "calendar-event--signature";
                  else if (isLecture) typeClass = "calendar-event--lecture";
                  else if (isMilestone) typeClass = "calendar-event--milestone";
                  else if (event.type === "new") typeClass = "calendar-event--new";

                  return (
                    <article
                      key={event.id}
                      id={event.id}
                      className={`calendar-event ${sizeClass} ${typeClass}`}
                    >
                      {/* Date block */}
                      <div className="calendar-event-date">
                        <time dateTime={event.date} className="calendar-event-date-inner">
                          {isMultiDay ? (
                            <>
                              <span className="calendar-event-date-range">
                                {formatDateRange(event.date, event.endDate)}
                              </span>
                              <span className="calendar-event-date-duration">
                                {duration} days
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="calendar-event-date-month">
                                {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                              </span>
                              <span className="calendar-event-date-day">
                                {new Date(event.date + "T12:00:00").getDate()}
                              </span>
                            </>
                          )}
                        </time>
                      </div>

                      {/* Content */}
                      <div className="calendar-event-content">
                        {/* Badge */}
                        <span className={`calendar-event-badge calendar-event-badge--${event.type}`}>
                          {event.type === "new" && "New for 2026"}
                          {event.type === "enhanced" && "Enhanced"}
                          {event.type === "recurring" && "Annual Tradition"}
                          {event.type === "milestone" && "Milestone"}
                        </span>

                        {/* Title */}
                        <h4 className="calendar-event-title">{event.title}</h4>

                        {/* Time */}
                        {event.time && (
                          <p className="calendar-event-time">{event.time}</p>
                        )}

                        {/* Speaker (for lectures) */}
                        {isLecture && "speaker" in event && event.speaker && (
                          <p className="calendar-event-speaker">
                            <span className="calendar-event-speaker-name">{event.speaker}</span>
                            {"speakerTitle" in event && event.speakerTitle && (
                              <span className="calendar-event-speaker-title">{event.speakerTitle}</span>
                            )}
                          </p>
                        )}

                        {/* Description */}
                        <p className="calendar-event-desc">{event.description}</p>

                        {/* Signature event CTA */}
                        {isSignature && event.id === "colonial-independence-day" && (
                          <div className="calendar-event-cta">
                            <Link href="/first-250" className="calendar-event-cta-link">
                              Join the First 250
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      {/* ============================================
          FIRST 250 REMINDER - Contextual CTA
          ============================================ */}
      <section className="calendar-cta" aria-labelledby="calendar-cta-heading">
        <div className="calendar-cta-inner">
          <div className="calendar-cta-content">
            <p className="calendar-cta-eyebrow">Colonial Independence Day · July 4, 2026</p>
            <h2 id="calendar-cta-heading" className="calendar-cta-headline">
              Be One of 250
            </h2>
            <p className="calendar-cta-desc">
              Your name, read aloud at Tennessee&apos;s first capital on America&apos;s 250th birthday.
            </p>
          </div>

          <div className="calendar-cta-action">
            {/* Progress indicator */}
            <div className="calendar-cta-progress" role="progressbar" aria-valuenow={CURRENT_ENROLLED} aria-valuemin={0} aria-valuemax={TOTAL_SPOTS}>
              <div className="calendar-cta-progress-bar">
                <div className="calendar-cta-progress-fill" style={{ width: `${PROGRESS_PERCENT}%` }} />
              </div>
              <p className="calendar-cta-progress-label">
                <strong>{CURRENT_ENROLLED}</strong> of {TOTAL_SPOTS} spots claimed
              </p>
            </div>

            <Link href="/first-250" className="calendar-cta-btn">
              Reserve Your Spot
            </Link>

            <p className="calendar-cta-deadline">
              Enrollment closes <time dateTime="2026-06-01">June 1, 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT - Group Visits
          ============================================ */}
      <section className="calendar-contact" aria-labelledby="calendar-contact-heading">
        <div className="calendar-contact-inner">
          <h2 id="calendar-contact-heading" className="calendar-contact-headline">
            Planning a Group Visit?
          </h2>
          <p className="calendar-contact-desc">
            Group rates for 10+. School programs and private tours available.
          </p>
          <a href="tel:+14235387396" className="calendar-contact-btn">
            (423) 538-7396
          </a>
        </div>
      </section>
    </>
  );
}
