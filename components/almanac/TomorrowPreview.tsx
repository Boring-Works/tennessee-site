'use client'

import { motion } from 'framer-motion'
import { Calendar, Droplets, ThermometerSun, ThermometerSnowflake } from 'lucide-react'

interface TomorrowData {
  high: number
  low: number
  precipChance: number
  weatherCode: number
}

interface TomorrowPreviewProps {
  tomorrow: TomorrowData | null
}

function getWeatherEmoji(code: number): string {
  if ([0, 1].includes(code)) return 'clear'
  if ([2, 3].includes(code)) return 'partlyCloudy'
  if ([45, 48].includes(code)) return 'foggy'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy'
  if ([95, 96, 99].includes(code)) return 'stormy'
  return 'partlyCloudy'
}

function getWeatherIcon(type: string): string {
  switch (type) {
    case 'clear':
      return '☀️'
    case 'partlyCloudy':
      return '⛅'
    case 'foggy':
      return '🌫️'
    case 'rainy':
      return '🌧️'
    case 'snowy':
      return '❄️'
    case 'stormy':
      return '⛈️'
    default:
      return '🌤️'
  }
}

function getTomorrowOutlook(data: TomorrowData): { text: string; color: string } {
  if (data.precipChance > 60) {
    return { text: 'Rain likely — plan indoor work', color: 'text-blue-400' }
  }
  if (data.high > 90) {
    return { text: 'Hot — work early or late', color: 'text-orange-400' }
  }
  if (data.low < 32) {
    return { text: 'Frost risk — protect plants', color: 'text-cyan-400' }
  }
  if (data.precipChance < 20 && data.high > 50 && data.high < 85) {
    return { text: 'Good conditions expected', color: 'text-almanac-success' }
  }
  return { text: 'Fair conditions expected', color: 'text-almanac-parchment/70' }
}

export default function TomorrowPreview({ tomorrow }: TomorrowPreviewProps) {
  if (!tomorrow) return null

  const outlook = getTomorrowOutlook(tomorrow)
  const weatherType = getWeatherEmoji(tomorrow.weatherCode)
  const emoji = getWeatherIcon(weatherType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-gold">Tomorrow at a Glance</h3>
      </div>

      <div className="flex items-center justify-between">
        {/* Weather summary */}
        <div className="flex items-center gap-4">
          <span className="text-2xl">{emoji}</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-almanac-parchment/80">
              <ThermometerSun className="w-3.5 h-3.5 text-orange-400" />
              {Math.round(tomorrow.high)}°
            </span>
            <span className="flex items-center gap-1 text-almanac-parchment/60">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-400" />
              {Math.round(tomorrow.low)}°
            </span>
            {tomorrow.precipChance > 0 && (
              <span className="flex items-center gap-1 text-almanac-parchment/60">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                {tomorrow.precipChance}%
              </span>
            )}
          </div>
        </div>

        {/* Outlook */}
        <p className={`text-xs ${outlook.color}`}>{outlook.text}</p>
      </div>
    </motion.div>
  )
}
