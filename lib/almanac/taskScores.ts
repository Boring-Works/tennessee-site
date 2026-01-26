// Task Score calculation logic
import type { TaskScore, TaskScores, WeatherMetrics, WeatherData } from './types'

// NativePulse - Seed Stratification Tracker
export interface NativePulseResult {
  status: 'Active Stratification' | 'Germination Trigger' | 'Growing Season' | 'Dormant'
  icon: string
  color: string
  tip: string
  progress: number // 0-100 for visual progress bar
}

function getScoreLabel(score: number): TaskScore['label'] {
  if (score >= 9) return 'Perfect'
  if (score >= 7) return 'Good'
  if (score >= 5) return 'Fair'
  if (score >= 3) return 'Poor'
  return 'Avoid'
}

// Sower's Index - Planting & Gardening
export function calculateSowerScore(metrics: WeatherMetrics): TaskScore {
  let score = 10
  const { temperature, precipitation, precipProbability, humidity, windSpeed } = metrics

  // Temperature penalties
  if (temperature < 35) score -= 5
  else if (temperature < 45) score -= 2
  else if (temperature > 95) score -= 4
  else if (temperature > 85) score -= 1

  // Precipitation penalties
  if (precipitation > 0.5) score -= 5
  else if (precipitation > 0.1) score -= 3
  else if (precipProbability > 70) score -= 2
  else if (precipProbability > 40) score -= 1

  // Wind penalties
  if (windSpeed > 25) score -= 3
  else if (windSpeed > 15) score -= 1

  // Ground saturation
  if (humidity > 90 && precipitation > 0) score -= 2

  score = Math.max(1, Math.min(10, score))

  let instruction: string
  if (score >= 9) {
    instruction = "Soil is warm and dry. A prime day for sowing the fields."
  } else if (score >= 7) {
    instruction = "Fair conditions for planting. Mind the afternoon hours."
  } else if (score >= 5) {
    instruction = "Ground is tacky. Light work only—avoid heavy treading."
  } else if (score >= 3) {
    instruction = "The sky is unsettled. Best keep the seeds in the sack."
  } else {
    instruction = "A gully-washer day. Stay off the fields entirely."
  }

  return { score, label: getScoreLabel(score), instruction }
}

// Shepherd's Alert - Livestock Care
export function calculateShepherdScore(metrics: WeatherMetrics): TaskScore {
  let score = 10
  const { temperature, humidity, windSpeed, precipitation, feelsLike } = metrics

  // Heat Stress Index
  const heatIndex = temperature + humidity
  if (heatIndex > 160) score -= 5
  else if (heatIndex > 140) score -= 3
  else if (heatIndex > 120) score -= 1

  // Cold Stress
  if (temperature < 32 && precipitation > 0) score -= 4
  if (feelsLike < 20) score -= 3
  else if (feelsLike < 35) score -= 1

  // Wet conditions
  if (humidity > 85 && precipitation > 0) score -= 2

  // Wind stress
  if (windSpeed > 30) score -= 2
  else if (windSpeed > 20) score -= 1

  score = Math.max(1, Math.min(10, score))

  let instruction: string
  if (score >= 9) {
    instruction = "The flock may graze freely. Fair weather for the pasture."
  } else if (score >= 7) {
    instruction = "Steady conditions. Keep water troughs filled."
  } else if (score >= 5) {
    if (humidity > 80) {
      instruction = "Air is heavy. Watch the lower meadows for standing water."
    } else {
      instruction = "Mixed skies. Keep the weak ones close to shelter."
    }
  } else if (score >= 3) {
    if (temperature < 40) {
      instruction = "The bite is in the air. Move the flock to covered ground."
    } else {
      instruction = "Poor conditions for grazing. Provide hay under cover."
    }
  } else {
    instruction = "No fit day for beast to be far from the barn."
  }

  return { score, label: getScoreLabel(score), instruction }
}

// Keeper's Gauge - Property Maintenance
export function calculateKeeperScore(metrics: WeatherMetrics): TaskScore {
  let score = 10
  const { humidity, precipitation, precipProbability, windSpeed, windGusts, temperature } = metrics

  // Humidity penalties
  if (humidity > 85) score -= 4
  else if (humidity > 70) score -= 2
  else if (humidity > 60) score -= 1

  // Rain penalties
  if (precipitation > 0.1) score -= 4
  else if (precipProbability > 60) score -= 2
  else if (precipProbability > 30) score -= 1

  // Wind penalties
  if (windGusts > 35) score -= 5
  else if (windGusts > 25) score -= 3
  else if (windSpeed > 15) score -= 1

  // Temperature
  if (temperature < 40) score -= 2
  else if (temperature < 50) score -= 1

  score = Math.max(1, Math.min(10, score))

  let instruction: string
  if (score >= 9) {
    instruction = "Dry air and calm winds. Best day for finish work."
  } else if (score >= 7) {
    instruction = "Good conditions for outdoor repairs. Mind the evening damp."
  } else if (score >= 5) {
    if (humidity > 70) {
      instruction = "Doors are sticking—humidity is high. Avoid sealant work."
    } else {
      instruction = "Fair conditions. Focus on interior projects."
    }
  } else if (score >= 3) {
    if (windGusts > 25) {
      instruction = "Wind is kicking up. No ladder work today."
    } else {
      instruction = "Poor conditions for exterior work. Plan and prepare."
    }
  } else {
    instruction = "A day for the planning table, not the worksite."
  }

  return { score, label: getScoreLabel(score), instruction }
}

