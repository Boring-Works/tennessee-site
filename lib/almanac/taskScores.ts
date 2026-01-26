/**
 * Task Score Engine v2.0 — Rocky Mount Almanac
 * 
 * FACT-CHECKED SOURCES:
 * - Heat Index: NOAA/NWS (https://www.weather.gov/ama/heatindex)
 * - Wind Chill: NWS formula (https://www.weather.gov/safety/cold-wind-chill-chart)
 * - Livestock THI: Penn State Extension, USDA
 * - Paint Cure: Sherwin-Williams, Benjamin Moore guidelines
 * - Soil Temp: UT Extension, USDA planting guides
 * - OSHA Heat/Cold: OSHA Technical Manual
 */

import type { TaskScore, TaskScores, WeatherData } from './types'

// ============================================
// EXTENDED METRICS INTERFACE
// ============================================

export interface ExtendedMetrics {
  temperature: number
  humidity: number
  windSpeed: number
  windGusts: number
  precipitation: number
  precipProbability: number
  feelsLike: number
  month: number
  soilTemperature?: number
  // Calculated values
  heatIndex: number
  windChill: number
  dewPoint: number
  dewPointSpread: number
}

// ============================================
// SCIENTIFIC CALCULATIONS (VERIFIED)
// ============================================

/**
 * NOAA Heat Index (Rothfusz regression)
 * Source: https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
 * Only valid when temp >= 80°F
 */
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

  // Low humidity adjustment (R < 13% and T 80-112°F)
  if (R < 13 && T >= 80 && T <= 112) {
    HI -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17)
  }
  // High humidity adjustment (R > 85% and T 80-87°F)
  if (R > 85 && T >= 80 && T <= 87) {
    HI += ((R - 85) / 10) * ((87 - T) / 5)
  }

  return Math.round(HI)
}

/**
 * NWS Wind Chill Formula
 * Source: https://www.weather.gov/media/epz/wxcalc/windChill.pdf
 * Only valid when temp <= 50°F and wind >= 3 mph
 */
function calculateWindChill(tempF: number, windMph: number): number {
  if (tempF > 50 || windMph < 3) return tempF
  
  return Math.round(
    35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) + 0.4275 * tempF * Math.pow(windMph, 0.16)
  )
}

/**
 * Dew Point (Magnus-Tetens approximation)
 * Critical for paint/stain cure decisions
 * Source: https://en.wikipedia.org/wiki/Dew_point#Calculating_the_dew_point
 */
function calculateDewPoint(tempF: number, humidity: number): number {
  const tempC = (tempF - 32) * 5 / 9
  const a = 17.27
  const b = 237.7
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100)
  const dewPointC = (b * alpha) / (a - alpha)
  return Math.round(dewPointC * 9 / 5 + 32)
}

/**
 * Temperature-Humidity Index for Livestock
 * Source: Penn State Extension, USDA livestock guides
 * THI = (1.8 × T + 32) − [(0.55 − 0.0055 × RH) × (1.8 × T − 26)]
 * Simplified for Fahrenheit input
 */
