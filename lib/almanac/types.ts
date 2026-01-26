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
  soilTemperature?: number
  snowDepth?: number
  cloudCover?: number        // NEW: 0-100%
  visibility?: number        // NEW: in meters
  dewPoint?: number          // NEW: in °F
  uvIndex?: number           // NEW: 0-11+
  isDay?: boolean            // NEW: true if daytime
}

export interface HourlyForecast {
  time: string[]
  temperature: number[]
  feelsLike?: number[]       // NEW
  precipitationProbability: number[]
  precipitation: number[]
  weatherCode: number[]
  snowfall?: number[]
  snowDepth?: number[]       // NEW: running snow depth
  cloudCover?: number[]      // NEW
  visibility?: number[]      // NEW
  windSpeed?: number[]       // NEW
  windGusts?: number[]       // NEW
  dewPoint?: number[]        // NEW
  uvIndex?: number[]         // NEW
  freezingLevel?: number[]   // NEW: altitude in meters where temp = 32°F
}

export interface DailyForecast {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  feelsLikeMax?: number[]    // NEW
  feelsLikeMin?: number[]    // NEW
  precipitationSum: number[]
  precipitationProbability: number[]
  precipitationHours?: number[]  // NEW
  weatherCode: number[]
  sunrise: string[]
  sunset: string[]
  daylightDuration?: number[]   // NEW: seconds of daylight
  snowfallSum?: number[]
  windSpeedMax?: number[]       // NEW
  windGustsMax?: number[]       // NEW
  windDirectionDominant?: number[]  // NEW
  uvIndexMax?: number[]         // NEW
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

export const DEFAULT_WEATHER: WeatherCodeInfo = {
  condition: 'Unknown',
  icon: 'cloud',
  category: 'cloudy',
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

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? DEFAULT_WEATHER
}

// Snow-related weather codes
export const SNOW_WEATHER_CODES = [71, 73, 75, 77, 85, 86]

// Ice-related weather codes (freezing rain/drizzle)
export const ICE_WEATHER_CODES = [56, 57, 66, 67]

export function isSnowCode(code: number): boolean {
  return SNOW_WEATHER_CODES.includes(code)
}

export function isIceCode(code: number): boolean {
  return ICE_WEATHER_CODES.includes(code)
}

// Visibility descriptions
export function getVisibilityDescription(meters: number): string {
  const miles = meters / 1609.34
  if (miles < 0.25) return 'Near zero visibility'
  if (miles < 0.5) return 'Very poor visibility'
  if (miles < 1) return 'Poor visibility'
  if (miles < 3) return 'Moderate visibility'
  if (miles < 6) return 'Good visibility'
  return 'Excellent visibility'
}

// UV Index descriptions
export function getUVDescription(uv: number): { level: string; advice: string; color: string } {
  if (uv <= 2) return { level: 'Low', advice: 'No protection needed', color: 'text-green-400' }
  if (uv <= 5) return { level: 'Moderate', advice: 'Seek shade midday', color: 'text-yellow-400' }
  if (uv <= 7) return { level: 'High', advice: 'Protection required', color: 'text-orange-400' }
  if (uv <= 10) return { level: 'Very High', advice: 'Extra protection', color: 'text-red-400' }
  return { level: 'Extreme', advice: 'Avoid sun exposure', color: 'text-purple-400' }
}
