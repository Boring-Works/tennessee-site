'use client'

import './almanac.css'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { WeatherAtmosphere } from '@/components/almanac/WeatherAtmosphere'
import { AlmanacHero } from '@/components/almanac/AlmanacHero'
import { FrontierSaying } from '@/components/almanac/FrontierSaying'
import { TaskScores } from '@/components/almanac/TaskScores'
import { WeatherDetails } from '@/components/almanac/WeatherDetails'
import { MoonPhase } from '@/components/almanac/MoonPhase'
import NativePulse from '@/components/almanac/NativePulse'
import LocationPicker from '@/components/almanac/LocationPicker'
import SoilTemperature from '@/components/almanac/SoilTemperature'
import PrecipitationRadar from '@/components/almanac/PrecipitationRadar'
import WeatherAlertBanner from '@/components/almanac/WeatherAlertBanner'
import CurrentConditionsCard from '@/components/almanac/CurrentConditionsCard'
import SnowConditions from '@/components/almanac/SnowConditions'
import SunBarometer from '@/components/almanac/SunBarometer'
import AboutModal from '@/components/almanac/AboutModal'
import StaleDataWarning from '@/components/almanac/StaleDataWarning'
import OnboardingModal from '@/components/almanac/OnboardingModal'
import TomorrowPreview from '@/components/almanac/TomorrowPreview'
import RotatingHook from '@/components/almanac/RotatingHook'
import PresentedByBlock from '@/components/almanac/PresentedByBlock'
import { transformWeatherData } from '@/lib/almanac/weather'
import {
  calculateAllTaskScores,
  calculateNativePulse,
  buildExtendedMetrics,
  type NativePulseResult,
} from '@/lib/almanac/taskScores'
import { findTodayDailyIndex } from '@/lib/almanac/dateUtils'
import { getDualSaying, type DualSaying } from '@/lib/almanac/sayings'
import { getMoonData, isDay } from '@/lib/almanac/moonPhase'
import { formatLocationName, type GeoLocation } from '@/lib/almanac/geocoding'
import { loadLocation } from '@/lib/almanac/storage'
import { logger } from '@/lib/logger'
import type { WeatherData, TaskScores as TaskScoresType, MoonData } from '@/lib/almanac/types'

const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3

