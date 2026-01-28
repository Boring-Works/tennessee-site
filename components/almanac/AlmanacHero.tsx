'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { getWeatherInfo, isSnowCode, isIceCode } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { Wind, Droplets, Snowflake } from 'lucide-react'

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
}

// Convert wind direction degrees to compass direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
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
}: AlmanacHeroProps) {
  const weather = getWeatherInfo(weatherCode)
  // Get icon component - this is a stable reference lookup, not component creation
  const Icon = getWeatherIcon(weatherCode)
  const isSnowing = isSnowCode(weatherCode)
  const isIcy = isIceCode(weatherCode)

  return (
    <section className="animate-fade-in-up text-center py-4 lg:py-6 h-full flex flex-col justify-center bg-white/5 border border-white/10 rounded-lg">
      {/* Location */}
      <p className="text-xs uppercase tracking-widest text-gold-leaf mb-2">{location}</p>

      {/* Temperature with Icon - more compact */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative animate-bob">
          <Icon className="w-12 h-12 lg:w-14 lg:h-14 text-almanac-gold" />
          {/* Snow/Ice indicator */}
          {(isSnowing || isIcy) && (
            <Snowflake className="w-5 h-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
          )}
        </div>
        <div className="text-[64px] lg:text-[72px] font-sans font-bold leading-none text-almanac-parchment">
          {Math.round(temperature)}°
        </div>
      </div>

      {/* Condition */}
      <p
        className={`text-lg mt-1 ${
          isSnowing ? 'text-blue-300' : isIcy ? 'text-cyan-300' : 'text-almanac-parchment/70'
        }`}
      >
        {weather.condition}
      </p>

      {/* Compact info line: Feels like + H/L */}
      <p className="text-sm text-almanac-parchment/50 mt-1">
        Feels {Math.round(feelsLike)}°
        {(todayHigh !== undefined || todayLow !== undefined) && (
          <span className="text-almanac-parchment/40 ml-2">
            H:{Math.round(todayHigh ?? 0)}° L:{Math.round(todayLow ?? 0)}°
          </span>
        )}
      </p>

      {/* Wind & Humidity - single line */}
      {(windSpeed !== undefined || humidity !== undefined) && (
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-almanac-parchment/50">
          {windSpeed !== undefined && (
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              <span>
                {Math.round(windSpeed)} mph
                {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
              </span>
            </div>
          )}
          {humidity !== undefined && (
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              <span>{Math.round(humidity)}%</span>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
