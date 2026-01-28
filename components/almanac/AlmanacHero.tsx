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
    <section className="animate-fade-in-up text-center py-5 lg:py-6 h-full flex flex-col justify-center bg-white/5 border border-white/10 rounded-lg px-4">
      {/* Location */}
      <p className="text-xs uppercase tracking-widest text-gold-leaf mb-3">{location}</p>

      {/* Temperature with Icon */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="relative animate-bob">
          <Icon className="w-14 h-14 lg:w-16 lg:h-16 text-almanac-gold" />
          {(isSnowing || isIcy) && (
            <Snowflake className="w-5 h-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
          )}
        </div>
        <div className="text-[72px] lg:text-[80px] font-sans font-bold leading-none text-almanac-parchment">
          {Math.round(temperature)}°
        </div>
      </div>

      {/* Condition */}
      <p
        className={`text-xl font-medium ${
          isSnowing ? 'text-blue-300' : isIcy ? 'text-cyan-300' : 'text-almanac-parchment'
        }`}
      >
        {weather.condition}
      </p>

      {/* Feels Like */}
      <p className="text-sm text-almanac-parchment/60 mt-2">Feels like {Math.round(feelsLike)}°</p>

      {/* High / Low */}
      {(todayHigh !== undefined || todayLow !== undefined) && (
        <div className="flex items-center justify-center gap-3 mt-2 text-sm">
          <span className="text-almanac-parchment/70">
            H:{' '}
            <span className="text-almanac-parchment font-medium">
              {Math.round(todayHigh ?? 0)}°
            </span>
          </span>
          <span className="text-almanac-parchment/30">|</span>
          <span className="text-almanac-parchment/70">
            L:{' '}
            <span className="text-almanac-parchment font-medium">{Math.round(todayLow ?? 0)}°</span>
          </span>
        </div>
      )}

      {/* Wind & Humidity */}
      {(windSpeed !== undefined || humidity !== undefined) && (
        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-almanac-parchment/60">
          {windSpeed !== undefined && (
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4" />
              <span>
                {Math.round(windSpeed)} mph
                {windDirection !== undefined && ` ${getWindDirection(windDirection)}`}
              </span>
            </div>
          )}
          {humidity !== undefined && (
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4" />
              <span>{Math.round(humidity)}%</span>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
