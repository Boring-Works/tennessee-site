import type { Metadata } from 'next'
import Link from 'next/link'
import { OriginalSevenMap } from '@/components/OriginalSevenMap'
import siteInfo from '@/data/siteInfo.json'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Explore the Region | Tennessee Starts Here',
  description:
    'Discover the heritage trail through the Original Seven Counties. Partner historic sites, suggested itineraries, and visitor resources for exploring the birthplace of Tennessee.',
  openGraph: {
    title: 'Explore the Original Seven | Tennessee Starts Here',
    description:
      'A heritage trail through the seven counties that became Tennessee. Historic sites, state parks, and the stories that shaped a nation.',
    url: 'https://tennesseestartshere.com/explore',
  },
}

// TypeScript interfaces for data
interface ItineraryStop {
  name: string
  time: string
  note: string
}

interface Itinerary {
  id: string
  title: string
  duration: string
  icon: React.ReactNode
  description: string
  stops: ItineraryStop[]
  overnight?: string
}

interface LodgingPlace {
  name: string
  location: string
  description: string
  note: string
}

interface DiningPlace {
  name: string
  location: string
  type: string
}

// Icon components - defined as functions to prevent hydration issues
const HalfDayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const FullDayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const WeekendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const MapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <path d="M9 3L3 6v15l6-3M9 3l6 3M9 3v15m6-12l6-3v15l-6 3m0-15v15m0 0l-6-3" />
  </svg>
)

const BedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18v2M21 18v2M6 10V7a2 2 0 012-2h8a2 2 0 012 2v3" />
  </svg>
)

const UtensilsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    role="img"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3m0 0v7" />
  </svg>
)

// Itinerary data
const itineraries: Itinerary[] = [
  {
    id: 'half-day',
    title: 'Half-Day Heritage Tour',
    duration: '4-5 hours',
    icon: <HalfDayIcon />,
    description:
      'Perfect for a morning or afternoon. Focus on the heart of the Original Seven with Rocky Mount and two nearby sister sites.',
    stops: [
      {
        name: 'Rocky Mount',
        time: '1.5 hours',
        note: 'Start at the territorial capital',
      },
      {
        name: 'Tipton-Haynes',
        time: '1 hour',
        note: '15 min drive, explore the caves and grounds',
      },
      {
        name: 'Downtown Jonesborough',
        time: '1-2 hours',
        note: "Lunch and shops in Tennessee's oldest town",
      },
    ],
  },
  {
    id: 'full-day',
    title: 'Full-Day Frontier Experience',
    duration: '8-10 hours',
    icon: <FullDayIcon />,
    description:
      'A complete journey through the four eastern counties. Visit multiple historic sites and experience the full scope of frontier Tennessee.',
    stops: [
      {
        name: 'Rocky Mount',
        time: '1.5 hours',
        note: 'Morning tour of the territorial capital',
      },
      {
        name: 'Tipton-Haynes',
        time: '1 hour',
        note: 'Explore the limestone cave',
      },
      {
        name: 'Sycamore Shoals',
        time: '1.5 hours',
        note: 'Fort Watauga and the Treaty grounds',
      },
      {
        name: 'Carter Mansion',
        time: '45 min',
        note: "Tennessee's oldest frame house",
      },
      {
        name: 'Chester Inn (Jonesborough)',
        time: '1 hour',
        note: 'End with dinner in the oldest town',
      },
    ],
  },
  {
    id: 'weekend',
    title: 'Weekend Presidential Trail',
    duration: '2 days',
    icon: <WeekendIcon />,
    description:
      'Follow in the footsteps of three presidents who passed through the Original Seven. Andrew Jackson, James K. Polk, and Andrew Johnson all have connections to these grounds.',
    stops: [
      {
        name: 'Day 1: Rocky Mount & Johnson City',
        time: 'Full day',
        note: 'Rocky Mount (Jackson stayed here), Tipton-Haynes, Gray Fossil Site',
      },
      {
        name: 'Day 2: Greeneville & Beyond',
        time: 'Full day',
        note: 'Andrew Johnson NHS, Chester Inn, Jonesborough historic district',
      },
    ],
    overnight: 'Stay in Johnson City or Jonesborough',
  },
]

// Lodging recommendations
const lodging: LodgingPlace[] = [
  {
    name: 'Historic Eureka Inn',
    location: 'Jonesborough',
    description: "Boutique inn in Tennessee's oldest town",
    note: 'Walking distance to Chester Inn',
  },
  {
    name: 'Carnegie Hotel',
    location: 'Johnson City',
    description: 'Restored 1890s landmark, downtown location',
    note: 'Central to all eastern county sites',
  },
  {
    name: 'General Morgan Inn',
    location: 'Greeneville',
    description: 'Historic railroad hotel, Andrew Johnson connections',
    note: 'Ideal for Presidential Trail itinerary',
  },
]

