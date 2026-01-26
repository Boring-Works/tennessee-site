import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'
import { WEATHER_CODES } from './types'

// Map icon string names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  'sun': Sun,
  'cloud': Cloud,
  'cloud-sun': CloudSun,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  'snowflake': Snowflake,
}

/**
 * Get the Lucide icon component for a weather code
 */
export function getWeatherIcon(weatherCode: number): LucideIcon {
  const info = WEATHER_CODES[weatherCode]
  if (info && ICON_MAP[info.icon]) {
    return ICON_MAP[info.icon]
  }
  // Default to sun if unknown code
  return Sun
}

/**
 * Get the weather condition text for a weather code
 */
export function getWeatherCondition(weatherCode: number): string {
  const info = WEATHER_CODES[weatherCode]
  return info?.condition || 'Unknown'
}
