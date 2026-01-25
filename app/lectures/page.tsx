import type { Metadata } from "next";
import Link from "next/link";
import lecturesData from "@/data/lectures.json";
import type { LecturesData } from "@/types/data";

const typedLecturesData = lecturesData as LecturesData;

// Roman numerals for chapter numbers
const romanNumerals = ["I", "II", "III", "IV", "V"];

// Narrative connections between lectures
const lectureConnections: Record<number, string> = {
  1: "Understanding frontier faith sets the stage for the sacrifices that followed.",
  2: "Mary Patton's powder enabled the march you'll learn about next.",
  3: "The Overmountain Men's victory made westward expansion possible.",
  4: "Blount's arrival at Rocky Mount began Tennessee's government.",
  // Lecture 5 has no "next" connection
};

// Credential badges for speakers
const credentialBadges: Record<string, string> = {
  "Vanderbilt University": "Vanderbilt Scholar",
  "Sycamore Shoals State Historic Park": "Living History",
  "Independent Scholar": "Historian",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateStr: string): { month: string; day: string } {
  const date = new Date(dateStr + "T12:00:00");
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate().toString(),
  };
}

export const metadata: Metadata = {
  title: "Lecture Series",
  description:
    "Rocky Mount's first lecture series featuring scholars on colonial religion, the Overmountain Men, and the birth of Tennessee government.",
  openGraph: {
    title: "Lecture Series | Tennessee Starts Here",
    description:
      "Rocky Mount's first lecture series featuring scholars on colonial religion, the Overmountain Men, and the birth of Tennessee government.",
    url: "https://tennesseestartshere.com/lectures",
  },
};

