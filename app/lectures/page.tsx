import type { Metadata } from "next";
import Link from "next/link";
import LectureCard from "@/components/LectureCard";
import lecturesData from "@/data/lectures.json";
import type { LecturesData } from "@/types/data";

const typedLecturesData = lecturesData as LecturesData;

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + "T12:00:00");
  const end = new Date(endDate + "T12:00:00");
  return `${start.toLocaleDateString("en-US", { month: "long", day: "numeric" })}-${end.toLocaleDateString("en-US", { day: "numeric", year: "numeric" })}`;
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
  const { series, lectures, additionalProgramming } = typedLecturesData;

  return (
    <>
      {/* Moody Header */}
      <section className="hero-texture bg-primary text-white pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block">{series.year}</span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {series.title}
          </h1>

          <p className="text-xl md:text-2xl text-accent font-serif italic mb-6">
            {series.subtitle}
          </p>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {series.description}
          </p>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-accent">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-primary text-sm uppercase tracking-[0.15em] font-semibold">
            {series.note}
          </p>
        </div>
      </section>

      {/* Series Overview */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-lg md:text-xl leading-relaxed text-foreground">
            From March through June 2026, join us for in-depth explorations of the
            people and events that shaped Tennessee&apos;s founding. Each lecture offers
            a unique window into frontier life, the Revolutionary War, and the
            political foundations of our state.
          </p>
        </div>
      </section>

      {/* Lectures */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-decorator">
              <span>Five Distinguished Speakers</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              The 2026 Lecture Series
            </h2>
          </div>

          <div className="space-y-10">
            {lectures.map((lecture, index) => (
              <LectureCard
                key={lecture.id}
                number={index + 1}
                title={lecture.title}
                date={lecture.date}
                time={lecture.time}
                speaker={lecture.speaker}
                description={lecture.description}
                topics={lecture.topics}
                format={lecture.format}
                note={lecture.note}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Programming */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-decorator">
              <span>Beyond the Lecture Series</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Additional Programming
            </h2>
          </div>

          <div className="card-hover bg-white rounded-sm overflow-hidden shadow-lg">
            <div className="h-1 bg-secondary" />
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                    {additionalProgramming.title}
                  </h3>
                  <p className="text-secondary font-semibold">
                    {formatDateRange(additionalProgramming.date, additionalProgramming.endDate)}
                  </p>
                </div>
                <span className="year-badge text-secondary border-secondary">
                  Weekend Festival
                </span>
              </div>

              <p className="text-foreground mb-8 leading-relaxed">
                {additionalProgramming.description}
              </p>

              <div className="bg-cream rounded-sm p-6">
                <p className="font-serif font-bold text-primary text-lg mb-1">
                  Featured Speaker: {additionalProgramming.speaker.name}
                </p>
                <p className="text-secondary font-medium mb-3">
                  {additionalProgramming.speaker.title}
                </p>
                <p className="text-sm text-text-light leading-relaxed">
                  {additionalProgramming.speaker.bio}
                </p>
              </div>

              <p className="text-sm text-text-light mt-6 italic">
                {additionalProgramming.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-texture bg-primary text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Plan Your Visit
          </h2>
          <p className="text-lg text-white/90 mb-10">
            All lectures are held at Rocky Mount State Historic Site.
            Arrive early for the best seating.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/visit"
              className="btn-primary inline-block bg-accent text-primary font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
            >
              Get Directions
            </Link>
            <Link
              href="/events"
              className="btn-ghost inline-block text-white font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
