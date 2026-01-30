'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './EvidenceTrails.module.css'

/**
 * A single document in a trail
 */
interface TrailDocument {
  id: string
  title: string
  date: string
  type: 'letter' | 'treaty' | 'proclamation' | 'newspaper' | 'inventory' | 'legal'
  excerpt: string
}

/**
 * A narrative trail through documents
 */
interface Trail {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  documents: TrailDocument[]
  cta: string
}

/**
 * The five narrative trails through Rocky Mount's story
 */
const TRAILS: Trail[] = [
  {
    id: 'the-question',
    title: 'The Question',
    subtitle: 'How Rocky Mount Was Chosen',
    description:
      "Follow the correspondence that led Washington to choose this remote frontier cabin as America's first territorial capital.",
    icon: '?',
    cta: 'Trace the decision',
    documents: [
      {
        id: 'washington-to-knox-1790-08',
        title: '"Where ought the Governor to reside?"',
        date: '1790-08-13',
        type: 'letter',
        excerpt:
          'Washington asks Knox the crucial question about locating the territorial government.',
      },
      {
        id: 'knox-to-washington-1790-08',
        title: 'Knox Recommends Holston',
        date: '1790-08-17',
        type: 'letter',
        excerpt:
          'The Secretary of War recommends "a respectable residence" belonging to William Cobb.',
      },
      {
        id: 'blount-commission-1790',
        title: "Blount's Commission",
        date: '1790-06-08',
        type: 'legal',
        excerpt: 'Washington appoints Blount Governor and Superintendent of Indian Affairs.',
      },
      {
        id: 'blount-arrival-1790',
        title: '"Glass Windows, Fireplace, etc."',
        date: '1790-10-20',
        type: 'letter',
        excerpt:
          'Blount announces his arrival at Rocky Mount, impressed by its frontier refinement.',
      },
    ],
  },
  {
    id: 'the-treaty',
    title: 'The Treaty',
    subtitle: 'Making Peace with the Cherokee',
    description:
      'The Treaty of Holston promised perpetual peace. Follow the documents from negotiation through ratification.',
    icon: '\u2696',
    cta: 'Read the negotiations',
    documents: [
      {
        id: 'blount-to-knox-1791-06',
        title: 'Planning the Treaty',
        date: '1791-06-15',
        type: 'letter',
        excerpt: 'Blount reports on preparations for the treaty conference.',
      },
      {
        id: 'treaty-holston-1791',
        title: 'Treaty of Holston',
        date: '1791-07-02',
        type: 'treaty',
        excerpt:
          'Forty-two Cherokee leaders sign a treaty establishing boundaries and "perpetual peace."',
      },
      {
        id: 'washington-proclamation-1791',
        title: "Washington's Proclamation",
        date: '1791-11-11',
        type: 'proclamation',
        excerpt: 'The President formally ratifies the treaty, making it the law of the land.',
      },
      {
        id: 'treaty-holston-additional-1792',
        title: 'Additional Article',
        date: '1792-02-17',
        type: 'treaty',
        excerpt: 'Cherokee representatives negotiate increased compensation in Philadelphia.',
      },
    ],
  },
  {
    id: 'the-signers',
    title: 'The Signers',
    subtitle: '42 Cherokee Leaders',
    description:
      'Each mark on the treaty represents a person who shaped history. Meet the Cherokee leaders who signed.',
    icon: '\u270D',
    cta: 'Meet the Forty-Two',
    documents: [
      {
        id: 'treaty-holston-1791',
        title: 'Treaty Signatories',
        date: '1791-07-02',
        type: 'treaty',
        excerpt:
          'Hanging Maw, Bloody Fellow, John Watts, Doublehead, and 38 others put their marks.',
      },
    ],
  },
  {
    id: 'the-governor',
    title: 'The Governor',
    subtitle: "Blount's Life at Rocky Mount",
    description:
      'William Blount governed from this cabin for fourteen months. His letters reveal the daily reality of frontier administration.',
    icon: '\u2606',
    cta: 'Read his correspondence',
    documents: [
      {
        id: 'williamson-to-washington-1790-05',
        title: "Williamson's Recommendation",
        date: '1790-05-28',
        type: 'letter',
        excerpt:
          'Hugh Williamson recommends Blount as someone who "commands such general respect."',
      },
      {
        id: 'blount-arrival-1790',
        title: 'First Days at Rocky Mount',
        date: '1790-10-20',
        type: 'letter',
        excerpt: 'Blount settles in, noting the comfort of his accommodations on the frontier.',
      },
      {
        id: 'rocky-mount-inventory-1791',
        title: 'Rocky Mount Property',
        date: '1791-10-15',
        type: 'inventory',
        excerpt: "The only detailed description of Rocky Mount's buildings during Blount's tenure.",
      },
      {
        id: 'blount-to-knox-1791-11',
        title: 'Final Months',
        date: '1791-11-15',
        type: 'letter',
        excerpt: 'Blount reports from Rocky Mount as plans form to relocate to Knoxville.',
      },
    ],
  },
  {
    id: 'the-press',
    title: 'The Press',
    subtitle: 'First Tennessee News',
    description:
      "The Knoxville Gazette was Tennessee's first newspaper. Follow frontier news from 1791 to statehood.",
    icon: '\u2708',
    cta: 'Read the headlines',
    documents: [
      {
        id: 'knoxville-gazette-1791-11-05',
        title: 'First Issue',
        date: '1791-11-05',
        type: 'newspaper',
        excerpt: "George Roulstone prints Tennessee's first newspaper in the new capital.",
      },
      {
        id: 'knoxville-gazette-1791-11-12',
        title: 'Second Issue',
        date: '1791-11-12',
        type: 'newspaper',
        excerpt: 'News of the territory continues with the second published edition.',
      },
      {
        id: 'knoxville-gazette-1792-07-07',
        title: 'Mid-Year Report',
        date: '1792-07-07',
        type: 'newspaper',
        excerpt: 'Frontier news and notices from the territorial capital.',
      },
      {
        id: 'knoxville-gazette-1796-06-06',
        title: 'Statehood Approaches',
        date: '1796-06-06',
        type: 'newspaper',
        excerpt: 'Tennessee prepares to join the Union as the sixteenth state.',
      },
    ],
  },
]

