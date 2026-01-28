import HeroSection from '@/components/HeroSection'
import {
  ConsolidatedStory,
  ConsolidatedProof,
  ConsolidatedExperience,
  Commemorative2026,
  PlanYourVisit,
  ConsolidatedClose,
} from '@/components/home'

/**
 * Homepage - 7-Section Consolidated Structure
 *
 * Condensed from 17 sections to 7 dense, high-impact sections
 * without losing any content or context.
 *
 * Section 1: Hero (unchanged)
 * Section 2: The Story (MysteryHook + ExperimentSection + ScrollTimeline + ContrastStatement)
 * Section 3: The Proof (ProofSection + DistinctionSection + Blount Letter)
 * Section 4: The Experience (ExperiencePreview + GroundStatement + HomecomingSection)
 * Section 5: 2026 Campaign (CampaignSection + EventsShowcase + LedgerSection)
 * Section 6: Plan Your Visit (elevated position, unchanged content)
 * Section 7: Close (IndigenousAcknowledgment + FinalCTA)
 */

export default function Home() {
  return (
    <>
      {/* ============================================
          SECTION 1: HERO (Simplified - Above the Fold)
          ============================================ */}
      <HeroSection />

      {/* ============================================
          SECTION 2: THE STORY
          Combines: MysteryHook + ExperimentSection +
          ScrollTimeline + ContrastStatement

          Content preserved:
          - "Before there was a Tennessee..."
          - "Could democracy survive beyond the Appalachians?"
          - 1770/1780/1790 timeline with details
          - "This is where they governed."
          ============================================ */}
      <ConsolidatedStory />

      {/* ============================================
          SECTION 3: THE PROOF
          Combines: ProofSection + DistinctionSection +
          Blount Letter

          Content preserved:
          - Blount, Jackson, Cobbs cards with quotes
          - Blount letter ("glass windows" quote)
          - 1790-1792 vs 1792-1817 distinction
          - "The State started here."
          ============================================ */}
      <ConsolidatedProof />

      {/* ============================================
          SECTION 4: THE EXPERIENCE
          Combines: ExperiencePreview + GroundStatement +
          HomecomingSection (visit info)

          Content preserved:
          - "Step Into 1790" experience preview
          - All 4 experience moments
          - Testimonial
          - "The buildings evolved. The ground endures."
          - Visit info (hours, admission, location)
          ============================================ */}
      <ConsolidatedExperience />

      {/* ============================================
          SECTION 5: 2026 CAMPAIGN
          Combines: CampaignSection + EventsShowcase +
          LedgerSection

          Content preserved:
          - "Tennessee 230 / America 250"
          - First 250 enrollment CTA
          - Event categories and counts
          - Featured upcoming event
          - Promise vs Proof comparison
          - Stats (600 miles, 14 years, 16th state)
          ============================================ */}
      <Commemorative2026 />

      {/* ============================================
          SECTION 6: PLAN YOUR VISIT
          Elevated position for clear conversion

          Content preserved:
          - Location, hours, admission
          - TripAdvisor social proof
          - Dual CTAs
          ============================================ */}
      <PlanYourVisit />

      {/* ============================================
          SECTION 7: CLOSE
          Combines: IndigenousAcknowledgment + FinalCTA

          Content preserved:
          - Indigenous acknowledgment (respectful)
          - Final CTA with closing tagline
          - "Tennessee starts here. Will you?"
          ============================================ */}
      <ConsolidatedClose />
    </>
  )
}
