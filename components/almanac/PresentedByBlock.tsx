'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface PresentedByBlockProps {
  lastUpdated: Date | null
}

export default function PresentedByBlock({ lastUpdated }: PresentedByBlockProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12"
    >
      {/* Presented By Attribution */}
      <div className="border-t border-almanac-gold/20 pt-8 pb-6">
        <div className="text-center">
          <p className="text-xs text-almanac-parchment/40 uppercase tracking-[0.2em] mb-3">
            Presented By
          </p>
          <p className="text-lg text-almanac-gold font-serif tracking-wide">
            Rocky Mount State Historic Site
          </p>
          <p className="text-sm text-almanac-parchment/70 mt-1">
            Sullivan County, Tennessee — Where Tennessee Began
          </p>
          <Link
            href="/visit"
            className="inline-block mt-4 text-sm text-almanac-gold/80 hover:text-almanac-gold transition-colors border-b border-almanac-gold/30 hover:border-almanac-gold/60 pb-0.5"
          >
            Plan Your Visit →
          </Link>
        </div>
      </div>

      {/* Technical Footer */}
      <div className="border-t border-white/5 pt-6 pb-8">
        <div className="text-center">
          <p className="text-xs text-almanac-parchment/30">
            Weather data via Open-Meteo
          </p>
          {lastUpdated && (
            <p className="text-xs text-almanac-parchment/20 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </p>
          )}
          <p className="text-xs text-almanac-parchment/20 mt-4 max-w-md mx-auto leading-relaxed">
            This almanac is built for information and entertainment, not life-or-death decisions.
            Always consult official sources for severe weather.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
