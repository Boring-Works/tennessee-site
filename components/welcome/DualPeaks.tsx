'use client'

import { useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import styles from './welcome.module.css'

interface PeakData {
  label: string
  date: string
  targetDate: string // ISO date string
}

interface DualPeaksProps {
  peaks: [PeakData, PeakData]
}

function calculateDaysRemaining(targetDate: string): number {
  const target = new Date(targetDate + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

// Empty subscribe - we don't need to listen for changes
function subscribe() {
  return () => {}
}

// Use useSyncExternalStore to safely handle hydration
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false // server snapshot
  )
}

export function DualPeaks({ peaks }: DualPeaksProps) {
  const isClient = useIsClient()

  return (
    <div className={styles.peaksContainer}>
      {peaks.map((peak) => {
        const days = isClient ? calculateDaysRemaining(peak.targetDate) : null
        return (
          <div key={peak.targetDate} className={styles.peakBadge}>
            <span className={styles.peakLabel}>{peak.label}</span>
            <motion.span
              className={styles.peakDays}
              key={days}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              aria-label={`${days !== null ? days : '—'} days remaining until ${peak.label}`}
            >
              {days !== null ? days : '—'}
              <span> days</span>
            </motion.span>
            <span className={styles.peakDate}>{peak.date}</span>
          </div>
        )
      })}
    </div>
  )
}
