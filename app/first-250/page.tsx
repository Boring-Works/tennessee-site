import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import siteInfo from "@/data/siteInfo.json";

export const metadata: Metadata = {
  title: "First 250 Program",
  description:
    "Join 250 Tennesseans whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
  openGraph: {
    title: "First 250 Program | Tennessee Starts Here",
    description:
      "Join 250 Tennesseans whose names will be read aloud on July 4, 2026 at Rocky Mount—where Tennessee's government began.",
    url: "https://tennesseestartshere.com/first-250",
  },
};

export default function First250Page() {
  const { first250 } = siteInfo;

  return (
    <>
      {/* Cinematic Header - BURGUNDY for impact */}
      <section className="hero-texture bg-burgundy text-white pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block border-white/50 text-white">
            America 250
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
            The First 250
          </h1>

          <p className="text-xl md:text-2xl text-white font-serif italic mb-8">
            Be Part of History
          </p>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {first250.description}
          </p>
        </div>
      </section>

      {/* Timeline Bar */}
      <section className="bg-accent" aria-label="Program timeline">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-primary">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Opens</p>
              <time dateTime="2026-03-04" className="font-serif font-bold text-lg block">March 4, 2026</time>
            </div>
            <span className="hidden md:block text-primary/50" aria-hidden="true">→</span>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Closes</p>
              <time dateTime="2026-06-01" className="font-serif font-bold text-lg block">June 1, 2026</time>
            </div>
            <span className="hidden md:block text-primary/50" aria-hidden="true">→</span>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Ceremony</p>
              <time dateTime="2026-07-04" className="font-serif font-bold text-lg block">July 4, 2026</time>
            </div>
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-decorator">
              <span>Your Legacy</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              What Participants Receive
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {first250.benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-accent flex items-center justify-center" aria-hidden="true">
                  <span className="font-serif text-2xl font-bold text-accent">{index + 1}</span>
                </div>
                <p className="text-foreground leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Tiers */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-decorator">
              <span>Choose Your Level</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Participation Tiers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {first250.tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-sm overflow-hidden ${
                  index === 1
                    ? "bg-primary text-white md:scale-105 md:-my-4 shadow-2xl"
                    : "bg-white shadow-lg"
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                )}

                <div className="p-8">
                  {index === 1 && (
                    <span className="inline-block px-3 py-1 bg-accent text-primary text-[10px] uppercase tracking-[0.15em] font-bold rounded-sm mb-4">
                      Most Popular
                    </span>
                  )}

                  <h3 className={`font-serif text-xl font-bold mb-2 ${index === 1 ? "text-white" : "text-primary"}`}>
                    {tier.name}
                  </h3>

                  <p className={`text-4xl font-serif font-bold mb-8 ${index === 1 ? "text-accent" : "text-secondary"}`}>
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                  </p>

                  <ul className="space-y-4">
                    {tier.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-sm ${index === 1 ? "text-white" : "text-text-light"}`}
                      >
                        <span className="text-accent" aria-hidden="true">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
            Get Notified
          </h2>

          <p className="text-lg text-text-light mb-10">
            Enrollment begins March 4, 2026. Sign up to receive a reminder.
          </p>

          <EmailSignup />

          <p className="text-sm text-text-light mt-6">
            We&apos;ll only email you about the First 250 program.
          </p>
        </div>
      </section>

      {/* The Ceremony */}
      <section className="hero-texture bg-primary text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block">July 4, 2026</span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            The Ceremony
          </h2>

          <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
            On America&apos;s 250th birthday, at the place where Tennessee&apos;s government began,
            we will read aloud the names of all First 250 participants.
          </p>

          <p className="text-white/90 mb-12">
            Patriotic celebration. Period demonstrations. A commemoration unlike any in Rocky Mount&apos;s history.
          </p>

          <Link
            href="/events"
            className="btn-primary inline-block bg-accent text-primary font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
          >
            View Event Details
          </Link>
        </div>
      </section>
    </>
  );
}
