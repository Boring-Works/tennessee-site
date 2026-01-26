'use client'

import { motion } from 'framer-motion'
import { WEATHER_CODES } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'

interface AlmanacHeroProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  location: string
}

export function AlmanacHero({ temperature, feelsLike, weatherCode, location }: AlmanacHeroProps) {
  const weather = WEATHER_CODES[weatherCode] || WEATHER_CODES[0]
  const WeatherIcon = getWeatherIcon(weatherCode)

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      {/* Location */}
      <p className="text-sm uppercase tracking-widest text-gold-leaf mb-4">
        {location}
      </p>

      {/* Temperature with Icon */}
      <div className="flex items-center justify-center gap-4">
        <WeatherIcon className="w-16 h-16 text-almanac-gold" />
        <div className="text-[96px] font-sans font-bold leading-none text-almanac-parchment">
          {Math.round(temperature)}°
        </div>
      </div>

      {/* Condition */}
      <p className="text-xl text-almanac-parchment/70 mt-2">
        {weather.condition}
      </p>

      {/* Feels Like */}
      <p className="text-sm text-almanac-parchment/50 mt-1">
        Feels like {Math.round(feelsLike)}°
      </p>
    </motion.section>
  )
}
