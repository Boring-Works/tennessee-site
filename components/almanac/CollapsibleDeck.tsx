'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapsibleDeckProps {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  badge?: string | number
}

export function CollapsibleDeck({
  title,
  icon,
  defaultOpen = false,
  children,
  badge,
}: CollapsibleDeckProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {/* Header - always visible */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-almanac-gold">{icon}</span>}
          <span className="font-medium text-almanac-parchment">{title}</span>
          {badge !== undefined && (
            <span className="text-xs px-2 py-0.5 bg-almanac-gold/20 text-almanac-gold rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-almanac-parchment/50" />
        ) : (
          <ChevronDown className="w-5 h-5 text-almanac-parchment/50" />
        )}
      </button>

      {/* Content - collapsible with staggered animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.05 }}
          >
            <div className="p-4 border-t border-white/10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
