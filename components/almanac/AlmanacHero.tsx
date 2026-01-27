'use client'

// getWeatherIcon returns a reference to an existing Lucide component, not a new component
// The linter incorrectly flags this as "component creation during render"
/* eslint-disable react-hooks/static-components */

import { motion } from 'framer-motion'
import { getWeatherInfo, isSnowCode, isIceCode } from '@/lib/almanac/types'
import { getWeatherIcon } from '@/lib/almanac/weatherIcons'
import { Wind, Droplets, Snowflake } from 'lucide-react'

interface AlmanacHeroProps {
  temperature: number
  feelsLike: number
  weatherCode: number
  location: string
  windSpeed?: number
  humidity?: number
  todayHigh?: number
  todayLow?: number
}

export function AlmanacHero({
  temperature,
  feelsLike,
  weatherCode,
  location,
  windSpeed,
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
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 h-full flex flex-col justify-center bg-white/5 border border-white/10 rounded-lg"
    >
      {/* Location */}
      <p className="text-sm uppercase tracking-widest text-gold-leaf mb-4">{location}</p>

      {/* Temperature with Icon */}
      <div className="flex items-center justify-center gap-4">
        <motion.div
          className="relative"
          animate={{
            y: [0, -3, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <Icon className="w-16 h-16 text-almanac-gold" />
          {/* Snow/Ice indicator */}
          {(isSnowing || isIcy) && (
            <Snowflake className="w-6 h-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
          )}
        </motion.div>
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
              <span>{Math.round(windSpeed)} mph</span>
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
    </motion.section>
  )
}
