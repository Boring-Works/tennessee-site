'use client'

import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Document } from '@/lib/evidence/types'
import { VerificationBadge } from './VerificationBadge'

interface DocumentViewerProps {
  document: Document
  highlightId?: string
}

export function DocumentViewer({ document: doc, highlightId }: DocumentViewerProps) {
  // Scroll to highlighted passage on mount
  useEffect(() => {
    if (highlightId) {
      const element = globalThis.document.getElementById(highlightId)
      if (element) {
        // Small delay to ensure render is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [highlightId])

  // Transform content: convert <passage> tags to spans with IDs
  const transformedContent = doc.content.replace(
    /<passage id="([^"]+)">([\s\S]*?)<\/passage>/g,
    (_, id, content) => `<span id="${id}" class="passage">${content.trim()}</span>`
  )

  return (
    <article className="max-w-3xl mx-auto">
      {/* Document Header */}
      <header className="mb-8 pb-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="font-serif text-3xl text-gold-leaf">{doc.title}</h1>
          <VerificationBadge verification={doc.verification} />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-almanac-parchment/60">
          <span>
            {new Date(doc.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="capitalize">{doc.content_type}</span>
          {doc.collection && <span className="text-gold-leaf/60">{doc.collection}</span>}
        </div>

        {/* Conversation threading */}
        {doc.responds_to && (
          <p className="mt-4 text-sm text-almanac-parchment/50">
            ← Responds to:{' '}
            <a
              href={`/evidence/documents/${doc.responds_to}`}
              className="text-gold-leaf hover:underline"
            >
              {doc.responds_to}
            </a>
          </p>
        )}
      </header>

      {/* Document Content */}
      <div
        className="prose prose-invert prose-gold max-w-none
          prose-headings:font-serif prose-headings:text-gold-leaf
          prose-p:text-almanac-parchment/80 prose-p:leading-relaxed
          prose-strong:text-almanac-parchment prose-strong:font-semibold
          prose-a:text-gold-leaf prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-gold-leaf/30 prose-blockquote:text-almanac-parchment/70
          prose-hr:border-white/10"
      >
        <ReactMarkdown
          components={{
            // Handle passage spans with highlighting
            span: ({ id, className, children }) => {
              const isHighlighted = id === highlightId
              const isPassage = className === 'passage'

              return (
                <span
                  id={id}
                  className={`
                    ${isPassage ? 'block my-4 py-3 px-4 rounded border-l-4 border-gold-leaf/30 bg-white/5' : ''}
                    ${isHighlighted ? 'bg-gold-leaf/20 border-gold-leaf scroll-mt-24 animate-pulse-once' : ''}
                  `}
                >
                  {children}
                </span>
              )
            },
          }}
        >
          {transformedContent}
        </ReactMarkdown>
      </div>

      {/* Source Attribution */}
      <footer className="mt-12 pt-6 border-t border-white/10">
        <h2 className="font-serif text-lg text-gold-leaf mb-3">Source</h2>
        <p className="text-sm text-almanac-parchment/60">
          {doc.source}
          {doc.source_url && (
            <>
              {' — '}
              <a
                href={doc.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-leaf hover:underline"
              >
                View Original
              </a>
            </>
          )}
        </p>
        {doc.verification.method && (
          <p className="text-xs text-almanac-parchment/40 mt-2">
            Verification: {doc.verification.method}
          </p>
        )}
      </footer>
    </article>
  )
}
