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
import FarmerMemory from '@/components/almanac/FarmerMemory'
import LocationPicker from '@/components/almanac/LocationPicker'
import PlantingIntelligence from '@/components/almanac/PlantingIntelligence'
import EnvironmentalWatch from '@/components/almanac/EnvironmentalWatch'
import PrecipitationRadar from '@/components/almanac/PrecipitationRadar'
import NWSAlertBanner from '@/components/almanac/NWSAlertBanner'
import BurnDayIndicator from '@/components/almanac/BurnDayIndicator'
import LightningWatch from '@/components/almanac/LightningWatch'
import AirQualityCard from '@/components/almanac/AirQualityCard'
import HourlySparkline from '@/components/almanac/HourlySparkline'
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
  const [aqi, setAqi] = useState<number | null>(null)

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

  // Find today's index in the daily array (memoized)
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

  // Use todayIndex to get TODAY's data
  const todayHigh = weather.daily.temperatureMax[todayIndex]
  const todayLow = weather.daily.temperatureMin[todayIndex]
  const todaySunrise = weather.daily.sunrise[todayIndex]
  const todaySunset = weather.daily.sunset[todayIndex]

  // Pressure trend - currently defaulting to steady
  // TODO: Add hourly pressure to API if available for trend calculation
  const pressureTrend: 'rising' | 'falling' | 'steady' = 'steady'

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
      <main id="main-content" className="min-h-screen text-almanac-parchment relative z-10">
        {/* Container: mobile narrow, desktop wide */}
        <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
          {/* ============================================================
              ALERTS - Full width, always at top (safety first)
              ============================================================ */}
          <NWSAlertBanner lat={location.latitude} lon={location.longitude} />
          <LightningWatch lat={location.latitude} lon={location.longitude} />

          {/* ============================================================
              HEADER - Compact on desktop to maximize content space
              ============================================================ */}
          <header className="text-center mb-4 lg:mb-6">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-almanac-gold tracking-wide uppercase">
              The 1775 Almanac
            </h1>
            <p className="text-sm text-almanac-parchment/70 mt-1 tracking-wide">
              Rocky Mount State Historic Site
            </p>
            <div className="mt-2 lg:mt-3 flex items-center justify-center gap-3">
              <RotatingHook />
              <AboutModal />
            </div>
          </header>

          {/* Location + Stale Warning */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            <LocationPicker location={location} onLocationChange={handleLocationChange} />
            <StaleDataWarning
              lastUpdated={lastUpdated}
              onRefresh={() => location && fetchWeather(location)}
              isLoading={loading}
            />
          </div>

          {/* ============================================================
              MOBILE LAYOUT: Single column, priority order
              Follows spec: Hero → Tomorrow → Proverb → Burn Day → Sparkline → Scores...
              ============================================================ */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* Hero */}
            <AlmanacHero
              temperature={weather.current.temperature}
              feelsLike={weather.current.feelsLike}
              weatherCode={weather.current.weatherCode}
              location={formatLocationName(location)}
              windSpeed={weather.current.windSpeed}
              windDirection={weather.current.windDirection}
              humidity={weather.current.humidity}
              todayHigh={todayHigh}
              todayLow={todayLow}
              sunrise={todaySunrise}
              sunset={todaySunset}
              pressure={weather.current.pressure}
              pressureTrend={pressureTrend}
              uvIndex={weather.current.uvIndex}
            />

            {/* Tomorrow Preview */}
            <TomorrowPreview tomorrow={tomorrowData} />

            {/* Frontier Proverb */}
            {saying && (
              <FrontierSaying
                saying={saying.frontier}
                modernLine={saying.modern}
                temperature={weather.current.temperature}
                location={formatLocationName(location)}
              />
            )}

            {/* Burn Day */}
            <BurnDayIndicator lat={location.latitude} lon={location.longitude} />

            {/* Hourly Sparkline */}
            <HourlySparkline hourly={weather.hourly} />

            {/* Workability Scores - 2x2 grid on mobile */}
            <TaskScores
              sower={taskScores.sower}
              shepherd={taskScores.shepherd}
              keeper={taskScores.keeper}
              builder={taskScores.builder}
              aqi={aqi}
            />

            {/* Air Quality */}
            <AirQualityCard lat={location.latitude} lon={location.longitude} onAqiChange={setAqi} />

            {/* Planting Intelligence */}
            <PlantingIntelligence
              temperature={weather.current.temperature}
              humidity={weather.current.humidity}
              soilTemperature={weather.current.soilTemperature}
              tempHigh={todayHigh}
              tempLow={todayLow}
            />

            {/* Farmer's Memory */}
            <FarmerMemory
              temperature={weather.current.temperature}
              humidity={weather.current.humidity}
              pressure={weather.current.pressure}
              windSpeed={weather.current.windSpeed}
              todayHigh={todayHigh}
              todayLow={todayLow}
            />

            {/* Native Pulse */}
            <NativePulse pulse={nativePulse} />

            {/* Environmental Watch */}
            <EnvironmentalWatch lat={location.latitude} lon={location.longitude} />

            {/* Sun & Atmosphere */}
            <div className="grid grid-cols-2 gap-4">
              <SunBarometer
                sunrise={todaySunrise}
                sunset={todaySunset}
                pressure={weather.current.pressure}
                windSpeed={weather.current.windSpeed}
                windDirection={weather.current.windDirection}
              />
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

            {/* Moon & Radar */}
            <div className="grid grid-cols-2 gap-4">
              <MoonPhase moon={moon} />
              <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
            </div>

            {/* 7-Day Forecast */}
            <WeatherDetails daily={weather.daily} />

            {/* Snow (conditional) */}
            {weather.current.snowDepth && weather.current.snowDepth > 0 && (
              <SnowConditions
                snowDepth={weather.current.snowDepth}
                currentTemp={weather.current.temperature}
                weatherCode={weather.current.weatherCode}
              />
            )}
          </div>

          {/* ============================================================
              DESKTOP LAYOUT: 12-column Bento Grid
              "Zero-scroll hero" philosophy - most important info visible immediately

              ROW 1-2: [Hero 4 cols, 2 rows] [Sparkline 5 cols, 2 rows] [Farmer's Memory 3 cols, 2 rows]
              ROW 3:   [Tomorrow 3] [Burn 3] [AQI 3] [Proverb 3]
              ROW 4:   [Workability Scores 12 cols]
              ROW 5:   [Planting Intelligence 5] [7-Day Forecast 7]
              ROW 6:   [Moon 3] [Current Conditions 5] [Sun/Barometer 4]
              ROW 7:   [Environmental Watch 7] [Native Pulse 5]
              ROW 8:   [Radar 12 cols]
              ============================================================ */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
            {/* ========== ROW 1-2: HERO BLOCK (Zero Scroll - Everything Important) ========== */}

            {/* Hero - Dominant temperature display, spans 2 rows */}
            <div className="lg:col-span-4 lg:row-span-2">
              <AlmanacHero
                temperature={weather.current.temperature}
                feelsLike={weather.current.feelsLike}
                weatherCode={weather.current.weatherCode}
                location={formatLocationName(location)}
                windSpeed={weather.current.windSpeed}
                windDirection={weather.current.windDirection}
                humidity={weather.current.humidity}
                todayHigh={todayHigh}
                todayLow={todayLow}
                sunrise={todaySunrise}
                sunset={todaySunset}
                pressure={weather.current.pressure}
                pressureTrend={pressureTrend}
                uvIndex={weather.current.uvIndex}
              />
            </div>

            {/* Hourly Sparkline - Shows trend, spans 2 rows */}
            <div className="lg:col-span-5 lg:row-span-2">
              <HourlySparkline hourly={weather.hourly} />
            </div>

            {/* Farmer's Memory - Heritage feature, spans 2 rows */}
            <div className="lg:col-span-3 lg:row-span-2">
              <FarmerMemory
                temperature={weather.current.temperature}
                humidity={weather.current.humidity}
                pressure={weather.current.pressure}
                windSpeed={weather.current.windSpeed}
                todayHigh={todayHigh}
                todayLow={todayLow}
              />
            </div>

            {/* ========== ROW 3: QUICK CONTEXT (Secondary but important) ========== */}

            {/* Tomorrow Preview */}
            <div className="lg:col-span-3 self-start">
              <TomorrowPreview tomorrow={tomorrowData} />
            </div>

            {/* Burn Day */}
            <div className="lg:col-span-3 self-start">
              <BurnDayIndicator lat={location.latitude} lon={location.longitude} />
            </div>

            {/* Air Quality */}
            <div className="lg:col-span-3 self-start">
              <AirQualityCard
                lat={location.latitude}
                lon={location.longitude}
                onAqiChange={setAqi}
              />
            </div>

            {/* Frontier Proverb */}
            <div className="lg:col-span-3 self-start">
              {saying && (
                <FrontierSaying
                  saying={saying.frontier}
                  modernLine={saying.modern}
                  temperature={weather.current.temperature}
                  location={formatLocationName(location)}
                />
              )}
            </div>

            {/* ========== ROW 4: WORKABILITY SCORES (THE MAIN FEATURE) ========== */}
            <div className="lg:col-span-12">
              <TaskScores
                sower={taskScores.sower}
                shepherd={taskScores.shepherd}
                keeper={taskScores.keeper}
                builder={taskScores.builder}
                aqi={aqi}
              />
            </div>

            {/* ========== ROW 5: INTELLIGENCE (Agricultural Data) ========== */}

            {/* Planting Intelligence */}
            <div className="lg:col-span-5">
              <PlantingIntelligence
                temperature={weather.current.temperature}
                humidity={weather.current.humidity}
                soilTemperature={weather.current.soilTemperature}
                tempHigh={todayHigh}
                tempLow={todayLow}
              />
            </div>

            {/* 7-Day Forecast */}
            <div className="lg:col-span-7">
              <WeatherDetails daily={weather.daily} />
            </div>

            {/* ========== ROW 6: ATMOSPHERIC DATA ========== */}

            {/* Moon Phase */}
            <div className="lg:col-span-3">
              <MoonPhase moon={moon} />
            </div>

            {/* Current Conditions */}
            <div className="lg:col-span-5">
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

            {/* Sun/Barometer */}
            <div className="lg:col-span-4">
              <SunBarometer
                sunrise={todaySunrise}
                sunset={todaySunset}
                pressure={weather.current.pressure}
                windSpeed={weather.current.windSpeed}
                windDirection={weather.current.windDirection}
              />
            </div>

            {/* ========== ROW 7: ENVIRONMENTAL ========== */}

            {/* Environmental Watch */}
            <div className="lg:col-span-7">
              <EnvironmentalWatch lat={location.latitude} lon={location.longitude} />
            </div>

            {/* Native Pulse */}
            <div className="lg:col-span-5">
              <NativePulse pulse={nativePulse} />
            </div>

            {/* ========== ROW 8: RADAR (Visual) ========== */}
            <div className="lg:col-span-12">
              <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
            </div>

            {/* ========== SNOW (Conditional) ========== */}
            {weather.current.snowDepth && weather.current.snowDepth > 0 && (
              <div className="lg:col-span-12">
                <SnowConditions
                  snowDepth={weather.current.snowDepth}
                  currentTemp={weather.current.temperature}
                  weatherCode={weather.current.weatherCode}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <PresentedByBlock lastUpdated={lastUpdated} />

          {/* First-visit Onboarding */}
          <OnboardingModal />
        </div>
      </main>
    </div>
  )
}
