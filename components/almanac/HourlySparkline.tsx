'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { HourlyForecast } from '@/lib/almanac/types'

interface HourlySparklineProps {
  hourly: HourlyForecast
}

type TimeRange = '12H' | '24H' | '48H'

// Chart dimensions
const WIDTH = 320
const HEIGHT = 120
const PADDING = { top: 20, right: 10, bottom: 30, left: 35 }
const CHART_WIDTH = WIDTH - PADDING.left - PADDING.right
const CHART_HEIGHT = HEIGHT - PADDING.top - PADDING.bottom

export default function HourlySparkline({ hourly }: HourlySparklineProps) {
  const [range, setRange] = useState<TimeRange>('24H')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Compute all chart data in a single useMemo to avoid dependency issues
  const chartData = useMemo(() => {
    const now = new Date()
    const hours = range === '12H' ? 12 : range === '24H' ? 24 : 48

    // Find first future hour
    let startIndex = 0
    for (let i = 0; i < hourly.time.length; i++) {
      if (new Date(hourly.time[i]) >= now) {
        startIndex = i
        break
      }
    }

    const endIndex = Math.min(startIndex + hours, hourly.time.length)

    const times = hourly.time.slice(startIndex, endIndex)
    const temps = hourly.temperature.slice(startIndex, endIndex)
    const precip = hourly.precipitationProbability.slice(startIndex, endIndex)

    // Temperature range with padding
    const minTemp = Math.min(...temps) - 5
    const maxTemp = Math.max(...temps) + 5

    // Compute scale functions inline
    const xScale = (index: number) => PADDING.left + (index / (temps.length - 1)) * CHART_WIDTH

    const yScale = (temp: number) =>
      PADDING.top + CHART_HEIGHT - ((temp - minTemp) / (maxTemp - minTemp)) * CHART_HEIGHT

    // Create temperature line path
    let linePath = ''
    if (temps.length > 0) {
      const points = temps.map((temp, i) => {
        const x = xScale(i)
        const y = yScale(temp)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      linePath = points.join(' ')
    }

    // Create precipitation bars
    const precipBars = precip.map((prob, i) => ({
      x: xScale(i) - 3,
      height: (prob / 100) * 20,
      probability: prob,
    }))

    // Time labels (show every few hours)
    const step = range === '12H' ? 3 : range === '24H' ? 6 : 12
    const timeLabels: { x: number; label: string }[] = []
    times.forEach((time, i) => {
      if (i % step === 0) {
        const date = new Date(time)
        const hour = date.getHours()
        const label =
          hour === 0 ? '12a' : hour === 12 ? '12p' : hour > 12 ? `${hour - 12}p` : `${hour}a`
        timeLabels.push({ x: xScale(i), label })
      }
    })

    // Freezing line position
    const freezingY = yScale(32)
    const showFreezingLine = minTemp < 32 && maxTemp > 32

    // Data points for interaction
    const dataPoints = temps.map((temp, i) => ({
      x: xScale(i),
      y: yScale(temp),
      temp,
      precip: precip[i],
      time: times[i],
    }))

    return {
      times,
      temps,
      precip,
      minTemp,
      maxTemp,
      linePath,
      precipBars,
      timeLabels,
      freezingY,
      showFreezingLine,
      dataPoints,
    }
  }, [hourly, range])

  // Hovered point info
  const hoveredInfo = useMemo(() => {
    if (hoveredIndex === null || hoveredIndex >= chartData.dataPoints.length) return null

    const point = chartData.dataPoints[hoveredIndex]
    const time = new Date(point.time)
    const hour = time.getHours()
    const timeStr =
      hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`

    return {
      time: timeStr,
      temp: Math.round(point.temp),
      precip: point.precip,
      x: point.x,
      y: point.y,
    }
  }, [hoveredIndex, chartData.dataPoints])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="p-4 rounded-lg bg-white/5 border border-white/10 h-full"
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
          Hourly Forecast
        </h3>
        <div className="flex gap-1">
          {(['12H', '24H', '48H'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                range === r
                  ? 'bg-almanac-gold/20 text-almanac-gold border border-almanac-gold/30'
                  : 'text-almanac-parchment/50 hover:text-almanac-parchment/70'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Freezing line */}
        {chartData.showFreezingLine && (
          <line
            x1={PADDING.left}
            y1={chartData.freezingY}
            x2={WIDTH - PADDING.right}
            y2={chartData.freezingY}
            stroke="#60a5fa"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

        {/* Precipitation bars (bottom) */}
        {chartData.precipBars.map((bar, i) => (
          <rect
            key={`precip-${i}`}
            x={bar.x}
            y={HEIGHT - PADDING.bottom - bar.height}
            width={6}
            height={bar.height}
            fill="#60a5fa"
            opacity={0.3}
          />
        ))}

        {/* Temperature line */}
        <path
          d={chartData.linePath}
          fill="none"
          stroke="#d4a84b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points (invisible hit targets) */}
        {chartData.dataPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r={8}
            fill="transparent"
            onMouseEnter={() => setHoveredIndex(i)}
            onTouchStart={() => setHoveredIndex(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}

        {/* Hover point */}
        {hoveredInfo && <circle cx={hoveredInfo.x} cy={hoveredInfo.y} r={4} fill="#d4a84b" />}

        {/* Y-axis labels */}
        <text
          x={PADDING.left - 5}
          y={PADDING.top + 4}
          textAnchor="end"
          className="fill-almanac-parchment/50 text-[10px]"
        >
          {Math.round(chartData.maxTemp)}°
        </text>
        <text
          x={PADDING.left - 5}
          y={HEIGHT - PADDING.bottom}
          textAnchor="end"
          className="fill-almanac-parchment/50 text-[10px]"
        >
          {Math.round(chartData.minTemp)}°
        </text>

        {/* Freezing label */}
        {chartData.showFreezingLine && (
          <text
            x={PADDING.left - 5}
            y={chartData.freezingY + 3}
            textAnchor="end"
            className="fill-blue-400/70 text-[9px]"
          >
            32°
          </text>
        )}

        {/* X-axis time labels */}
        {chartData.timeLabels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={label.x}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-almanac-parchment/50 text-[10px]"
          >
            {label.label}
          </text>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hoveredInfo && (
        <div className="text-center text-xs text-almanac-parchment/80 mt-2 p-2 bg-white/5 rounded">
          <span className="font-medium">{hoveredInfo.time}</span>
          <span className="mx-2">•</span>
          <span className="text-almanac-gold font-bold">{hoveredInfo.temp}°F</span>
          {hoveredInfo.precip > 0 && (
            <>
              <span className="mx-2">•</span>
              <span className="text-blue-400">{hoveredInfo.precip}% rain</span>
            </>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-almanac-parchment/50">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-almanac-gold rounded" />
          <span>Temperature</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-400/30 rounded-sm" />
          <span>Rain %</span>
        </div>
        {chartData.showFreezingLine && (
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-0.5 bg-blue-400/50 rounded"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #60a5fa 0 2px, transparent 2px 4px)',
              }}
            />
            <span>Freezing</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
