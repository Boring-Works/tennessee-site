'use client'

import Link from 'next/link'
import styles from './EntryRoom.module.css'

interface Collection {
  id: string
  icon: string
  name: string
  count: string
}

const COLLECTIONS: Collection[] = [
  { id: 'blount-letter', icon: '📜', name: 'Letters', count: '4 docs' },
  { id: 'treaty-signers', icon: '🤝', name: 'Treaty Signers', count: '40 names' },
  { id: 'timeline', icon: '📅', name: 'Timeline', count: '12 dates' },
  { id: 'sources', icon: '📚', name: 'Sources', count: '6 repos' },
]

export function EntryRoom() {
  const handleCollectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.entryRoom}>
      <div className={styles.entryRoomInner}>
        <p className={styles.welcome}>
          Welcome to the archive. Four collections await. Browse by topic or scroll to read in
          sequence.
        </p>
        <p className={styles.readingTime}>~6 min read</p>

        <div className={styles.collectionGrid}>
          {COLLECTIONS.map((collection) => (
            <button
              type="button"
              key={collection.id}
              onClick={() => handleCollectionClick(collection.id)}
              className={styles.collectionCard}
            >
              <span className={styles.collectionIcon}>{collection.icon}</span>
              <span className={styles.collectionName}>{collection.name}</span>
              <span className={styles.collectionCount}>{collection.count}</span>
            </button>
          ))}
        </div>

        <Link href="/evidence/library" className={styles.libraryLink}>
          <span className={styles.libraryIcon}>📖</span>
          <span className={styles.libraryText}>
            <strong>Full Document Library</strong>
            <span>Read complete transcriptions with citations</span>
          </span>
          <span className={styles.libraryArrow}>→</span>
        </Link>

        <p className={styles.scrollHint}>
          <span className={styles.scrollArrow}>↓</span>
          Or scroll to begin reading
        </p>
      </div>
    </section>
  )
}
