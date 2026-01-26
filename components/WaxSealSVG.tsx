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
      {/* Dark fill */}
      <circle
        cx="50" cy="50" r="46"
        fill="#0a1628"
      />

      {/* Gold ring */}
      <circle
        cx="50" cy="50" r="42"
        fill="none"
        stroke="#C9A227"
        strokeWidth="2"
      />

      {/* RM Text */}
      <text
        x="50" y="60"
        textAnchor="middle"
        fill="#C9A227"
        fontFamily="var(--font-cinzel), Cinzel, serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="0.05em"
      >
        RM
      </text>
    </svg>
  );
}