function calculateTHI(tempF: number, humidity: number): number {
  // Convert to Celsius for formula
  const tempC = (tempF - 32) * 5 / 9
  const THI = (1.8 * tempC + 32) - ((0.55 - 0.0055 * humidity) * (1.8 * tempC - 26))
  return Math.round(THI)
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
  let score = 10
  let dominantIssue: string = 'none'
  let issueValue: number = 0

  // === SOIL TEMPERATURE (most important for planting) ===
  // Source: UT Extension planting guides
  if (m.soilTemperature !== undefined) {
    if (m.soilTemperature < 40) {
      score -= 4
      dominantIssue = 'cold_soil'
      issueValue = m.soilTemperature
    } else if (m.soilTemperature < 50) {
      score -= 2
      dominantIssue = 'cool_soil'
      issueValue = m.soilTemperature
    } else if (m.soilTemperature > 85) {
      score -= 2
      dominantIssue = 'hot_soil'
      issueValue = m.soilTemperature
    }
  }

  // === AIR TEMPERATURE ===
  if (m.temperature < 32) {
    score -= 5
    if (dominantIssue === 'none') dominantIssue = 'frost'
  } else if (m.temperature < 40) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'cold'
  } else if (m.temperature > 95) {
    score -= 4
    if (dominantIssue === 'none') { dominantIssue = 'heat'; issueValue = m.heatIndex }
  } else if (m.temperature > 85) {
    score -= 1
    if (dominantIssue === 'none') { dominantIssue = 'warm'; issueValue = m.temperature }
  }

  // === PRECIPITATION ===
  if (m.precipitation > 0.5) {
    score -= 5
    dominantIssue = 'heavy_rain'
  } else if (m.precipitation > 0.1) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'rain'
  } else if (m.precipProbability > 70) {
    score -= 2
    if (dominantIssue === 'none') { dominantIssue = 'rain_likely'; issueValue = m.precipProbability }
  } else if (m.precipProbability > 40) {
    score -= 1
    if (dominantIssue === 'none') { dominantIssue = 'rain_possible'; issueValue = m.precipProbability }
  }

  // === WIND ===
  if (m.windSpeed > 25) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  } else if (m.windSpeed > 15) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'breezy'
  }

  // === GROUND SATURATION ===
  if (m.humidity > 90 && m.precipitation > 0) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'saturated'
  }

  score = Math.max(1, Math.min(10, score))

  // === GENERATE INSTRUCTION ===
  let instruction: string

  if (score >= 9) {
    if (m.soilTemperature && m.soilTemperature >= 60 && m.soilTemperature <= 75) {
      instruction = `Ideal conditions. Soil at ${Math.round(m.soilTemperature)}°F—perfect for most vegetables.`
    } else {
      instruction = "Clear skies, mild temps, calm winds. An excellent day in the garden."
    }
  } else if (score >= 7) {
    switch (dominantIssue) {
      case 'rain_likely':
      case 'rain_possible':
        instruction = `Good morning to plant. ${Math.round(issueValue)}% rain chance later—finish by afternoon.`
        break
      case 'warm':
        instruction = `Warm day at ${Math.round(m.temperature)}°F. Water transplants well and work early.`
        break
      case 'cool_soil':
        instruction = `Soil at ${Math.round(issueValue)}°F. Fine for cool-season crops—hold off on tomatoes.`
        break
      case 'breezy':
        instruction = `Winds at ${Math.round(m.windSpeed)} mph. Stake new transplants and water deeply.`
        break
      default:
        instruction = "Good conditions for garden work. A productive day ahead."
    }
  } else if (score >= 5) {
    switch (dominantIssue) {
      case 'cold_soil':
        instruction = `Soil only ${Math.round(issueValue)}°F. Too cold for most seeds—try cold frames or wait.`
        break
      case 'rain':
        instruction = "Light rain falling. Stick to covered tasks or wait for a break."
        break
      case 'saturated':
        instruction = "Ground is soggy. Walking the beds will compact wet soil—wait a day."
        break
      case 'heat':
        instruction = `Heat index ${Math.round(issueValue)}°F. Work early morning only. Stay hydrated.`
        break
      default:
        instruction = "Mixed conditions. Light tasks only—save major planting for better weather."
    }
  } else if (score >= 3) {
    switch (dominantIssue) {
      case 'frost':
        instruction = "Frost risk tonight. Protect tender plants or keep them covered."
        break
      case 'cold':
        instruction = `Only ${Math.round(m.temperature)}°F outside. Too cold for planting—focus on planning.`
        break
      case 'heavy_rain':
        instruction = "Heavy rain. Gardens are off-limits—soil damage from foot traffic."
        break
      case 'high_wind':
        instruction = `Winds at ${Math.round(m.windSpeed)} mph. Stay inside—transplants would be shredded.`
        break
      default:
        instruction = "Poor conditions. Not a planting day—tend to seedlings under cover."
    }
  } else {
    if (m.temperature < 32) {
      instruction = `Hard freeze at ${Math.round(m.temperature)}°F. All tender plants must be protected.`
    } else if (m.precipitation > 0.5) {
      instruction = "Downpour in progress. The garden will keep—stay dry."
    } else {
      instruction = "Conditions unsafe for garden work. Try again tomorrow."
    }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// OUTDOOR ALERT — Pets, Kids & Livestock
// ============================================
// Renamed from "Shepherd's Alert" to be more universal
// Uses THI for animal safety, Heat Index for human reference

export function calculateOutdoorScore(m: ExtendedMetrics): TaskScore {
  let score = 10
  let dominantIssue: string = 'none'
  
  const thi = calculateTHI(m.temperature, m.humidity)

  // === HEAT STRESS (THI-based for animals) ===
  // Source: Penn State Extension livestock heat stress guidelines
  // THI 72-78: Mild stress, THI 79-88: Moderate, THI 89-98: Severe, THI 99+: Emergency
  if (thi >= 99) {
    score -= 6
    dominantIssue = 'heat_emergency'
  } else if (thi >= 89) {
    score -= 4
    dominantIssue = 'severe_heat'
  } else if (thi >= 79) {
    score -= 2
    dominantIssue = 'moderate_heat'
  } else if (thi >= 72) {
    score -= 1
    dominantIssue = 'mild_heat'
  }

  // === COLD STRESS ===
  if (m.windChill < 10) {
    score -= 5
    dominantIssue = 'extreme_cold'
  } else if (m.windChill < 20) {
    score -= 3
    dominantIssue = 'severe_cold'
  } else if (m.windChill < 32) {
    score -= 2
    dominantIssue = 'cold'
  } else if (m.temperature < 40) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'chilly'
  }

  // === FREEZING RAIN (extremely dangerous) ===
  if (m.temperature >= 28 && m.temperature <= 35 && m.precipitation > 0) {
    score -= 4
    dominantIssue = 'freezing_rain'
  }

  // === WET CONDITIONS ===
  if (m.humidity > 85 && m.precipitation > 0.2) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'wet'
  }

  // === HIGH WIND ===
  if (m.windSpeed > 35) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  } else if (m.windSpeed > 25) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'windy'
  }

  score = Math.max(1, Math.min(10, score))

  // === GENERATE INSTRUCTION ===
  let instruction: string

  if (score >= 9) {
    instruction = "Safe for extended time outdoors. Pets can play freely—just keep water available."
  } else if (score >= 7) {
    switch (dominantIssue) {
      case 'mild_heat':
        instruction = `Heat index ${m.heatIndex}°F. Limit strenuous activity. Provide shade and water.`
        break
      case 'chilly':
        instruction = `Cool at ${Math.round(m.temperature)}°F. Short-haired pets may need a coat for long walks.`
        break
      default:
        instruction = "Good conditions for outdoor time. Standard precautions apply."
    }
  } else if (score >= 5) {
    switch (dominantIssue) {
      case 'moderate_heat':
        instruction = `Heat stress risk—index at ${m.heatIndex}°F. Short outdoor trips only. Watch for panting.`
        break
      case 'cold':
        instruction = `Wind chill ${m.windChill}°F. Limit time outside. Check paws for ice buildup.`
        break
      case 'wet':
        instruction = "Wet and muddy. Towel off pets promptly—watch for skin issues."
        break
      default:
        instruction = "Marginal conditions. Keep outdoor time brief and supervised."
    }
  } else if (score >= 3) {
    switch (dominantIssue) {
      case 'severe_heat':
        instruction = `Dangerous heat—index ${m.heatIndex}°F. Bathroom breaks only. Hot pavement burns paws.`
        break
      case 'severe_cold':
        instruction = `Wind chill ${m.windChill}°F. Frostbite risk in 15-30 minutes. Brief trips only.`
        break
      case 'freezing_rain':
        instruction = "Freezing rain falling. Extremely slippery—stay inside if possible."
        break
      case 'high_wind':
        instruction = `Gusts to ${Math.round(m.windGusts)} mph. Debris hazard. Keep everyone sheltered.`
        break
      default:
        instruction = "Poor conditions. Minimize outdoor exposure for pets and children."
    }
  } else {
    switch (dominantIssue) {
      case 'heat_emergency':
        instruction = `HEAT EMERGENCY: Index ${m.heatIndex}°F. No outdoor activity. Heatstroke risk is high.`
        break
      case 'extreme_cold':
        instruction = `EXTREME COLD: Wind chill ${m.windChill}°F. Frostbite in under 10 minutes. Stay inside.`
        break
      default:
        instruction = "Unsafe conditions. Keep all pets and children indoors."
    }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// KEEPER'S GAUGE — Property Maintenance
// ============================================

export function calculateKeeperScore(m: ExtendedMetrics): TaskScore {
  let score = 10
  let dominantIssue: string = 'none'

  // === DEW POINT (critical for paint/stain cure) ===
  // Source: Sherwin-Williams, Benjamin Moore technical bulletins
  // Paint fails if dew point is within 5°F of air temp (condensation risk)
  if (m.dewPointSpread < 3) {
    score -= 4
    dominantIssue = 'condensation'
  } else if (m.dewPointSpread < 5) {
    score -= 2
    dominantIssue = 'dew_risk'
  } else if (m.dewPointSpread < 8) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'humid'
  }

  // === HUMIDITY (general moisture issues) ===
  if (m.humidity > 85) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_humidity'
  } else if (m.humidity > 70) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'moderate_humidity'
  }

  // === PRECIPITATION ===
  if (m.precipitation > 0.1) {
    score -= 5
    dominantIssue = 'rain'
  } else if (m.precipProbability > 70) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'rain_likely'
  } else if (m.precipProbability > 40) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'rain_possible'
  }

  // === WIND (ladder safety, overspray) ===
  if (m.windGusts > 40) {
    score -= 5
    dominantIssue = 'dangerous_wind'
  } else if (m.windGusts > 30) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_gusts'
  } else if (m.windGusts > 20) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'gusty'
  } else if (m.windSpeed > 15) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'breezy'
  }

  // === TEMPERATURE (paint cure requires 50°F+, 24h window) ===
  // Source: Most latex paints require 50°F min, oil-based 40°F
  if (m.temperature < 40) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'too_cold'
  } else if (m.temperature < 50) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'cold'
  }

  score = Math.max(1, Math.min(10, score))

  // === GENERATE INSTRUCTION ===
  let instruction: string

  if (score >= 9) {
    instruction = `Ideal for paint and stain. Dew point spread ${m.dewPointSpread}°F—finishes will cure properly.`
  } else if (score >= 7) {
    switch (dominantIssue) {
      case 'humid':
      case 'dew_risk':
        instruction = `Humidity ${m.humidity}%. Apply finishes in warmest hours—avoid after 4pm.`
        break
      case 'breezy':
        instruction = `Winds ${Math.round(m.windSpeed)} mph. Use drop cloths for spray work.`
        break
      case 'rain_possible':
        instruction = `${Math.round(m.precipProbability)}% rain chance. Complete paint work early.`
        break
      case 'cold':
        instruction = `At ${Math.round(m.temperature)}°F, use cold-weather paints only. Check product specs.`
        break
      default:
        instruction = "Good conditions for exterior repairs and finishing work."
    }
  } else if (score >= 5) {
    switch (dominantIssue) {
      case 'condensation':
        instruction = `Dew point spread only ${m.dewPointSpread}°F. Paint will fail—do prep work instead.`
        break
      case 'high_humidity':
        instruction = `Humidity ${m.humidity}%. Sealants won't cure. Focus on repairs, not finishes.`
        break
      case 'gusty':
        instruction = `Gusts to ${Math.round(m.windGusts)} mph. No ladder work above 6 feet.`
        break
      case 'rain_likely':
        instruction = "Rain likely. Interior work or covered projects only."
        break
      default:
        instruction = "Marginal conditions. Avoid finish work—focus on prep and planning."
    }
  } else if (score >= 3) {
    switch (dominantIssue) {
      case 'high_gusts':
        instruction = `Gusts ${Math.round(m.windGusts)} mph. Ladders are unsafe. Stay grounded.`
        break
      case 'rain':
        instruction = "Rain falling. All exterior work on hold. Good day for planning."
        break
      case 'too_cold':
        instruction = `Only ${Math.round(m.temperature)}°F. Nothing will cure. Plan and order materials.`
        break
      default:
        instruction = "Poor conditions. Best to plan and prep today."
    }
  } else {
    switch (dominantIssue) {
      case 'dangerous_wind':
        instruction = `DANGER: Gusts ${Math.round(m.windGusts)} mph. Stay off ladders and away from trees.`
        break
      case 'rain':
        instruction = "Heavy rain. Check for leaks, but otherwise a planning day."
        break
      default:
        instruction = "Unsafe for exterior work. Focus on planning and material orders."
    }
  }

  return { score, label: getScoreLabel(score), instruction }
}

