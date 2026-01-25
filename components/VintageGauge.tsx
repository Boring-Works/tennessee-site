"use client";

import { useEffect, useState } from "react";

interface VintageGaugeProps {
  current: number;
  total: number;
  label?: string;
  showRemaining?: boolean;
  size?: "small" | "medium" | "large";
  theme?: "dark" | "light";
}

export default function VintageGauge({
  current,
  total,
  label = "Registry Capacity",
  showRemaining = true,
  size = "medium",
  theme = "dark",
}: VintageGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((current / total) * 100, 100);
  const remaining = total - current;

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Generate tick marks
  const ticks = [0, 25, 50, 75, 100];
  const tickLabels = [0, Math.round(total * 0.25), Math.round(total * 0.5), Math.round(total * 0.75), total];

  return (
    <div className={`vintage-gauge vintage-gauge--${size} vintage-gauge--${theme}`}>
      {/* Label */}
      <p className="vintage-gauge-label">{label}</p>

      {/* The gauge track */}
      <div className="vintage-gauge-track">
        {/* Tick marks */}
        <div className="vintage-gauge-ticks" aria-hidden="true">
          {ticks.map((tick, i) => (
            <div
              key={tick}
              className="vintage-gauge-tick"
              style={{ left: `${tick}%` }}
            >
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

      {/* Status text */}
      <div className="vintage-gauge-status">
        {showRemaining ? (
          <p className="vintage-gauge-status-text">
            <strong className="vintage-gauge-highlight">{remaining}</strong> of {total} spots remaining
          </p>
        ) : (
          <p className="vintage-gauge-status-text">
            <strong className="vintage-gauge-highlight">{current}</strong> of {total} signatories enrolled
          </p>
        )}
      </div>
    </div>
  );
}
