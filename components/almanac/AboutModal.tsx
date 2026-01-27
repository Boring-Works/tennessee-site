'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-almanac-parchment/50 hover:text-almanac-gold transition-colors mt-2"
      >
        <Info className="w-3 h-3" />
        <span>Our Story</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-4 border-b border-almanac-gold/20">
                <div>
                  <h2 className="font-serif text-xl text-almanac-gold">The 1775 Almanac</h2>
                  <p className="text-sm text-almanac-parchment/60">Our Story</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-almanac-parchment/40 hover:text-almanac-parchment transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    Before Tennessee Was Tennessee
                  </h3>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    In 1775—one year before the Declaration of Independence—the Massengill
                    family began working ground in what would become Sullivan County.
                    No Tennessee yet—just soil, seasons, and the knowledge to read both.
                  </p>
                </section>

                <section>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    That farm is still here. Part of it is now cared for by <strong className="text-almanac-gold">Rocky Mount
                    State Historic Site</strong>—where Tennessee&apos;s territorial government operated
                    from 1790 to 1792. Tennessee&apos;s oldest documented farm. The first capital
                    of what became the sixteenth state.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    Modern Tools, Ancestral Wisdom
                  </h3>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed">
                    The 1775 Almanac isn&apos;t a history lesson. It&apos;s a daily briefing.
                  </p>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed mt-2">
                    We pull real-time weather data, soil temperatures, frost probabilities,
                    and lunar cycles. We translate that data into actionable guidance: when
                    to plant, when to harvest, when to stay inside.
                  </p>
                  <p className="text-sm text-almanac-parchment/80 leading-relaxed mt-2">
                    But we do it through a lens that&apos;s been focused for two and a half centuries.
                    The same ground that taught the Massengills how to survive a frontier winter
                    is now teaching you when to protect your pipes.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-almanac-gold mb-2">
                    What You&apos;ll Find Here
                  </h3>
                  <ul className="text-sm text-almanac-parchment/70 space-y-1">
                    <li>• <strong>Workability Scores</strong> — Know if today&apos;s good for planting, outdoor work, or staying in</li>
                    <li>• <strong>Soil Temperature</strong> — Real-time data for planting decisions</li>
                    <li>• <strong>The Seedkeeper&apos;s Watch</strong> — Native seed stratification tracking</li>
                    <li>• <strong>Moon Phases</strong> — Traditional planting guidance by the moon</li>
                    <li>• <strong>The Daily Proverb</strong> — Frontier wisdom meets modern life</li>
                    <li>• <strong>Forecasts & Radar</strong> — Hourly, daily, and 7-day outlooks</li>
                  </ul>
                </section>

                <section className="pt-4 border-t border-almanac-gold/10">
                  <p className="text-xs text-almanac-parchment/50 leading-relaxed">
                    The 1775 Almanac is powered by Rocky Mount State Historic Site in Piney Flats,
                    Tennessee—adjacent to Tennessee&apos;s oldest documented farm and the first capital of
                    the Southwest Territory.
                  </p>
                  <a
                    href="https://rockymountmuseum.com/visit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-almanac-gold hover:text-almanac-gold/80 transition-colors"
                  >
                    Plan Your Visit →
                  </a>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
