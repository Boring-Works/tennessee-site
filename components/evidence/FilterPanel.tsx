'use client'

import { useState } from 'react'
import type { SearchIndex } from '@/lib/evidence/search'
import { getCollections, getContentTypes } from '@/lib/evidence/search'
import styles from './FilterPanel.module.css'

interface FilterPanelProps {
  index: SearchIndex
  selectedCollection: string | null
  selectedContentType: string | null
  onCollectionChange: (collection: string | null) => void
  onContentTypeChange: (contentType: string | null) => void
}

const COLLECTION_LABELS: Record<string, string> = {
  'blount-papers': 'The Blount Papers',
  treaties: 'Treaties & Proclamations',
  'federal-correspondence': 'Federal Correspondence',
  'knoxville-gazette': 'The Knoxville Gazette',
  maps: 'Maps & Visual',
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  letter: 'Letters',
  treaty: 'Treaties',
  proclamation: 'Proclamations',
  newspaper: 'Newspapers',
  legal: 'Legal Documents',
  inventory: 'Inventories',
  report: 'Reports',
}

export function FilterPanel({
  index,
  selectedCollection,
  selectedContentType,
  onCollectionChange,
  onContentTypeChange,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const collections = getCollections(index)
  const contentTypes = getContentTypes(index)

  const hasActiveFilters = selectedCollection || selectedContentType

  return (
    <div className={styles.filterPanel}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.toggleButton}
        aria-expanded={isExpanded}
      >
        <span className={styles.toggleIcon}>{isExpanded ? '▼' : '▶'}</span>
        <span>Filters</span>
        {hasActiveFilters && <span className={styles.activeIndicator}>Active</span>}
      </button>

      {isExpanded && (
        <div className={styles.filters}>
          {/* Collection Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Collection</label>
            <div className={styles.filterOptions}>
              <button
                type="button"
                onClick={() => onCollectionChange(null)}
                className={`${styles.filterOption} ${!selectedCollection ? styles.filterOptionActive : ''}`}
                aria-pressed={!selectedCollection}
              >
                All Collections
              </button>
              {collections.map((collection) => (
                <button
                  key={collection}
                  type="button"
                  onClick={() => onCollectionChange(collection)}
                  className={`${styles.filterOption} ${selectedCollection === collection ? styles.filterOptionActive : ''}`}
                  aria-pressed={selectedCollection === collection}
                >
                  {COLLECTION_LABELS[collection] || collection}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Document Type</label>
            <div className={styles.filterOptions}>
              <button
                type="button"
                onClick={() => onContentTypeChange(null)}
                className={`${styles.filterOption} ${!selectedContentType ? styles.filterOptionActive : ''}`}
                aria-pressed={!selectedContentType}
              >
                All Types
              </button>
              {contentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onContentTypeChange(type)}
                  className={`${styles.filterOption} ${selectedContentType === type ? styles.filterOptionActive : ''}`}
                  aria-pressed={selectedContentType === type}
                >
                  {CONTENT_TYPE_LABELS[type] || type}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onCollectionChange(null)
                onContentTypeChange(null)
              }}
              className={styles.clearButton}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
