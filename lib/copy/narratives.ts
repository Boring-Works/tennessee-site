/**
 * Rocky Mount Narrative Content
 * Master Source of Truth v4.0
 */

/**
 * Mystery Narrative (Tier 1: Curiosity)
 * Use for: Permanent brand, all audiences, website default
 */
export const MYSTERY_NARRATIVE = {
  welcome: {
    hook: 'Before there was a Tennessee, there was this ground.',
    year: '1770',
    context: 'William Cobb · Piney Flats · Sullivan County',
  },
  hero: {
    badge: 'Tennessee 230 · America 250',
    headline: 'ROCKY MOUNT',
    subhead: "Where Tennessee's government began.",
    timeline: [
      'In 1770, the Cobbs settled this ground.',
      'In 1780, they armed the Revolution.',
      'In 1790, Governor Blount made it the seat of federal power.',
    ],
    contrast:
      'This is not where they gathered. This is not where they farmed. This is where they governed.',
    bridge:
      'For approximately 16 months, this was the seat of power for everything that would become Tennessee.',
    cta: 'Stand where they stood.',
  },
} as const

/**
 * Scarcity Narrative (Tier 2: Urgency)
 * Use for: 2026 campaign, ads, email, ticket conversion
 * Expires: December 31, 2026
 */
export const SCARCITY_NARRATIVE = {
  welcome: {
    hook: 'For approximately 16 months, this ground was the capital of everything west of the mountains.',
    subhook: 'Then the moment passed. The ground remained.',
  },
  hero: {
    badge: 'Tennessee 230 · America 250',
    headline: 'ROCKY MOUNT',
    subhead: 'The capital that made a state.',
    timeline: [
      '1790. Governor Blount—one of 39 men who signed the Constitution—governed from this ground.',
      'Letters went to Washington. A territory was governed.',
      'A state was born.',
    ],
    bridge: 'Then the capital moved. The moment passed. The ground remained.',
    cta: 'Stand where they stood.',
  },
} as const

/**
 * Authority Narrative (Tier 3: Prestige)
 * Use for: Grants, press, THC presentations, academic contexts
 */
export const AUTHORITY_NARRATIVE = {
  welcome: {
    hook: 'The first federal seat of government under the Constitution, west of the Appalachians.',
    subhook: "The ground where Tennessee's government began.",
  },
  hero: {
    badge: 'Capital of the Southwest Territory · 1790–1792',
    headline: 'ROCKY MOUNT',
    subhead: "Where Tennessee's government began.",
    timeline: [
      'In 1787, William Blount signed the U.S. Constitution in Philadelphia.',
      'In 1790, President Washington sent him here to govern the frontier.',
      'From this ground, he corresponded with Washington and conducted the federal business that would become Tennessee.',
    ],
    bridge: 'The buildings have evolved. The ground endures.',
    cta: 'Stand where they stood.',
  },
} as const

/**
 * Historical Figures
 * For visitor-facing copy about key figures
 */
export const HISTORICAL_FIGURES = {
  williamBlount: {
    name: 'William Blount',
    title: 'Governor of the Southwest Territory',
    years: '1790–1796',
    hook: 'Signed the U.S. Constitution. Appointed by George Washington. Made Rocky Mount his headquarters.',
    highlight: 'Constitution Signer',
  },
  andrewJackson: {
    name: 'Andrew Jackson',
    title: 'Future 7th President',
    years: '1788',
    hook: 'Lodged at Rocky Mount for six weeks while awaiting his law license. He was 21 years old.',
    highlight: 'Future President',
  },
  williamCobb: {
    name: 'William Cobb',
    title: 'Original Settler',
    years: 'c. 1770',
    hook: 'Staked his claim on this ground six years before the Declaration of Independence was signed.',
    highlight: 'Pioneer',
  },
} as const

/**
 * Staff Scripts
 * For interpreter training and visitor interactions
 */
export const STAFF_SCRIPTS = {
  sycamoreDifferentiation: {
    context: 'Sycamore Shoals Differentiation',
    script:
      'No, the soldiers gathered at Sycamore Shoals—that was the muster point. Rocky Mount was the operational headquarters. The Army gathered at the Shoals. The State started here.',
  },
  friendlyRivalry: {
    context: 'Tone Guidance: Friendly Rivalry',
    script:
      'They provided the muscle; we provided the mind. We are the other half of the origin story—complementary, not competing.',
  },
  fameBridge: {
    context: 'Fame Bridge (Tours)',
    script: 'Governor Blount governed here. Andrew Jackson lodged here. The State started here.',
  },
  buildingAgeFAQ: {
    context: 'Building Age FAQ',
    script:
      "The Cobb House was built in the 1820s by the grandson. It stands as proof the family didn't just survive—they thrived. Three generations. One ground.",
  },
} as const

/**
 * First 250 Campaign (2026)
 */
export const FIRST_250_CAMPAIGN = {
  hook: 'Join the First 250. Be part of history.',
  promise: 'Your name will be read aloud on the capital grounds, July 4, 2026.',
  deadline: 'Enrollment closes June 1, 2026',
  keyDates: [
    'June 13-14: Flag Weekend / Tennessee 230',
    'July 4: Colonial Independence Day / America 250',
  ],
} as const
