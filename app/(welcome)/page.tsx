import Link from 'next/link'
import { WeatherFooter } from '@/components/welcome/WeatherFooter'
import { WaxSeal } from '@/components/welcome/WaxSeal'
import './welcome.css'

export const metadata = {
  title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
  description: 'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  openGraph: {
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description: 'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
    images: [{ url: '/og-welcome.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description: 'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  },
}

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <div className="welcome-content">

        {/* Header: Badges + Seal */}
        <div className="welcome-header">
          <span className="welcome-badge">AMERICA 250</span>
          <WaxSeal />
          <span className="welcome-badge">TENNESSEE 230</span>
        </div>

        {/* Title Block */}
        <div className="welcome-title-block">
          <h1 className="welcome-title">ROCKY MOUNT</h1>
          <p className="welcome-subtitle">STATE HISTORIC SITE</p>
          <p className="welcome-location">Piney Flats, Tennessee</p>
        </div>

        {/* Primary CTA */}
        <Link
          href="/home"
          className="enter-button"
          aria-label="Enter Rocky Mount State Historic Site"
        >
          <span className="button-ornament" aria-hidden="true">&#10022;</span>
          ENTER SITE
          <span className="button-ornament" aria-hidden="true">&#10022;</span>
        </Link>

        {/* Divider */}
        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">&#10022;</span>
        </div>

        {/* Feature Cards */}
        <div className="cards-container">
          <Link
            href="/almanac"
            className="feature-card"
            aria-label="Open The 1775 Almanac"
          >
            <h3 className="card-title">THE 1775 ALMANAC</h3>
            <p className="card-description">Weather &amp; Wisdom</p>
            <p className="card-description">Sullivan County</p>
            <span className="card-cta" aria-hidden="true">Open &rarr;</span>
          </Link>

          <div
            className="feature-card feature-card--disabled"
            aria-label="Rocky Mount Pantry - Coming Soon"
          >
            <h3 className="card-title">ROCKY MOUNT PANTRY</h3>
            <p className="card-description">Heritage Foods</p>
            <p className="card-coming-soon">Coming Soon</p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">&#10022;</span>
        </div>

        {/* Live Weather */}
        <WeatherFooter />

      </div>
    </main>
  )
}
