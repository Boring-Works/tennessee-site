import type { Metadata } from "next";
import siteInfo from "@/data/siteInfo.json";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Plan your visit to Rocky Mount State Historic Site. Hours, admission, directions, and what to expect at Tennessee's first seat of government.",
  openGraph: {
    title: "Plan Your Visit | Tennessee Starts Here",
    description:
      "Plan your visit to Rocky Mount State Historic Site. Hours, admission, directions, and what to expect at Tennessee's first seat of government.",
    url: "https://tennesseestartshere.com/visit",
  },
};

export default function VisitPage() {
  const { location, hours, admission, whatToExpect, contact, nearbyAttractions } =
    siteInfo;

  return (
    <>
      {/* Moody Header */}
      <section className="hero-texture bg-primary text-white pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="year-badge mb-6 inline-block">Est. 1770</span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Plan Your Visit
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Step back in time at Rocky Mount State Historic Site. Our costumed
            interpreters bring frontier life to vivid reality.
          </p>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-accent">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6 text-primary text-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Address</p>
              <p className="font-serif font-bold">{location.address.street}</p>
              <p className="text-sm">{location.address.city}, {location.address.state} {location.address.zip}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Phone</p>
              <a href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`} className="font-serif font-bold text-lg hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">Tour Duration</p>
              <p className="font-serif font-bold">{whatToExpect.tourDuration}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Hours & Admission */}
            <div className="bg-white rounded-sm shadow-lg p-8">
              <h2 className="font-serif text-2xl font-bold text-primary mb-8">
                Hours & Admission
              </h2>

              {/* Hours */}
              <div className="mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-4">Hours</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt>Tuesday - Saturday</dt>
                    <dd className="font-semibold text-primary">{hours.regular.tuesday}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt>Sunday</dt>
                    <dd className="font-semibold text-primary">{hours.regular.sunday}</dd>
                  </div>
                  <div className="flex justify-between py-2 text-text-light">
                    <dt>Monday</dt>
                    <dd>{hours.regular.monday}</dd>
                  </div>
                </dl>
                <p className="text-sm text-text-light mt-4 italic">{hours.note}</p>
              </div>

              {/* Admission */}
              <div className="mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-4">Admission</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt>{admission.adults.label}</dt>
                    <dd className="font-serif font-bold text-lg text-secondary">${admission.adults.price}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt>{admission.seniors.label}</dt>
                    <dd className="font-serif font-bold text-lg text-secondary">${admission.seniors.price}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt>{admission.children.label}</dt>
                    <dd className="font-serif font-bold text-lg text-secondary">${admission.children.price}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt>{admission.childrenFree.label}</dt>
                    <dd className="font-serif font-bold text-lg text-accent">Free</dd>
                  </div>
                </dl>
                <p className="text-sm text-text-light mt-4">{admission.groups.note}</p>
              </div>

              {/* Book Tour */}
              <a
                href="https://fareharbor.com/embeds/book/rockymountmuseum/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block w-full bg-secondary text-white font-semibold py-4 rounded-sm text-center text-sm uppercase tracking-[0.15em]"
              >
                Book Your Tour
              </a>
            </div>

            {/* Your Experience */}
            <div>
              <div className="bg-white rounded-sm shadow-lg p-8 mb-6">
                <h2 className="font-serif text-2xl font-bold text-primary mb-8">
                  Your Experience
                </h2>

                <ul className="space-y-4 mb-8">
                  {whatToExpect.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-cream p-4 rounded-sm border-l-4 border-secondary">
                  <h3 className="font-semibold text-primary mb-1">Accessibility</h3>
                  <p className="text-sm text-text-light">{whatToExpect.accessibility}</p>
                </div>
              </div>

              <div className="bg-white rounded-sm shadow-lg p-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {whatToExpect.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-light text-sm">
                      <span className="text-accent">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-decorator">
              <span>Getting Here</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Find Us
            </h2>
          </div>

          <div className="bg-white rounded-sm shadow-lg p-8 text-center">
            <p className="font-serif text-xl font-bold text-primary mb-2">
              Rocky Mount State Historic Site
            </p>
            <p className="text-text-light mb-6">
              {location.address.street}<br />
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>

            <p className="text-text-light mb-8 max-w-xl mx-auto text-sm">
              {location.directions}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/place/Rocky+Mount+State+Historic+Site/@36.4081,-82.3247,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3 rounded-sm text-sm uppercase tracking-[0.15em]"
              >
                View on Maps
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=36.4081,-82.3247"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block bg-accent text-primary font-semibold px-8 py-3 rounded-sm text-sm uppercase tracking-[0.15em]"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-decorator">
              <span>Make It A Day</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Nearby Attractions
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyAttractions.map((attraction) => (
              <div
                key={attraction.name}
                className="bg-white rounded-sm p-6 text-center shadow-md"
              >
                <p className="font-serif font-bold text-primary mb-1">{attraction.name}</p>
                <p className="text-sm text-secondary">{attraction.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="hero-texture bg-primary text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Questions?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Contact us for group rates, special events, or educational programming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
              className="btn-primary inline-block bg-accent text-primary font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
            >
              Call {contact.phone}
            </a>
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-block text-white font-semibold px-12 py-4 rounded-sm text-sm uppercase tracking-[0.15em]"
            >
              Main Website
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
