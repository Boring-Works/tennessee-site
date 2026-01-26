import { NextResponse } from 'next/server'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

// Sullivan County, TN (Rocky Mount location)
const DEFAULT_LAT = 36.52
const DEFAULT_LON = -82.26

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat') || String(DEFAULT_LAT)
  const lon = searchParams.get('lon') || String(DEFAULT_LON)

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'surface_pressure',
      'soil_temperature_6cm',
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
      'weather_code',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'weather_code',
      'sunrise',
      'sunset',
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone: 'America/New_York',
    forecast_days: '7',
  })

  try {
    const res = await fetch(`${OPEN_METEO_URL}?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!res.ok) {
      throw new Error('Weather API error')
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Weather fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
