'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { getWeatherInfo } from '@/lib/almanac/types'
import { Wind, Droplets, Clock } from 'lucide-react'

interface NowDisplayProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  windSpeed: number
  windDirection?: number
  windGusts?: number
  humidity: number
  dewPoint?: number
  todayHigh: number
  todayLow: number
  lastUpdated?: Date | null
}

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function NowDisplay({
  temperature,
  feelsLike,
  weatherCode,
  windSpeed,
  windDirection,
  windGusts,
  humidity,
  dewPoint,
  todayHigh,
  todayLow,
  lastUpdated,
}: NowDisplayProps) {
  const Icon = getWeatherIcon(weatherCode)
  const weather = getWeatherInfo(weatherCode)

  // Format update time
  const updateTime = lastUpdated
    ? lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : null

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex flex-col">
      {/* Header: NOW */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-almanac-gold">
          Now
        </span>
        {updateTime && (
          <span className="flex items-center gap-1 text-xs text-almanac-parchment/40">
            <Clock className="w-3 h-3" />
            {updateTime}
          </span>
        )}
      </div>

      {/* Main temp + condition */}
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-12 h-12 text-almanac-gold flex-shrink-0" />
        <div>
          <div className="text-4xl font-bold text-almanac-parchment leading-none">
            {Math.round(temperature)}°
          </div>
          <p className="text-sm text-almanac-parchment/70 mt-1">{weather.condition}</p>
        </div>
      </div>

      {/* Feels like + H/L */}
      <div className="flex items-center justify-between text-sm mb-3 pb-3 border-b border-white/10">
        <span className="text-almanac-parchment/60">
          Feels like <span className="text-almanac-parchment">{Math.round(feelsLike)}°</span>
        </span>
        <span className="text-almanac-parchment/60">
          H: <span className="text-almanac-parchment">{Math.round(todayHigh)}°</span>
          {' / '}
          L: <span className="text-blue-400">{Math.round(todayLow)}°</span>
        </span>
      </div>

      {/* Wind */}
      <div className="flex items-center gap-2 text-sm text-almanac-parchment/70 mb-2">
        <Wind className="w-4 h-4" />
        <span>
          {Math.round(windSpeed)} mph
          {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
        </span>
        {windGusts && windGusts > windSpeed + 5 && (
          <span className="text-amber-400 text-xs">(gusts {Math.round(windGusts)})</span>
        )}
      </div>

      {/* Humidity or Dew Point */}
      <div className="flex items-center gap-2 text-sm text-almanac-parchment/70">
        <Droplets className="w-4 h-4" />
        {dewPoint !== undefined ? (
          <span>Dew point {Math.round(dewPoint)}°</span>
        ) : (
          <span>Humidity {Math.round(humidity)}%</span>
        )}
      </div>
    </div>
  )
}
