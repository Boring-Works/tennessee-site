'use client'

import './almanac.css'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AlmanacHero } from '@/components/almanac/AlmanacHero'
import { FrontierSaying } from '@/components/almanac/FrontierSaying'
import { TaskScores } from '@/components/almanac/TaskScores'
import { WeatherDetails } from '@/components/almanac/WeatherDetails'
import { MoonPhase } from '@/components/almanac/MoonPhase'
import NativePulse from '@/components/almanac/NativePulse'
import LocationPicker from '@/components/almanac/LocationPicker'
import SoilTemperature from '@/components/almanac/SoilTemperature'
import PrecipitationRadar from '@/components/almanac/PrecipitationRadar'
import FrostAlert from '@/components/almanac/FrostAlert'
import { transformWeatherData } from '@/lib/almanac/weather'
import { calculateAllTaskScores, calculateNativePulse, type NativePulseResult } from '@/lib/almanac/taskScores'
import { getSaying } from '@/lib/almanac/sayings'
import { getMoonData, isDay } from '@/lib/almanac/moonPhase'
import { formatLocationName, type GeoLocation } from '@/lib/almanac/geocoding'
import { loadLocation } from '@/lib/almanac/storage'
import type { WeatherData, TaskScores as TaskScoresType, MoonData, WeatherMetrics } from '@/lib/almanac/types'

// Retry delays in milliseconds (exponential backoff: 1s, 2s, 4s)
const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3

export default function AlmanacPage() {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [taskScores, setTaskScores] = useState<TaskScoresType | null>(null)
  const [nativePulse, setNativePulse] = useState<NativePulseResult | null>(null)
  const [saying, setSaying] = useState<string>('')
  const [moon, setMoon] = useState<MoonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchWeather = useCallback(async (loc: GeoLocation, attempt = 0) => {
    try {
      setLoading(true)
      setRetryCount(attempt)

      const response = await fetch(`/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`)

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      // Check for API error response
      if (data.error) {
        throw new Error(data.error)
      }

      const weatherData = transformWeatherData(data)
      setWeather(weatherData)

      // Calculate task scores
      const now = new Date()
      const currentHour = now.getHours()
      const metrics: WeatherMetrics = {
        temperature: weatherData.current.temperature,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.windSpeed,
        windGusts: weatherData.current.windGusts,
        precipitation: weatherData.current.precipitation,
        precipProbability: weatherData.hourly.precipitationProbability[currentHour] || 0,
        feelsLike: weatherData.current.feelsLike,
        month: now.getMonth() + 1,
      }

      const scores = calculateAllTaskScores(weatherData)
      setTaskScores(scores)

      // Calculate NativePulse
      const pulse = calculateNativePulse(metrics)
      setNativePulse(pulse)

      // Get frontier saying
      const daylight = isDay(new Date(), loc.latitude, loc.longitude)
      const frontierSaying = getSaying(
        weatherData.current.weatherCode,
        weatherData.current.temperature,
        weatherData.current.windSpeed,
        daylight
      )
      setSaying(frontierSaying)

      // Get moon data
      const moonData = getMoonData()
      setMoon(moonData)

      setError(null)
      setRetryCount(0)
    } catch (err) {
      console.error('Weather fetch error:', err)

      // Retry with exponential backoff
      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
        await new Promise(resolve => setTimeout(resolve, delay))
        return fetchWeather(loc, attempt + 1)
      }

      // All retries exhausted
      setError('Unable to load weather data after multiple attempts. Please try again.')
      setRetryCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load saved location and fetch weather on mount
  useEffect(() => {
    const savedLocation = loadLocation()
    setLocation(savedLocation)
    fetchWeather(savedLocation)
  }, [fetchWeather])

  // Handle location change
  const handleLocationChange = useCallback((newLocation: GeoLocation) => {
    setLocation(newLocation)
    fetchWeather(newLocation)
  }, [fetchWeather])

  if (loading || !location) {
    return (
      <main className="min-h-screen bg-midnight text-almanac-parchment">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-center">
              <p className="text-sm uppercase tracking-widest text-gold-leaf mb-4">
                {retryCount > 0 ? `Retrying (${retryCount}/${MAX_RETRIES})...` : 'Loading...'}
              </p>
              <div className="text-[96px] font-sans font-bold leading-none text-almanac-parchment/30">
                --°
              </div>
              <p className="text-xl text-almanac-parchment/30 mt-2">
                {retryCount > 0 ? 'Connection interrupted, retrying...' : 'Fetching conditions...'}
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !weather || !taskScores || !moon || !nativePulse) {
    return (
      <main className="min-h-screen bg-midnight text-almanac-parchment">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-almanac-danger text-center">{error || 'Something went wrong'}</p>
            <button
              onClick={() => location && fetchWeather(location)}
              className="mt-4 px-4 py-2 bg-gold-leaf text-midnight rounded-sm font-semibold hover:bg-gold-leaf/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-midnight text-almanac-parchment">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Location Picker */}
        <div className="flex justify-center mb-4">
          <LocationPicker location={location} onLocationChange={handleLocationChange} />
        </div>

        {/* Hero: Temperature + Conditions */}
        <AlmanacHero
          temperature={weather.current.temperature}
          feelsLike={weather.current.feelsLike}
          weatherCode={weather.current.weatherCode}
          location={formatLocationName(location)}
        />

        {/* Frost Alert (if applicable) */}
        <FrostAlert
          temperature={weather.current.temperature}
          minTemperature={weather.daily.temperatureMin[0]}
          feelsLike={weather.current.feelsLike}
        />

        {/* The Frontier Saying (The 10% Joy) */}
        <FrontierSaying saying={saying} />

        {/* Task Scores (The 90% Utility) */}
        <TaskScores
          sower={taskScores.sower}
          shepherd={taskScores.shepherd}
          keeper={taskScores.keeper}
          builder={taskScores.builder}
        />

        {/* NativePulse - Seed Stratification Tracker */}
        <div className="py-6">
          <NativePulse pulse={nativePulse} />
        </div>

        {/* Soil Temperature */}
        <div className="pb-6">
          <SoilTemperature temperature={weather.current.soilTemperature} />
        </div>

        {/* Moon Phase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center py-6"
        >
          <MoonPhase moon={moon} />
        </motion.div>

        {/* Precipitation Radar */}
        <div className="py-6">
          <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
        </div>

        {/* Hourly + Daily Details */}
        <WeatherDetails hourly={weather.hourly} daily={weather.daily} />

        {/* Footer with Tennessee 250 Branding */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center py-8 border-t border-white/5 mt-8"
        >
          <p className="text-sm text-almanac-gold font-display">
            Weather for all of Tennessee—from where Tennessee began.
          </p>
          <p className="text-xs text-almanac-parchment/40 mt-3">
            Rocky Mount State Historic Site • Tennessee 250
          </p>
          <p className="text-xs text-almanac-parchment/30 mt-2">
            Weather data from Open-Meteo (CC-BY 4.0)
          </p>
        </motion.footer>
      </div>
    </main>
  )
}
