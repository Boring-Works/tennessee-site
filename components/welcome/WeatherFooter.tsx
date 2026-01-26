'use client'

import { useEffect, useState } from 'react'

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

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=1`
    )
      .then(res => {
        if (!res.ok) throw new Error('Weather fetch failed')
        return res.json()
      })
      .then(data => {
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
    <div className="weather-footer" aria-label={`Current weather: ${weather.temp} degrees Fahrenheit, ${condition}`}>
      <span className="weather-icon" aria-hidden="true">{icon}</span>
      <span className="weather-text">
        Sullivan County &bull; {weather.temp}&deg;F &bull; {condition}
      </span>
      <span className="weather-hilo">
        H: {weather.high}&deg; / L: {weather.low}&deg;
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
  if (code === 0) return '\u2600\uFE0F' // ☀️
  if (code <= 3) return '\u26C5' // ⛅
  if (code <= 49) return '\uD83C\uDF2B\uFE0F' // 🌫️
  if (code <= 59) return '\uD83C\uDF26\uFE0F' // 🌦️
  if (code <= 69) return '\uD83C\uDF27\uFE0F' // 🌧️
  if (code <= 79) return '\uD83C\uDF28\uFE0F' // 🌨️
  if (code <= 82) return '\uD83C\uDF27\uFE0F' // 🌧️
  if (code <= 99) return '\u26C8\uFE0F' // ⛈️
  return '\uD83C\uDF24\uFE0F' // 🌤️
}
