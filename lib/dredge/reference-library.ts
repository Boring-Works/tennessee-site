/**
 * Reference Library
 * The 25 most important verified facts about Rocky Mount
 * Used by The Dredge to cross-reference new documents
 */

export interface VerifiedFact {
  id: string
  category: 'governance' | 'construction' | 'people' | 'treaty' | 'timeline'
  claim: string
  source: string
  sourceType: 'primary' | 'scholarly' | 'archaeological'
  confidence: 'verified' | 'high' | 'moderate'
  dateRange?: { start: string; end: string }
  contradicts?: string[] // IDs of facts this would contradict
}

export const REFERENCE_LIBRARY: VerifiedFact[] = [
  // === GOVERNANCE ===
  {
    id: 'gov-001',
    category: 'governance',
    claim: 'William Blount arrived at Rocky Mount on October 11, 1790',
    source: 'Letter to John Gray Blount, October 20, 1790 (State Archives of NC)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-002',
    category: 'governance',
    claim:
      'Rocky Mount served as the territorial capital from October 1790 to approximately early 1792',
    source: 'Tennessee Encyclopedia; Keith, John Gray Blount Papers Vol. II',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'gov-003',
    category: 'governance',
    claim: 'Blount described accommodations with "Glass Windows, Fire Place &c &c"',
    source: 'Letter to John Gray Blount, October 20, 1790 (State Archives of NC)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-004',
    category: 'governance',
    claim: 'George Washington appointed William Blount as Governor of the Southwest Territory',
    source: 'Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-005',
    category: 'governance',
    claim: 'William Blount was one of 39 signers of the U.S. Constitution',
    source: 'National Archives, Constitutional Convention records',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === CONSTRUCTION ===
  {
    id: 'con-001',
    category: 'construction',
    claim: 'The current main house (Cobb House) was built between 1827-1830',
    source: '2006 Tennessee Historical Commission dendrochronology study',
    sourceType: 'archaeological',
    confidence: 'verified',
    contradicts: ['jackson-1788'], // Any claim Jackson stayed in THIS house in 1788
  },
  {
    id: 'con-002',
    category: 'construction',
    claim: "An earlier structure existed on the property during Blount's governorship (1790-1792)",
    source: 'Blount correspondence describing accommodations',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'con-003',
    category: 'construction',
    claim: 'William Cobb settled the property circa 1770',
    source: 'Tennessee Encyclopedia; local historical records',
    sourceType: 'scholarly',
    confidence: 'high',
    dateRange: { start: '1768', end: '1772' },
  },

  // === PEOPLE ===
  {
    id: 'ppl-001',
    category: 'people',
    claim: "William Cobb was the property owner during Blount's governorship",
    source: 'Blount correspondence; property records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-002',
    category: 'people',
    claim: 'Barsheba Whitehead Cobb (wife of William) managed household during territorial period',
    source:
      'WikiTree Cobb-3509, genealogical records confirm wife was Barsheba Whitehead, not Mary',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-003',
    category: 'people',
    claim: 'Andrew Jackson allegedly lodged at Rocky Mount in spring 1788 for six weeks',
    source: 'Oral tradition only - Tennessee Encyclopedia, Rocky Mount Museum',
    sourceType: 'scholarly',
    confidence: 'moderate',
    contradicts: ['con-001'], // Current house didn't exist yet
  },

  // === TREATY ===
  {
    id: 'trt-001',
    category: 'treaty',
    claim: 'Treaty of Holston was signed on July 2, 1791',
    source: 'National Archives; Founders Online',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-002',
    category: 'treaty',
    claim: 'Forty-one Cherokee chiefs signed the Treaty of Holston',
    source: 'Treaty document, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-003',
    category: 'treaty',
    claim: 'Initial treaty celebrations occurred at Rocky Mount',
    source: 'Historical interpretation based on Blount correspondence',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'trt-004',
    category: 'treaty',
    claim: 'George Washington ratified the Treaty of Holston on November 11, 1791',
    source: 'Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === TIMELINE ===
  {
    id: 'tim-001',
    category: 'timeline',
    claim: 'Southwest Territory created by Congress in 1790',
    source: 'Congressional records; Tennessee Encyclopedia',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'tim-002',
    category: 'timeline',
    claim: 'Tennessee achieved statehood on June 1, 1796',
    source: 'Congressional records',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'tim-003',
    category: 'timeline',
    claim: 'Territorial capital moved from Rocky Mount to Knoxville circa 1792',
    source: 'Tennessee Encyclopedia; scholarly consensus',
    sourceType: 'scholarly',
    confidence: 'high',
    dateRange: { start: '1791-12', end: '1792-06' },
  },
]

/**
 * Get facts that would be contradicted by a claim
 */
export function findContradictions(claim: string): VerifiedFact[] {
  const lowerClaim = claim.toLowerCase()

  const contradictions: VerifiedFact[] = []

  // Check for Jackson 1788 claims against construction date
  if (lowerClaim.includes('jackson') && lowerClaim.includes('1788')) {
    const dendroFact = REFERENCE_LIBRARY.find((f) => f.id === 'con-001')
    if (dendroFact) contradictions.push(dendroFact)
  }

  // Check for pre-1827 construction claims
  const yearMatch = lowerClaim.match(/\b(17\d{2}|180\d|181\d|182[0-6])\b/)
  if (
    yearMatch &&
    (lowerClaim.includes('built') ||
      lowerClaim.includes('constructed') ||
      lowerClaim.includes('house'))
  ) {
    const dendroFact = REFERENCE_LIBRARY.find((f) => f.id === 'con-001')
    if (dendroFact) contradictions.push(dendroFact)
  }

  return contradictions
}

/**
 * Get facts related to a person
 */
export function getFactsAboutPerson(name: string): VerifiedFact[] {
  const lowerName = name.toLowerCase()
  return REFERENCE_LIBRARY.filter((f) => f.claim.toLowerCase().includes(lowerName))
}

/**
 * Get all facts in a category
 */
export function getFactsByCategory(category: VerifiedFact['category']): VerifiedFact[] {
  return REFERENCE_LIBRARY.filter((f) => f.category === category)
}

/**
 * Format facts for injection into AI prompt
 */
export function formatFactsForPrompt(facts: VerifiedFact[]): string {
  return facts
    .map((f) => `- [${f.id}] ${f.claim} (Source: ${f.source}, Confidence: ${f.confidence})`)
    .join('\n')
}
