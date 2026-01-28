'use client'

import { Droplets } from 'lucide-react'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'

// ============================================
// TYPES
// ============================================

export interface DayForecast {
  day: string // "M", "T", "W", etc.
  high: number
  low: number
  code: number // WMO weather code
  precipChance: number
}

interface CompactSevenDayProps {
  days: DayForecast[]
}

// ============================================
// COMPACT SEVEN DAY COMPONENT
// ============================================

export function CompactSevenDay({ days }: CompactSevenDayProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => {
        const WeatherIcon = getWeatherIcon(day.code)
        const showPrecip = day.precipChance > 20

        return (
          <div key={index} className="flex flex-col items-center gap-1 py-2 px-1">
            {/* Day letter */}
            <span className="text-xs font-medium text-almanac-parchment/60">{day.day}</span>

            {/* Weather icon */}
            <WeatherIcon className="w-5 h-5 text-almanac-gold/80" />

            {/* High temp */}
            <span className="text-sm font-semibold text-almanac-parchment">
              {Math.round(day.high)}°
            </span>

            {/* Low temp */}
            <span className="text-xs text-almanac-parchment/50">{Math.round(day.low)}°</span>

            {/* Precip chance (only if >20%) */}
            {showPrecip && (
              <span className="flex items-center gap-0.5 text-xs text-blue-400">
                <Droplets className="w-3 h-3" />
                {day.precipChance}%
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
