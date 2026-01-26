'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Radar, RefreshCw, ExternalLink } from 'lucide-react'

interface PrecipitationRadarProps {
  latitude: number
  longitude: number
}

interface RadarFrame {
  time: number
  path: string
}

export default function PrecipitationRadar({ latitude, longitude }: PrecipitationRadarProps) {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Fetch radar data from RainViewer API
  useEffect(() => {
    async function fetchRadarData() {
      try {
        setLoading(true)
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
        if (!response.ok) throw new Error('Failed to fetch radar data')

        const data = await response.json()
        const radarFrames = data.radar?.past || []
        const recentFrames = radarFrames.slice(-6) // Last 6 frames (30 min)

        setFrames(recentFrames)
        setCurrentFrame(recentFrames.length - 1)
        setError(null)
      } catch (err) {
        console.error('Radar fetch error:', err)
        setError('Unable to load radar data')
      } finally {
        setLoading(false)
      }
    }

    fetchRadarData()
    // Refresh every 10 minutes
    const interval = setInterval(fetchRadarData, 600000)
    return () => clearInterval(interval)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 500)

    return () => clearInterval(interval)
  }, [isPlaying, frames.length])

  const frame = frames[currentFrame]
  const timestamp = frame ? new Date(frame.time * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }) : ''

  // Calculate tile coordinates for the location
  const zoom = 6
  const tileX = Math.floor((longitude + 180) / 360 * Math.pow(2, zoom))
  const tileY = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Radar className="w-5 h-5 text-almanac-gold animate-pulse" />
          <span className="text-almanac-parchment/60 text-sm">Loading radar...</span>
        </div>
      </motion.div>
    )
  }

  if (error || frames.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <Radar className="w-5 h-5 text-almanac-gold/50" />
          <span className="text-almanac-parchment/50 text-sm">
            {error || 'Radar unavailable'}
          </span>
        </div>
      </motion.div>
    )
  }

  const radarUrl = `https://tilecache.rainviewer.com${frame.path}/256/${zoom}/${tileX}/${tileY}/2/1_1.png`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-almanac-midnight/80 border border-almanac-gold/20 rounded-lg p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-almanac-gold" />
          <span className="text-almanac-gold font-display">Precipitation Radar</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-almanac-gold/10 hover:bg-almanac-gold/20 transition-colors"
            title={isPlaying ? 'Pause' : 'Play animation'}
          >
            <RefreshCw className={`w-4 h-4 text-almanac-gold ${isPlaying ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Radar Image */}
      <div className="relative aspect-square bg-almanac-midnight rounded overflow-hidden mb-3">
        {/* Base map layer - using OpenStreetMap tiles */}
        <img
          src={`https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`}
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Radar overlay */}
        <img
          src={radarUrl}
          alt="Precipitation radar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Timestamp */}
        <div className="absolute bottom-2 left-2 bg-almanac-midnight/80 px-2 py-1 rounded text-xs text-almanac-parchment">
          {timestamp}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex gap-1 mb-3">
        {frames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPlaying(false)
              setCurrentFrame(idx)
            }}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              idx === currentFrame ? 'bg-almanac-gold' : 'bg-almanac-gold/20'
            }`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-almanac-parchment/50">
        <span>Light</span>
        <div className="flex gap-0.5">
          <div className="w-4 h-2 rounded-sm bg-green-500/70" />
          <div className="w-4 h-2 rounded-sm bg-yellow-500/70" />
          <div className="w-4 h-2 rounded-sm bg-orange-500/70" />
          <div className="w-4 h-2 rounded-sm bg-red-500/70" />
          <div className="w-4 h-2 rounded-sm bg-purple-500/70" />
        </div>
        <span>Heavy</span>
      </div>

      {/* External Link */}
      <a
        href={`https://www.rainviewer.com/map.html?loc=${latitude},${longitude},8`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 mt-3 text-xs text-almanac-gold/70 hover:text-almanac-gold transition-colors"
      >
        <span>Full radar view</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  )
}
