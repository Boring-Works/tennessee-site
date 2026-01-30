'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Document } from '@/lib/evidence/types'
import type { SearchIndex } from '@/lib/evidence/search'
import { SearchBar, FilterPanel } from '@/components/evidence'
import './documents.css'

interface DocumentsClientProps {
  documents: Document[]
  searchIndex: SearchIndex
}

const COLLECTION_LABELS: Record<string, string> = {
  'blount-papers': 'The Blount Papers',
  treaties: 'Treaties & Proclamations',
  'federal-correspondence': 'Federal Correspondence',
  'knoxville-gazette': 'The Knoxville Gazette',
  maps: 'Maps & Visual',
}

const COLLECTION_DESCRIPTIONS: Record<string, string> = {
  'blount-papers':
    "Governor Blount's correspondence with the War Department, chronicling the establishment of territorial government.",
  treaties:
    'Treaties, proclamations, and legal documents that established federal authority in the Southwest Territory.',
  'federal-correspondence':
    'Letters between Washington, Knox, Jefferson, and other federal officials regarding the territory.',
  'knoxville-gazette':
    'Selected issues from the first newspaper west of the Appalachians in Tennessee.',
  maps: 'Maps, inventories, and visual documents from the territorial period.',
}

export function DocumentsClient({ documents, searchIndex }: DocumentsClientProps) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCollection && doc.collection !== selectedCollection) return false
      if (selectedContentType && doc.content_type !== selectedContentType) return false
      return true
    })
  }, [documents, selectedCollection, selectedContentType])

  // Derive announcement from filtered count (no useEffect needed)
  const resultAnnouncement = useMemo(() => {
    const count = filteredDocuments.length
    return `${count} document${count !== 1 ? 's' : ''} found`
  }, [filteredDocuments.length])

  const filteredCollections = useMemo(() => {
    const grouped = new Map<string, Document[]>()
    for (const doc of filteredDocuments) {
      const existing = grouped.get(doc.collection) || []
      existing.push(doc)
      grouped.set(doc.collection, existing)
    }
    return Object.fromEntries(grouped)
  }, [filteredDocuments])

  return (
    <div className="documentsPage">
      <div className="documentsContainer">
        <main className="documentsContent">
          <div role="status" aria-live="polite" className="sr-only">
            {resultAnnouncement}
          </div>
          {/* Header */}
          <header className="documentsHeader">
            <h1 className="documentsTitle">Document Archive</h1>
            <p className="documentsSubtitle">
              {documents.length} primary source documents from the founding of Tennessee
            </p>
          </header>

          {/* Search */}
          <div className="documentsSearch">
            <SearchBar
              index={searchIndex}
              collection={selectedCollection || undefined}
              contentType={selectedContentType || undefined}
              placeholder="Search documents and passages..."
            />
          </div>

          {/* Filters */}
          <FilterPanel
            index={searchIndex}
            selectedCollection={selectedCollection}
            selectedContentType={selectedContentType}
            onCollectionChange={setSelectedCollection}
            onContentTypeChange={setSelectedContentType}
          />

          {/* View Toggle */}
          <div className="documentsViewToggle">
            <span className="documentsResultCount">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            </span>
            <div className="documentsViewButtons">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`documentsViewButton ${viewMode === 'list' ? 'active' : ''}`}
                aria-pressed={viewMode === 'list'}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`documentsViewButton ${viewMode === 'grid' ? 'active' : ''}`}
                aria-pressed={viewMode === 'grid'}
              >
                Grid
              </button>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gold-leaf/60 mb-4">
                No documents match your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCollection(null)
                  setSelectedContentType(null)
                }}
                className="px-4 py-2 border border-gold-leaf/30 text-gold-leaf rounded hover:border-gold-leaf transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="documentsListView">
              {Object.entries(filteredCollections).map(([collection, docs]) => (
                <section key={collection} className="documentsCollection">
                  <h2 className="documentsCollectionTitle">
                    {COLLECTION_LABELS[collection] || collection}
                    <span className="documentsCollectionCount">{docs.length}</span>
                  </h2>
                  {COLLECTION_DESCRIPTIONS[collection] && (
                    <p className="documentsCollectionDesc">{COLLECTION_DESCRIPTIONS[collection]}</p>
                  )}
                  <ul className="documentsList">
                    {docs.map((doc) => (
                      <li key={doc.id} className="documentsItem">
                        <Link href={`/evidence/documents/${doc.id}`} className="documentsLink">
                          <span className="documentsItemTitle">{doc.title}</span>
                          <span className="documentsItemMeta">
                            <span className="documentsItemDate">{doc.date}</span>
                            <span className="documentsItemType">{doc.content_type}</span>
                            {doc.passages.length > 0 && (
                              <span className="documentsItemPassages">
                                {doc.passages.length} passage{doc.passages.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div className="documentsGridView">
              {filteredDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/evidence/documents/${doc.id}`}
                  className="documentsGridCard"
                >
                  <span className="documentsGridCollection">
                    {COLLECTION_LABELS[doc.collection] || doc.collection}
                  </span>
                  <h3 className="documentsGridTitle">{doc.title}</h3>
                  <span className="documentsGridDate">{doc.date}</span>
                  <span className="documentsGridType">{doc.content_type}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Back Link */}
          <Link href="/evidence" className="documentsBackLink">
            <span aria-hidden="true">&larr;</span> Back to Evidence Room
          </Link>
        </main>
      </div>
    </div>
  )
}
