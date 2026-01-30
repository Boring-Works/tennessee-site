'use client'

import { useEffect, useState, useMemo, useId } from 'react'

interface VintageGaugeProps {
  /** Current number enrolled */
  current: number
  /** Total available spots */
  total: number
  /** Label for the gauge */
  label?: string
  /** Whether to show remaining spots vs enrolled */
  showRemaining?: boolean
  /** Size variant */
  size?: 'small' | 'medium' | 'large'
  /** Color theme */
  theme?: 'dark' | 'light'
}

/** Tick mark positions as percentages */
const TICK_POSITIONS = [0, 25, 50, 75, 100] as const

export default function VintageGauge({
  current,
  total,
  label = 'Registry Capacity',
  showRemaining = true,
  size = 'medium',
  theme = 'dark',
}: VintageGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const uniqueId = useId()

  // Memoize percentage calculation
  const percentage = useMemo(() => Math.min((current / total) * 100, 100), [current, total])
  const remaining = total - current

  // Track if we're in the initial animation phase
  const isAnimating = animatedValue !== percentage

  // Animate on mount - only set the target value, CSS handles the transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  // Memoize tick labels calculation
  const tickLabels = useMemo(
    () => [0, Math.round(total * 0.25), Math.round(total * 0.5), Math.round(total * 0.75), total],
    [total]
  )

  // Generate a stable, unique ID for aria-labelledby
  const labelId = `gauge-label-${uniqueId}`

  // Status text for screen readers
  const statusText = showRemaining
    ? `${remaining} of ${total} spots remaining`
    : `${current} of ${total} signatories enrolled`

  return (
    <div
      className={`vintage-gauge vintage-gauge--${size} vintage-gauge--${theme}`}
      aria-busy={isAnimating}
      role="group"
      aria-label={`${label}: ${statusText}`}
    >
      {/* Label */}
      <p className="vintage-gauge-label" id={labelId}>
        {label}
      </p>

      {/* The gauge track */}
      <div className="vintage-gauge-track">
        {/* Tick marks */}
        <div className="vintage-gauge-ticks" aria-hidden="true">
          {TICK_POSITIONS.map((tick, i) => (
            <div key={tick} className="vintage-gauge-tick" style={{ left: `${tick}%` }}>
              <span className="vintage-gauge-tick-line" />
              <span className="vintage-gauge-tick-label">{tickLabels[i]}</span>
            </div>
          ))}
        </div>

        {/* Fill bar */}
        <div className="vintage-gauge-fill-container">
          <div
            className="vintage-gauge-fill"
            style={{ width: `${animatedValue}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-labelledby={labelId}
            aria-valuetext={statusText}
          />
          {/* Needle indicator */}
          <div
            className="vintage-gauge-needle"
            style={{ left: `${animatedValue}%` }}
            aria-hidden="true"
          >
            <span className="vintage-gauge-needle-tip" />
          </div>
        </div>

        {/* Texture overlay */}
        <div className="vintage-gauge-texture" aria-hidden="true" />
      </div>

      {/* Status text - hidden from screen readers since we have aria-label */}
      <div className="vintage-gauge-status" aria-hidden="true">
        {showRemaining ? (
          <p className="vintage-gauge-status-text">
            <strong className="vintage-gauge-highlight">{remaining}</strong> of {total} spots
            remaining
          </p>
        ) : (
          <p className="vintage-gauge-status-text">
            <strong className="vintage-gauge-highlight">{current}</strong> of {total} signatories
            enrolled
          </p>
        )}
      </div>
    </div>
  )
}
