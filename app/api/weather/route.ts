import { NextResponse } from 'next/server'
import { DEFAULT_LOCATION } from '@/lib/almanac/geocoding'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latParam = searchParams.get('lat')
  const lonParam = searchParams.get('lon')

  // Use DEFAULT_LOCATION from geocoding.ts as single source of truth
  const lat = latParam || String(DEFAULT_LOCATION.latitude)
  const lon = lonParam || String(DEFAULT_LOCATION.longitude)

  // Validate latitude
  const latNum = parseFloat(lat)
  if (isNaN(latNum) || latNum < -90 || latNum > 90) {
    return NextResponse.json(
      { error: 'Invalid latitude. Must be between -90 and 90.' },
      { status: 400 }
    )
  }

  // Validate longitude
  const lonNum = parseFloat(lon)
  if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) {
    return NextResponse.json(
      { error: 'Invalid longitude. Must be between -180 and 180.' },
      { status: 400 }
    )
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    // CURRENT: Expanded for maximum utility
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
      'snow_depth',
      'cloud_cover',
      'visibility',
      'dew_point_2m',
      'uv_index',
      'is_day',
    ].join(','),
    // HOURLY: Full data for detailed forecasts
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'snowfall',
      'snow_depth',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'wind_gusts_10m',
      'dew_point_2m',
      'uv_index',
      'freezing_level_height',
    ].join(','),
    // DAILY: Complete overview
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'precipitation_hours',
      'weather_code',
      'sunrise',
      'sunset',
      'daylight_duration',
      'snowfall_sum',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
      'uv_index_max',
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone: 'America/New_York',
    forecast_days: '7',
    past_days: '2',
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
