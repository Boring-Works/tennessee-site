'use client'

import { useState, useEffect } from 'react'
import { Waves, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { StreamData, StreamStatus } from '@/lib/almanac/types'

interface CreekWatchProps {
  lat: number
  lon: number
}

interface StreamResponse {
  data: StreamData | null
  message?: string
}

function getStatusInfo(status: StreamStatus): {
  label: string
  color: string
  bgColor: string
  icon: typeof TrendingUp
  description: string
} {
  switch (status) {
    case 'flood':
      return {
        label: 'Flood Stage',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20 border-red-500/30',
        icon: AlertTriangle,
        description: 'Flooding possible. Avoid waterways.',
      }
    case 'high':
      return {
        label: 'Above Normal',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20 border-orange-500/30',
        icon: TrendingUp,
        description: 'Higher than typical. Use caution near water.',
      }
    case 'normal':
      return {
        label: 'Normal',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: Minus,
        description: 'Levels are typical for this time of year.',
      }
    case 'low':
      return {
        label: 'Below Normal',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20 border-yellow-500/30',
        icon: TrendingDown,
        description: 'Lower than typical. Limited water flow.',
      }
    case 'drought':
      return {
        label: 'Much Below Normal',
        color: 'text-amber-600',
        bgColor: 'bg-amber-500/20 border-amber-500/30',
        icon: TrendingDown,
        description: 'Significantly low. Drought conditions likely.',
      }
  }
}

export default function CreekWatch({ lat, lon }: CreekWatchProps) {
  const [streamData, setStreamData] = useState<StreamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStreamData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/stream-levels?lat=${lat}&lon=${lon}`)
        const data: StreamResponse = await response.json()

        if (data.data) {
          setStreamData(data.data)
          setError(null)
        } else {
          setStreamData(null)
          setError(data.message || 'No stream data available')
        }
      } catch {
        setError('Failed to fetch stream data')
        setStreamData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStreamData()
  }, [lat, lon])

  // Don't render if loading or no data
  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Waves className="w-4 h-4 text-almanac-gold/50" />
          <div className="h-4 bg-white/10 rounded w-24" />
        </div>
        <div className="h-8 bg-white/10 rounded w-16 mx-auto mb-2" />
        <div className="h-3 bg-white/10 rounded w-32 mx-auto" />
      </div>
    )
  }

  // Don't render if no nearby station
  if (!streamData || error) {
    return null
  }

  const statusInfo = getStatusInfo(streamData.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className={`p-4 rounded-lg border h-full ${statusInfo.bgColor}`}>
      <div className="flex items-center gap-2 mb-3">
        <Waves className="w-4 h-4 text-almanac-gold" />
        <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
          Creek Watch
        </h3>
        <span className="text-xs text-almanac-parchment/40 ml-auto">
          {streamData.distanceMiles} mi away
        </span>
      </div>

      {/* Station Name */}
      <p className="text-xs text-almanac-parchment/60 text-center mb-3 line-clamp-1">
        {streamData.siteName}
      </p>

      {/* Gage Height */}
      <div className="flex items-center justify-center gap-3 mb-3">
        {streamData.gageHeight !== null && (
          <div className="text-center">
            <div className="text-2xl font-bold text-almanac-parchment">
              {streamData.gageHeight.toFixed(1)}
              <span className="text-sm font-normal text-almanac-parchment/50"> ft</span>
            </div>
            <div className="text-xs text-almanac-parchment/40">Gage Height</div>
          </div>
        )}

        {streamData.streamflow !== null && (
          <div className="text-center border-l border-white/10 pl-3">
            <div className="text-lg font-bold text-almanac-parchment">
              {streamData.streamflow.toLocaleString()}
              <span className="text-xs font-normal text-almanac-parchment/50"> cfs</span>
            </div>
            <div className="text-xs text-almanac-parchment/40">Flow</div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
        <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
      </div>

      <p className="text-xs text-almanac-parchment/60 text-center">{statusInfo.description}</p>
    </div>
  )
}
