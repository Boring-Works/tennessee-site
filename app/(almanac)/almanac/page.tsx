'use client'

import './almanac.css'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { WeatherAtmosphere } from '@/components/almanac/WeatherAtmosphere'
import { AlmanacHero } from '@/components/almanac/AlmanacHero'
import { FrontierSaying } from '@/components/almanac/FrontierSaying'
import { TaskScores } from '@/components/almanac/TaskScores'
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
import { SectionDivider } from '@/components/almanac/SectionDivider'
import { CompactSevenDay, type DayForecast } from '@/components/almanac/CompactSevenDay'
import PrecipitationTiming from '@/components/almanac/PrecipitationTiming'
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

  // Build extended forecast with all available days
  const compactDays: DayForecast[] = useMemo(() => {
    if (!weather) return []
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const dayNamesFull = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    // Use all available days from API (up to 16)
    return weather.daily.time.map((dateStr, i) => {
      const date = new Date(dateStr)
      return {
        day: dayNames[date.getDay()],
        dayFull: dayNamesFull[date.getDay()],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: Math.round(weather.daily.temperatureMax[i]),
        low: Math.round(weather.daily.temperatureMin[i]),
        code: weather.daily.weatherCode[i],
        precipChance: weather.daily.precipitationProbability?.[i] || 0,
        precipSum: weather.daily.precipitationSum[i],
        sunrise: weather.daily.sunrise[i],
        sunset: weather.daily.sunset[i],
        windSpeedMax: weather.daily.windSpeedMax?.[i],
        windGustsMax: weather.daily.windGustsMax?.[i],
        uvIndexMax: weather.daily.uvIndexMax?.[i],
        feelsLikeMax: weather.daily.feelsLikeMax?.[i],
        feelsLikeMin: weather.daily.feelsLikeMin?.[i],
      }
    })
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
              MOBILE LAYOUT: Single column, organized in 3 sections
              SECTION 1: Glanceable (quick weather info)
              SECTION 2: Today's Details (current conditions)
              SECTION 3: For Working Farmers (planning & forecasts)
              ============================================================ */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* ========== SECTION 1: GLANCEABLE ========== */}
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
            />

            {/* Precipitation Timing */}
            <PrecipitationTiming
              lat={location.latitude}
              lon={location.longitude}
              hourlyPrecipFallback={
                weather?.hourly?.precipitationProbability?.[new Date().getHours()]
              }
            />

            {/* Workability Scores - 2x2 grid on mobile */}
            <TaskScores
              sower={taskScores.sower}
              shepherd={taskScores.shepherd}
              keeper={taskScores.keeper}
              builder={taskScores.builder}
              aqi={aqi}
            />

            {/* Hourly Sparkline */}
            <HourlySparkline hourly={weather.hourly} />

            {/* Compact 7-Day */}
            <CompactSevenDay days={compactDays} />

            <SectionDivider label="Today's Details" />

            {/* ========== SECTION 2: TODAY'S DETAILS ========== */}
            {/* Tomorrow Preview + Burn Day grouped */}
            <div className="grid grid-cols-2 gap-4">
              <TomorrowPreview tomorrow={tomorrowData} />
              <BurnDayIndicator lat={location.latitude} lon={location.longitude} />
            </div>

            {/* Air Quality */}
            <AirQualityCard lat={location.latitude} lon={location.longitude} onAqiChange={setAqi} />

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

            {/* Frontier Proverb */}
            {saying && (
              <FrontierSaying
                saying={saying.frontier}
                modernLine={saying.modern}
                temperature={weather.current.temperature}
                location={formatLocationName(location)}
              />
            )}

            {/* Moon & Radar */}
            <div className="grid grid-cols-2 gap-4">
              <MoonPhase moon={moon} />
              <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
            </div>

            <SectionDivider label="For Working Farmers" />

            {/* ========== SECTION 3: FOR WORKING FARMERS ========== */}
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

            {/* Snow (conditional) */}
            {weather.current.snowDepth !== undefined && weather.current.snowDepth > 0 && (
              <SnowConditions
                snowDepth={weather.current.snowDepth}
                currentTemp={weather.current.temperature}
                weatherCode={weather.current.weatherCode}
              />
            )}
          </div>

          {/* ============================================================
              DESKTOP LAYOUT: 12-column Bento Grid
              Goal: Answer 7 questions without scrolling

              SECTION 1 - GLANCEABLE (above the fold):
              ROW 1: [Hero 4] [PrecipTiming + Sparkline 5] [Tomorrow + Burn 3]
              ROW 2: [Workability Scores 12 cols] - THE KEY FEATURE
              ROW 3: [CompactSevenDay 12 cols]

              SECTION 2 - TODAY'S DETAILS:
              ROW 4: [Proverb 6] [AQI + Moon + Conditions 6]
              ROW 5: [SunBarometer 4] [Radar 8]

              SECTION 3 - FOR WORKING FARMERS:
              ROW 6: [Planting Intelligence 6] [Farmer's Memory 6]
              ROW 7: [Native Pulse 6] (available space)
              ROW 8: [Environmental Watch 12 cols]
              ============================================================ */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
            {/* ========== SECTION 1: GLANCEABLE (Above the Fold) ========== */}
            <section aria-label="At a Glance" className="lg:col-span-12 grid lg:grid-cols-12 gap-4">
              {/* Hero - Compact temperature display */}
              <div className="lg:col-span-4">
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
                />
              </div>

              {/* PrecipTiming + Hourly Sparkline */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <PrecipitationTiming
                  lat={location.latitude}
                  lon={location.longitude}
                  hourlyPrecipFallback={
                    weather?.hourly?.precipitationProbability?.[new Date().getHours()]
                  }
                />
                <HourlySparkline hourly={weather.hourly} />
              </div>

              {/* Tomorrow + Burn Day - stretch to fill */}
              <div className="lg:col-span-3 flex flex-col gap-3 justify-between">
                <TomorrowPreview tomorrow={tomorrowData} />
                <BurnDayIndicator lat={location.latitude} lon={location.longitude} />
              </div>

              {/* Compact 7-Day Overview - HIGH PRIORITY */}
              <div className="lg:col-span-12">
                <CompactSevenDay days={compactDays} />
              </div>

              {/* Workability Scores */}
              <div className="lg:col-span-12">
                <TaskScores
                  sower={taskScores.sower}
                  shepherd={taskScores.shepherd}
                  keeper={taskScores.keeper}
                  builder={taskScores.builder}
                  aqi={aqi}
                  compact
                />
              </div>
            </section>

            <div className="lg:col-span-12">
              <SectionDivider label="Today's Details" />
            </div>

            {/* ========== SECTION 2: TODAY'S DETAILS ========== */}
            <section
              aria-label="Today's Details"
              className="lg:col-span-12 grid lg:grid-cols-12 gap-4"
            >
              {/* Daily Proverb */}
              <div className="lg:col-span-6">
                {saying && (
                  <FrontierSaying
                    saying={saying.frontier}
                    modernLine={saying.modern}
                    temperature={weather.current.temperature}
                    location={formatLocationName(location)}
                  />
                )}
              </div>

              {/* AQI + Moon + Current Conditions stack */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <AirQualityCard
                  lat={location.latitude}
                  lon={location.longitude}
                  onAqiChange={setAqi}
                />
                <div className="grid grid-cols-2 gap-3">
                  <MoonPhase moon={moon} />
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

              {/* Radar */}
              <div className="lg:col-span-8">
                <PrecipitationRadar latitude={location.latitude} longitude={location.longitude} />
              </div>
            </section>

            <div className="lg:col-span-12">
              <SectionDivider label="For Working Farmers" />
            </div>

            {/* ========== SECTION 3: FOR WORKING FARMERS ========== */}
            <section
              aria-label="For Working Farmers"
              className="lg:col-span-12 grid lg:grid-cols-12 gap-4"
            >
              {/* Planting Intelligence */}
              <div className="lg:col-span-6">
                <PlantingIntelligence
                  temperature={weather.current.temperature}
                  humidity={weather.current.humidity}
                  soilTemperature={weather.current.soilTemperature}
                  tempHigh={todayHigh}
                  tempLow={todayLow}
                />
              </div>

              {/* Farmer's Memory */}
              <div className="lg:col-span-6">
                <FarmerMemory
                  temperature={weather.current.temperature}
                  humidity={weather.current.humidity}
                  pressure={weather.current.pressure}
                  windSpeed={weather.current.windSpeed}
                  todayHigh={todayHigh}
                  todayLow={todayLow}
                />
              </div>

              {/* Native Pulse */}
              <div className="lg:col-span-6">
                <NativePulse pulse={nativePulse} />
              </div>

              {/* Environmental Watch */}
              <div className="lg:col-span-12">
                <EnvironmentalWatch lat={location.latitude} lon={location.longitude} />
              </div>

              {/* Snow (Conditional) */}
              {weather.current.snowDepth !== undefined && weather.current.snowDepth > 0 && (
                <div className="lg:col-span-12">
                  <SnowConditions
                    snowDepth={weather.current.snowDepth}
                    currentTemp={weather.current.temperature}
                    weatherCode={weather.current.weatherCode}
                  />
                </div>
              )}
            </section>
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
