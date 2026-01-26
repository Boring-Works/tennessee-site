interface WaxSealSVGProps {
  className?: string;
  size?: number;
}

export function WaxSealSVG({ className = '', size = 40 }: WaxSealSVGProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <defs>
        <filter id="seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
        </filter>
        <radialGradient id="seal-gradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#a82828"/>
          <stop offset="50%" stopColor="#722F37"/>
          <stop offset="80%" stopColor="#5a2329"/>
          <stop offset="100%" stopColor="#4a1f24"/>
        </radialGradient>
        <radialGradient id="seal-highlight" cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      {/* Main seal body */}
      <circle
        cx="50" cy="50" r="46"
        fill="url(#seal-gradient)"
        filter="url(#seal-shadow)"
      />

      {/* Inner highlight */}
      <circle
        cx="50" cy="50" r="44"
        fill="url(#seal-highlight)"
      />

      {/* Gold ring */}
      <circle
        cx="50" cy="50" r="38"
        fill="none"
        stroke="#C9A227"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* RM Text */}
      <text
        x="50" y="58"
        textAnchor="middle"
        fill="#C9A227"
        fontFamily="var(--font-cinzel), Cinzel, serif"
        fontSize="28"
        fontWeight="bold"
      >
        RM
      </text>

      {/* Year text */}
      <text
        x="50" y="72"
        textAnchor="middle"
        fill="#C9A227"
        fontFamily="var(--font-cinzel), Cinzel, serif"
        fontSize="8"
        fontWeight="600"
        letterSpacing="0.1em"
        opacity="0.7"
      >
        EST. 1770
      </text>
    </svg>
  );
}
