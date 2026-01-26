'use client'

import { useEffect, useState } from 'react'

interface SkyGradientProps {
  weatherCode: number
  children: React.ReactNode
}

type TimePeriod = 'night' | 'dawn' | 'day' | 'dusk'
type WeatherType = 'clear' | 'cloudy' | 'rain'

// 1775 Oil Painting Palette - muted, desaturated, aged varnish
const SKY_COLORS = {
  clear: {
    night: { top: '#0A1628', bottom: '#1a2a4a' },
    dawn: { top: '#2a1a1a', bottom: '#4a3a2a' },
    day: { top: '#1a2a3a', bottom: '#3a3a2a' },
    dusk: { top: '#2a1a2a', bottom: '#4a2a1a' },
  },
  cloudy: {
    night: { top: '#0a0f18', bottom: '#141a24' },
    dawn: { top: '#1f1818', bottom: '#3a3028' },
    day: { top: '#1a1f24', bottom: '#2a2a28' },
    dusk: { top: '#1f1820', bottom: '#3a2820' },
  },
  rain: {
    night: { top: '#08080c', bottom: '#101014' },
    dawn: { top: '#141214', bottom: '#24201c' },
    day: { top: '#14181c', bottom: '#1e2024' },
    dusk: { top: '#141218', bottom: '#201c1c' },
  },
}

function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 20 || hour < 5) return 'night'
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 17) return 'day'
  return 'dusk' // 17-20
}

function getWeatherType(code: number): WeatherType {
  // Clear
  if (code === 0) return 'clear'
  // Partly cloudy or fog
  if ((code >= 1 && code <= 3) || (code >= 45 && code <= 48)) return 'cloudy'
  // Rain, drizzle, snow, storm (51-99)
  if (code >= 51) return 'rain'
  // Default to clear for unknown codes
  return 'clear'
}

export function SkyGradient({ weatherCode, children }: SkyGradientProps) {
  const [colors, setColors] = useState({ top: '#0A1628', bottom: '#1a2a4a' })

  useEffect(() => {
    const updateColors = () => {
      const hour = new Date().getHours()
      const timePeriod = getTimePeriod(hour)
      const weatherType = getWeatherType(weatherCode)
      const newColors = SKY_COLORS[weatherType][timePeriod]
      setColors(newColors)
    }

    // Update immediately
    updateColors()

    // Update every minute to catch time changes
    const interval = setInterval(updateColors, 60000)

    return () => clearInterval(interval)
  }, [weatherCode])

  return (
    <div className="sky-gradient-wrapper">
      <div
        className="sky-gradient"
        style={{
          '--sky-top': colors.top,
          '--sky-bottom': colors.bottom,
        } as React.CSSProperties}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
