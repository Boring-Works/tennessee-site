#!/usr/bin/env npx tsx
/* eslint-disable no-console */
/**
 * Data Validation Script
 *
 * Validates JSON data files against standards defined in docs/DATA-STANDARDS.md
 *
 * Run with: npm run validate:data
 * Or directly: npx tsx scripts/validate-data.ts
 */

import { readFileSync } from 'fs'
import { join } from 'path'

// ANSI colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

function log(message: string, type: 'error' | 'warning' | 'info' | 'success' = 'info') {
  const prefix = {
    error: `${colors.red}[ERROR]${colors.reset}`,
    warning: `${colors.yellow}[WARN]${colors.reset}`,
    info: `${colors.blue}[INFO]${colors.reset}`,
    success: `${colors.green}[OK]${colors.reset}`,
  }
  console.log(`${prefix[type]} ${message}`)
}

interface ValidationResult {
  errors: string[]
  warnings: string[]
  info: string[]
}

// Valid enum values
const VALID_TYPES = ['new', 'enhanced', 'recurring', 'milestone']
const VALID_CATEGORIES = [
  'signature',
  'festival',
  'lecture',
  'workshop',
  'camp',
  'education',
  'tour',
  'family',
  'seasonal',
  'digital',
]
const CLOSED_DAYS = [0, 1, 2] // Sunday, Monday, Tuesday
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Season boundaries for 2026
const SEASON_START = new Date('2026-03-04')
const SEASON_END = new Date('2026-12-20')

function validateEvents(eventsData: {
  events: unknown[]
  recurringPrograms?: Record<string, unknown>
}): ValidationResult {
  const result: ValidationResult = { errors: [], warnings: [], info: [] }

  if (!Array.isArray(eventsData.events)) {
    result.errors.push('events.json: "events" must be an array')
    return result
  }

  const seenIds = new Set<string>()

  for (const event of eventsData.events as Record<string, unknown>[]) {
    const eventId = String(event.id || 'unknown')

    // Check required fields
    if (!event.id) result.errors.push(`Event missing "id" field`)
    if (!event.title) result.errors.push(`${eventId}: Missing "title"`)
    if (!event.date) result.errors.push(`${eventId}: Missing "date"`)
    if (!event.type) result.errors.push(`${eventId}: Missing "type"`)
    if (!event.category) result.errors.push(`${eventId}: Missing "category"`)
    if (!event.description) result.errors.push(`${eventId}: Missing "description"`)
    if (typeof event.requiresTicket !== 'boolean') {
      result.errors.push(
        `${eventId}: "requiresTicket" must be a boolean, got ${typeof event.requiresTicket}`
      )
    }

    // Check ID uniqueness and format
    if (event.id) {
      if (seenIds.has(String(event.id))) {
        result.errors.push(`${eventId}: Duplicate ID`)
      }
      seenIds.add(String(event.id))

      if (!/^[a-z0-9-]+$/.test(String(event.id))) {
        result.errors.push(`${eventId}: ID must be lowercase with hyphens only`)
      }
    }

    // Check date format
    if (event.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(event.date))) {
      result.errors.push(`${eventId}: Date must be YYYY-MM-DD format`)
    }

    // Check type enum
    if (event.type && !VALID_TYPES.includes(String(event.type))) {
      result.errors.push(
        `${eventId}: Invalid type "${event.type}". Must be one of: ${VALID_TYPES.join(', ')}`
      )
    }

    // Check category enum
    if (event.category && !VALID_CATEGORIES.includes(String(event.category))) {
      result.errors.push(
        `${eventId}: Invalid category "${event.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`
      )
    }

    // Check day of week (single-day events only)
    if (event.date && !event.endDate && event.category !== 'digital') {
      const date = new Date(String(event.date) + 'T12:00:00')
      const dayOfWeek = date.getDay()

      if (CLOSED_DAYS.includes(dayOfWeek)) {
        result.warnings.push(
          `${eventId}: Scheduled on ${DAY_NAMES[dayOfWeek]} (${event.date}) - Rocky Mount is closed`
        )
      }
    }

    // Check season boundaries
    if (event.date) {
      const eventDate = new Date(String(event.date) + 'T12:00:00')
      if (eventDate < SEASON_START) {
        result.warnings.push(`${eventId}: Before season opening (March 4)`)
      }
      if (eventDate > SEASON_END) {
        result.warnings.push(`${eventId}: After typical season end (mid-December)`)
      }
    }

    // Check ticket URL logic
    if (event.requiresTicket === true && !event.ticketUrl) {
      result.info.push(`${eventId}: Will use default FareHarbor booking`)
    }

    if (event.requiresTicket === false && event.ticketUrl) {
      result.warnings.push(`${eventId}: Free event has ticketUrl set (should be null)`)
    }

    // Check description length
    if (event.description) {
      const descLength = String(event.description).length
      if (descLength < 50) {
        result.warnings.push(`${eventId}: Description is very short (${descLength} chars)`)
      }
      if (descLength > 300) {
        result.warnings.push(
          `${eventId}: Description is long (${descLength} chars) - consider trimming`
        )
      }
    }

    // Check lecture-specific fields
    if (event.category === 'lecture') {
      if (!event.speaker) {
        result.warnings.push(`${eventId}: Lecture missing "speaker" field`)
      }
    }
  }

  // Validate recurring programs
  if (eventsData.recurringPrograms) {
    for (const [key, program] of Object.entries(eventsData.recurringPrograms)) {
      const prog = program as Record<string, unknown>
      const progId = String(prog.id || key)

      if (!prog.id) result.warnings.push(`recurringPrograms.${key}: Missing "id"`)
      if (!prog.title) result.errors.push(`recurringPrograms.${key}: Missing "title"`)
      if (!prog.dates && progId !== 'behind-the-scenes') {
        result.warnings.push(`recurringPrograms.${key}: Missing "dates" array`)
      }

      // Check dates are on valid days
      if (Array.isArray(prog.dates)) {
        for (const dateStr of prog.dates) {
          const date = new Date(String(dateStr) + 'T12:00:00')
          if (date < SEASON_START) {
            result.warnings.push(`${progId}: Date ${dateStr} is before season opening`)
          }
        }
      }
    }
  }

  return result
}

