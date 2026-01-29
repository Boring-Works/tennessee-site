'use client'

import { useState, useRef, useEffect } from 'react'

interface CitationExporterProps {
  document: {
    id: string
    title: string
    date: string // YYYY-MM-DD format
    author?: string
    source: string
    source_url?: string
  }
  passageAnchor?: string // Optional anchor for deep link
}

type CitationFormat = 'mla' | 'apa' | 'chicago' | 'link'

const FORMAT_LABELS: Record<CitationFormat, string> = {
  mla: 'MLA',
  apa: 'APA',
  chicago: 'Chicago',
  link: 'Copy Link',
}

const BASE_URL = 'https://tennesseestartshere.com/evidence/documents'

/**
 * Format a date string for different citation styles
 */
function formatDate(dateStr: string, style: 'mla' | 'apa' | 'chicago'): string {
  const date = new Date(dateStr + 'T00:00:00')
  const day = date.getDate()
  const year = date.getFullYear()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const mlaMonths = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  const month = date.getMonth()

  switch (style) {
    case 'mla':
      // MLA: Day Month Year (e.g., 20 Oct. 1790)
      return `${day} ${mlaMonths[month]} ${year}`
    case 'apa':
      // APA: Year, Month Day (e.g., 1790, October 20)
      return `${year}, ${months[month]} ${day}`
    case 'chicago':
      // Chicago: Month Day, Year (e.g., October 20, 1790)
      return `${months[month]} ${day}, ${year}`
  }
}

/**
 * Generate citation text for a document in the specified format
 */
function generateCitation(
  doc: CitationExporterProps['document'],
  format: CitationFormat,
  passageAnchor?: string
): string {
  const url = passageAnchor ? `${BASE_URL}/${doc.id}#${passageAnchor}` : `${BASE_URL}/${doc.id}`

  switch (format) {
    case 'mla':
      // MLA: "Title." Rocky Mount State Historic Site, Day Month Year. URL.
      return `"${doc.title}." Rocky Mount State Historic Site, ${formatDate(doc.date, 'mla')}. ${url}.`

    case 'apa':
      // APA: Title. (Year, Month Day). Rocky Mount State Historic Site. URL
      return `${doc.title}. (${formatDate(doc.date, 'apa')}). Rocky Mount State Historic Site. ${url}`

    case 'chicago':
      // Chicago: "Title," Month Day, Year, Rocky Mount State Historic Site, URL.
      return `"${doc.title}," ${formatDate(doc.date, 'chicago')}, Rocky Mount State Historic Site, ${url}.`

    case 'link':
      return url
  }
}

export function CitationExporter({ document, passageAnchor }: CitationExporterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedFormat, setCopiedFormat] = useState<CitationFormat | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside)
      return () => window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Clear copied state after timeout
  useEffect(() => {
    if (copiedFormat) {
      const timer = setTimeout(() => setCopiedFormat(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [copiedFormat])

  async function handleCopy(format: CitationFormat) {
    const citation = generateCitation(document, format, passageAnchor)

    try {
      await navigator.clipboard.writeText(citation)
      setCopiedFormat(format)
    } catch {
      // Fallback for older browsers
      const textarea = window.document.createElement('textarea')
      textarea.value = citation
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      window.document.body.appendChild(textarea)
      textarea.select()
      window.document.execCommand('copy')
      window.document.body.removeChild(textarea)
      setCopiedFormat(format)
    }
  }

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center gap-1.5 px-2.5 py-1.5
          text-sm text-almanac-parchment/70 hover:text-almanac-gold
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-almanac-gold/30
          rounded-md transition-all cursor-pointer
        "
        title="Cite this document"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="text-base leading-none">&#x1F4CB;</span>
        <span>Cite</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute top-full right-0 mt-1 z-20
            min-w-[140px] py-1
            bg-midnight border border-white/10
            rounded-lg shadow-xl
          "
          role="menu"
        >
          {(Object.keys(FORMAT_LABELS) as CitationFormat[]).map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => handleCopy(format)}
              className="
                w-full px-3 py-2 text-left text-sm
                text-almanac-parchment/80 hover:text-almanac-gold
                hover:bg-white/5 transition-colors
                flex items-center justify-between gap-2
              "
              role="menuitem"
            >
              <span>{FORMAT_LABELS[format]}</span>
              {copiedFormat === format && (
                <span className="text-green-400 text-xs font-medium">Copied!</span>
              )}
            </button>
          ))}

          {/* Preview of selected citation */}
          {copiedFormat && (
            <div className="px-3 py-2 mt-1 border-t border-white/10">
              <p className="text-xs text-almanac-parchment/50 break-all leading-relaxed">
                {generateCitation(document, copiedFormat, passageAnchor)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
