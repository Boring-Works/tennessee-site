'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { getWeatherInfo, isSnowCode, isIceCode } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import {
  Wind,
  Droplets,
  Snowflake,
  Sunrise,
  Sunset,
  Gauge,
  ArrowUp,
  ArrowDown,
  Minus,
  Sun,
} from 'lucide-react'

interface AlmanacHeroProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  location: string
  windSpeed?: number
  windDirection?: number
  humidity?: number
  todayHigh?: number
  todayLow?: number
  sunrise?: string
  sunset?: string
  pressure?: number
  pressureTrend?: 'rising' | 'falling' | 'steady'
  uvIndex?: number
}

// Convert wind direction degrees to compass direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

// Format time from ISO string to readable format
function formatTime(isoString: string): string {
  const date = new Date(isoString)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'p' : 'a'
  const displayHour = hours % 12 || 12
  return `${displayHour}:${minutes}${ampm}`
}

// Convert pressure from hPa to inHg
function hPaToInHg(hPa: number): string {
  return (hPa * 0.02953).toFixed(2)
}

export function AlmanacHero({
  temperature,
  feelsLike,
  weatherCode,
  location,
  windSpeed,
  windDirection,
  humidity,
  todayHigh,
  todayLow,
  sunrise,
  sunset,
  pressure,
  pressureTrend,
  uvIndex,
}: AlmanacHeroProps) {
  const weather = getWeatherInfo(weatherCode)
  // Get icon component - this is a stable reference lookup, not component creation
  const Icon = getWeatherIcon(weatherCode)
  const isSnowing = isSnowCode(weatherCode)
  const isIcy = isIceCode(weatherCode)

  // Pressure trend icon
  const PressureTrendIcon =
    pressureTrend === 'rising' ? ArrowUp : pressureTrend === 'falling' ? ArrowDown : Minus

  return (
    <section className="animate-fade-in-up text-center py-8 h-full flex flex-col justify-center bg-white/5 border border-white/10 rounded-lg">
      {/* Location */}
      <p className="text-sm uppercase tracking-widest text-gold-leaf mb-4">{location}</p>

      {/* Temperature with Icon */}
      <div className="flex items-center justify-center gap-4">
        <div className="relative animate-bob">
          <Icon className="w-16 h-16 text-almanac-gold" />
          {/* Snow/Ice indicator */}
          {(isSnowing || isIcy) && (
            <Snowflake className="w-6 h-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
          )}
        </div>
        <div className="text-[96px] font-sans font-bold leading-none text-almanac-parchment">
          {Math.round(temperature)}°
        </div>
      </div>

      {/* Condition */}
      <p
        className={`text-xl mt-2 ${
          isSnowing ? 'text-blue-300' : isIcy ? 'text-cyan-300' : 'text-almanac-parchment/70'
        }`}
      >
        {weather.condition}
      </p>

      {/* Feels Like */}
      <p className="text-sm text-almanac-parchment/50 mt-1">Feels like {Math.round(feelsLike)}°</p>

      {/* Today's High/Low */}
      {(todayHigh !== undefined || todayLow !== undefined) && (
        <p className="text-sm text-almanac-parchment/40 mt-1">
          {todayHigh !== undefined && <>H: {Math.round(todayHigh)}°</>}
          {todayHigh !== undefined && todayLow !== undefined && ' / '}
          {todayLow !== undefined && <>L: {Math.round(todayLow)}°</>}
        </p>
      )}

      {/* Additional stats */}
      {(windSpeed !== undefined || humidity !== undefined) && (
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-almanac-parchment/50">
          {windSpeed !== undefined && (
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4" />
              <span>
                {Math.round(windSpeed)} mph
                {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
              </span>
            </div>
          )}
          {humidity !== undefined && (
            <div className="flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              <span>{Math.round(humidity)}%</span>
            </div>
          )}
        </div>
      )}

      {/* Extended info section - fills remaining space */}
      {(sunrise || sunset || pressure || uvIndex !== undefined) && (
        <>
          {/* Divider */}
          <div className="w-16 h-px bg-almanac-gold/30 mx-auto mt-4" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs text-almanac-parchment/60 px-4">
            {/* Sunrise */}
            {sunrise && (
              <div className="flex items-center gap-2">
                <Sunrise className="w-4 h-4 text-orange-400" />
                <span>{formatTime(sunrise)}</span>
              </div>
            )}

            {/* Sunset */}
            {sunset && (
              <div className="flex items-center gap-2">
                <Sunset className="w-4 h-4 text-orange-500" />
                <span>{formatTime(sunset)}</span>
              </div>
            )}

            {/* Barometer */}
            {pressure && (
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-almanac-gold/70" />
                <span className="flex items-center gap-1">
                  {hPaToInHg(pressure)}&quot;
                  {pressureTrend && (
                    <PressureTrendIcon
                      className={`w-3 h-3 ${
                        pressureTrend === 'rising'
                          ? 'text-green-400'
                          : pressureTrend === 'falling'
                            ? 'text-red-400'
                            : 'text-almanac-parchment/40'
                      }`}
                    />
                  )}
                </span>
              </div>
            )}

            {/* UV Index */}
            {uvIndex !== undefined && uvIndex > 0 && (
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                <span>UV {Math.round(uvIndex)}</span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
