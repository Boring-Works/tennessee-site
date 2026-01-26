'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

export function WeatherHeader() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lat = 36.4539
    const lon = -82.3109

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then((data) => {
        const code = data.current.weather_code
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getConditionText(code),
          icon: getWeatherIcon(code),
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  // Don't render anything while loading or on error
  if (loading || !weather) {
    return (
      <div className="weather-header weather-header--loading">
        <span className="weather-text">Sullivan County, Tennessee</span>
      </div>
    )
  }

  return (
    <div className="weather-header">
      <span className="weather-icon" aria-hidden="true">
        {weather.icon}
      </span>
      <span className="weather-text">
        Sullivan County, Tennessee · {weather.temp}°F · {weather.condition}
      </span>
    </div>
  )
}

function getConditionText(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rainy'
  if (code <= 79) return 'Snowy'
  if (code <= 82) return 'Showers'
  if (code <= 99) return 'Stormy'
  return 'Fair'
}

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 49) return '🌫️'
  if (code <= 59) return '🌦️'
  if (code <= 69) return '🌧️'
  if (code <= 79) return '🌨️'
  if (code <= 82) return '🌧️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}
