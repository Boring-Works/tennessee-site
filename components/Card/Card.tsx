import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base styles (Tailwind)
  'relative rounded-[--radius-card] transition-all duration-[--transition-card] p-[--spacing-card-md] md:p-[--spacing-card-lg]',
  {
    variants: {
      variant: {
        default:
          'bg-white border border-[--color-card-border] shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
        featured: 'bg-primary text-white border border-accent/30',
        subtle: 'bg-cream border-l-[3px] border-accent',
      },
      hover: {
        true: 'cursor-pointer transition-transform',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        hover: true,
        className:
          'hover:-translate-y-0.5 hover:border-secondary hover:shadow-[0_4px_20px_rgba(10,22,40,0.1)]',
      },
      {
        variant: 'featured',
        hover: true,
        className:
          'hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_20px_rgba(201,162,39,0.15)]',
      },
      {
        variant: 'subtle',
        hover: true,
        className:
          'hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      hover: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof cardVariants> {
  as?: 'div' | 'article' | 'section'
  children: React.ReactNode
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
  variant,
  hover,
  as: Component = 'div',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component className={cn(cardVariants({ variant, hover }), className)} {...props}>
      {/* Texture overlay for featured variant */}
      {variant === 'featured' && (
        <div
          className="absolute inset-0 rounded-[--radius-card] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  )
}
