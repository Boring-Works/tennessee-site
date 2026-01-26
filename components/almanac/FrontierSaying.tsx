'use client'

interface FrontierSayingProps {
  saying: string
}

export function FrontierSaying({ saying }: FrontierSayingProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-6 max-w-xl mx-auto">
      <p className="font-serif-elegant italic text-xl text-almanac-parchment/90 leading-relaxed text-center">
        "{saying}"
      </p>
    </div>
  )
}
