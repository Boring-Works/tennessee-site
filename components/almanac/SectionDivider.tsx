'use client'

interface SectionDividerProps {
  label: string
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="flex-1 h-px bg-almanac-gold/20" />
      <span className="text-sm font-serif text-almanac-parchment/60 tracking-wide">{label}</span>
      <div className="flex-1 h-px bg-almanac-gold/20" />
    </div>
  )
}
