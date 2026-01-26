// localStorage persistence for user location
import { GeoLocation, DEFAULT_LOCATION } from './geocoding'

const STORAGE_KEY = 'almanac-location'

/**
 * Save user's chosen location to localStorage
 */
export function saveLocation(location: GeoLocation): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
  } catch (error) {
    console.error('Failed to save location:', error)
  }
}

/**
 * Load saved location from localStorage
 * Returns DEFAULT_LOCATION if nothing saved
 */
export function loadLocation(): GeoLocation {
  if (typeof window === 'undefined') return DEFAULT_LOCATION

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load location:', error)
  }

  return DEFAULT_LOCATION
}

/**
 * Clear saved location (reset to default)
 */
export function clearLocation(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear location:', error)
  }
}
