'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Radar, Play, Pause, ExternalLink, MapPin } from 'lucide-react'

interface PrecipitationRadarProps {
  latitude: number
  longitude: number
}

interface RadarFrame {
  time: number
  path: string
}

const RETRY_DELAYS = [1000, 2000, 4000]
const MAX_RETRIES = 3

export default function PrecipitationRadar({ latitude, longitude }: PrecipitationRadarProps) {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Fetch radar data from RainViewer API with retry logic
  useEffect(() => {
    let isMounted = true
    let retryTimeout: NodeJS.Timeout | null = null

    async function fetchRadarData(attempt = 0) {
      if (!isMounted) return
      
      try {
        setLoading(true)
        if (attempt > 0) setRetryCount(attempt)
        
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
        if (!response.ok) throw new Error('Failed to fetch radar data')

        const data = await response.json()
        const radarFrames = data.radar?.past || []
        const recentFrames = radarFrames.slice(-8) // Last 8 frames (40 min)

        if (!isMounted) return
        
        setFrames(recentFrames)
        setCurrentFrame(recentFrames.length - 1)
        setLastUpdated(new Date())
        setError(null)
        setRetryCount(0)
      } catch (err) {
        console.error('Radar fetch error:', err)
        
        if (!isMounted) return
        
        // Retry with exponential backoff
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1]
          retryTimeout = setTimeout(() => fetchRadarData(attempt + 1), delay)
        } else {
          setError('Unable to load radar data')
          setRetryCount(0)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchRadarData()
    
    // Refresh every 5 minutes
    const interval = setInterval(() => fetchRadarData(), 300000)
    
    return () => {
      isMounted = false
      clearInterval(interval)
      if (retryTimeout) clearTimeout(retryTimeout)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 600)

    return () => clearInterval(interval)
  }, [isPlaying, frames.length])

  const frame = frames[currentFrame]
  const timestamp = frame ? new Date(frame.time * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }) : ''

  // ZOOM 9 for local detail (was 6 - too zoomed out)
  // Zoom 9 = ~2km per tile, good for county-level detail
  const zoom = 9
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
          <span className="text-almanac-parchment/60 text-sm">
            {retryCount > 0 ? `Retrying radar (${retryCount}/${MAX_RETRIES})...` : 'Loading radar...'}
          </span>
        </div>
        <div className="aspect-square bg-almanac-midnight/50 rounded animate-pulse" />
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
          <span className="text-almanac-gold font-display">Local Radar</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-almanac-gold/10 hover:bg-almanac-gold/20 transition-colors"
            title={isPlaying ? 'Pause animation' : 'Play animation'}
            aria-label={isPlaying ? 'Pause radar animation' : 'Play radar animation'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-almanac-gold" />
            ) : (
              <Play className="w-4 h-4 text-almanac-gold" />
            )}
          </button>
        </div>
      </div>

      {/* Radar Image - larger aspect ratio for better visibility */}
      <div className="relative aspect-[4/3] bg-almanac-midnight rounded overflow-hidden mb-3">
        {/* Base map layer */}
        <img
          src={`https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`}
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Radar overlay */}
        <img
          src={radarUrl}
          alt="Precipitation radar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Center marker showing your location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-5 h-5 text-almanac-gold drop-shadow-lg" />
        </div>
        {/* Timestamp */}
        <div className="absolute bottom-2 left-2 bg-almanac-midnight/80 px-2 py-1 rounded text-xs text-almanac-parchment">
          {timestamp}
        </div>
        {/* Scale indicator */}
        <div className="absolute bottom-2 right-2 bg-almanac-midnight/80 px-2 py-1 rounded text-xs text-almanac-parchment/60">
          ~10 mi view
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
              idx === currentFrame ? 'bg-almanac-gold' : 'bg-almanac-gold/20 hover:bg-almanac-gold/40'
            }`}
            aria-label={`Frame ${idx + 1} of ${frames.length}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-almanac-parchment/50 mb-3">
        <span>Light</span>
        <div className="flex gap-0.5">
          <div className="w-6 h-2 rounded-sm bg-green-500/70" title="Light rain" />
          <div className="w-6 h-2 rounded-sm bg-yellow-500/70" title="Moderate rain" />
          <div className="w-6 h-2 rounded-sm bg-orange-500/70" title="Heavy rain" />
          <div className="w-6 h-2 rounded-sm bg-red-500/70" title="Intense" />
          <div className="w-6 h-2 rounded-sm bg-purple-500/70" title="Extreme" />
        </div>
        <span>Heavy</span>
      </div>

      {/* Last Updated + External Link */}
      <div className="flex items-center justify-between">
        {lastUpdated && (
          <span className="text-xs text-almanac-parchment/40">
            Updated {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
        )}
        <a
          href={`https://www.rainviewer.com/map.html?loc=${latitude},${longitude},10`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-almanac-gold/70 hover:text-almanac-gold transition-colors"
        >
          <span>Full radar</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  )
}
