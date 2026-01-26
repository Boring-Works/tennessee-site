// Almanac TypeScript interfaces

export interface WeatherData {
  current: CurrentConditions
  hourly: HourlyForecast
  daily: DailyForecast
  location: Location
}

export interface CurrentConditions {
  temperature: number
  feelsLike: number
  humidity: number
  precipitation: number
  weatherCode: number
  windSpeed: number
  windDirection: number
  windGusts: number
  pressure: number
  soilTemperature?: number // 6cm depth - for planting decisions
}

export interface HourlyForecast {
  time: string[]
  temperature: number[]
  precipitationProbability: number[]
  precipitation: number[]
  weatherCode: number[]
}

export interface DailyForecast {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  precipitationSum: number[]
  precipitationProbability: number[]
  weatherCode: number[]
  sunrise: string[]
  sunset: string[]
}

export interface Location {
  latitude: number
  longitude: number
  timezone: string
}

export interface TaskScore {
  score: number // 1-10
  label: 'Perfect' | 'Good' | 'Fair' | 'Poor' | 'Avoid'
  instruction: string
}

export interface TaskScores {
  sower: TaskScore
  shepherd: TaskScore
  keeper: TaskScore
  builder: TaskScore
}

export interface MoonData {
  phase: number // 0-1 (0 = new, 0.5 = full)
  illumination: number // 0-1
  phaseName: string
  emoji: string
}

export interface WeatherMetrics {
  temperature: number
  humidity: number
  windSpeed: number
  windGusts: number
  precipitation: number
  precipProbability: number
  feelsLike: number
  month: number
}

// WMO Weather codes mapping
export interface WeatherCodeInfo {
  condition: string
  icon: string
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm'
}

export const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { condition: 'Clear sky', icon: 'sun', category: 'clear' },
  1: { condition: 'Mainly clear', icon: 'sun', category: 'clear' },
  2: { condition: 'Partly cloudy', icon: 'cloud-sun', category: 'cloudy' },
  3: { condition: 'Overcast', icon: 'cloud', category: 'cloudy' },
  45: { condition: 'Fog', icon: 'cloud-fog', category: 'fog' },
  48: { condition: 'Depositing rime fog', icon: 'cloud-fog', category: 'fog' },
  51: { condition: 'Light drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  53: { condition: 'Moderate drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  55: { condition: 'Dense drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  56: { condition: 'Light freezing drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  57: { condition: 'Dense freezing drizzle', icon: 'cloud-drizzle', category: 'drizzle' },
  61: { condition: 'Slight rain', icon: 'cloud-rain', category: 'rain' },
  63: { condition: 'Moderate rain', icon: 'cloud-rain', category: 'rain' },
  65: { condition: 'Heavy rain', icon: 'cloud-rain', category: 'rain' },
  66: { condition: 'Light freezing rain', icon: 'cloud-rain', category: 'rain' },
  67: { condition: 'Heavy freezing rain', icon: 'cloud-rain', category: 'rain' },
  71: { condition: 'Slight snow', icon: 'snowflake', category: 'snow' },
  73: { condition: 'Moderate snow', icon: 'snowflake', category: 'snow' },
  75: { condition: 'Heavy snow', icon: 'snowflake', category: 'snow' },
  77: { condition: 'Snow grains', icon: 'snowflake', category: 'snow' },
  80: { condition: 'Slight rain showers', icon: 'cloud-rain', category: 'rain' },
  81: { condition: 'Moderate rain showers', icon: 'cloud-rain', category: 'rain' },
  82: { condition: 'Violent rain showers', icon: 'cloud-rain', category: 'rain' },
  85: { condition: 'Slight snow showers', icon: 'snowflake', category: 'snow' },
  86: { condition: 'Heavy snow showers', icon: 'snowflake', category: 'snow' },
  95: { condition: 'Thunderstorm', icon: 'cloud-lightning', category: 'thunderstorm' },
  96: { condition: 'Thunderstorm with slight hail', icon: 'cloud-lightning', category: 'thunderstorm' },
  99: { condition: 'Thunderstorm with heavy hail', icon: 'cloud-lightning', category: 'thunderstorm' },
}