export default function LecturesPage() {
  const { lectures, additionalProgramming } = typedLecturesData;

  return (
    <>
      {/* ============================================
          HERO - First-Ever Milestone
          ============================================ */}
      <section className="series-hero" aria-labelledby="series-heading">
        <div className="series-hero-content">
          {/* Milestone badge */}
          <p className="series-milestone-badge">
            <span className="series-milestone-icon" aria-hidden="true">★</span>
            Rocky Mount&apos;s First-Ever Lecture Series
          </p>

          {/* Main headline */}
          <h1 id="series-heading" className="series-headline">
            <span className="series-headline-small">The Founding Story</span>
            <span className="series-headline-large">In Five Lectures</span>
          </h1>

          {/* Journey framing */}
          <p className="series-journey">
            From frontier faith to founding government — five distinguished speakers trace the path that led to Tennessee.
          </p>

          {/* Quick stats */}
          <div className="series-stats">
            <div className="series-stat">
              <span className="series-stat-number">5</span>
              <span className="series-stat-label">Lectures</span>
            </div>
            <div className="series-stat-divider" aria-hidden="true" />
            <div className="series-stat">
              <span className="series-stat-number">4</span>
              <span className="series-stat-label">Months</span>
            </div>
            <div className="series-stat-divider" aria-hidden="true" />
            <div className="series-stat">
              <span className="series-stat-number">1</span>
              <span className="series-stat-label">Historic Year</span>
            </div>
          </div>

          {/* Admission note */}
          <p className="series-admission">
            Free with regular admission · Seating limited · Arrive early
          </p>
        </div>
      </section>

      {/* ============================================
          VISUAL TIMELINE - March to June
          ============================================ */}
      <nav className="series-timeline" aria-label="Lecture schedule">
        <div className="series-timeline-inner">
          <div className="series-timeline-track">
            {lectures.map((lecture, index) => {
              const shortDate = formatShortDate(lecture.date);
              return (
                <a
                  key={lecture.id}
                  href={`#lecture-${lecture.id}`}
                  className="series-timeline-point"
                  aria-label={`Jump to Lecture ${index + 1}: ${lecture.title}`}
                >
                  <span className="series-timeline-chapter">{romanNumerals[index]}</span>
                  <span className="series-timeline-dot" aria-hidden="true" />
                  <span className="series-timeline-date">
                    {shortDate.month} {shortDate.day}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ============================================
          WHY THESE LECTURES - Prologue
          ============================================ */}
      <section className="series-prologue" aria-labelledby="prologue-heading">
        <div className="series-prologue-inner">
          <h2 id="prologue-heading" className="series-prologue-headline">
            Why These Lectures?
          </h2>
          <p className="series-prologue-text">
            Rocky Mount wasn&apos;t just a log house on the frontier. It was where Tennessee&apos;s government began — where William Blount, appointed by George Washington, established the Southwest Territory in 1790. To understand that moment, you need to understand what came before: the faith that sustained settlers, the heroes who secured the frontier, and the gambles that made expansion possible.
          </p>
          <p className="series-prologue-text">
            This series tells that story. Each lecture builds on the last, creating a complete picture of how Tennessee came to be.
          </p>
        </div>
      </section>

      {/* ============================================
          THE LECTURES - Five Chapters
          ============================================ */}
      <section className="series-lectures" aria-labelledby="lectures-heading">
        <h2 id="lectures-heading" className="sr-only">The 2026 Lecture Series</h2>

        <div className="series-lectures-list">
          {lectures.map((lecture, index) => {
            const chapter = romanNumerals[index];
            const shortDate = formatShortDate(lecture.date);
            const credential = lecture.speaker.institution
              ? credentialBadges[lecture.speaker.institution] || lecture.speaker.title
              : lecture.speaker.title;
            const connection = lectureConnections[lecture.id];
            const isLastLecture = index === lectures.length - 1;

            return (
              <article
                key={lecture.id}
                id={`lecture-${lecture.id}`}
                className={`series-lecture ${isLastLecture ? "series-lecture--finale" : ""}`}
              >
                {/* Chapter marker */}
                <div className="series-lecture-marker">
                  <span className="series-lecture-chapter">{chapter}</span>
                  <div className="series-lecture-line" aria-hidden="true" />
                </div>

                {/* Lecture content */}
                <div className="series-lecture-content">
                  {/* Header */}
                  <header className="series-lecture-header">
                    <div className="series-lecture-date-block">
                      <time dateTime={lecture.date} className="series-lecture-date">
                        <span className="series-lecture-date-month">{shortDate.month}</span>
                        <span className="series-lecture-date-day">{shortDate.day}</span>
                      </time>
                      <span className="series-lecture-time">{lecture.time}</span>
                    </div>

                    <div className="series-lecture-title-group">
                      <h3 className="series-lecture-title">{lecture.title}</h3>
                      <p className="series-lecture-full-date">{formatDate(lecture.date)}</p>
                    </div>
                  </header>

                  {/* Speaker */}
                  <div className="series-lecture-speaker">
                    <div className="series-lecture-speaker-info">
                      <p className="series-lecture-speaker-name">
                        {lecture.speaker.portraying
                          ? `${lecture.speaker.name} as ${lecture.speaker.portraying}`
                          : lecture.speaker.name}
                      </p>
                      <p className="series-lecture-speaker-title">
                        {lecture.speaker.title}
                        {lecture.speaker.institution && lecture.speaker.institution !== "Independent Scholar" && (
                          <>, {lecture.speaker.institution}</>
                        )}
                      </p>
                    </div>
                    <span className="series-lecture-credential">{credential}</span>
                  </div>

                  {/* Description */}
                  <p className="series-lecture-desc">{lecture.description}</p>

                  {/* Format note if applicable */}
                  {lecture.format && (
                    <p className="series-lecture-format">
                      <strong>Format:</strong> {lecture.format}
                    </p>
                  )}

                  {/* You'll Discover */}
                  <div className="series-lecture-discover">
                    <p className="series-lecture-discover-label">You&apos;ll Discover</p>
                    <ul className="series-lecture-discover-list">
                      {lecture.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Speaker bio (expandable) */}
                  <details className="series-lecture-bio">
                    <summary className="series-lecture-bio-toggle">
                      About {lecture.speaker.name.split(" ")[0]}
                      <svg className="series-lecture-bio-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </summary>
                    <p className="series-lecture-bio-text">{lecture.speaker.bio}</p>
                  </details>

                  {/* Connection to next lecture */}
                  {connection && (
                    <p className="series-lecture-connection">
                      <span className="series-lecture-connection-icon" aria-hidden="true">→</span>
                      {connection}
                    </p>
                  )}

                  {/* Special note */}
                  {lecture.note && (
                    <p className="series-lecture-note">{lecture.note}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============================================
          BEYOND THE SERIES - Cherokee Heritage
          ============================================ */}
      <section className="series-beyond" aria-labelledby="beyond-heading">
        <div className="series-beyond-inner">
          <header className="series-beyond-header">
            <p className="series-beyond-eyebrow">Beyond the Series</p>
            <h2 id="beyond-heading" className="series-beyond-headline">
              The Story Continues
            </h2>
            <p className="series-beyond-intro">
              The founding story includes voices not in this lecture series. Cherokee Heritage Weekend explores the perspectives of those who called this land home long before European settlement.
            </p>
          </header>

          <article className="series-beyond-event">
            <div className="series-beyond-event-date">
              <time dateTime={additionalProgramming.date}>
                <span className="series-beyond-event-month">Aug</span>
                <span className="series-beyond-event-days">22–23</span>
              </time>
            </div>

            <div className="series-beyond-event-content">
              <span className="series-beyond-event-badge">Weekend Festival</span>
              <h3 className="series-beyond-event-title">{additionalProgramming.title}</h3>
              <p className="series-beyond-event-desc">{additionalProgramming.description}</p>

              <div className="series-beyond-event-speaker">
                <p className="series-beyond-event-speaker-name">
                  Featuring {additionalProgramming.speaker.name}
                </p>
                <p className="series-beyond-event-speaker-title">
                  {additionalProgramming.speaker.title}
                </p>
              </div>

              <Link href="/events#cherokee-heritage" className="series-beyond-event-link">
                View Event Details
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ============================================
          CTA - Join the Learning Community
          ============================================ */}
      <section className="series-cta" aria-labelledby="series-cta-heading">
        <div className="series-cta-inner">
          <h2 id="series-cta-heading" className="series-cta-headline">
            5 Lectures. One Historic Year.
          </h2>
          <p className="series-cta-subheadline">
            Seating is limited. Join us at Rocky Mount.
          </p>

          <div className="series-cta-actions">
            <Link href="/visit" className="series-cta-btn series-cta-btn--primary">
              Plan Your Visit
            </Link>
            <Link href="/events" className="series-cta-btn series-cta-btn--secondary">
              Full 2026 Calendar
            </Link>
          </div>

          <p className="series-cta-location">
            <svg className="series-cta-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Rocky Mount State Historic Site · Piney Flats, Tennessee
          </p>
        </div>
      </section>
    </>
  );
}
