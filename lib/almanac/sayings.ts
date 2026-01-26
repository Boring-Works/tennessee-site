// Frontier Sayings Engine - The 10% Joy

type SayingCategory =
  | 'clear_day'
  | 'clear_night'
  | 'partly_cloudy'
  | 'overcast'
  | 'fog'
  | 'light_rain'
  | 'heavy_rain'
  | 'thunderstorm'
  | 'light_snow'
  | 'heavy_snow'
  | 'freezing'
  | 'hot'
  | 'windy'

export function getCategoryFromConditions(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): SayingCategory {
  // Temperature overrides
  if (temperature < 25) return 'freezing'
  if (temperature > 92) return 'hot'
  if (windSpeed > 25) return 'windy'

  // Weather code mapping
  if ([0, 1].includes(weatherCode)) {
    return isDay ? 'clear_day' : 'clear_night'
  }
  if (weatherCode === 2) return 'partly_cloudy'
  if (weatherCode === 3) return 'overcast'
  if ([45, 48].includes(weatherCode)) return 'fog'
  if ([51, 53, 55, 56, 57, 61, 80].includes(weatherCode)) return 'light_rain'
  if ([63, 65, 66, 67, 81, 82].includes(weatherCode)) return 'heavy_rain'
  if ([95, 96, 99].includes(weatherCode)) return 'thunderstorm'
  if ([71, 77, 85].includes(weatherCode)) return 'light_snow'
  if ([73, 75, 86].includes(weatherCode)) return 'heavy_snow'

  return 'partly_cloudy' // Default fallback
}

export const FRONTIER_SAYINGS: Record<SayingCategory, string[]> = {
  clear_day: [
    "Sky is blue as a whetstone. A fair day for open-air labor.",
    "High pressure is holding firm. Make hay while the sun shines.",
    "Clear skies over Sullivan County. A fine day for the journey.",
    "The sun is generous today. Put it to good use.",
    "Not a cloud to trouble the eye. The kind of day worth remembering.",
  ],

  clear_night: [
    "Stars are sharp tonight. Frost may kiss the meadows by dawn.",
    "Moon is bright—a good night to finish the late chores.",
    "Clear skies after dark. Tomorrow promises fair weather.",
    "The heavens are open tonight. Check the livestock before bed.",
    "A still, clear night. The cold will settle in the hollows.",
  ],

  partly_cloudy: [
    "Fair skies with a few travelers. Should hold for the work ahead.",
    "Clouds are moving but not gathering. Proceed with your plans.",
    "Mixed skies over the valley. Keep one eye upward.",
    "The sun plays hide-and-seek. Conditions remain favorable.",
    "Some clouds drifting through. Nothing to delay the day's work.",
  ],

  overcast: [
    "Gray skies pressing low. The rain may hold, but don't wager on it.",
    "Clouds have drawn the curtain. A day for steady, covered work.",
    "Overcast and brooding. Keep the firewood close.",
    "The sun won't show itself today. Plan for indoor hours.",
    "Heavy lid on the sky. Not the worst, not the best.",
  ],

  fog: [
    "Fog thick as wool in the hollows. Travel slow on the Stage Road.",
    "The valley is socked in. Give it time to lift.",
    "Morning fog means the day will warm. Patience.",
    "Can't see the barn from the house. Keep the bell ringing.",
    "Fog rising off the Holston. The sun will burn it clear by mid-morning.",
  ],

  light_rain: [
    "A light soaking coming down. Good for the gardens, poor for the roads.",
    "Steady drizzle settling in. Keep to the covered work.",
    "Rain enough to wet, not enough to flood. Mind your footing.",
    "The sky is weeping gently. No urgency, but stay prepared.",
    "Light rain on the valley. The creeks will stay in their banks.",
  ],

  heavy_rain: [
    "A gully-washer is upon us. Stay clear of the low fords.",
    "Rain coming down in sheets. This is a day for the hearth.",
    "The creeks are rising fast. Check your stores and wait.",
    "Driving rain across Sullivan County. No fit day for travel.",
    "Heavy rains are flooding the fields. Tomorrow we assess the damage.",
  ],

  thunderstorm: [
    "Thunder rolling through the mountains. Seek solid shelter.",
    "Storm clouds stacking in the west. The lightning will follow.",
    "A tempest is building. Get the livestock under cover.",
    "Black clouds and rumbling. Best to pause and let it pass.",
    "Thunder over the ridgeline. Not a day to be caught in the open.",
  ],

  light_snow: [
    "Snow falling light as cotton. Pretty to watch, easy to manage.",
    "First flakes of the season. The ground isn't ready to hold it.",
    "A dusting coming down. Roads will be slick by evening.",
    "Light snow on the wind. Keep the paths clear as it falls.",
    "Snowflakes drifting down. The world goes quiet.",
  ],

  heavy_snow: [
    "Snow is piling fast. Check the roof load and stay close.",
    "A proper snowstorm settling in. Hunker down.",
    "Heavy snow burying the valley. This will last days.",
    "The white is coming thick. Make sure the animals have water.",
    "Deep snow by morning. Save your strength for the digging out.",
  ],

  freezing: [
    "Bitter cold has arrived. Keep the hearth stoked through the night.",
    "Ice in the water bucket this morning. Dress in layers.",
    "A hard freeze is upon us. Check the pipes and the livestock.",
    "Cold enough to crack stone. Limit your time outside.",
    "The kind of cold that finds every gap. Seal up tight.",
  ],

  hot: [
    "Heat is bearing down heavy. Work the early hours, rest at noon.",
    "Sweltering in the valley. Keep water close and shade closer.",
    "Too hot for man or beast to labor. Wait for the evening cool.",
    "The air itself is tired. Pace yourself.",
    "Heat shimmering off the fields. This is not a day to push.",
  ],

  windy: [
    "Wind is kicking up something fierce. Secure anything loose.",
    "Strong gusts across the ridges. No day for ladder work.",
    "The wind is restless today. Stay grounded.",
    "Blustery conditions—hold onto your hat and your plans.",
    "Wind howling through the valley. Best to wait it out.",
  ],
}

/**
 * Generate a seeded random number based on date
 * Same date = same "random" number (deterministic)
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * Get day of year (1-366) for seeding
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Get a saying deterministically based on category and date
 * Same day + same category = same saying
 */
export function getDeterministicSaying(category: SayingCategory, date: Date = new Date()): string {
  const sayings = FRONTIER_SAYINGS[category]
  const dayOfYear = getDayOfYear(date)
  // Combine day and category for unique seed per category per day
  const categoryIndex = Object.keys(FRONTIER_SAYINGS).indexOf(category)
  const seed = dayOfYear * 100 + categoryIndex
  const index = Math.floor(seededRandom(seed) * sayings.length)
  return sayings[index]
}

/**
 * @deprecated Use getDeterministicSaying instead for consistent UX
 */
export function getRandomSaying(category: SayingCategory): string {
  const sayings = FRONTIER_SAYINGS[category]
  const index = Math.floor(Math.random() * sayings.length)
  return sayings[index]
}

export function getSaying(
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  isDay: boolean
): string {
  const category = getCategoryFromConditions(weatherCode, temperature, windSpeed, isDay)
  return getDeterministicSaying(category)
}
