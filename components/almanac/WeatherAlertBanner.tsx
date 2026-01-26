'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Snowflake, CloudRain, Thermometer, X } from 'lucide-react'
import { useState } from 'react'
import type { DailyForecast } from '@/lib/almanac/types'
import { isSnowCode, isIceCode } from '@/lib/almanac/types'

interface WeatherAlertBannerProps {
  daily: DailyForecast
  currentTemp: number
}

interface Alert {
  type: 'snow' | 'ice' | 'rain' | 'cold' | 'heat'
  severity: 'warning' | 'danger'
  title: string
  message: string
  day: string
}

/**
 * Parse date string to get year, month, day components
 */
function getDateComponents(dateString: string): { year: number; month: number; day: number } {
  const datePart = dateString.split('T')[0]
  const [year, month, day] = datePart.split('-').map(Number)
  return { year, month, day }
}

/**
 * Check if a date string represents today
 */
function isDateToday(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const now = new Date()
  return year === now.getFullYear() && 
         month === (now.getMonth() + 1) && 
         day === now.getDate()
}

/**
 * Check if a date string represents tomorrow
 */
function isDateTomorrow(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return year === tomorrow.getFullYear() && 
         month === (tomorrow.getMonth() + 1) && 
         day === tomorrow.getDate()
}

/**
 * Get weekday name from date string
 */
function getWeekdayName(dateString: string): string {
  const { year, month, day } = getDateComponents(dateString)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

/**
 * Find index of today in the daily array
 */
function findTodayIndex(dailyTimes: string[]): number {
  for (let i = 0; i < dailyTimes.length; i++) {
    if (isDateToday(dailyTimes[i])) {
      return i
    }
  }
  // Fallback: find first future date
  const now = new Date()
  const todayNum = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  
  for (let i = 0; i < dailyTimes.length; i++) {
    const { year, month, day } = getDateComponents(dailyTimes[i])
    const dateNum = year * 10000 + month * 100 + day
    if (dateNum >= todayNum) {
      return i
    }
  }
  return 0
}

function analyzeForecasAlerts(daily: DailyForecast, currentTemp: number): Alert[] {
  const alerts: Alert[] = []
  
  // Find today's index (skip past days)
  const todayIndex = findTodayIndex(daily.time)
  
  // Check next 3 days starting from TODAY
  for (let offset = 0; offset < 3; offset++) {
    const i = todayIndex + offset
    if (i >= daily.time.length) break
    
    const code = daily.weatherCode[i]
    const precipProb = daily.precipitationProbability[i]
    const minTemp = daily.temperatureMin[i]
    const snowfall = daily.snowfallSum?.[i] || 0
    const dateStr = daily.time[i]
    
    let dayName: string
    if (isDateToday(dateStr)) {
      dayName = 'Today'
    } else if (isDateTomorrow(dateStr)) {
      dayName = 'Tomorrow'
    } else {
      dayName = getWeekdayName(dateStr)
    }
    
    // Snow alerts
    if (isSnowCode(code) && precipProb >= 50) {
      const severity = (precipProb >= 70 || snowfall >= 2) ? 'danger' : 'warning'
      alerts.push({
        type: 'snow',
        severity,
        title: severity === 'danger' ? 'Winter Storm' : 'Snow Expected',
        message: snowfall >= 1 
          ? `${dayName}: ${snowfall.toFixed(1)}" of snow expected (${precipProb}% chance)`
          : `${dayName}: Snow likely (${precipProb}% chance)`,
        day: dayName,
      })
    }
    
    // Ice alerts (highest priority)
    if (isIceCode(code) && precipProb >= 40) {
      alerts.push({
        type: 'ice',
        severity: 'danger',
        title: 'Ice Storm Warning',
        message: `${dayName}: Freezing rain expected. Dangerous travel conditions.`,
        day: dayName,
      })
    }
    
    // Heavy rain
    if (!isSnowCode(code) && !isIceCode(code) && precipProb >= 80) {
      alerts.push({
        type: 'rain',
        severity: 'warning',
        title: 'Heavy Rain',
        message: `${dayName}: High chance of rain (${precipProb}%)`,
        day: dayName,
      })
    }
    
    // Extreme cold
    if (minTemp <= 10) {
      alerts.push({
        type: 'cold',
        severity: 'danger',
        title: 'Extreme Cold',
        message: `${dayName}: Low of ${Math.round(minTemp)}°F. Protect pipes and pets.`,
        day: dayName,
      })
    } else if (minTemp <= 20 && offset <= 1) {
      alerts.push({
        type: 'cold',
        severity: 'warning',
        title: 'Hard Freeze',
        message: `${dayName}: Low of ${Math.round(minTemp)}°F expected.`,
        day: dayName,
      })
    }
  }
  
  // Dedupe by type (keep most severe)
  const deduped = new Map<string, Alert>()
  for (const alert of alerts) {
    const existing = deduped.get(alert.type)
    if (!existing || (alert.severity === 'danger' && existing.severity === 'warning')) {
      deduped.set(alert.type, alert)
    }
  }
  
  return Array.from(deduped.values()).slice(0, 3)
}

const iconMap = {
  snow: Snowflake,
  ice: Snowflake,
  rain: CloudRain,
  cold: Thermometer,
  heat: Thermometer,
}

const colorMap = {
  danger: {
    bg: 'bg-red-900/40 border-red-500/50',
    text: 'text-red-300',
    icon: 'text-red-400',
  },
  warning: {
    bg: 'bg-orange-900/30 border-orange-500/40',
    text: 'text-orange-300',
    icon: 'text-orange-400',
  },
}

export default function WeatherAlertBanner({ daily, currentTemp }: WeatherAlertBannerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  
  const alerts = analyzeForecasAlerts(daily, currentTemp)
  const visibleAlerts = alerts.filter(a => !dismissed.has(a.type))
  
  if (visibleAlerts.length === 0) return null
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2 mb-6"
    >
      <AnimatePresence>
        {visibleAlerts.map((alert) => {
          const Icon = iconMap[alert.type]
          const colors = colorMap[alert.severity]
          
          return (
            <motion.div
              key={alert.type}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`rounded-lg border p-3 ${colors.bg}`}
              role="alert"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {alert.severity === 'danger' ? (
                    <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
                  ) : (
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${colors.text}`}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-almanac-parchment/80 mt-0.5">
                    {alert.message}
                  </p>
                </div>
                <button
                  onClick={() => setDismissed(prev => new Set([...prev, alert.type]))}
                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4 text-almanac-parchment/50" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}
