'use client'

import { Thermometer, Bug } from 'lucide-react'

interface GDDTrackerProps {
  /** Today's high temperature in °F */
  tempHigh: number
  /** Today's low temperature in °F */
  tempLow: number
  /** Base temperature for GDD calculation (default: 50°F) */
  baseTemp?: number
}

// Pest emergence thresholds (base 50°F unless noted)
const PEST_THRESHOLDS = [
  { name: 'Codling Moth (1st gen)', gdd: 250, icon: '🦋' },
  { name: 'Apple Maggot', gdd: 900, icon: '🪰', baseTemp: 43 },
  { name: 'Japanese Beetle', gdd: 970, icon: '🪲' },
  { name: 'Squash Vine Borer', gdd: 900, icon: '🐛' },
  { name: 'Tomato Hornworm', gdd: 1200, icon: '🐛' },
]

/**
 * Estimate accumulated GDD based on day of year
 * This is a rough approximation for Sullivan County, TN (Zone 7a)
 * Values are calibrated for base 50°F
 * In production, you'd track actual daily GDD from weather data
 */
function estimateAccumulatedGDD(): number {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))

  // GDD accumulation typically starts in spring
  // Rough estimate: minimal until March, then accelerates
  if (dayOfYear < 60) return 0 // Before March
  if (dayOfYear < 91) return Math.max(0, (dayOfYear - 60) * 3) // March
  if (dayOfYear < 121) return 93 + (dayOfYear - 91) * 8 // April
  if (dayOfYear < 152) return 333 + (dayOfYear - 121) * 15 // May
  if (dayOfYear < 182) return 798 + (dayOfYear - 152) * 20 // June
  if (dayOfYear < 213) return 1398 + (dayOfYear - 182) * 22 // July
  if (dayOfYear < 244) return 2080 + (dayOfYear - 213) * 20 // August
  if (dayOfYear < 274) return 2700 + (dayOfYear - 244) * 12 // September
  if (dayOfYear < 305) return 3060 + (dayOfYear - 274) * 5 // October
  return 3215 // After October, minimal accumulation
}

/**
 * Calculate today's GDD contribution
 */
function calculateDailyGDD(tempHigh: number, tempLow: number, baseTemp: number): number {
  const avgTemp = (tempHigh + tempLow) / 2
  const gdd = Math.max(0, avgTemp - baseTemp)
  return Math.round(gdd * 10) / 10
}

export default function GDDTracker({ tempHigh, tempLow, baseTemp = 50 }: GDDTrackerProps) {
  const dailyGDD = calculateDailyGDD(tempHigh, tempLow, baseTemp)
  const accumulatedGDD = estimateAccumulatedGDD()

  // Find pests that are about to emerge or recently emerged
  const relevantPests = PEST_THRESHOLDS.filter(
    (pest) => accumulatedGDD >= pest.gdd * 0.7 && accumulatedGDD <= pest.gdd * 1.3
  ).slice(0, 2)

  // Find next pest threshold
  const nextPest = PEST_THRESHOLDS.find((pest) => pest.gdd > accumulatedGDD)

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">GDD</h3>
        <span className="text-xs text-almanac-parchment/40 ml-auto">Base {baseTemp}°F</span>
      </div>

      {/* Accumulated GDD */}
      <div className="text-center mb-3">
        <div className="text-3xl font-bold text-almanac-gold">{Math.round(accumulatedGDD)}</div>
        <div className="text-xs text-almanac-parchment/50">accumulated this season</div>
      </div>

      {/* Today's contribution */}
      <div className="flex items-center justify-center gap-1 mb-4 px-2 py-1 bg-white/5 rounded">
        <span className="text-xs text-almanac-parchment/60">Today:</span>
        <span className="text-sm font-medium text-almanac-parchment">+{dailyGDD}</span>
        <span className="text-xs text-almanac-parchment/40">GDD</span>
      </div>

      {/* Pest alerts */}
      {relevantPests.length > 0 && (
        <div className="space-y-2 mb-3">
          {relevantPests.map((pest) => (
            <div
              key={pest.name}
              className="flex items-center gap-2 px-2 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded"
            >
              <Bug className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-orange-300">{pest.icon}</span>
              <span className="text-xs text-almanac-parchment/80 flex-1">{pest.name}</span>
              <span className="text-xs text-orange-400">{pest.gdd}</span>
            </div>
          ))}
        </div>
      )}

      {/* Next threshold */}
      {nextPest && relevantPests.length === 0 && (
        <div className="text-center text-xs text-almanac-parchment/50">
          <span className="block">Next: {nextPest.name}</span>
          <span className="text-almanac-parchment/40">
            at {nextPest.gdd} GDD (~{Math.round(nextPest.gdd - accumulatedGDD)} to go)
          </span>
        </div>
      )}

      {/* No more thresholds */}
      {!nextPest && relevantPests.length === 0 && (
        <div className="text-center text-xs text-almanac-parchment/50">
          All tracked pest thresholds passed
        </div>
      )}
    </div>
  )
}
