/**
 * Task Score Engine v3.1 — Rocky Mount Almanac
 * 
 * CRITICAL FIXES:
 * - Unit conversion: snow_depth now properly converted from meters to inches
 * - Multiple snow/ice detection methods (not just API snow_depth)
 * - Frozen ground detection via soil temperature
 * - Freeze/thaw cycle detection for ice hazards
 * - Winter conditions as BLOCKING factors, not just penalties
 * 
 * SOURCES:
 * - Heat Index: NOAA/NWS
 * - Wind Chill: NWS formula
 * - Livestock THI: Penn State Extension
 * - Paint Cure: Sherwin-Williams guidelines (50°F min, 5°F dew point spread)
 * - OSHA Heat/Cold: OSHA Technical Manual
 */

import type { TaskScore, TaskScores, WeatherData } from './types'
import { isSnowCode, isIceCode } from './types'

// ============================================
// EXTENDED METRICS
// ============================================

export interface ExtendedMetrics {
  // Raw measurements
  temperature: number
  humidity: number
  windSpeed: number
  windGusts: number
  precipitation: number
  precipProbability: number
  feelsLike: number
  month: number
  soilTemperature: number | undefined
  snowDepth: number  // In inches (converted in weather.ts)
  
  // Calculated values
  heatIndex: number
  windChill: number
  dewPoint: number
  dewPointSpread: number
  
  // Winter condition flags
  hasSnowOnGround: boolean
  hasIceRisk: boolean
  isActivelySnowing: boolean
  isFrozenGround: boolean
  isWinterConditions: boolean  // Composite flag
  winterSeverity: 'none' | 'light' | 'moderate' | 'severe'
  groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen'
}

// ============================================
// SCIENTIFIC CALCULATIONS
// ============================================

function calculateHeatIndex(tempF: number, humidity: number): number {
  if (tempF < 80) return tempF

  const T = tempF
  const R = humidity

  let HI = -42.379
    + 2.04901523 * T
    + 10.14333127 * R
    - 0.22475541 * T * R
    - 0.00683783 * T * T
    - 0.05481717 * R * R
    + 0.00122874 * T * T * R
    + 0.00085282 * T * R * R
    - 0.00000199 * T * T * R * R

  if (R < 13 && T >= 80 && T <= 112) {
    HI -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17)
  }
  if (R > 85 && T >= 80 && T <= 87) {
    HI += ((R - 85) / 10) * ((87 - T) / 5)
  }

  return Math.round(HI)
}

function calculateWindChill(tempF: number, windMph: number): number {
  if (tempF > 50 || windMph < 3) return tempF
  
  return Math.round(
    35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) + 0.4275 * tempF * Math.pow(windMph, 0.16)
  )
}

function calculateDewPoint(tempF: number, humidity: number): number {
  const tempC = (tempF - 32) * 5 / 9
  const a = 17.27
  const b = 237.7
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100)
  const dewPointC = (b * alpha) / (a - alpha)
  return Math.round(dewPointC * 9 / 5 + 32)
}

function calculateTHI(tempF: number, humidity: number): number {
  const tempC = (tempF - 32) * 5 / 9
  const THI = (1.8 * tempC + 32) - ((0.55 - 0.0055 * humidity) * (1.8 * tempC - 26))
  return Math.round(THI)
}

// ============================================
// WINTER CONDITION DETECTION
// ============================================

interface WinterAnalysis {
  hasSnowOnGround: boolean
  hasIceRisk: boolean
  isActivelySnowing: boolean
  isFrozenGround: boolean
  isWinterConditions: boolean
  winterSeverity: 'none' | 'light' | 'moderate' | 'severe'
  groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen'
  snowDepth: number
}

