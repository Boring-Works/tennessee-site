'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sprout, HardHat, Thermometer, Moon } from 'lucide-react'

const STORAGE_KEY = 'almanac-onboarding-seen'

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeen = localStorage.getItem(STORAGE_KEY)
    if (!hasSeen) {
      // Small delay so page loads first
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/70 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-almanac-midnight border border-almanac-gold/30 rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-almanac-parchment/40 hover:text-almanac-parchment transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl text-almanac-gold mb-2">
                  Welcome to The 1775 Almanac
                </h2>
                <p className="text-sm text-almanac-parchment/70">
                  Weather intelligence from Tennessee&apos;s oldest farm
                </p>
              </div>

              {/* Key insight */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-center text-almanac-parchment/90">
                  <strong className="text-almanac-gold">The scores tell you what to DO</strong>
                  <br />
                  <span className="text-sm">Not just what the weather is.</span>
                </p>
              </div>

              {/* Score preview */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Sprout className="w-4 h-4 text-almanac-success" />
                  <span>
                    Sower&apos;s Score — <em>When to plant</em>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Thermometer className="w-4 h-4 text-almanac-warning" />
                  <span>
                    Outdoor Alert — <em>When to protect yourself</em>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span>
                    Keeper&apos;s Score — <em>Livestock &amp; pets</em>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
                  <HardHat className="w-4 h-4 text-orange-400" />
                  <span>
                    Builder&apos;s Score — <em>Projects &amp; repairs</em>
                  </span>
                </div>
              </div>

              <p className="text-xs text-center text-almanac-parchment/50 mb-6">
                Tap any score to see how it&apos;s calculated.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full py-3 bg-almanac-gold text-almanac-midnight font-medium rounded-lg hover:bg-almanac-gold/90 transition-colors"
              >
                Got it — Show me the weather
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
