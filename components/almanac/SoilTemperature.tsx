'use client'

import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'

interface SoilTemperatureProps {
  temperature: number | undefined
}

function getSoilStatus(temp: number): { status: string; color: string; tip: string } {
  if (temp < 40) {
    return {
      status: 'Too Cold',
      color: 'text-blue-400',
      tip: 'Soil is too cold for most seeds. Wait for warmer conditions.',
    }
  }
  if (temp < 50) {
    return {
      status: 'Cool',
      color: 'text-cyan-400',
      tip: 'Cool-season crops (lettuce, peas, spinach) can be planted.',
    }
  }
  if (temp < 60) {
    return {
      status: 'Warming',
      color: 'text-yellow-400',
      tip: 'Soil is warming. Good for beans, corn, and most vegetables.',
    }
  }
  if (temp < 70) {
    return {
      status: 'Ideal',
      color: 'text-green-400',
      tip: 'Prime planting conditions for warm-season crops.',
    }
  }
  if (temp < 85) {
    return {
      status: 'Warm',
      color: 'text-orange-400',
      tip: 'Good for heat-loving crops like peppers, melons, squash.',
    }
  }
  return {
    status: 'Hot',
    color: 'text-red-400',
    tip: 'Soil is hot. Mulch to retain moisture. Water deeply.',
  }
}

export default function SoilTemperature({ temperature }: SoilTemperatureProps) {
  if (temperature === undefined) {
    return null
  }

  const { status, color, tip } = getSoilStatus(temperature)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-almanac-gold/10">
          <Sprout className="w-6 h-6 text-almanac-gold" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-almanac-parchment">
              {Math.round(temperature)}°F
            </span>
            <span className={`text-sm font-medium ${color}`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-almanac-parchment/60">
            Soil Temperature (6" depth)
          </p>
        </div>
      </div>
      <p className="text-sm text-almanac-parchment/70 mt-3 pl-15">
        {tip}
      </p>
    </motion.div>
  )
}