// Builder's Grade - Construction & Heavy Work
export function calculateBuilderScore(metrics: WeatherMetrics): TaskScore {
  let score = 10
  const { precipitation, precipProbability, temperature, feelsLike, windSpeed, windGusts } = metrics

  // Current precipitation
  if (precipitation > 0.1) score -= 3
  else if (precipProbability > 70) score -= 2

  // Cold stress for workers
  if (feelsLike < 20) score -= 4
  else if (feelsLike < 32) score -= 2
  else if (feelsLike < 40) score -= 1

  // Heat stress for workers
  if (feelsLike > 100) score -= 4
  else if (feelsLike > 90) score -= 2

  // Wind (equipment safety)
  if (windGusts > 40) score -= 5
  else if (windGusts > 30) score -= 3
  else if (windSpeed > 20) score -= 1

  score = Math.max(1, Math.min(10, score))

  let instruction: string
  if (score >= 9) {
    instruction = "Ground is firm, air is steady. Full steam ahead."
  } else if (score >= 7) {
    instruction = "Good conditions for heavy work. Stay hydrated."
  } else if (score >= 5) {
    instruction = "Workable conditions with caution."
  } else if (score >= 3) {
    if (windGusts > 30) {
      instruction = "Wind is dangerous. Secure loose materials."
    } else if (feelsLike < 32) {
      instruction = "Bitter cold. Limit exposure, watch for ice."
    } else {
      instruction = "Poor conditions. Consider delay."
    }
  } else {
    instruction = "Ground is mired. One today is worth two tomorrows—wait."
  }

  return { score, label: getScoreLabel(score), instruction }
}

// Calculate all task scores from weather data
export function calculateAllTaskScores(weather: WeatherData): TaskScores {
  const now = new Date()
  const currentHour = now.getHours()

  const metrics: WeatherMetrics = {
    temperature: weather.current.temperature,
    humidity: weather.current.humidity,
    windSpeed: weather.current.windSpeed,
    windGusts: weather.current.windGusts,
    precipitation: weather.current.precipitation,
    precipProbability: weather.hourly.precipitationProbability[currentHour] || 0,
    feelsLike: weather.current.feelsLike,
    month: now.getMonth() + 1,
  }

  return {
    sower: calculateSowerScore(metrics),
    shepherd: calculateShepherdScore(metrics),
    keeper: calculateKeeperScore(metrics),
    builder: calculateBuilderScore(metrics),
  }
}

// NativePulse - Seed Stratification Tracker for Tennessee Native Plants
export function calculateNativePulse(metrics: WeatherMetrics): NativePulseResult {
  const { temperature, precipitation, month } = metrics

  // Active Stratification: Dec-Feb, temp 28-40°F
  // Seeds need cold moist stratification
  if (month >= 12 || month <= 2) {
    if (temperature >= 28 && temperature <= 40) {
      const daysIntoSeason = month === 12 ? 0 : (month * 30)
      const progress = Math.min(100, Math.round((daysIntoSeason / 90) * 100))
      return {
        status: 'Active Stratification',
        icon: '❄️',
        color: 'text-blue-400',
        tip: 'Cold moist stratification in progress. Native seeds are breaking dormancy.',
        progress,
      }
    }
    // Too cold or too warm
    return {
      status: 'Active Stratification',
      icon: '❄️',
      color: 'text-blue-400',
      tip: temperature < 28
        ? 'Hard freeze—cover seed beds or move containers to shelter.'
        : 'Warm spell may interrupt stratification. Monitor closely.',
      progress: 50,
    }
  }

  // Germination Trigger: Mar-Apr, temp >55°F with recent rain
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

  // Growing Season: May-Oct
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

  // Dormant: November (default)
  return {
    status: 'Dormant',
    icon: '💤',
    color: 'text-gray-400',
    tip: 'Plants entering dormancy. Collect seeds and prepare for stratification.',
    progress: 0,
  }
}
