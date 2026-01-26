// Weather data fetching and transformation
import type { WeatherData, CurrentConditions, HourlyForecast, DailyForecast, Location } from './types'

// Sullivan County, TN (Rocky Mount location)
export const DEFAULT_LAT = 36.52
export const DEFAULT_LON = -82.26

// Unit conversion constants
const METERS_TO_INCHES = 39.3701
const CM_TO_INCHES = 0.393701

interface OpenMeteoResponse {
  latitude: number
  longitude: number
  timezone: string
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    wind_gusts_10m: number
    surface_pressure: number
    soil_temperature_6cm?: number
    snow_depth?: number  // NOTE: Open-Meteo returns this in METERS
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
    precipitation: number[]
    weather_code: number[]
    snowfall?: number[]  // In inches (we set precipitation_unit=inch)
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
    precipitation_probability_max: number[]
    weather_code: number[]
    sunrise: string[]
    sunset: string[]
    snowfall_sum?: number[]  // In inches (we set precipitation_unit=inch)
  }
}

export function transformWeatherData(data: OpenMeteoResponse): WeatherData {
  // Convert snow_depth from meters to inches
  // Open-Meteo has no unit option for snow_depth - it's always meters
  const snowDepthInches = data.current.snow_depth !== undefined 
    ? data.current.snow_depth * METERS_TO_INCHES 
    : undefined

  const current: CurrentConditions = {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    windGusts: data.current.wind_gusts_10m,
    pressure: data.current.surface_pressure,
    soilTemperature: data.current.soil_temperature_6cm,
    snowDepth: snowDepthInches,  // Now in inches
  }

  const hourly: HourlyForecast = {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    precipitationProbability: data.hourly.precipitation_probability,
    precipitation: data.hourly.precipitation,
    weatherCode: data.hourly.weather_code,
    snowfall: data.hourly.snowfall,  // Already in inches (precipitation_unit=inch)
  }

  const daily: DailyForecast = {
    time: data.daily.time,
    temperatureMax: data.daily.temperature_2m_max,
    temperatureMin: data.daily.temperature_2m_min,
    precipitationSum: data.daily.precipitation_sum,
    precipitationProbability: data.daily.precipitation_probability_max,
    weatherCode: data.daily.weather_code,
    sunrise: data.daily.sunrise,
    sunset: data.daily.sunset,
    snowfallSum: data.daily.snowfall_sum,  // Already in inches
  }

  const location: Location = {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
  }

  return { current, hourly, daily, location }
}

export async function fetchWeatherData(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON
): Promise<WeatherData> {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  const data = await response.json()
  return transformWeatherData(data)
}
