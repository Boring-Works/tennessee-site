'use client'

import { motion } from 'framer-motion'
import type { HourlyForecast, DailyForecast } from '@/lib/almanac/types'
import { getWeatherInfo } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'

interface WeatherDetailsProps {
  hourly: HourlyForecast
  daily: DailyForecast
}

/**
 * Parse ISO date string (YYYY-MM-DD) as local date, not UTC
 * Fixes timezone bug where "2026-01-25" becomes Jan 24 in EST
 */
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function WeatherDetails({ hourly, daily }: WeatherDetailsProps) {
  // Get next 12 hours with bounds checking
  const now = new Date()
  const currentHour = now.getHours()
  const availableHours = Math.min(12, hourly.time.length - currentHour)
  const next12Hours = hourly.time.slice(currentHour, currentHour + availableHours)

  return (
    <section className="py-8">
      {/* Hourly */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-serif text-xl text-gold-leaf mb-4">Next 12 Hours</h3>
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
          {next12Hours.map((time, i) => {
            const idx = currentHour + i
            // Bounds check for array access
            const temp = hourly.temperature[idx]
            const precipProb = hourly.precipitationProbability[idx]
            const weatherCode = hourly.weatherCode[idx]

            if (temp === undefined) return null

            const hour = new Date(time).getHours()
            const displayHour =
              hour === 0
                ? '12a'
                : hour < 12
                ? `${hour}a`
                : hour === 12
                ? '12p'
                : `${hour - 12}p`
            const HourIcon = getWeatherIcon(weatherCode)

            return (
              <div
                key={time}
                className="flex-shrink-0 bg-white/5 border border-white/10 rounded-sm p-3 text-center min-w-[70px]"
              >
                <p className="text-xs text-almanac-parchment/50">{displayHour}</p>
                <HourIcon className="w-5 h-5 text-almanac-gold/80 mx-auto my-1" />
                <p className="text-lg font-sans font-bold text-almanac-parchment">
                  {Math.round(temp)}°
                </p>
                <p className="text-xs text-almanac-parchment/50">
                  {precipProb ?? 0}%
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* 7-Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-serif text-xl text-gold-leaf mb-4 mt-8">7-Day Outlook</h3>
        <div className="space-y-2">
          {daily.time.map((time, i) => {
            // Use parseLocalDate to avoid UTC timezone shift
            const date = parseLocalDate(time)
            const dayName =
              i === 0
                ? 'Today'
                : date.toLocaleDateString('en-US', { weekday: 'short' })
            const weather = getWeatherInfo(daily.weatherCode[i])
            const DayIcon = getWeatherIcon(daily.weatherCode[i])

            return (
              <div
                key={time}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-sm p-3"
              >
                <span className="text-almanac-parchment w-16">{dayName}</span>
                <DayIcon className="w-5 h-5 text-almanac-gold/80" />
                <span className="text-almanac-parchment/70 text-sm flex-1 text-center">
                  {weather.condition}
                </span>
                <span className="text-almanac-parchment/50 text-sm w-12 text-right">
                  {daily.precipitationProbability[i]}%
                </span>
                <span className="text-almanac-parchment font-sans font-bold w-24 text-right">
                  {Math.round(daily.temperatureMax[i])}° / {Math.round(daily.temperatureMin[i])}°
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
