'use client'

import Link from 'next/link'
import styles from './welcome.module.css'

interface CTAGroupProps {
  primaryText: string
  primaryHref: string
  secondaryText: string
  secondaryHref: string
}

export function CTAGroup({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: CTAGroupProps) {
  return (
    <div className={styles.ctaGroup}>
      <Link href={primaryHref} className={styles.primaryCTA}>
        <span className={styles.ctaOrnament} aria-hidden="true">
          ✦
        </span>
        {primaryText}
        <span className={styles.ctaOrnament} aria-hidden="true">
          ✦
        </span>
      </Link>
      <Link href={secondaryHref} className={styles.secondaryLink}>
        {secondaryText} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
