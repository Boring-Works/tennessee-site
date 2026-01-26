// Weather data fetching and transformation
import type { WeatherData, CurrentConditions, HourlyForecast, DailyForecast, Location } from './types'

// Sullivan County, TN (Rocky Mount location)
export const DEFAULT_LAT = 36.52
export const DEFAULT_LON = -82.26

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
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
    precipitation: number[]
    weather_code: number[]
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
  }
}

export function transformWeatherData(data: OpenMeteoResponse): WeatherData {
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
  }

  const hourly: HourlyForecast = {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    precipitationProbability: data.hourly.precipitation_probability,
    precipitation: data.hourly.precipitation,
    weatherCode: data.hourly.weather_code,
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