function validateLectures(lecturesData: { lectures: unknown[] }): ValidationResult {
  const result: ValidationResult = { errors: [], warnings: [], info: [] }

  if (!Array.isArray(lecturesData.lectures)) {
    result.errors.push('lectures.json: "lectures" must be an array')
    return result
  }

  const seenIds = new Set<number>()

  for (const lecture of lecturesData.lectures as Record<string, unknown>[]) {
    const lectureId = `Lecture ${lecture.id || 'unknown'}`

    // Check required fields
    if (lecture.id === undefined) result.errors.push(`${lectureId}: Missing "id"`)
    if (!lecture.title) result.errors.push(`${lectureId}: Missing "title"`)
    if (!lecture.date) result.errors.push(`${lectureId}: Missing "date"`)
    if (!lecture.time) result.errors.push(`${lectureId}: Missing "time"`)
    if (!lecture.speaker) result.errors.push(`${lectureId}: Missing "speaker"`)
    if (!lecture.description) result.errors.push(`${lectureId}: Missing "description"`)
    if (!lecture.topics) result.warnings.push(`${lectureId}: Missing "topics" array`)

    // Check ID uniqueness
    if (typeof lecture.id === 'number') {
      if (seenIds.has(lecture.id)) {
        result.errors.push(`${lectureId}: Duplicate ID`)
      }
      seenIds.add(lecture.id)
    }

    // Check date format
    if (lecture.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(lecture.date))) {
      result.errors.push(`${lectureId}: Date must be YYYY-MM-DD format`)
    }

    // Check speaker object
    if (lecture.speaker && typeof lecture.speaker === 'object') {
      const speaker = lecture.speaker as Record<string, unknown>
      if (!speaker.name) result.errors.push(`${lectureId}: Speaker missing "name"`)
      if (!speaker.institution) result.warnings.push(`${lectureId}: Speaker missing "institution"`)
    }
  }

  return result
}