function analyzeWinterConditions(weather: WeatherData): WinterAnalysis {
  const now = new Date()
  const currentHour = now.getHours()
  const currentTemp = weather.current.temperature
  
  // Get snow depth (already converted to inches in weather.ts)
  const snowDepth = weather.current.snowDepth ?? 0
  
  // Check current weather code
  const currentCode = weather.current.weatherCode
  const isActivelySnowing = isSnowCode(currentCode)
  const isFreezingPrecipNow = isIceCode(currentCode)
  
  // Get soil temperature
  const soilTemp = weather.current.soilTemperature
  const isFrozenGround = soilTemp !== undefined && soilTemp < 32
  
  // ========== ANALYZE RECENT WEATHER HISTORY ==========
  
  // Check recent daily temps for freeze/thaw patterns
  let hadFreezing = false
  let hadAboveFreezing = false
  let recentMinTemp = currentTemp
  let recentMaxTemp = currentTemp
  let coldDaysCount = 0
  
  if (weather.daily.temperatureMin && weather.daily.temperatureMax) {
    // Look at last 3 days (indices depend on past_days setting)
    const lookbackDays = Math.min(3, weather.daily.temperatureMin.length)
    for (let i = 0; i < lookbackDays; i++) {
      const minT = weather.daily.temperatureMin[i]
      const maxT = weather.daily.temperatureMax[i]
      if (minT !== undefined) {
        recentMinTemp = Math.min(recentMinTemp, minT)
        if (minT < 32) {
          hadFreezing = true
          coldDaysCount++
        }
      }
      if (maxT !== undefined) {
        recentMaxTemp = Math.max(recentMaxTemp, maxT)
        if (maxT > 35) hadAboveFreezing = true
      }
    }
  }
  
  // Check recent snowfall from daily totals
  let recentSnowfall = 0
  if (weather.daily.snowfallSum) {
    const lookbackDays = Math.min(3, weather.daily.snowfallSum.length)
    for (let i = 0; i < lookbackDays; i++) {
      recentSnowfall += weather.daily.snowfallSum[i] || 0
    }
  }
  
  // Check recent weather codes for snow events
  let hadRecentSnowCode = false
  let hadRecentIceCode = false
  if (weather.hourly.weatherCode) {
    // Check last 72 hours of weather codes
    const startIdx = Math.max(0, currentHour - 72)
    const endIdx = Math.min(weather.hourly.weatherCode.length, currentHour + 1)
    for (let i = startIdx; i < endIdx; i++) {
      const code = weather.hourly.weatherCode[i]
      if (isSnowCode(code)) hadRecentSnowCode = true
      if (isIceCode(code)) hadRecentIceCode = true
    }
  }
  
  // ========== DETERMINE SNOW ON GROUND ==========
  // Multiple detection methods - if ANY are true, there's snow
  
  let hasSnowOnGround = false
  let snowConfidence = 0
  
  // Method 1: Direct measurement
  if (snowDepth >= 0.5) {  // At least half inch
    hasSnowOnGround = true
    snowConfidence = Math.min(100, snowDepth * 20)  // More snow = higher confidence
  }
  
  // Method 2: Recent snowfall + cold temps (wouldn't have melted)
  if (recentSnowfall >= 0.5 && recentMaxTemp < 40) {
    hasSnowOnGround = true
    snowConfidence = Math.max(snowConfidence, 80)
  }
  
  // Method 3: Recent snow weather codes + sustained cold
  if (hadRecentSnowCode && recentMaxTemp < 38 && coldDaysCount >= 2) {
    hasSnowOnGround = true
    snowConfidence = Math.max(snowConfidence, 70)
  }
  
  // Method 4: Very cold recent history (prolonged freeze)
  if (recentMaxTemp < 32 && coldDaysCount >= 2 && hadRecentSnowCode) {
    hasSnowOnGround = true
    snowConfidence = Math.max(snowConfidence, 60)
  }
  
  // ========== DETERMINE ICE RISK ==========
  // Ice forms from: freezing precip, or freeze/thaw cycles
  
  let hasIceRisk = false
  
  // Method 1: Currently freezing rain/drizzle
  if (isFreezingPrecipNow) {
    hasIceRisk = true
  }
  
  // Method 2: Recent freezing precipitation
  if (hadRecentIceCode) {
    hasIceRisk = true
  }
  
  // Method 3: Freeze/thaw cycle (most common ice cause)
  // If it got above freezing then dropped back below, ice forms
  if (hadFreezing && hadAboveFreezing && currentTemp < 36) {
    hasIceRisk = true
  }
  
  // Method 4: Snow melting and refreezing
  if (hasSnowOnGround && recentMaxTemp > 33 && currentTemp < 35) {
    hasIceRisk = true
  }
  
  // Method 5: Rain on frozen ground
  if (isFrozenGround && weather.current.precipitation > 0 && currentTemp < 36) {
    hasIceRisk = true
  }
  
  // ========== DETERMINE WINTER SEVERITY ==========
  
  let winterSeverity: 'none' | 'light' | 'moderate' | 'severe' = 'none'
  
  if (hasIceRisk) {
    // Ice is always at least moderate severity
    winterSeverity = snowDepth > 2 ? 'severe' : 'moderate'
  } else if (hasSnowOnGround) {
    if (snowDepth > 4 || (recentSnowfall > 3 && recentMaxTemp < 35)) {
      winterSeverity = 'severe'
    } else if (snowDepth > 1 || recentSnowfall > 1) {
      winterSeverity = 'moderate'
    } else {
      winterSeverity = 'light'
    }
  } else if (isFrozenGround) {
    winterSeverity = 'light'
  }
  
  const isWinterConditions = winterSeverity !== 'none'
  
  // ========== DETERMINE GROUND CONDITION ==========
  
  let groundCondition: 'clear' | 'wet' | 'snowy' | 'icy' | 'frozen' = 'clear'
  
  if (hasIceRisk) {
    groundCondition = 'icy'
  } else if (hasSnowOnGround) {
    groundCondition = 'snowy'
  } else if (isFrozenGround) {
    groundCondition = 'frozen'
  } else if (weather.current.precipitation > 0.05 || weather.current.humidity > 90) {
    groundCondition = 'wet'
  }
  
  return {
    hasSnowOnGround,
    hasIceRisk,
    isActivelySnowing,
    isFrozenGround,
    isWinterConditions,
    winterSeverity,
    groundCondition,
    snowDepth,
  }
}

