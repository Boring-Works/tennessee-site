import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  variant?: 'default' | 'featured' | 'subtle'
  hover?: boolean
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
}

/**
 * Card - Base card wrapper component
 *
 * Provides consistent card styling across the site with three variants:
 * - default: White background with shadow (standard content cards)
 * - featured: Primary color background with enhanced styling (CTAs, highlights)
 * - subtle: Cream background with border (supporting content)
 *
 * @example
 * <Card variant="default" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </Card>
 */
export function Card({
  variant = 'default',
  hover = false,
  children,
  className = '',
  as: Component = 'div',
}: CardProps) {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    hover ? styles['card--hover'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={cardClasses}>{children}</Component>
}
