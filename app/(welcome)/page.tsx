import Link from 'next/link'
import { WeatherHeader } from '@/components/welcome/WeatherHeader'
import { DualCountdown } from '@/components/welcome/DualCountdown'
import { WaxSeal } from '@/components/welcome/WaxSeal'
import './welcome.css'

export const metadata = {
  title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
  description:
    'Welcome to Rocky Mount State Historic Site in Piney Flats, Tennessee. Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  openGraph: {
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description:
      'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
    images: [{ url: '/og-welcome.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocky Mount State Historic Site | Tennessee Starts Here',
    description:
      'Where Tennessee began. Celebrating America 250 and Tennessee 230 in 2026.',
  },
}

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      {/* Weather Header - Sullivan County Authority */}
      <WeatherHeader />

      <div className="welcome-content">
        {/* Commemorative Header: Countdown + Seal + Countdown */}
        <div className="welcome-header">
          <DualCountdown />
        </div>

        {/* Wax Seal */}
        <div className="seal-container">
          <WaxSeal />
        </div>

        {/* Title Block */}
        <div className="welcome-title-block">
          <h1 className="welcome-title">ROCKY MOUNT</h1>
          <p className="welcome-subtitle">STATE HISTORIC SITE</p>
        </div>

        {/* Brand Statement */}
        <div className="brand-statement">
          <span className="brand-line-left" aria-hidden="true"></span>
          <span className="brand-text">TENNESSEE STARTS HERE</span>
          <span className="brand-line-right" aria-hidden="true"></span>
        </div>

        {/* Location */}
        <p className="welcome-location">Piney Flats, Tennessee</p>

        {/* Primary CTA */}
        <Link
          href="/home"
          className="enter-button"
          aria-label="Enter Rocky Mount State Historic Site"
        >
          <span className="button-ornament" aria-hidden="true">
            ✦
          </span>
          ENTER SITE
          <span className="button-ornament" aria-hidden="true">
            ✦
          </span>
        </Link>

        {/* Divider */}
        <div className="divider" role="separator" aria-hidden="true">
          <span className="divider-ornament">✦</span>
        </div>

        {/* Feature Cards */}
        <div className="cards-container">
          {/* Almanac Card - Active */}
          <Link
            href="/almanac"
            className="feature-card"
            aria-label="Open The 1775 Almanac"
          >
            <h3 className="card-title">THE 1775 ALMANAC</h3>
            <p className="card-description">Weather &amp; Wisdom</p>
            <p className="card-description">Sullivan County</p>
            <span className="card-cta" aria-hidden="true">
              Open →
            </span>
          </Link>

          {/* Pantry Card - Coming Soon */}
          <div
            className="feature-card feature-card--disabled"
            aria-label="Rocky Mount Pantry - Coming Soon"
          >
            <h3 className="card-title">ROCKY MOUNT PANTRY</h3>
            <p className="card-description">Heritage Foods</p>
            <p className="card-coming-soon">Coming Soon</p>
          </div>
        </div>
      </div>
    </main>
  )
}
