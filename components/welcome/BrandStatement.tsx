'use client'

import styles from './welcome.module.css'

interface BrandStatementProps {
  headline: string
  descriptor: string
  tagline: string
}

export function BrandStatement({ headline, descriptor, tagline }: BrandStatementProps) {
  return (
    <div className={styles.brandContainer}>
      <h1 className={styles.brandHeadline}>{headline}</h1>
      <p className={styles.brandDescriptor}>{descriptor}</p>
      <div className={styles.taglineContainer}>
        <span className={styles.taglineText}>{tagline}</span>
      </div>
    </div>
  )
}
