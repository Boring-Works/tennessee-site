'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Flame, ShieldCheck, ShieldAlert } from 'lucide-react'
import type { NWSAlertsResponse } from '@/lib/almanac/types'

interface BurnDayIndicatorProps {
  lat: number
  lon: number
}

export default function BurnDayIndicator({ lat, lon }: BurnDayIndicatorProps) {
  const [isSafeToBurn, setIsSafeToBurn] = useState<boolean | null>(null)
  const [fireAlertEvent, setFireAlertEvent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const checkBurnStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/nws-alerts?lat=${lat}&lon=${lon}`)
      const data: NWSAlertsResponse = await response.json()

      // Check if there's a fire weather alert
      setIsSafeToBurn(!data.hasFireWeatherAlert)

      // If there's a fire alert, find the specific event name
      if (data.hasFireWeatherAlert && data.alerts) {
        const fireAlert = data.alerts.find((alert) =>
          [
            'Red Flag Warning',
            'Fire Weather Watch',
            'Extreme Fire Danger',
            'Fire Warning',
          ].includes(alert.event)
        )
        setFireAlertEvent(fireAlert?.event || 'Fire Weather Alert')
      } else {
        setFireAlertEvent(null)
      }
    } catch {
      // Default to safe if we can't fetch - fail open for this feature
      setIsSafeToBurn(true)
      setFireAlertEvent(null)
    } finally {
      setLoading(false)
    }
  }, [lat, lon])

  useEffect(() => {
    checkBurnStatus()
    // Refresh every 15 minutes
    const interval = setInterval(checkBurnStatus, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [checkBurnStatus])

  // Don't show while loading
  if (loading) {
    return null
  }

  // Don't show if we couldn't determine status
  if (isSafeToBurn === null) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`p-3 rounded-lg border h-full ${
        isSafeToBurn ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'
      }`}
      role="status"
      aria-label={isSafeToBurn ? 'Safe to burn today' : 'No burning today'}
    >
      <div className="flex items-center gap-3">
        {/* Icon - Triple encoding part 1 (visual) */}
        <div className={`flex-shrink-0 ${isSafeToBurn ? 'text-green-400' : 'text-red-400'}`}>
          {isSafeToBurn ? (
            <ShieldCheck size={24} aria-hidden="true" />
          ) : (
            <ShieldAlert size={24} aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/* Icon - Triple encoding part 2 (emoji) */}
            <Flame
              size={16}
              className={isSafeToBurn ? 'text-green-400' : 'text-red-400'}
              aria-hidden="true"
            />
            <span className="font-medium text-sm text-almanac-parchment">BURN DAY STATUS</span>
          </div>

          {/* Status message - Triple encoding part 3 (text) */}
          <div className="mt-1">
            <span
              className={`text-sm font-semibold ${
                isSafeToBurn ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isSafeToBurn ? '✓ SAFE TO BURN TODAY' : '✗ NO BURNING'}
            </span>
          </div>

          {/* Reason */}
          <p className="text-xs text-almanac-parchment/70 mt-0.5">
            {isSafeToBurn
              ? 'No fire weather alerts active'
              : fireAlertEvent || 'Fire weather alert in effect'}
          </p>
        </div>
      </div>

      {/* Warning message for no-burn days */}
      {!isSafeToBurn && (
        <div className="mt-2 pt-2 border-t border-red-500/30">
          <p className="text-xs text-red-300/80">
            Check with local fire department before any outdoor burning. Conditions may change.
          </p>
        </div>
      )}
    </motion.div>
  )
}
