import React from 'react'
import styles from './CardGrid.module.css'

export interface CardGridProps {
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

/**
 * CardGrid - Responsive grid container for cards
 *
 * Provides consistent grid layout for card collections with configurable
 * columns and gap sizes. Automatically responsive on mobile.
 *
 * @example
 * <CardGrid columns={3} gap="md">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </CardGrid>
 */
export function CardGrid({ columns = 3, gap = 'md', children, className = '' }: CardGridProps) {
  const gridClasses = [
    styles.grid,
    styles[`grid--columns-${columns}`],
    styles[`grid--gap-${gap}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={gridClasses}>{children}</div>
}