export default function AlmanacPage() {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [taskScores, setTaskScores] = useState<TaskScoresType | null>(null)
  const [nativePulse, setNativePulse] = useState<NativePulseResult | null>(null)
  const [saying, setSaying] = useState<DualSaying | null>(null)
  const [moon, setMoon] = useState<MoonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchWeather = useCallback(async (loc: GeoLocation, attempt = 0) => {
    try {
      setLoading(true)
      setRetryCount(attempt)

      const response = await fetch(`/api/weather?lat=${loc.latitude}&lon=${loc.longitude}`)

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const weatherData = transformWeatherData(data)
      setWeather(weatherData)

      const metrics = buildExtendedMetrics(weatherData)
      const scores = calculateAllTaskScores(weatherData)
      setTaskScores(scores)

      const pulse = calculateNativePulse(metrics)
      setNativePulse(pulse)

      const daylight = isDay(new Date(), loc.latitude, loc.longitude)
      const dualSaying = getDualSaying(
        weatherData.current.weatherCode,
        weatherData.current.temperature,
        weatherData.current.windSpeed,
        daylight
      )
      setSaying(dualSaying)

      const moonData = getMoonData()
      setMoon(moonData)

      setLastUpdated(new Date())
      setError(null)
      setRetryCount(0)
    } catch (err) {
      logger.error('Weather fetch error:', err)

      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchWeather(loc, attempt + 1)
      }

      setError('Unable to load weather data after multiple attempts. Please try again.')
      setRetryCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const savedLocation = loadLocation()
    setLocation(savedLocation)
    fetchWeather(savedLocation)
  }, [fetchWeather])

  const handleLocationChange = useCallback(
    (newLocation: GeoLocation) => {
      setLocation(newLocation)
      fetchWeather(newLocation)
    },
    [fetchWeather]
  )

  // Find today's index in the daily array (memoized) - uses centralized utility
  const todayIndex = useMemo(() => {
    if (!weather) return 0
    return findTodayDailyIndex(weather.daily.time)
  }, [weather])

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

  // Use todayIndex to get TODAY's data, not past days
  const todayHigh = weather.daily.temperatureMax[todayIndex]
  const todayLow = weather.daily.temperatureMin[todayIndex]
  const todaySunrise = weather.daily.sunrise[todayIndex]
  const todaySunset = weather.daily.sunset[todayIndex]

  // Tomorrow's preview data
  const tomorrowData =
    todayIndex !== -1 && weather.daily.time[todayIndex + 1]
      ? {
          high: weather.daily.temperatureMax[todayIndex + 1],
          low: weather.daily.temperatureMin[todayIndex + 1],
          precipChance: weather.daily.precipitationProbability?.[todayIndex + 1] || 0,
          weatherCode: weather.daily.weatherCode[todayIndex + 1],
        }
      : null

  return (
    <div className="min-h-screen bg-midnight">
      <WeatherAtmosphere weatherCode={weather.current.weatherCode} />
      <main className="min-h-screen text-almanac-parchment relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Masthead */}
          <header className="text-center mb-6">
            <h1 className="font-serif text-2xl md:text-3xl text-almanac-gold tracking-wide uppercase">
              The 1775 Almanac
            </h1>
            <p className="text-sm text-almanac-parchment/70 mt-1 tracking-wide">
              Rocky Mount State Historic Site
            </p>
            <div className="mt-3">
              <RotatingHook />
            </div>
            <div className="mt-2">
              <AboutModal />
            </div>
          </header>

          {/* Location Picker */}
          <div className="flex justify-center mb-4">
            <LocationPicker location={location} onLocationChange={handleLocationChange} />
          </div>

          {/* Stale Data Warning */}
          <StaleDataWarning
            lastUpdated={lastUpdated}
            onRefresh={() => location && fetchWeather(location)}
            isLoading={loading}
          />

          {/* Weather Alert Banner - TOP PRIORITY */}
          <WeatherAlertBanner daily={weather.daily} currentTemp={weather.current.temperature} />

          {/* Hero: Temperature + Conditions */}
          <AlmanacHero
            temperature={weather.current.temperature}
            feelsLike={weather.current.feelsLike}
            weatherCode={weather.current.weatherCode}
            location={formatLocationName(location)}
            windSpeed={weather.current.windSpeed}
            humidity={weather.current.humidity}
            todayHigh={todayHigh}
            todayLow={todayLow}
          />

          {/* The Frontier Saying */}
          {saying && (
            <FrontierSaying
              saying={saying.frontier}
              modernLine={saying.modern}
              temperature={weather.current.temperature}
              location={formatLocationName(location)}
            />
          )}

          {/* Tomorrow Preview */}
          <TomorrowPreview tomorrow={tomorrowData} />

          {/* Snow Conditions - shows only when snow present */}
          <div className="py-2">
            <SnowConditions
              snowDepth={weather.current.snowDepth}
              currentTemp={weather.current.temperature}
              weatherCode={weather.current.weatherCode}
            />
          </div>

          {/* Current Conditions Detail Card */}
          <div className="py-2">
            <CurrentConditionsCard
              cloudCover={weather.current.cloudCover}
              visibility={weather.current.visibility}
              dewPoint={weather.current.dewPoint}
              uvIndex={weather.current.uvIndex}
              pressure={weather.current.pressure}
              snowDepth={weather.current.snowDepth}
              windGusts={weather.current.windGusts}
            />
          </div>

          {/* Task Scores - Main Utility */}
          <TaskScores
            sower={taskScores.sower}
            shepherd={taskScores.shepherd}
            keeper={taskScores.keeper}
            builder={taskScores.builder}
          />

          {/* NativePulse - Seed Stratification */}
          <div className="py-6">
            <NativePulse pulse={nativePulse} />
          </div>

          {/* Two-column: Soil Temp + Sun/Barometer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
            <SoilTemperature temperature={weather.current.soilTemperature} />
            <SunBarometer
              sunrise={todaySunrise}
              sunset={todaySunset}
              pressure={weather.current.pressure}
              windSpeed={weather.current.windSpeed}
              windDirection={weather.current.windDirection}
            />
          </div>

          {/* Two-column: Moon + Radar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <MoonPhase moon={moon} />
            <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
          </div>

          {/* Hourly + Daily Details */}
          <WeatherDetails hourly={weather.hourly} daily={weather.daily} />

          {/* Footer */}
          <PresentedByBlock lastUpdated={lastUpdated} />

          {/* First-visit Onboarding */}
          <OnboardingModal />
        </div>
      </main>
    </div>
  )
}
