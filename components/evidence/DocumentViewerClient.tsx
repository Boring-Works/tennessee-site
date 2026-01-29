'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import type { Document } from '@/lib/evidence/types'
import { DocumentViewer } from './DocumentViewer'

interface DocumentViewerClientProps {
  document: Document
}

// Custom hook to subscribe to URL hash changes
function useUrlHash(): string | undefined {
  const subscribe = (callback: () => void) => {
    window.addEventListener('hashchange', callback)
    return () => window.removeEventListener('hashchange', callback)
  }

  const getSnapshot = () => {
    const hash = window.location.hash.slice(1)
    return hash || undefined
  }

  const getServerSnapshot = () => undefined

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function DocumentViewerClient({ document }: DocumentViewerClientProps) {
  const highlightId = useUrlHash()

  return <DocumentViewer document={document} highlightId={highlightId} />
}
