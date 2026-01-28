'use client'

import { useMemo } from 'react'
import { TrendingDown, CloudRain, Wind, Check } from 'lucide-react'
import { detectNextChange, getNextChangeDisplay, type ChangeType } from '@/lib/almanac/nextChange'
import type { HourlyForecast } from '@/lib/almanac/types'

interface NextChangeHeroProps {
  hourly: HourlyForecast
  currentTemp: number
}

const iconMap: Record<ChangeType, typeof Check> = {
  freeze: TrendingDown,
  thaw: TrendingDown,
  precip_start: CloudRain,
  precip_end: CloudRain,
  wind_increase: Wind,
  wind_decrease: Wind,
  stable: Check,
}

export function NextChangeHero({ hourly, currentTemp }: NextChangeHeroProps) {
  const change = useMemo(() => detectNextChange(hourly, currentTemp), [hourly, currentTemp])

  const display = getNextChangeDisplay(change)
  const Icon = iconMap[change.type] || Check

  const bgClass = {
    critical: 'bg-red-900/30 border-red-500/50',
    warning: 'bg-amber-900/20 border-amber-500/30',
    info: 'bg-white/5 border-white/10',
  }[change.severity]

  return (
    <div className={`rounded-lg border ${bgClass} p-4`}>
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-full ${
            change.severity === 'critical'
              ? 'bg-red-500/20'
              : change.severity === 'warning'
                ? 'bg-amber-500/20'
                : 'bg-white/10'
          }`}
        >
          <Icon className={`w-5 h-5 ${display.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${display.color}`}>{change.headline}</p>
          <p className="text-sm text-almanac-parchment/60 mt-0.5">{change.subtext}</p>
        </div>
        {change.type !== 'stable' && change.timeString && (
          <div className="text-right">
            <p className="text-xs text-almanac-parchment/40 uppercase">Expected</p>
            <p className="text-sm font-medium text-almanac-parchment">{change.timeString}</p>
          </div>
        )}
      </div>
    </div>
  )
}
