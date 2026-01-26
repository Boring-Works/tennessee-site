// Moon Phase and Sun calculations using SunCalc
import SunCalc from 'suncalc'
import type { MoonData } from './types'

const MOON_PHASES = [
  { name: 'New Moon', emoji: '🌑', min: 0, max: 0.0625 },
  { name: 'Waxing Crescent', emoji: '🌒', min: 0.0625, max: 0.1875 },
  { name: 'First Quarter', emoji: '🌓', min: 0.1875, max: 0.3125 },
  { name: 'Waxing Gibbous', emoji: '🌔', min: 0.3125, max: 0.4375 },
  { name: 'Full Moon', emoji: '🌕', min: 0.4375, max: 0.5625 },
  { name: 'Waning Gibbous', emoji: '🌖', min: 0.5625, max: 0.6875 },
  { name: 'Last Quarter', emoji: '🌗', min: 0.6875, max: 0.8125 },
  { name: 'Waning Crescent', emoji: '🌘', min: 0.8125, max: 1 },
]

export function getMoonData(date: Date = new Date()): MoonData {
  const illumination = SunCalc.getMoonIllumination(date)
  const phase = illumination.phase

  // Find phase name and emoji
  let phaseName = 'New Moon'
  let emoji = '🌑'

  for (const p of MOON_PHASES) {
    if (phase >= p.min && phase < p.max) {
      phaseName = p.name
      emoji = p.emoji
      break
    }
  }

  // Handle wrap-around for new moon
  if (phase >= 0.9375) {
    phaseName = 'New Moon'
    emoji = '🌑'
  }

  return {
    phase,
    illumination: illumination.fraction,
    phaseName,
    emoji,
  }
}

export interface SunData {
  sunrise: Date
  sunset: Date
  goldenHour: Date
  goldenHourEnd: Date
}

export function getSunData(
  date: Date,
  latitude: number,
  longitude: number
): SunData {
  const times = SunCalc.getTimes(date, latitude, longitude)

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    goldenHour: times.goldenHour,
    goldenHourEnd: times.goldenHourEnd,
  }
}

export function isDay(
  date: Date,
  latitude: number,
  longitude: number
): boolean {
  const sun = getSunData(date, latitude, longitude)
  return date >= sun.sunrise && date <= sun.sunset
}
