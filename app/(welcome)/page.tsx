import Link from 'next/link'
import { SiteHeader } from '@/components/welcome/SiteHeader'
import { StoryHook } from '@/components/welcome/StoryHook'
import { BrandStatement } from '@/components/welcome/BrandStatement'
import { DualPeaks } from '@/components/welcome/DualPeaks'
import { CTAGroup } from '@/components/welcome/CTAGroup'
import { AmbientMusicPlayer } from '@/components/welcome/AmbientMusicPlayer'
import { BUTTONS, PAGE_METADATA, PRIMARY_QUOTES } from '@/lib/copy'
import './welcome.css'

export const metadata = {
  title: PAGE_METADATA.welcome.title,
  description: PAGE_METADATA.welcome.description,
  openGraph: {
    title: PAGE_METADATA.welcome.ogTitle,
    description: PAGE_METADATA.welcome.ogDescription,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_METADATA.welcome.ogTitle,
    description: PAGE_METADATA.welcome.ogDescription,
  },
}

const peaks: [
  { label: string; date: string; targetDate: string },
  { label: string; date: string; targetDate: string },
] = [
  {
    label: 'TENNESSEE 230',
    date: 'June 13-14',
    targetDate: '2026-06-13',
  },
  {
    label: 'AMERICA 250',
    date: 'July 4',
    targetDate: '2026-07-04',
  },
]

// Featured upcoming experiences
const upcomingExperiences = [
  {
    title: 'Early Frontier Days',
    date: 'May 22-24',
    description:
      'Musket smoke, militia camps, and colonial traders. The largest Revolutionary-era gathering in the region.',
  },
  {
    title: 'Stitching Independence',
    date: 'June 13-14',
    description:
      "Tennessee's 230th birthday. Period demonstrations, music, and the First 250 reading.",
  },
]

export default function WelcomePage() {
  return (
    <main id="main-content" className="welcome-page">
      <SiteHeader />

      <div className="welcome-container">
        <StoryHook line1="Before there was a Tennessee," line2="there was this ground." />

        <blockquote className="washingtons-question">
          <p>&ldquo;{PRIMARY_QUOTES.washingtonsQuestion.text}&rdquo;</p>
          <cite>— {PRIMARY_QUOTES.washingtonsQuestion.attribution}</cite>
        </blockquote>

        <BrandStatement
          headline="ROCKY MOUNT"
          descriptor="First Capital of the Southwest Territory · 1790"
          tagline="Tennessee Starts Here"
        />

        <DualPeaks peaks={peaks} />

        {/* Living History Section */}
        <section className="living-history-section" aria-labelledby="living-history-heading">
          <h2 id="living-history-heading" className="living-history-title">
            Step Into 1791
          </h2>
          <p className="living-history-description">
            Costumed interpreters bring the territorial capital to life. Watch wool spun into
            thread. Smell bread baking in the hearth. Hear the stories of the families who built
            Tennessee.
          </p>
          <div className="upcoming-events-grid">
            {upcomingExperiences.map((event) => (
              <article key={event.title} className="upcoming-event-card">
                <span className="upcoming-event-date">{event.date}</span>
                <h3 className="upcoming-event-title">{event.title}</h3>
                <p className="upcoming-event-description">{event.description}</p>
              </article>
            ))}
          </div>
          <Link href="/events" className="view-all-events-link">
            View Full 2026 Calendar →
          </Link>
        </section>

        <CTAGroup
          primaryText={BUTTONS.enter.toUpperCase()}
          primaryHref="/home"
          secondaryText="Be One of the First 250 · Enrollment closes June 1"
          secondaryHref="/first-250"
          archiveText="Explore the Evidence"
          archiveDescription="Read the original documents from Tennessee's founding."
          archiveHref="/evidence"
        />

        {/* Almanac Link */}
        <Link
          href="/almanac"
          className="almanac-link"
          aria-label="The 1775 Almanac - Weather and farming wisdom"
        >
          ☀ The 1775 Almanac
        </Link>
      </div>

      {/* Frontier Ambiance Music Player */}
      <AmbientMusicPlayer />
    </main>
  )
}