// Dining recommendations
const dining: DiningPlace[] = [
  {
    name: 'The Storyteller Restaurant',
    location: 'Jonesborough',
    type: 'Southern fine dining',
  },
  {
    name: 'Main Street Cafe',
    location: 'Jonesborough',
    type: 'Casual American',
  },
  {
    name: 'Cafe Lola',
    location: 'Johnson City',
    type: 'Southern brunch',
  },
  {
    name: "Freiberg's",
    location: 'Johnson City',
    type: 'German heritage cuisine',
  },
]

export default function ExplorePage() {
  const { sisterSites, nearbyAttractions } = siteInfo

  return (
    <>
      {/* ============================================
          HERO - Original Seven Map
          ============================================ */}
      <section className={styles['explore-hero']} aria-labelledby="explore-heading">
        <div className={styles['explore-hero-grain']} aria-hidden="true" />

        <div className={styles['explore-hero-content']}>
          <p className={styles['explore-hero-eyebrow']}>Regional Heritage Trail</p>
          <h1 id="explore-heading" className={styles['explore-hero-headline']}>
            Explore the{' '}
            <span className={styles['explore-hero-headline-accent']}>Original Seven</span>
          </h1>
          <p className={styles['explore-hero-intro']}>
            The seven counties that became Tennessee. From Rocky Mount outward, discover the
            historic sites, state parks, and stories that shaped the frontier.
          </p>
        </div>

        <div className={styles['explore-hero-map']}>
          <OriginalSevenMap variant="hero" showLabels showDistances interactive />
        </div>
      </section>

      {/* ============================================
          HERITAGE TRAIL - Partner Sites
          ============================================ */}
      <section className={styles['explore-trail']} aria-labelledby="trail-heading">
        <div className={styles['explore-trail-inner']}>
          <header className={styles['explore-trail-header']}>
            <h2 id="trail-heading" className={styles['explore-trail-headline']}>
              The Heritage Trail
            </h2>
            <p className={styles['explore-trail-intro']}>
              From 1790 to 1792, Rocky Mount governed seven counties—four surrounding this site in
              East Tennessee, three more in the Cumberland settlements. Today, the heritage trail
              that connects these founding places begins here.
            </p>
            <p className={styles['explore-trail-intro']}>
              Rocky Mount is the anchor of a regional network of historic sites. Each tells part of
              the story of how wilderness became a state.
            </p>
          </header>

          {/* Sister Sites Grid */}
          <div className={styles['explore-trail-grid']}>
            {sisterSites.map((site) => (
              <article key={site.name} className={styles['explore-site-card']}>
                <div className={styles['explore-site-header']}>
                  <h3 className={styles['explore-site-name']}>{site.name}</h3>
                  <span className={styles['explore-site-distance']}>
                    {site.time} from Rocky Mount
                  </span>
                </div>
                <p className={styles['explore-site-location']}>{site.city}</p>
                <p className={styles['explore-site-description']}>{site.description}</p>
                <a
                  href={site.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['explore-site-link']}
                  aria-label={`Visit ${site.name} website (opens in new tab)`}
                >
                  Visit Website
                  <span aria-hidden="true"> →</span>
                </a>
              </article>
            ))}
          </div>

          {/* Nearby Attractions */}
          <div className={styles['explore-nearby']}>
            <h3 className={styles['explore-nearby-headline']}>Also Nearby</h3>
            <ul className={styles['explore-nearby-list']}>
              {nearbyAttractions.map((attraction) => (
                <li key={attraction.name} className={styles['explore-nearby-item']}>
                  <span className={styles['explore-nearby-name']}>{attraction.name}</span>
                  <span className={styles['explore-nearby-distance']}>{attraction.distance}</span>
                  <span className={styles['explore-nearby-desc']}>{attraction.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================
          ITINERARIES
          ============================================ */}
      <section className={styles['explore-itineraries']} aria-labelledby="itineraries-heading">
        <div className={styles['explore-itineraries-inner']}>
          <header className={styles['explore-itineraries-header']}>
            <h2 id="itineraries-heading" className={styles['explore-itineraries-headline']}>
              Suggested Itineraries
            </h2>
            <p className={styles['explore-itineraries-intro']}>
              Whether you have a few hours or a full weekend, we&apos;ve mapped out the best routes
              through the Original Seven.
            </p>
          </header>

          <div className={styles['explore-itineraries-grid']}>
            {itineraries.map((itinerary) => (
              <article key={itinerary.id} className={styles['explore-itinerary-card']}>
                <div className={styles['explore-itinerary-icon']} aria-hidden="true">
                  {itinerary.icon}
                </div>
                <div className={styles['explore-itinerary-header']}>
                  <h3 className={styles['explore-itinerary-title']}>{itinerary.title}</h3>
                  <span className={styles['explore-itinerary-duration']}>{itinerary.duration}</span>
                </div>
                <p className={styles['explore-itinerary-description']}>{itinerary.description}</p>

                <ol className={styles['explore-itinerary-stops']}>
                  {itinerary.stops.map((stop, index) => (
                    <li key={index} className={styles['explore-itinerary-stop']}>
                      <span className={styles['explore-stop-number']}>{index + 1}</span>
                      <div className={styles['explore-stop-content']}>
                        <span className={styles['explore-stop-name']}>{stop.name}</span>
                        <span className={styles['explore-stop-time']}>{stop.time}</span>
                        <span className={styles['explore-stop-note']}>{stop.note}</span>
                      </div>
                    </li>
                  ))}
                </ol>

                {itinerary.overnight && (
                  <p className={styles['explore-itinerary-overnight']}>
                    <strong>Overnight:</strong> {itinerary.overnight}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VISITOR RESOURCES
          ============================================ */}
      <section className={styles['explore-resources']} aria-labelledby="resources-heading">
        <div className={styles['explore-resources-inner']}>
          <header className={styles['explore-resources-header']}>
            <h2 id="resources-heading" className={styles['explore-resources-headline']}>
              Plan Your Journey
            </h2>
          </header>

          <div className={styles['explore-resources-grid']}>
            {/* Lodging */}
            <div className={styles['explore-resource-section']}>
              <div className={styles['explore-resource-icon']} aria-hidden="true">
                <BedIcon />
              </div>
              <h3 className={styles['explore-resource-title']}>Where to Stay</h3>
              <p className={styles['explore-resource-intro']}>
                Historic inns and hotels throughout the region.
              </p>
              <ul className={styles['explore-resource-list']}>
                {lodging.map((place) => (
                  <li key={place.name} className={styles['explore-resource-item']}>
                    <span className={styles['explore-resource-name']}>{place.name}</span>
                    <span className={styles['explore-resource-location']}>{place.location}</span>
                    <span className={styles['explore-resource-desc']}>{place.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dining */}
            <div className={styles['explore-resource-section']}>
              <div className={styles['explore-resource-icon']} aria-hidden="true">
                <UtensilsIcon />
              </div>
              <h3 className={styles['explore-resource-title']}>Where to Eat</h3>
              <p className={styles['explore-resource-intro']}>
                Local favorites and Southern cuisine.
              </p>
              <ul className={styles['explore-resource-list']}>
                {dining.map((place) => (
                  <li key={place.name} className={styles['explore-resource-item']}>
                    <span className={styles['explore-resource-name']}>{place.name}</span>
                    <span className={styles['explore-resource-location']}>{place.location}</span>
                    <span className={styles['explore-resource-desc']}>{place.type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downloads */}
            <div className={styles['explore-resource-section']}>
              <div className={styles['explore-resource-icon']} aria-hidden="true">
                <MapIcon />
              </div>
              <h3 className={styles['explore-resource-title']}>Trail Resources</h3>
              <p className={styles['explore-resource-intro']}>Maps and guides for your journey.</p>
              <div className={styles['explore-resource-downloads']}>
                <p className={styles['explore-resource-coming']}>
                  Printable trail maps and visitor guides coming Spring 2026.
                </p>
                <Link href="/visit" className={styles['explore-resource-link']}>
                  Start at Rocky Mount →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER CTA
          ============================================ */}
      <section className={styles['explore-cta']} aria-labelledby="cta-heading">
        <div className={styles['explore-cta-inner']}>
          <h2 id="cta-heading" className={styles['explore-cta-headline']}>
            Start Your Journey at Rocky Mount
          </h2>
          <p className={styles['explore-cta-text']}>
            The territorial capital is the natural starting point for any exploration of the
            Original Seven. Plan your visit and discover where Tennessee began.
          </p>
          <Link href="/visit" className={styles['explore-cta-btn']}>
            Plan Your Visit
          </Link>
        </div>
      </section>
    </>
  )
}
