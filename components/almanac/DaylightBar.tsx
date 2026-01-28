'use client'

import { Sunrise, Sunset } from 'lucide-react'

interface DaylightBarProps {
  sunrise: string // ISO string
  sunset: string // ISO string
}

export function DaylightBar({ sunrise, sunset }: DaylightBarProps) {
  const now = new Date()
  const sunriseDate = new Date(sunrise)
  const sunsetDate = new Date(sunset)

  const totalDaylight = sunsetDate.getTime() - sunriseDate.getTime()
  const elapsed = now.getTime() - sunriseDate.getTime()
  const progress = Math.max(0, Math.min(100, (elapsed / totalDaylight) * 100))

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  const isDay = now >= sunriseDate && now <= sunsetDate

  // Calculate remaining daylight
  const remaining = sunsetDate.getTime() - now.getTime()
  const remainingHours = Math.floor(remaining / (1000 * 60 * 60))
  const remainingMinutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      {/* Times */}
      <div className="flex items-center justify-between text-xs text-almanac-parchment/70 mb-2">
        <div className="flex items-center gap-1">
          <Sunrise className="w-3.5 h-3.5 text-orange-400" />
          <span>{formatTime(sunriseDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Sunset className="w-3.5 h-3.5 text-purple-400" />
          <span>{formatTime(sunsetDate)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 via-yellow-300 to-purple-400 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Remaining */}
      {isDay && remaining > 0 && (
        <p className="text-xs text-center text-almanac-parchment/50 mt-2">
          {remainingHours}h {remainingMinutes}m of daylight left
        </p>
      )}
    </div>
  )
}
