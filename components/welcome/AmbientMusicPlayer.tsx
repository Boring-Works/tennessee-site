'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Track {
  id: string
  name: string
  artist: string
  src: string
  license: string
}

interface AmbientMusicPlayerProps {
  /** Initial volume (0-1) */
  initialVolume?: number
}

// Curated frontier ambiance tracks
const TRACKS: Track[] = [
  {
    id: 'the-morning',
    name: 'Dawn on the Frontier',
    artist: 'PaulYudin',
    src: '/audio/the-morning.mp3',
    license: 'Royalty-Free via Pixabay',
  },
]

// Waveform bars animation - defined outside component to avoid re-creation on render
function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[2px] h-5 w-5">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[3px] bg-[var(--gold-primary)] rounded-full transition-all duration-150 ${
            playing ? 'animate-waveform' : 'h-1'
          }`}
          style={{
            animationDelay: playing ? `${bar * 100}ms` : '0ms',
            height: playing ? undefined : '4px',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Frontier Ambiance Player
 *
 * An elegant, expandable music player for period-appropriate ambient sounds.
 * Features animated waveform visualization and colonial-themed styling.
 */
export function AmbientMusicPlayer({ initialVolume = 0.3 }: AmbientMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(initialVolume)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentTrack = TRACKS[currentTrackIndex]

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(currentTrack.src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'none'
    audioRef.current = audio

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      audio.pause()
      audio.src = ''
    }
  }, [currentTrack.src])

  // Smooth fade function
  const fadeAudio = useCallback(
    (fadeIn: boolean) => {
      const audio = audioRef.current
      if (!audio) return

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

      const targetVolume = fadeIn ? volume : 0
      const step = fadeIn ? 0.02 : -0.02
      const duration = 1000
      const steps = Math.abs(targetVolume - audio.volume) / Math.abs(step)
      const interval = duration / steps

      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) return

        const newVolume = audioRef.current.volume + step

        if (fadeIn && newVolume >= targetVolume) {
          audioRef.current.volume = targetVolume
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        } else if (!fadeIn && newVolume <= 0) {
          audioRef.current.volume = 0
          audioRef.current.pause()
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        } else {
          audioRef.current.volume = Math.max(0, Math.min(1, newVolume))
        }
      }, interval)
    },
    [volume]
  )

  // Toggle playback
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      fadeAudio(false)
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        fadeAudio(true)
        setIsPlaying(true)
      } catch {
        // Audio playback requires user interaction - silently handle
      }
    }
  }, [isPlaying, fadeAudio])

  // Handle volume change
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value)
      setVolume(newVolume)
      if (audioRef.current && isPlaying) {
        audioRef.current.volume = newVolume
      }
    },
    [isPlaying]
  )

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      {/* Expanded Panel */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ease-out origin-bottom-right ${
          isExpanded
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-[#0c1a2e]/95 backdrop-blur-lg border border-[var(--gold-shimmer)] rounded-lg p-4 min-w-[220px] shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-cinzel text-[10px] font-semibold tracking-[0.15em] text-[var(--gold-shimmer)] uppercase">
              Frontier Ambiance
            </h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors p-1"
              aria-label="Close music panel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-shimmer)] to-transparent mb-3" />

          {/* Track Info */}
          <div className="mb-4">
            <p className="font-cormorant text-sm text-[var(--text-primary)] mb-0.5">
              {currentTrack.name}
            </p>
            <p className="font-cormorant text-xs text-[var(--text-secondary)] italic">
              {currentTrack.artist}
            </p>
          </div>

          {/* Play/Pause Control */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 bg-[var(--gold-primary)]/10 hover:bg-[var(--gold-primary)]/20 border border-[var(--gold-shimmer)] hover:border-[var(--gold-primary)] rounded-full transition-all duration-200"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  className="w-4 h-4 text-[var(--gold-primary)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-[var(--gold-primary)] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Waveform Visualization */}
            <div className="flex-1 flex justify-center">
              <WaveformBars playing={isPlaying} />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5L10 5v14l-3.5-3.5H4a1 1 0 01-1-1v-5a1 1 0 011-1h2.5z"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-[var(--text-secondary)]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold-primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--gold-primary)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              aria-label="Volume"
            />
          </div>

          {/* License note */}
          <p className="mt-3 text-[9px] text-[var(--text-secondary)]/60 font-cormorant">
            {currentTrack.license}
          </p>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-[var(--gold-primary)]/15 border-[var(--gold-primary)] shadow-[0_0_20px_rgba(201,162,39,0.3)]'
            : 'bg-[#0c1a2e]/80 border-[var(--gold-shimmer)] hover:border-[var(--gold-primary)] hover:bg-[#0c1a2e]/90'
        }`}
        aria-label={isExpanded ? 'Close music player' : 'Open music player'}
        aria-expanded={isExpanded}
      >
        {isPlaying ? (
          <WaveformBars playing={true} />
        ) : (
          <svg
            className="w-5 h-5 text-[var(--gold-shimmer)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.3" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}