/**
 * Get CSS class for document type
 */
function getTypeClass(type: TrailDocument['type']): string {
  const classes: Record<TrailDocument['type'], string> = {
    letter: styles.typeLetter,
    treaty: styles.typeTreaty,
    proclamation: styles.typeProclamation,
    newspaper: styles.typeNewspaper,
    inventory: styles.typeInventory,
    legal: styles.typeLegal,
  }
  return classes[type] || ''
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface EvidenceTrailsProps {
  /** Additional CSS class */
  className?: string
}

/**
 * EvidenceTrails - Narrative navigation through documents
 *
 * Presents documents as thematic "trails" instead of a flat list.
 * Each trail tells a story through 3-5 key documents in narrative order.
 */
export function EvidenceTrails({ className }: EvidenceTrailsProps) {
  const [activeTrail, setActiveTrail] = useState<string>('the-question')

  const currentTrail = TRAILS.find((t) => t.id === activeTrail) || TRAILS[0]

  return (
    <section className={`${styles.trailsSection} ${className || ''}`}>
      {/* Header */}
      <header className={styles.trailsHeader}>
        <span className={styles.badge}>Evidence Trails</span>
        <h2 className={styles.title}>Follow the Story</h2>
        <p className={styles.subtitle}>
          History isn&apos;t a list. It&apos;s a narrative. Choose a trail and follow the documents
          that tell each chapter of Rocky Mount&apos;s story.
        </p>
      </header>

      {/* Trail Selection Tabs */}
      <nav className={styles.trailTabs} aria-label="Select a trail">
        {TRAILS.map((trail) => (
          <button
            key={trail.id}
            className={`${styles.trailTab} ${activeTrail === trail.id ? styles.trailTabActive : ''}`}
            onClick={() => setActiveTrail(trail.id)}
            aria-pressed={activeTrail === trail.id}
            type="button"
          >
            <span className={styles.tabIcon} aria-hidden="true">
              {trail.icon}
            </span>
            <span className={styles.tabTitle}>{trail.title}</span>
          </button>
        ))}
      </nav>

      {/* Active Trail Content */}
      <div className={styles.trailContent}>
        {/* Trail Description */}
        <div className={styles.trailIntro}>
          <h3 className={styles.trailTitle}>
            <span className={styles.trailIcon} aria-hidden="true">
              {currentTrail.icon}
            </span>
            {currentTrail.title}
          </h3>
          <p className={styles.trailSubtitle}>{currentTrail.subtitle}</p>
          <p className={styles.trailDescription}>{currentTrail.description}</p>
        </div>

        {/* Document Path */}
        <div className={styles.documentPath}>
          {/* Visual Path Line */}
          <div className={styles.pathLine} aria-hidden="true" />

          {/* Document Cards */}
          {currentTrail.documents.map((doc, index) => (
            <article key={doc.id} className={styles.documentCard}>
              {/* Path Node */}
              <div className={`${styles.pathNode} ${getTypeClass(doc.type)}`} aria-hidden="true">
                <span className={styles.nodeNumber}>{index + 1}</span>
              </div>

              {/* Document Content */}
              <Link href={`/evidence/documents/${doc.id}`} className={styles.documentLink}>
                <time className={styles.documentDate} dateTime={doc.date}>
                  {formatDate(doc.date)}
                </time>
                <h4 className={styles.documentTitle}>{doc.title}</h4>
                <p className={styles.documentExcerpt}>{doc.excerpt}</p>
                <span className={styles.documentArrow}>
                  Read document <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* Trail CTA */}
        <div className={styles.trailCTA}>
          <Link
            href={`/evidence/documents/${currentTrail.documents[0].id}`}
            className={styles.startButton}
          >
            <span className={styles.startIcon} aria-hidden="true">
              &#9654;
            </span>
            {currentTrail.cta}
          </Link>
          <span className={styles.ctaNote}>
            {currentTrail.documents.length} documents in this trail
          </span>
        </div>
      </div>

      {/* All Trails Overview (Mobile-friendly cards) */}
      <div className={styles.trailCards}>
        <h3 className={styles.cardsHeading}>All Evidence Trails</h3>
        <div className={styles.cardsGrid}>
          {TRAILS.map((trail) => (
            <button
              key={trail.id}
              className={`${styles.trailCard} ${activeTrail === trail.id ? styles.trailCardActive : ''}`}
              onClick={() => setActiveTrail(trail.id)}
              type="button"
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {trail.icon}
              </span>
              <span className={styles.cardTitle}>{trail.title}</span>
              <span className={styles.cardSubtitle}>{trail.subtitle}</span>
              <span className={styles.cardCount}>{trail.documents.length} documents</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
