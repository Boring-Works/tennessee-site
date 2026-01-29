'use client'

import Link from 'next/link'
import styles from './welcome.module.css'

interface CTAGroupProps {
  primaryText: string
  primaryHref: string
  archiveText: string
  archiveDescription: string
  archiveHref: string
  secondaryText: string
  secondaryHref: string
}

export function CTAGroup({
  primaryText,
  primaryHref,
  archiveText,
  archiveDescription,
  archiveHref,
  secondaryText,
  secondaryHref,
}: CTAGroupProps) {
  return (
    <div className={styles.ctaGroup}>
      <Link href={primaryHref} className={styles.primaryCTA}>
        {primaryText}
      </Link>

      <Link href={archiveHref} className={styles.archiveCTA}>
        <span className={styles.archiveTitle}>{archiveText}</span>
        <span className={styles.archiveDescription}>{archiveDescription}</span>
        <span className={styles.archiveArrow} aria-hidden="true">
          Enter the Archive →
        </span>
      </Link>

      <Link href={secondaryHref} className={styles.secondaryLink}>
        {secondaryText} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