// ============================================
// BUILD EXTENDED METRICS
// ============================================

export function buildExtendedMetrics(weather: WeatherData): ExtendedMetrics {
  const now = new Date()
  const currentHour = now.getHours()
  
  const temp = weather.current.temperature
  const humidity = weather.current.humidity
  const windSpeed = weather.current.windSpeed
  
  const heatIndex = calculateHeatIndex(temp, humidity)
  const windChill = calculateWindChill(temp, windSpeed)
  const dewPoint = calculateDewPoint(temp, humidity)
  
  const winter = analyzeWinterConditions(weather)
  
  return {
    temperature: temp,
    humidity: humidity,
    windSpeed: windSpeed,
    windGusts: weather.current.windGusts,
    precipitation: weather.current.precipitation,
    precipProbability: weather.hourly.precipitationProbability[currentHour] || 0,
    feelsLike: weather.current.feelsLike,
    month: now.getMonth() + 1,
    soilTemperature: weather.current.soilTemperature,
    heatIndex,
    windChill,
    dewPoint,
    dewPointSpread: temp - dewPoint,
    ...winter,
  }
}

// ============================================
// SCORE UTILITIES
// ============================================

function getScoreLabel(score: number): TaskScore['label'] {
  if (score >= 9) return 'Perfect'
  if (score >= 7) return 'Good'
  if (score >= 5) return 'Fair'
  if (score >= 3) return 'Poor'
  return 'Avoid'
}

// ============================================
// SOWER'S INDEX — Gardening & Planting
// ============================================

