'use client'

import styles from './welcome.module.css'

interface HeroYearProps {
  year: string
  contextLine: string
}

export function HeroYear({ year, contextLine }: HeroYearProps) {
  return (
    <div className={styles.heroYearContainer}>
      <span className={styles.heroYear}>{year}</span>
      <p className={styles.contextLine}>{contextLine}</p>
    </div>
  )
}
