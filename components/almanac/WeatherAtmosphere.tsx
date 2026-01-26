'use client'

import { useMemo } from 'react'
import './weather-atmosphere.css'

interface WeatherAtmosphereProps {
  weatherCode: number
}

type ParticleType = 'dust' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm' | 'overcast'

interface Particle {
  id: number
  left: string
  top: string
  delay: string
  duration: string
  size?: string
  opacity?: number
  width?: string
}

// Determine particle type from weather code
function getParticleType(code: number): ParticleType {
  if (code === 0) return 'dust'
  if (code >= 1 && code <= 3) return 'overcast' // Cloudy - slow cloud shadows
  if (code >= 45 && code <= 48) return 'fog'
  if (code >= 51 && code <= 57) return 'drizzle'
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow'
  if (code >= 95 && code <= 99) return 'storm'
  return 'dust' // Default
}

// Generate random particles with staggered properties
function generateParticles(
  count: number,
  baseDuration: number,
  durationVariance: number,
  baseSize?: number,
  sizeVariance?: number
): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${baseDuration + Math.random() * durationVariance}s`,
    size: baseSize ? `${baseSize + Math.random() * (sizeVariance || 0)}px` : undefined,
    opacity: 0.05 + Math.random() * 0.05,
    width: undefined,
  }))
}

// Generate fog wisps with varying widths
function generateFogWisps(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: '0%',
    top: `${15 + Math.random() * 70}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${20 + Math.random() * 10}s`,
    width: `${200 + Math.random() * 200}px`,
    opacity: 0.04 + Math.random() * 0.02,
  }))
}

export function WeatherAtmosphere({ weatherCode }: WeatherAtmosphereProps) {
  const particleType = getParticleType(weatherCode)

  // Memoize particles to prevent regeneration on re-render
  const particles = useMemo(() => {
    switch (particleType) {
      case 'dust':
        // Clear weather: 15-20 dust motes
        const dustCount = 15 + Math.floor(Math.random() * 6)
        return generateParticles(dustCount, 18, 7, 2, 2)

      case 'overcast':
        // Slow-drifting cloud shadows
        return Array.from({ length: 4 }, (_, i): Particle => ({
          id: i,
          left: '0%',
          top: `${10 + Math.random() * 60}%`,
          delay: `${Math.random() * 20}s`,
          duration: `${45 + Math.random() * 20}s`,  // Very slow: 45-65 seconds
          width: `${300 + Math.random() * 300}px`,  // Large shapes
          opacity: 0.03 + Math.random() * 0.02,     // Very subtle: 3-5%
        }))

      case 'fog':
        return generateFogWisps(4)

      case 'drizzle':
        return generateParticles(35, 1.5, 0.5)

      case 'rain':
        return generateParticles(60, 0.8, 0.4)

      case 'snow':
        return generateParticles(30, 4, 2, 3, 2)

      case 'storm':
        return generateParticles(65, 0.7, 0.3)

      default:
        return []
    }
  }, [particleType])

  // Lightning flash for storms - separate from particles
  const showLightning = particleType === 'storm'

  return (
    <div className="weather-atmosphere" aria-hidden="true">
      {/* Dust motes */}
      {particleType === 'dust' && particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            top: p.top,
            '--dust-delay': p.delay,
            '--dust-duration': p.duration,
            '--dust-size': p.size,
            '--dust-opacity': 0.15,
          } as React.CSSProperties}
        />
      ))}

      {/* Overcast - slow cloud shadows */}
      {particleType === 'overcast' && particles.map((p) => (
        <div
          key={p.id}
          className="cloud-shadow"
          style={{
            top: p.top,
            '--cloud-delay': p.delay,
            '--cloud-duration': p.duration,
            '--cloud-width': p.width,
            '--cloud-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Fog wisps */}
      {particleType === 'fog' && particles.map((p) => (
        <div
          key={p.id}
          className="fog-wisp"
          style={{
            top: p.top,
            '--fog-delay': p.delay,
            '--fog-duration': p.duration,
            '--fog-width': p.width,
            '--fog-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Drizzle */}
      {particleType === 'drizzle' && particles.map((p) => (
        <div
          key={p.id}
          className="rain-drop"
          style={{
            left: p.left,
            '--rain-delay': p.delay,
            '--rain-duration': p.duration,
            '--rain-height': '15px',
            '--rain-opacity': 0.1,
          } as React.CSSProperties}
        />
      ))}

      {/* Rain */}
      {particleType === 'rain' && particles.map((p) => (
        <div
          key={p.id}
          className="rain-drop rain-drop--heavy"
          style={{
            left: p.left,
            '--rain-delay': p.delay,
            '--rain-duration': p.duration,
            '--rain-height': '25px',
            '--rain-opacity': 0.15,
          } as React.CSSProperties}
        />
      ))}

      {/* Snow */}
      {particleType === 'snow' && particles.map((p) => (
        <div
          key={p.id}
          className="snow-flake"
          style={{
            left: p.left,
            '--snow-delay': p.delay,
            '--snow-duration': p.duration,
            '--snow-size': p.size,
            '--snow-opacity': 0.30,
          } as React.CSSProperties}
        />
      ))}

      {/* Storm (rain + lightning) */}
      {particleType === 'storm' && (
        <>
          {particles.map((p) => (
            <div
              key={p.id}
              className="rain-drop rain-drop--heavy"
              style={{
                left: p.left,
                '--rain-delay': p.delay,
                '--rain-duration': p.duration,
                '--rain-height': '25px',
                '--rain-opacity': 0.15,
              } as React.CSSProperties}
            />
          ))}
          <div
            className="lightning-flash"
            style={{
              '--flash-duration': '12s',
              '--flash-delay': `${5 + Math.random() * 5}s`,
            } as React.CSSProperties}
          />
          <div
            className="lightning-flash"
            style={{
              '--flash-duration': '15s',
              '--flash-delay': `${10 + Math.random() * 8}s`,
            } as React.CSSProperties}
          />
        </>
      )}
    </div>
  )
}
