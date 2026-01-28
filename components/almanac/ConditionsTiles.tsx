'use client'

import { Sun, Eye, Cloud, Wind, Droplets, Moon } from 'lucide-react'
import type { MoonData } from '@/lib/almanac/types'

interface ConditionsTilesProps {
  uvIndex?: number
  visibility?: number // in meters
  cloudCover?: number // percentage
  windGusts?: number
  pressure?: number
  moon?: MoonData | null
  aqi?: number | null
}

function formatVisibility(meters?: number): string {
  if (!meters) return '--'
  const miles = meters / 1609.34
  if (miles >= 10) return '10+ mi'
  return `${miles.toFixed(1)} mi`
}

function getUVLabel(uv?: number): { label: string; color: string } {
  if (!uv) return { label: '--', color: 'text-almanac-parchment/50' }
  if (uv <= 2) return { label: 'Low', color: 'text-green-400' }
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400' }
  if (uv <= 7) return { label: 'High', color: 'text-orange-400' }
  if (uv <= 10) return { label: 'Very High', color: 'text-red-400' }
  return { label: 'Extreme', color: 'text-purple-400' }
}

function getAQILabel(aqi?: number | null): { label: string; color: string } {
  if (!aqi) return { label: '--', color: 'text-almanac-parchment/50' }
  if (aqi <= 50) return { label: 'Good', color: 'text-green-400' }
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-400' }
  if (aqi <= 150) return { label: 'Unhealthy (SG)', color: 'text-orange-400' }
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-400' }
  return { label: 'Hazardous', color: 'text-purple-400' }
}

export function ConditionsTiles({
  uvIndex,
  visibility,
  cloudCover,
  windGusts,
  moon,
  aqi,
}: ConditionsTilesProps) {
  const uvInfo = getUVLabel(uvIndex)
  const aqiInfo = getAQILabel(aqi)

  const tiles = [
    {
      icon: <Sun className="w-4 h-4" />,
      label: 'UV',
      value: uvIndex !== undefined ? String(Math.round(uvIndex)) : '--',
      sublabel: uvInfo.label,
      color: uvInfo.color,
      show: uvIndex !== undefined,
    },
    {
      icon: <Eye className="w-4 h-4" />,
      label: 'Visibility',
      value: formatVisibility(visibility),
      sublabel: '',
      color: 'text-almanac-parchment',
      show: visibility !== undefined,
    },
    {
      icon: <Cloud className="w-4 h-4" />,
      label: 'Clouds',
      value: cloudCover !== undefined ? `${Math.round(cloudCover)}%` : '--',
      sublabel: '',
      color: 'text-almanac-parchment',
      show: cloudCover !== undefined,
    },
    {
      icon: <Wind className="w-4 h-4" />,
      label: 'Gusts',
      value: windGusts ? `${Math.round(windGusts)}` : '--',
      sublabel: windGusts ? 'mph' : '',
      color: windGusts && windGusts > 25 ? 'text-amber-400' : 'text-almanac-parchment',
      show: windGusts !== undefined && windGusts > 0,
    },
    {
      icon: <Droplets className="w-4 h-4" />,
      label: 'AQI',
      value: aqi ? String(Math.round(aqi)) : '--',
      sublabel: aqiInfo.label,
      color: aqiInfo.color,
      show: aqi !== undefined && aqi !== null,
    },
    {
      icon: <Moon className="w-4 h-4" />,
      label: 'Moon',
      value: moon?.emoji || '--',
      sublabel: moon?.phaseName || '',
      color: 'text-almanac-parchment',
      show: moon !== null,
    },
  ].filter((t) => t.show)

  return (
    <div className="grid grid-cols-3 gap-2">
      {tiles.map((tile, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-almanac-parchment/60 mb-1">
            {tile.icon}
            <span className="text-xs">{tile.label}</span>
          </div>
          <div className={`text-lg font-semibold ${tile.color}`}>{tile.value}</div>
          {tile.sublabel && (
            <div className={`text-xs ${tile.color} opacity-80`}>{tile.sublabel}</div>
          )}
        </div>
      ))}
    </div>
  )
}
