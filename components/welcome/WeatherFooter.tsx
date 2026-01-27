'use client'

import { useEffect, useState } from 'react'
import { getConditionText, getWeatherIcon } from '@/lib/weather-helpers/weatherUtils'

interface WeatherData {
  temp: number
  code: number
  high: number
  low: number
}

export function WeatherFooter() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Rocky Mount: 200 Hyder Hill Road, Piney Flats, TN 37686
    const lat = 36.4539
    const lon = -82.3109

    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        })
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="weather-footer weather-footer--loading" aria-live="polite">
        <span className="weather-text">Loading conditions...</span>
      </div>
    )
  }

  // Error state - hide gracefully
  if (error || !weather) {
    return null
  }

  const condition = getConditionText(weather.code)
  const icon = getWeatherIcon(weather.code)

  return (
    <div
      className="weather-footer"
      aria-label={`Current weather: ${weather.temp} degrees Fahrenheit, ${condition}`}
    >
      <span className="weather-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="weather-text">
        Sullivan County &bull; {weather.temp}&deg;F &bull; {condition}
      </span>
      <span className="weather-hilo">
        H: {weather.high}&deg; / L: {weather.low}&deg;
      </span>
    </div>
  )
}