function validateSiteInfo(siteInfo: Record<string, unknown>): ValidationResult {
  const result: ValidationResult = { errors: [], warnings: [], info: [] }

  // Check contact info
  const contact = siteInfo.contact as Record<string, unknown> | undefined
  if (!contact) {
    result.errors.push('siteInfo.json: Missing "contact" section')
  } else {
    if (!contact.phone) result.errors.push('siteInfo.json: Missing contact.phone')
    if (!contact.email) result.errors.push('siteInfo.json: Missing contact.email')
    if (contact.email !== 'rockymountmuseum@gmail.com') {
      result.warnings.push(`siteInfo.json: Email should be "rockymountmuseum@gmail.com"`)
    }

    const social = contact.social as Record<string, unknown> | undefined
    if (!social) {
      result.errors.push('siteInfo.json: Missing contact.social')
    } else {
      if (!social.facebook) result.warnings.push('siteInfo.json: Missing social.facebook')
      if (!social.instagram) result.warnings.push('siteInfo.json: Missing social.instagram')
      if (!social.tiktok) result.warnings.push('siteInfo.json: Missing social.tiktok')
    }
  }

  // Check hours
  const hours = siteInfo.hours as Record<string, unknown> | undefined
  if (!hours) {
    result.errors.push('siteInfo.json: Missing "hours" section')
  } else {
    if (!hours.regular) result.errors.push('siteInfo.json: Missing hours.regular')
    if (!hours.lastTour) result.warnings.push('siteInfo.json: Missing hours.lastTour')
  }

  // Check admission
  const admission = siteInfo.admission as Record<string, unknown> | undefined
  if (!admission) {
    result.errors.push('siteInfo.json: Missing "admission" section')
  } else {
    if (!admission.adults) result.errors.push('siteInfo.json: Missing admission.adults')
    if (!admission.children) result.errors.push('siteInfo.json: Missing admission.children')
  }

  return result
}

async function main() {
  console.log(`\n${colors.bold}Rocky Mount Data Validation${colors.reset}\n`)
  console.log('Checking data files against DATA-STANDARDS.md...\n')

  const dataDir = join(process.cwd(), 'data')
  let hasErrors = false

  // Validate events.json
  console.log(`${colors.bold}events.json${colors.reset}`)
  try {
    const eventsRaw = readFileSync(join(dataDir, 'events.json'), 'utf-8')
    const eventsData = JSON.parse(eventsRaw)
    const eventsResult = validateEvents(eventsData)

    eventsResult.errors.forEach((e) => {
      log(e, 'error')
      hasErrors = true
    })
    eventsResult.warnings.forEach((w) => log(w, 'warning'))
    eventsResult.info.forEach((i) => log(i, 'info'))

    if (eventsResult.errors.length === 0) {
      log(`${eventsData.events.length} events validated`, 'success')
    }
  } catch (error) {
    log(`Failed to parse events.json: ${error instanceof Error ? error.message : error}`, 'error')
    hasErrors = true
  }

  console.log('')

  // Validate lectures.json
  console.log(`${colors.bold}lectures.json${colors.reset}`)
  try {
    const lecturesRaw = readFileSync(join(dataDir, 'lectures.json'), 'utf-8')
    const lecturesData = JSON.parse(lecturesRaw)
    const lecturesResult = validateLectures(lecturesData)

    lecturesResult.errors.forEach((e) => {
      log(e, 'error')
      hasErrors = true
    })
    lecturesResult.warnings.forEach((w) => log(w, 'warning'))
    lecturesResult.info.forEach((i) => log(i, 'info'))

    if (lecturesResult.errors.length === 0) {
      log(`${lecturesData.lectures.length} lectures validated`, 'success')
    }
  } catch (error) {
    log(`Failed to parse lectures.json: ${error instanceof Error ? error.message : error}`, 'error')
    hasErrors = true
  }

  console.log('')

  // Validate siteInfo.json
  console.log(`${colors.bold}siteInfo.json${colors.reset}`)
  try {
    const siteInfoRaw = readFileSync(join(dataDir, 'siteInfo.json'), 'utf-8')
    const siteInfoData = JSON.parse(siteInfoRaw)
    const siteInfoResult = validateSiteInfo(siteInfoData)

    siteInfoResult.errors.forEach((e) => {
      log(e, 'error')
      hasErrors = true
    })
    siteInfoResult.warnings.forEach((w) => log(w, 'warning'))
    siteInfoResult.info.forEach((i) => log(i, 'info'))

    if (siteInfoResult.errors.length === 0) {
      log('Site info validated', 'success')
    }
  } catch (error) {
    log(`Failed to parse siteInfo.json: ${error instanceof Error ? error.message : error}`, 'error')
    hasErrors = true
  }

  console.log('')

  // Summary
  if (hasErrors) {
    console.log(`${colors.red}${colors.bold}Validation failed with errors${colors.reset}`)
    process.exit(1)
  } else {
    console.log(`${colors.green}${colors.bold}All data files validated successfully${colors.reset}`)
    process.exit(0)
  }
}

main()
