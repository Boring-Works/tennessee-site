import { WeatherHeader } from '@/components/welcome/WeatherHeader'
import { StoryHook } from '@/components/welcome/StoryHook'
import { HeroYear } from '@/components/welcome/HeroYear'
import { BrandStatement } from '@/components/welcome/BrandStatement'
import { DualPeaks } from '@/components/welcome/DualPeaks'
import { CTAGroup } from '@/components/welcome/CTAGroup'
import { BUTTONS, PAGE_METADATA } from '@/lib/copy'
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

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <WeatherHeader />

      <div className="welcome-container">
        <StoryHook line1="Before there was a Tennessee," line2="there was this ground." />

        <HeroYear year="1770" contextLine="William Cobb · Piney Flats · Sullivan County" />

        <BrandStatement headline="ROCKY MOUNT" tagline="Tennessee Starts Here" />

        <DualPeaks peaks={peaks} />

        <CTAGroup
          primaryText={BUTTONS.enter.toUpperCase()}
          primaryHref="/home"
          secondaryText="Be One of the First 250 · Enrollment closes June 1"
          secondaryHref="/first-250"
        />
      </div>
    </main>
  )
}