export function calculateSowerScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING CONDITIONS - Check these first, return immediately
  
  if (m.groundCondition === 'icy') {
    return {
      score: 1,
      label: 'Avoid',
      instruction: "Ice on ground. Dangerous and soil frozen beneath. No gardening possible."
    }
  }
  
  if (m.hasSnowOnGround) {
    const snowMsg = m.snowDepth > 0.5 
      ? `${m.snowDepth.toFixed(1)}" of snow covering ground.`
      : "Snow cover on ground."
    return {
      score: 1,
      label: 'Avoid',
      instruction: `${snowMsg} Wait for complete melt and soil to thaw before any garden work.`
    }
  }
  
  if (m.isFrozenGround) {
    return {
      score: 2,
      label: 'Avoid',
      instruction: `Soil frozen at ${Math.round(m.soilTemperature!)}°F. Can't dig or plant until thaw.`
    }
  }
  
  if (m.isActivelySnowing) {
    return {
      score: 2,
      label: 'Avoid',
      instruction: "Currently snowing. Wait for it to stop and clear."
    }
  }
  
  // NON-BLOCKING CONDITIONS - Calculate score with penalties
  let score = 10
  let dominantIssue: string = 'none'
  let issueValue: number = 0

  // Soil temperature
  if (m.soilTemperature !== undefined) {
    if (m.soilTemperature < 40) {
      score -= 4
      dominantIssue = 'cold_soil'
      issueValue = m.soilTemperature
    } else if (m.soilTemperature < 50) {
      score -= 2
      if (dominantIssue === 'none') { dominantIssue = 'cool_soil'; issueValue = m.soilTemperature }
    } else if (m.soilTemperature > 85) {
      score -= 2
      if (dominantIssue === 'none') dominantIssue = 'hot_soil'
    }
  }

  // Air temperature
  if (m.temperature < 32) {
    score -= 5
    if (dominantIssue === 'none') dominantIssue = 'frost'
  } else if (m.temperature < 40) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'cold'
  } else if (m.temperature > 95) {
    score -= 4
    if (dominantIssue === 'none') { dominantIssue = 'heat'; issueValue = m.heatIndex }
  }

  // Precipitation
  if (m.precipitation > 0.5) {
    score -= 5
    dominantIssue = 'heavy_rain'
  } else if (m.precipitation > 0.1) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'rain'
  } else if (m.precipProbability > 70) {
    score -= 2
    if (dominantIssue === 'none') { dominantIssue = 'rain_likely'; issueValue = m.precipProbability }
  }

  // Wind
  if (m.windSpeed > 25) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  } else if (m.windSpeed > 15) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'breezy'
  }

  // Wet ground
  if (m.groundCondition === 'wet') {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'saturated'
  }

  score = Math.max(1, Math.min(10, score))

  // Generate instruction based on dominant issue
  let instruction: string
  switch (dominantIssue) {
    case 'cold_soil':
      instruction = `Soil only ${Math.round(issueValue)}°F. Too cold for most seeds—wait for warmer days.`
      break
    case 'cool_soil':
      instruction = `Soil at ${Math.round(issueValue)}°F. Cool-season crops only—hold off on tomatoes.`
      break
    case 'frost':
      instruction = "Frost risk. Protect tender plants and don't transplant today."
      break
    case 'cold':
      instruction = `Only ${Math.round(m.temperature)}°F. Too cold for outdoor planting.`
      break
    case 'heavy_rain':
      instruction = "Heavy rain. Gardens are off-limits—soil compaction risk."
      break
    case 'rain':
      instruction = "Rain falling. Wait for a break before working the beds."
      break
    case 'rain_likely':
      instruction = `${Math.round(issueValue)}% rain chance. Finish planting early or wait.`
      break
    case 'high_wind':
      instruction = `Winds at ${Math.round(m.windSpeed)} mph. Too windy for transplants.`
      break
    case 'saturated':
      instruction = "Ground is soggy. Walking beds will compact wet soil."
      break
    case 'heat':
      instruction = `Heat index ${Math.round(issueValue)}°F. Work early morning only.`
      break
    default:
      if (score >= 9) {
        instruction = m.soilTemperature && m.soilTemperature >= 60
          ? `Ideal conditions. Soil at ${Math.round(m.soilTemperature)}°F—perfect for planting.`
          : "Excellent conditions for garden work."
      } else if (score >= 7) {
        instruction = "Good conditions for gardening."
      } else {
        instruction = "Mixed conditions. Light tasks only."
      }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// OUTDOOR ALERT — Pets, Kids & Livestock
// ============================================

export function calculateOutdoorScore(m: ExtendedMetrics): TaskScore {
  const thi = calculateTHI(m.temperature, m.humidity)

  // BLOCKING CONDITIONS
  
  if (m.groundCondition === 'icy') {
    return {
      score: 3,
      label: 'Poor',
      instruction: "ICE ON GROUND. Slip and fall hazard. Very short trips only—watch every step."
    }
  }
  
  // Calculate score with penalties
  let score = 10
  let dominantIssue: string = 'none'
  
  // Snow penalty (not blocking, but significant)
  if (m.hasSnowOnGround) {
    if (m.snowDepth > 4) {
      score -= 4
      dominantIssue = 'deep_snow'
    } else if (m.snowDepth > 1) {
      score -= 2
      dominantIssue = 'snow_on_ground'
    } else {
      score -= 1
      dominantIssue = 'light_snow'
    }
  }
  
  if (m.isActivelySnowing) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'snowing'
  }

  // Heat stress (THI-based)
  if (thi >= 99) {
    score -= 6
    dominantIssue = 'heat_emergency'
  } else if (thi >= 89) {
    score -= 4
    if (dominantIssue === 'none') dominantIssue = 'severe_heat'
  } else if (thi >= 79) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'moderate_heat'
  } else if (thi >= 72) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'mild_heat'
  }

  // Cold stress
  if (m.windChill < 10) {
    score -= 5
    dominantIssue = 'extreme_cold'
  } else if (m.windChill < 20) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'severe_cold'
  } else if (m.windChill < 32) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'cold'
  } else if (m.temperature < 40) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'chilly'
  }

  // Freezing rain (extremely dangerous)
  if (m.temperature >= 28 && m.temperature <= 36 && m.precipitation > 0 && m.hasIceRisk) {
    score -= 4
    dominantIssue = 'freezing_rain'
  }

  // High wind
  if (m.windSpeed > 35) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  }

  score = Math.max(1, Math.min(10, score))

  // Generate instruction
  let instruction: string
  switch (dominantIssue) {
    case 'deep_snow':
      instruction = `${m.snowDepth.toFixed(1)}" of snow. Small pets struggle, watch for hidden hazards.`
      break
    case 'snow_on_ground':
      instruction = "Snow on ground. Keep walks moderate, check paws for ice buildup."
      break
    case 'light_snow':
      instruction = "Light snow cover. Watch footing, keep outdoor time reasonable."
      break
    case 'snowing':
      instruction = "Currently snowing. Short outdoor trips OK, don't stay out long."
      break
    case 'heat_emergency':
      instruction = `HEAT EMERGENCY: Index ${m.heatIndex}°F. No outdoor activity. Heatstroke risk.`
      break
    case 'severe_heat':
      instruction = `Dangerous heat—index ${m.heatIndex}°F. Bathroom breaks only. Watch for panting.`
      break
    case 'moderate_heat':
      instruction = `Heat stress risk—index ${m.heatIndex}°F. Keep outdoor time short.`
      break
    case 'mild_heat':
      instruction = `Heat index ${m.heatIndex}°F. Provide shade and water for extended time.`
      break
    case 'extreme_cold':
      instruction = `EXTREME COLD: Wind chill ${m.windChill}°F. Frostbite risk in under 10 minutes.`
      break
    case 'severe_cold':
      instruction = `Wind chill ${m.windChill}°F. Limit to 15 minutes outside.`
      break
    case 'cold':
      instruction = `Wind chill ${m.windChill}°F. Short-haired pets need a coat. Check paws for ice.`
      break
    case 'chilly':
      instruction = `Cool at ${Math.round(m.temperature)}°F. Most pets fine, but limit time for small/thin-coated breeds.`
      break
    case 'freezing_rain':
      instruction = "Freezing rain falling. Extremely slippery. Stay inside."
      break
    case 'high_wind':
      instruction = `Gusts to ${Math.round(m.windGusts)} mph. Debris hazard. Keep sheltered.`
      break
    default:
      if (score >= 9) {
        instruction = "Safe for extended time outdoors. Enjoy the weather!"
      } else if (score >= 7) {
        instruction = "Good conditions for outdoor time."
      } else {
        instruction = "Marginal conditions. Keep outdoor time moderate."
      }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// KEEPER'S GAUGE — Property Maintenance
// ============================================

export function calculateKeeperScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING CONDITIONS
  
  if (m.groundCondition === 'icy') {
    return {
      score: 1,
      label: 'Avoid',
      instruction: "ICE ON SURFACES. Ladders deadly, surfaces untreatable. Plan only."
    }
  }
  
  if (m.hasSnowOnGround) {
    return {
      score: 1,
      label: 'Avoid',
      instruction: "Snow covering surfaces. No exterior work possible until clear."
    }
  }
  
  if (m.isActivelySnowing) {
    return {
      score: 2,
      label: 'Avoid',
      instruction: "Currently snowing. All exterior work postponed."
    }
  }
  
  if (m.isFrozenGround || m.temperature < 35) {
    // Check if paint/finishes would fail
    if (m.temperature < 40) {
      return {
        score: 2,
        label: 'Avoid',
        instruction: `Only ${Math.round(m.temperature)}°F. Paint won't cure, caulk won't set. Plan and order materials.`
      }
    }
  }
  
  // NON-BLOCKING - calculate penalties
  let score = 10
  let dominantIssue: string = 'none'

  // Dew point spread (paint won't cure)
  if (m.dewPointSpread < 3) {
    score -= 4
    dominantIssue = 'condensation'
  } else if (m.dewPointSpread < 5) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'dew_risk'
  }

  // Humidity
  if (m.humidity > 85) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_humidity'
  }

  // Precipitation
  if (m.precipitation > 0.1) {
    score -= 5
    dominantIssue = 'rain'
  } else if (m.precipProbability > 70) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'rain_likely'
  }

  // Wind (ladder safety)
  if (m.windGusts > 40) {
    score -= 5
    dominantIssue = 'dangerous_wind'
  } else if (m.windGusts > 30) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_gusts'
  } else if (m.windGusts > 20) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'gusty'
  }

  // Temperature (paint cure)
  if (m.temperature < 50) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'cold'
  }

  score = Math.max(1, Math.min(10, score))

  // Generate instruction
  let instruction: string
  switch (dominantIssue) {
    case 'condensation':
      instruction = `Dew point spread only ${m.dewPointSpread}°F. Paint will fail—prep work only.`
      break
    case 'dew_risk':
      instruction = `Humidity ${m.humidity}%. Apply finishes in warmest hours only.`
      break
    case 'high_humidity':
      instruction = `Humidity ${m.humidity}%. Sealants won't cure. Focus on repairs.`
      break
    case 'rain':
      instruction = "Rain falling. All exterior work on hold."
      break
    case 'rain_likely':
      instruction = "Rain likely. Complete work early or postpone."
      break
    case 'dangerous_wind':
      instruction = `DANGER: Gusts ${Math.round(m.windGusts)} mph. Stay off ladders.`
      break
    case 'high_gusts':
      instruction = `Gusts ${Math.round(m.windGusts)} mph. No ladder work today.`
      break
    case 'gusty':
      instruction = `Gusts to ${Math.round(m.windGusts)} mph. No work above 6 feet.`
      break
    case 'cold':
      instruction = `At ${Math.round(m.temperature)}°F, use cold-weather products only.`
      break
    default:
      if (score >= 9) {
        instruction = `Ideal for exterior work. Dew point spread ${m.dewPointSpread}°F—finishes will cure well.`
      } else if (score >= 7) {
        instruction = "Good conditions for exterior repairs."
      } else {
        instruction = "Marginal conditions. Focus on prep work."
      }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// BUILDER'S GRADE — Construction & Heavy Work
// ============================================

export function calculateBuilderScore(m: ExtendedMetrics): TaskScore {
  // BLOCKING CONDITIONS
  
  if (m.groundCondition === 'icy') {
    return {
      score: 2,
      label: 'Avoid',
      instruction: "ICE ON SITE. Equipment slides, workers fall. Limited interior work only."
    }
  }
  
  // Calculate score with penalties
  let score = 10
  let dominantIssue: string = 'none'
  
  // Snow penalties (not always blocking for construction)
  if (m.hasSnowOnGround) {
    if (m.snowDepth > 4) {
      score -= 5
      dominantIssue = 'deep_snow'
    } else if (m.snowDepth > 1) {
      score -= 3
      dominantIssue = 'snow_on_ground'
    } else {
      score -= 1
      dominantIssue = 'light_snow'
    }
  }
  
  if (m.isActivelySnowing) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'snowing'
  }
  
  if (m.isFrozenGround) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'frozen_ground'
  }

  // Precipitation
  if (m.precipitation > 0.25) {
    score -= 4
    if (dominantIssue === 'none') dominantIssue = 'rain'
  } else if (m.precipitation > 0.1) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'light_rain'
  }

  // Cold stress (OSHA)
  if (m.windChill < 10) {
    score -= 5
    dominantIssue = 'extreme_cold'
  } else if (m.windChill < 20) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'severe_cold'
  } else if (m.windChill < 32) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'cold'
  }

  // Heat stress (OSHA)
  if (m.heatIndex >= 115) {
    score -= 5
    dominantIssue = 'extreme_heat'
  } else if (m.heatIndex >= 103) {
    score -= 4
    if (dominantIssue === 'none') dominantIssue = 'danger_heat'
  } else if (m.heatIndex >= 91) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'caution_heat'
  }

  // Wind (equipment safety)
  if (m.windGusts > 45) {
    score -= 5
    dominantIssue = 'dangerous_wind'
  } else if (m.windGusts > 35) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  }

  // Mud season
  const isMudSeason = m.month >= 2 && m.month <= 4 && m.temperature > 35 && m.temperature < 55
  if (isMudSeason && m.groundCondition === 'wet') {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'mud'
  }

  score = Math.max(1, Math.min(10, score))

  // Generate instruction
  let instruction: string
  switch (dominantIssue) {
    case 'deep_snow':
      instruction = `${m.snowDepth.toFixed(1)}" of snow on site. Clear before operations.`
      break
    case 'snow_on_ground':
      instruction = "Snow on ground. Traction issues—proceed with caution."
      break
    case 'light_snow':
      instruction = "Light snow cover. Watch footing, clear work areas."
      break
    case 'snowing':
      instruction = "Currently snowing. Conditions deteriorating. Monitor closely."
      break
    case 'frozen_ground':
      instruction = "Ground is frozen. Good for driving, no excavation possible."
      break
    case 'rain':
      instruction = "Steady rain. Site work suspended. Protect materials."
      break
    case 'light_rain':
      instruction = "Light rain. Covered work only."
      break
    case 'extreme_cold':
      instruction = `SITE CLOSED: Wind chill ${m.windChill}°F. Frostbite in under 10 minutes.`
      break
    case 'severe_cold':
      instruction = `Wind chill ${m.windChill}°F. Limit exposure to 30 minutes. Warm-up breaks required.`
      break
    case 'cold':
      instruction = `Wind chill ${m.windChill}°F. Dress in layers. Warm-up breaks every hour.`
      break
    case 'extreme_heat':
      instruction = `SITE CLOSED: Heat index ${m.heatIndex}°F. Heat stroke risk too high.`
      break
    case 'danger_heat':
      instruction = `DANGER: Heat index ${m.heatIndex}°F. Early morning work only.`
      break
    case 'caution_heat':
      instruction = `Heat index ${m.heatIndex}°F. Mandatory water breaks every 20 minutes.`
      break
    case 'dangerous_wind':
      instruction = `SITE CLOSED: Gusts ${Math.round(m.windGusts)} mph. Crane operations prohibited.`
      break
    case 'high_wind':
      instruction = `Gusts ${Math.round(m.windGusts)} mph. No crane work. Secure materials.`
      break
    case 'mud':
      instruction = "Mud season. Heavy equipment will rut. Limit traffic."
      break
    default:
      if (score >= 9) {
        instruction = "Good conditions. Full operations."
      } else if (score >= 7) {
        instruction = "Workable conditions. Standard safety protocols."
      } else {
        instruction = "Reduced productivity expected."
      }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// CALCULATE ALL SCORES
// ============================================

export function calculateAllTaskScores(weather: WeatherData): TaskScores {
  const metrics = buildExtendedMetrics(weather)

  return {
    sower: calculateSowerScore(metrics),
    shepherd: calculateOutdoorScore(metrics),
    keeper: calculateKeeperScore(metrics),
    builder: calculateBuilderScore(metrics),
  }
}

// ============================================
// NATIVE PULSE
// ============================================

export interface NativePulseResult {
  status: 'Active Stratification' | 'Germination Trigger' | 'Growing Season' | 'Dormant'
  icon: string
  color: string
  tip: string
  progress: number
}

function calculateStratificationProgress(date: Date): number {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  const seasonLength = isLeapYear ? 91 : 90

  let daysIntoSeason: number
  if (month === 12) daysIntoSeason = day
  else if (month === 1) daysIntoSeason = 31 + day
  else if (month === 2) daysIntoSeason = 62 + day
  else return 0

  return Math.min(100, Math.round((daysIntoSeason / seasonLength) * 100))
}

export function calculateNativePulse(metrics: ExtendedMetrics): NativePulseResult {
  const { temperature, precipitation, month } = metrics
  const progress = calculateStratificationProgress(new Date())

  if (month >= 12 || month <= 2) {
    if (temperature >= 28 && temperature <= 40) {
      return {
        status: 'Active Stratification',
        icon: '❄️',
        color: 'text-blue-400',
        tip: 'Cold moist stratification in progress. Native seeds are breaking dormancy.',
        progress,
      }
    }
    return {
      status: 'Active Stratification',
      icon: '❄️',
      color: 'text-blue-400',
      tip: temperature < 28
        ? 'Hard freeze—cover seed beds or move containers to shelter.'
        : 'Warm spell may interrupt stratification. Monitor closely.',
      progress,
    }
  }

  if (month === 3 || month === 4) {
    if (temperature > 55 && precipitation > 0) {
      return {
        status: 'Germination Trigger',
        icon: '🌱',
        color: 'text-green-400',
        tip: 'Warm rain! Perfect for native seed germination.',
        progress: 100,
      }
    }
    if (temperature > 55) {
      return {
        status: 'Germination Trigger',
        icon: '🌧️',
        color: 'text-yellow-400',
        tip: 'Soil warming. Awaiting rain to trigger germination.',
        progress: 75,
      }
    }
    return {
      status: 'Germination Trigger',
      icon: '🌤️',
      color: 'text-yellow-400',
      tip: 'Still cool. Germination begins when temps rise above 55°F.',
      progress: 50,
    }
  }

  if (month >= 5 && month <= 10) {
    const monthProgress = ((month - 5) / 6) * 100
    if (month <= 6) {
      return {
        status: 'Growing Season',
        icon: '🌻',
        color: 'text-green-500',
        tip: 'Peak growing season. Natives establishing roots.',
        progress: Math.round(monthProgress),
      }
    }
    if (month <= 8) {
      return {
        status: 'Growing Season',
        icon: '☀️',
        color: 'text-amber-500',
        tip: 'Midsummer. Water during dry spells.',
        progress: Math.round(monthProgress),
      }
    }
    return {
      status: 'Growing Season',
      icon: '🍂',
      color: 'text-orange-500',
      tip: 'Season ending. Natives setting seed.',
      progress: Math.round(monthProgress),
    }
  }

  return {
    status: 'Dormant',
    icon: '💤',
    color: 'text-gray-400',
    tip: 'Dormancy. Collect seeds for stratification.',
    progress: 0,
  }
}