// ============================================
// BUILDER'S GRADE — Construction & Heavy Work
// ============================================

export function calculateBuilderScore(m: ExtendedMetrics): TaskScore {
  let score = 10
  let dominantIssue: string = 'none'

  // === PRECIPITATION ===
  if (m.precipitation > 0.25) {
    score -= 4
    dominantIssue = 'rain'
  } else if (m.precipitation > 0.1) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'light_rain'
  } else if (m.precipProbability > 80) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'rain_imminent'
  }

  // === COLD STRESS (OSHA guidelines) ===
  // Source: OSHA Cold Stress Guide
  if (m.windChill < 10) {
    score -= 5
    dominantIssue = 'extreme_cold'
  } else if (m.windChill < 20) {
    score -= 3
    dominantIssue = 'severe_cold'
  } else if (m.windChill < 32) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'cold'
  } else if (m.feelsLike < 40) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'chilly'
  }

  // === HEAT STRESS (OSHA guidelines) ===
  // Source: OSHA Heat Illness Prevention
  if (m.heatIndex >= 115) {
    score -= 5
    dominantIssue = 'extreme_heat'
  } else if (m.heatIndex >= 103) {
    score -= 4
    dominantIssue = 'danger_heat'
  } else if (m.heatIndex >= 91) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'caution_heat'
  } else if (m.heatIndex >= 80) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'warm'
  }

  // === WIND (equipment safety) ===
  // Source: OSHA crane operation guidelines
  if (m.windGusts > 45) {
    score -= 5
    dominantIssue = 'dangerous_wind'
  } else if (m.windGusts > 35) {
    score -= 3
    if (dominantIssue === 'none') dominantIssue = 'high_wind'
  } else if (m.windGusts > 25) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'gusty'
  } else if (m.windSpeed > 20) {
    score -= 1
    if (dominantIssue === 'none') dominantIssue = 'breezy'
  }

  // === GROUND CONDITIONS (estimated) ===
  const isMudSeason = m.month >= 2 && m.month <= 4 && m.temperature > 35 && m.temperature < 55
  if (isMudSeason && m.precipitation > 0) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'mud'
  } else if (m.humidity > 90 && m.precipitation > 0.2) {
    score -= 2
    if (dominantIssue === 'none') dominantIssue = 'saturated'
  }

  score = Math.max(1, Math.min(10, score))

  // === GENERATE INSTRUCTION ===
  let instruction: string

  if (score >= 9) {
    instruction = "Prime conditions. Ground firm, weather clear. Full productivity today."
  } else if (score >= 7) {
    switch (dominantIssue) {
      case 'warm':
        instruction = `Heat index ${m.heatIndex}°F. Schedule breaks and keep water on site.`
        break
      case 'chilly':
        instruction = `Feels like ${Math.round(m.feelsLike)}°F. Dress in layers—it'll warm up.`
        break
      case 'breezy':
        instruction = `Winds ${Math.round(m.windSpeed)} mph. Secure light materials.`
        break
      default:
        instruction = "Good working conditions. Standard safety protocols apply."
    }
  } else if (score >= 5) {
    switch (dominantIssue) {
      case 'caution_heat':
        instruction = `Heat index ${m.heatIndex}°F. Water breaks every 20 min. Watch for heat illness.`
        break
      case 'cold':
        instruction = `Wind chill ${m.windChill}°F. Warm-up breaks every hour. Layer up.`
        break
      case 'gusty':
        instruction = `Gusts to ${Math.round(m.windGusts)} mph. No panel work or scaffolding above 20ft.`
        break
      case 'light_rain':
        instruction = "Light rain. Covered work only. Protect exposed materials."
        break
      case 'mud':
        instruction = "Mud season. Avoid heavy equipment on grades—ruts will form."
        break
      default:
        instruction = "Workable with precautions. Expect reduced productivity."
    }
  } else if (score >= 3) {
    switch (dominantIssue) {
      case 'danger_heat':
        instruction = `DANGER: Heat index ${m.heatIndex}°F. Early morning work only. Mandatory rest cycles.`
        break
      case 'severe_cold':
        instruction = `Wind chill ${m.windChill}°F. Frostbite risk. Limit exposure to 30-minute intervals.`
        break
      case 'high_wind':
        instruction = `Gusts ${Math.round(m.windGusts)} mph. Cranes grounded. Secure all materials.`
        break
      case 'rain':
        instruction = "Steady rain. Site work suspended. Protect materials and equipment."
        break
      default:
        instruction = "Poor conditions. Consider standing down non-essential work."
    }
  } else {
    switch (dominantIssue) {
      case 'extreme_heat':
        instruction = `SITE CLOSED: Heat index ${m.heatIndex}°F. Heat stroke risk too high. Resume tomorrow.`
        break
      case 'extreme_cold':
        instruction = `SITE CLOSED: Wind chill ${m.windChill}°F. Frostbite in under 10 minutes.`
        break
      case 'dangerous_wind':
        instruction = `SITE CLOSED: Gusts ${Math.round(m.windGusts)} mph. Structural collapse risk.`
        break
      default:
        instruction = "Conditions unsafe. All work suspended until weather improves."
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
    shepherd: calculateOutdoorScore(metrics), // Using new universal function
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
        tip: 'Warm rain! Perfect conditions for native seed germination.',
        progress: 100,
      }
    }
    if (temperature > 55) {
      return {
        status: 'Germination Trigger',
        icon: '🌧️',
        color: 'text-yellow-400',
        tip: 'Soil is warming. Awaiting rain to trigger germination.',
        progress: 75,
      }
    }
    return {
      status: 'Germination Trigger',
      icon: '🌤️',
      color: 'text-yellow-400',
      tip: 'Still cool. Germination will begin when temps rise above 55°F.',
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
        tip: 'Peak growing season. Native plants establishing root systems.',
        progress: Math.round(monthProgress),
      }
    }
    if (month <= 8) {
      return {
        status: 'Growing Season',
        icon: '☀️',
        color: 'text-amber-500',
        tip: 'Midsummer growth. Water during dry spells, especially new transplants.',
        progress: Math.round(monthProgress),
      }
    }
    return {
      status: 'Growing Season',
      icon: '🍂',
      color: 'text-orange-500',
      tip: 'Season winding down. Natives are setting seed for next year.',
      progress: Math.round(monthProgress),
    }
  }

  return {
    status: 'Dormant',
    icon: '💤',
    color: 'text-gray-400',
    tip: 'Plants entering dormancy. Collect seeds and prepare for stratification.',
    progress: 0,
  }
}
