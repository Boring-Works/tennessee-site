'use client'

import { motion } from 'framer-motion'
import { 
  Sun, 
  Eye, 
  Cloud, 
  Droplets, 
  Wind,
  Snowflake,
  Gauge
} from 'lucide-react'
import { getVisibilityDescription, getUVDescription } from '@/lib/almanac/types'

interface CurrentConditionsCardProps {
  cloudCover?: number
  visibility?: number
  dewPoint?: number
  uvIndex?: number
  pressure?: number
  snowDepth?: number
  windGusts?: number
}

export default function CurrentConditionsCard({
  cloudCover,
  visibility,
  dewPoint,
  uvIndex,
  pressure,
  snowDepth,
  windGusts,
}: CurrentConditionsCardProps) {
  const uv = uvIndex !== undefined ? getUVDescription(uvIndex) : null
  const visDesc = visibility !== undefined ? getVisibilityDescription(visibility) : null
  const visibilityMiles = visibility !== undefined ? (visibility / 1609.34).toFixed(1) : null

  // Only show if we have data
  const hasData = cloudCover !== undefined || visibility !== undefined || 
                  dewPoint !== undefined || uvIndex !== undefined || 
                  snowDepth !== undefined

  if (!hasData) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4 card-hover"
    >
      <h3 className="text-sm font-medium text-almanac-gold mb-3">Current Conditions</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Snow Depth - Priority if present */}
        {snowDepth !== undefined && snowDepth > 0 && (
          <div className="flex items-center gap-2 bg-blue-900/20 rounded p-2 col-span-2 sm:col-span-3">
            <Snowflake className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-lg font-bold text-blue-300">{snowDepth.toFixed(1)}&quot;</p>
              <p className="text-xs text-almanac-parchment/50">Snow on ground</p>
            </div>
          </div>
        )}

        {/* UV Index */}
        {uv && uvIndex !== undefined && (
          <div className="flex items-center gap-2">
            <Sun className={`w-4 h-4 ${uv.color}`} />
            <div>
              <p className={`text-sm font-medium ${uv.color}`}>{uv.level}</p>
              <p className="text-xs text-almanac-parchment/50">UV {uvIndex.toFixed(0)}</p>
            </div>
          </div>
        )}

        {/* Visibility */}
        {visibilityMiles && visDesc && (
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-almanac-parchment/60" />
            <div>
              <p className="text-sm font-medium text-almanac-parchment">{visibilityMiles} mi</p>
              <p className="text-xs text-almanac-parchment/50">{visDesc}</p>
            </div>
          </div>
        )}

        {/* Cloud Cover */}
        {cloudCover !== undefined && (
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-almanac-parchment/60" />
            <div>
              <p className="text-sm font-medium text-almanac-parchment">{Math.round(cloudCover)}%</p>
              <p className="text-xs text-almanac-parchment/50">Cloud cover</p>
            </div>
          </div>
        )}

        {/* Dew Point */}
        {dewPoint !== undefined && (
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-almanac-parchment/60" />
            <div>
              <p className="text-sm font-medium text-almanac-parchment">{Math.round(dewPoint)}°</p>
              <p className="text-xs text-almanac-parchment/50">Dew point</p>
            </div>
          </div>
        )}

        {/* Wind Gusts */}
        {windGusts !== undefined && windGusts > 15 && (
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-almanac-parchment/60" />
            <div>
              <p className="text-sm font-medium text-almanac-parchment">{Math.round(windGusts)} mph</p>
              <p className="text-xs text-almanac-parchment/50">Gusts</p>
            </div>
          </div>
        )}

        {/* Pressure */}
        {pressure !== undefined && (
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-almanac-parchment/60" />
            <div>
              <p className="text-sm font-medium text-almanac-parchment">{(pressure / 33.864).toFixed(2)}&quot;</p>
              <p className="text-xs text-almanac-parchment/50">Barometer</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
