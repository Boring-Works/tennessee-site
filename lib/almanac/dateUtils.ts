/**
 * Date Utilities for Almanac
 * 
 * Centralized date handling to account for past_days offset in Open-Meteo API.
 * When past_days=2 is set, arrays include 2 days of historical data:
 *   - Index 0 = 2 days ago
 *   - Index 1 = yesterday
 *   - Index 2 = TODAY
 *   - Index 3+ = future days
 */

/**
 * Parse date string to get year, month, day components
 * Handles both "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM" formats
 */
export function getDateComponents(dateString: string): { year: number; month: number; day: number } {
  const datePart = dateString.split('T')[0]
  const [year, month, day] = datePart.split('-').map(Number)
  return { year, month, day }
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/**
 * Check if a date string represents today
 */
export function isDateToday(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const now = new Date()
  return year === now.getFullYear() && 
         month === (now.getMonth() + 1) && 
         day === now.getDate()
}

/**
 * Check if a date string represents tomorrow
 */
export function isDateTomorrow(dateString: string): boolean {
  const { year, month, day } = getDateComponents(dateString)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return year === tomorrow.getFullYear() && 
         month === (tomorrow.getMonth() + 1) && 
         day === tomorrow.getDate()
}

/**
 * Get weekday name from date string
 */
export function getWeekdayName(dateString: string, format: 'short' | 'long' = 'short'): string {
  const { year, month, day } = getDateComponents(dateString)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { weekday: format })
}

/**
 * Find index of today in a daily time array.
 * With past_days=2, today is typically at index 2.
 * 
 * @param dailyTimes Array of date strings from API
 * @returns Index of today, or first future date if today not found
 */
export function findTodayDailyIndex(dailyTimes: string[]): number {
  // First pass: look for exact match
  for (let i = 0; i < dailyTimes.length; i++) {
    if (isDateToday(dailyTimes[i])) {
      return i
    }
  }
  
  // Fallback: find first date >= today (handles edge cases around midnight)
  const now = new Date()
  const todayNum = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  
  for (let i = 0; i < dailyTimes.length; i++) {
    const { year, month, day } = getDateComponents(dailyTimes[i])
    const dateNum = year * 10000 + month * 100 + day
    if (dateNum >= todayNum) {
      return i
    }
  }
  
  // Last resort: assume past_days=2
  return Math.min(2, dailyTimes.length - 1)
}

/**
 * Find the starting index for today's hours in the hourly time array.
 * With past_days=2, today starts at index 48 (2 days × 24 hours).
 * 
 * @param hourlyTimes Array of datetime strings from API
 * @returns Starting index of today's hours
 */
export function findTodayHourlyIndex(hourlyTimes: string[]): number {
  const todayStr = getTodayString()
  
  for (let i = 0; i < hourlyTimes.length; i++) {
    if (hourlyTimes[i].startsWith(todayStr)) {
      return i
    }
  }
  
  // Fallback: assume past_days=2 means 48 hours offset
  return Math.min(48, hourlyTimes.length - 24)
}

/**
 * Get a human-readable day name for display
 */
export function getDayDisplayName(dateString: string, format: 'short' | 'long' = 'short'): string {
  if (isDateToday(dateString)) {
    return 'Today'
  }
  if (isDateTomorrow(dateString)) {
    return format === 'short' ? 'Tmrw' : 'Tomorrow'
  }
  return getWeekdayName(dateString, format)
}
