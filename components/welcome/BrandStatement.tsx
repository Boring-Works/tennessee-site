'use client'

import styles from './welcome.module.css'

interface BrandStatementProps {
  headline: string
  tagline: string
}

export function BrandStatement({ headline, tagline }: BrandStatementProps) {
  return (
    <div className={styles.brandContainer}>
      <h1 className={styles.brandHeadline}>{headline}</h1>
      <div className={styles.taglineContainer}>
        <span className={styles.taglineLine} aria-hidden="true" />
        <span className={styles.taglineText}>{tagline}</span>
        <span className={styles.taglineLine} aria-hidden="true" />
      </div>
    </div>
  )
}
