import HeroSection from '@/components/HeroSection'
import {
  AudienceRouter,
  Commemorative2026,
  PlanYourVisit,
  ConsolidatedClose,
} from '@/components/home'

/**
 * Homepage - StoryBrand Layer 1: Customer Journey Router
 *
 * Lightweight landing page that routes visitors to their needs.
 * Full narrative content lives on /our-story (Layer 2).
 *
 * Section 1: Hero - Emotional hook, primary CTA
 * Section 2: Audience Router - Quick paths for different visitors
 * Section 3: 2026 Campaign - Commemorative messaging
 * Section 4: Plan Your Visit - Conversion-focused info
 * Section 5: Close - Final CTA
 */

export default function Home() {
  return (
    <>
      {/* ============================================
          SECTION 1: HERO
          Above the fold emotional hook with primary CTA
          ============================================ */}
      <HeroSection />

      {/* ============================================
          SECTION 2: AUDIENCE ROUTER
          Quick navigation for different visitor types

          StoryBrand Layer 1: Customer Journey routing
          - Educators → /educators
          - Groups → /groups
          - Full Story → /our-story
          - Support → /support
          ============================================ */}
      <AudienceRouter />

      {/* ============================================
          SECTION 3: 2026 CAMPAIGN
          Commemorative messaging for America 250

          Content:
          - "Tennessee 230 / America 250"
          - First 250 enrollment CTA
          - Event categories and counts
          - Featured upcoming event
          ============================================ */}
      <Commemorative2026 />

      {/* ============================================
          SECTION 4: PLAN YOUR VISIT
          Conversion-focused visit information

          Content:
          - Location, hours, admission
          - TripAdvisor social proof
          - Dual CTAs
          ============================================ */}
      <PlanYourVisit />

      {/* ============================================
          SECTION 5: CLOSE
          Final CTA with Indigenous acknowledgment

          Content:
          - Indigenous acknowledgment (respectful)
          - Final CTA with closing tagline
          - "Tennessee starts here. Will you?"
          ============================================ */}
      <ConsolidatedClose />
    </>
  )
}
