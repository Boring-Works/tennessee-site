'use client'

import { Droplets } from 'lucide-react'
import { calculateVPD, getVPDLevel } from '@/lib/almanac/vpd'
import { InfoPopup } from './InfoPopup'
import { INFO_CONTENT } from '@/lib/almanac/infoContent'

interface VPDGaugeProps {
  temperature: number // °F
  humidity: number // 0-100
}

export default function VPDGauge({ temperature, humidity }: VPDGaugeProps) {
  const vpd = calculateVPD(temperature, humidity)
  const vpdInfo = getVPDLevel(vpd)

  // Calculate gauge angle (0 to 180 degrees)
  // VPD range: 0 to 2.0 kPa maps to 0 to 180 degrees
  const maxVPD = 2.0
  const clampedVPD = Math.min(Math.max(vpd, 0), maxVPD)
  const angle = (clampedVPD / maxVPD) * 180

  // SVG arc parameters
  const size = 120
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const center = size / 2

  // Create arc path for the gauge background
  const createArc = (startAngle: number, endAngle: number) => {
    const startRad = ((startAngle - 180) * Math.PI) / 180
    const endRad = ((endAngle - 180) * Math.PI) / 180

    const x1 = center + radius * Math.cos(startRad)
    const y1 = center + radius * Math.sin(startRad)
    const x2 = center + radius * Math.cos(endRad)
    const y2 = center + radius * Math.sin(endRad)

    const largeArc = endAngle - startAngle > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  // Needle position
  const needleAngle = ((angle - 180) * Math.PI) / 180
  const needleLength = radius - 10
  const needleX = center + needleLength * Math.cos(needleAngle)
  const needleY = center + needleLength * Math.sin(needleAngle)

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-almanac-gold" />
          <h3 className="text-sm font-medium text-almanac-parchment uppercase tracking-wide">
            VPD
          </h3>
        </div>
        <InfoPopup content={INFO_CONTENT.vpd} iconSize="sm" />
      </div>

      <div className="flex flex-col items-center">
        {/* Gauge SVG */}
        <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
          {/* Background segments */}
          {/* Low (blue): 0-0.4 kPa = 0-36° */}
          <path
            d={createArc(0, 36)}
            fill="none"
            className="stroke-blue-500/30"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Optimal (green): 0.4-1.2 kPa = 36-108° */}
          <path
            d={createArc(36, 108)}
            fill="none"
            className="stroke-green-500/30"
            strokeWidth={strokeWidth}
          />
          {/* High (yellow): 1.2-1.6 kPa = 108-144° */}
          <path
            d={createArc(108, 144)}
            fill="none"
            className="stroke-yellow-500/30"
            strokeWidth={strokeWidth}
          />
          {/* Danger (red): 1.6-2.0 kPa = 144-180° */}
          <path
            d={createArc(144, 180)}
            fill="none"
            className="stroke-red-500/30"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active segment */}
          <path
            d={createArc(0, angle)}
            fill="none"
            className={vpdInfo.bgColor.replace('bg-', 'stroke-')}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            className="stroke-almanac-parchment"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx={center} cy={center} r={4} className="fill-almanac-parchment" />

          {/* Labels */}
          <text
            x={strokeWidth / 2}
            y={center + 15}
            className="fill-almanac-parchment/50 text-[8px]"
          >
            0
          </text>
          <text
            x={size - strokeWidth}
            y={center + 15}
            textAnchor="end"
            className="fill-almanac-parchment/50 text-[8px]"
          >
            2.0
          </text>
        </svg>

        {/* Value display */}
        <div className="text-center -mt-2">
          <div className={`text-2xl font-bold ${vpdInfo.color}`}>{vpd.toFixed(2)}</div>
          <div className="text-xs text-almanac-parchment/50">kPa</div>
        </div>

        {/* Status */}
        <div className={`mt-2 text-sm font-medium ${vpdInfo.color}`}>{vpdInfo.label}</div>
        <p className="text-xs text-almanac-parchment/60 text-center mt-1 leading-relaxed">
          {vpdInfo.recommendation}
        </p>
      </div>
    </div>
  )
}
