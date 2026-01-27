'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { logger } from '@/lib/logger'

export default function AlmanacError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Almanac error:', error)
  }, [error])

  return (
    <div className="flex-1 flex items-center justify-center py-20 bg-midnight">
      <div className="text-center px-4">
        <p className="text-almanac-gold text-xs uppercase tracking-[0.3em] mb-4">Error</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-almanac-parchment mb-4">
          Something Went Wrong
        </h1>
        <p className="text-almanac-parchment/70 mb-8 max-w-md mx-auto leading-relaxed">
          We encountered an unexpected error loading the almanac. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-block bg-almanac-gold text-midnight font-semibold px-8 py-3 rounded-sm hover:bg-almanac-gold/90 transition-colors uppercase tracking-wider text-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block bg-white/10 text-almanac-parchment font-semibold px-8 py-3 rounded-sm hover:bg-white/20 transition-colors uppercase tracking-wider text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
