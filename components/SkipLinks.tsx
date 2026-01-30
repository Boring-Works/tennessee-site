/**
 * SkipLinks - Accessibility component for keyboard navigation
 *
 * Provides skip links that allow keyboard users to bypass navigation
 * and jump directly to main content. The links are visually hidden
 * until focused.
 *
 * Usage:
 * - Add <SkipLinks /> at the start of your layout/page body
 * - Ensure the main content area has id="main-content"
 * - Optional: Add id="navigation" to the nav element for "Skip to navigation" link
 *
 * CSS classes are defined in /app/globals.css
 */

interface SkipLinksProps {
  /** Include "Skip to navigation" link (default: false) */
  showNavigationLink?: boolean
  /** Custom main content ID (default: "main-content") */
  mainContentId?: string
  /** Custom navigation ID (default: "navigation") */
  navigationId?: string
}

export function SkipLinks({
  showNavigationLink = false,
  mainContentId = 'main-content',
  navigationId = 'navigation',
}: SkipLinksProps) {
  return (
    <>
      <a href={`#${mainContentId}`} className="skip-link">
        Skip to main content
      </a>
      {showNavigationLink && (
        <a href={`#${navigationId}`} className="skip-link">
          Skip to navigation
        </a>
      )}
    </>
  )
}

export default SkipLinks
