'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

// Collection catalog for navigation
const COLLECTIONS = [
  { id: 'blount-letter', label: 'Blount Correspondence', code: 'MSS.1790' },
  { id: 'washington-question', label: 'Washington Papers', code: 'MSS.1790' },
  { id: 'appointment', label: 'Williamson Letters', code: 'MSS.1790' },
  { id: 'federal-authority', label: 'Executive Orders', code: 'MSS.1791' },
  { id: 'treaty-signers', label: 'Treaty Signatories', code: 'TREATY' },
  { id: 'timeline', label: 'Chronology', code: 'CHRON' },
  { id: 'sources', label: 'Repository Index', code: 'REF' },
] as const

export function CardCatalog() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    // Get all section elements
    const sectionIds = COLLECTIONS.map((c) => c.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (most visible first)
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-middle of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    // Observe all sections
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update active state immediately for better UX
      setActiveSection(id)
    }
  }

  return (
    <nav className={styles.cardCatalog} aria-label="Collection navigation">
      <div className={styles.cardCatalogHeader}>
        <span className={styles.cardCatalogTitle}>Card Catalog</span>
      </div>
      <ul className={styles.cardCatalogList}>
        {COLLECTIONS.map((collection) => (
          <li key={collection.id}>
            <a
              href={`#${collection.id}`}
              onClick={(e) => handleClick(e, collection.id)}
              className={`${styles.cardCatalogLink} ${
                activeSection === collection.id ? styles.cardCatalogLinkActive : ''
              }`}
              aria-current={activeSection === collection.id ? 'true' : undefined}
            >
              <span className={styles.cardCatalogCode}>{collection.code}</span>
              <span className={styles.cardCatalogLabel}>{collection.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
