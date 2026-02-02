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
  wrongVariants?: string[] // Common errors that should be flagged (case-insensitive patterns)
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
    wrongVariants: [
      'october 10, 1790', // Wrong day
      'october 12, 1790',
      'blount arrived.{0,20}1791', // Wrong year
    ],
  },
  {
    id: 'gov-002',
    category: 'governance',
    claim:
      'Rocky Mount served as the territorial capital from October 1790 to approximately early 1792',
    source: 'Tennessee Encyclopedia; Keith, John Gray Blount Papers Vol. II',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'first federal capital', // Not federal - territorial
      'first capital of america',
      'first u\\.?s\\.? capital',
      'capital.{0,20}until.{0,10}1796', // Capital moved to Knoxville by early 1792, not 1796
    ],
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
  {
    id: 'gov-006',
    category: 'governance',
    claim: 'Blount took measures to organize territorial government by November 1790',
    source: 'Blount to Knox, November 3, 1790 (American State Papers: Indian Affairs)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-007',
    category: 'governance',
    claim:
      'Territorial militia described as good marksmen accustomed to woods but requiring systematic officer training',
    source: 'Blount to Knox, November 3, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-008',
    category: 'governance',
    claim:
      'Hanging Maw visited Blount at Rocky Mount in December 1790 for preliminary peace discussions',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-009',
    category: 'governance',
    claim:
      'Cherokee chiefs agreed to restrain young warriors from hostility if settlers refrained from land encroachments',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-010',
    category: 'governance',
    claim:
      'Blount issued proclamations forbidding settler encroachments beyond established boundaries',
    source: 'Blount to Knox, December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-011',
    category: 'governance',
    claim:
      'Courts of law established throughout territory with judges entering duties by January 1791',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-012',
    category: 'governance',
    claim:
      'New settlements forming and farms being cleared with commerce increasing by January 1791',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'gov-013',
    category: 'governance',
    claim:
      'Tennessee and Holston rivers provided convenient transportation for territorial produce',
    source: 'Blount to Knox, January 8, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },

  // === CONSTRUCTION ===
  {
    id: 'con-001',
    category: 'construction',
    claim: 'The current main house (Cobb House) was built between 1826-1828',
    source: '2006 Tennessee Historical Commission dendrochronology study',
    sourceType: 'archaeological',
    confidence: 'verified',
    contradicts: ['jackson-1788'], // Any claim Jackson stayed in THIS house in 1788
    wrongVariants: [
      'built.{0,15}177\\d', // Any "built in 177X" claim
      'built.{0,15}178\\d', // Any "built in 178X" claim
      'built.{0,15}179\\d', // Any "built in 179X" claim
      'built.{0,15}180\\d', // Any "built in 180X" claim
      'built.{0,15}181\\d', // Any "built in 181X" claim
      'original.{0,10}cobb house', // Current house is NOT the original
      'house.{0,15}blount.{0,15}stayed', // Blount stayed in an EARLIER structure
      'same house.{0,15}blount',
    ],
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
  {
    id: 'con-004',
    category: 'construction',
    claim: 'Rocky Mount farm established 1775 per Tennessee Century Farms certification',
    source: 'Tennessee Century Farms Program, WJHL article October 2021',
    sourceType: 'scholarly',
    confidence: 'verified',
    wrongVariants: [
      'farm.{0,15}established.{0,15}1770', // Century Farms says 1775
      'farm.{0,15}since.{0,15}1770',
      'oldest farm.{0,15}1770',
    ],
  },
  {
    id: 'con-005',
    category: 'construction',
    claim: 'Dining Room structure built 1829-1830 per dendrochronology study',
    source: 'Grissino-Mayer & van de Gevel 2007 dendrochronology study',
    sourceType: 'archaeological',
    confidence: 'verified',
  },
  {
    id: 'con-006',
    category: 'construction',
    claim: 'William Cobb sold Rocky Mount to son-in-law Hal Massengill in 1796',
    source: 'Washington County deed 1796',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'con-007',
    category: 'construction',
    claim:
      'Property valued at $2,000 with 60 acres and barn for 30 horses in October 1791 inventory',
    source: 'Rocky Mount Inventory, October 15, 1791',
    sourceType: 'primary',
    confidence: 'verified',
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
    wrongVariants: [
      'mary cobb.{0,10}wife', // CRITICAL: Mary was William's SISTER
      "mary cobb.{0,10}william's",
      'mrs\\.? mary cobb',
      'william.{0,15}wife.{0,15}mary',
      'mary.{0,15}married.{0,15}william cobb',
      'mary cobb.{0,10}managed',
      'mary cobb.{0,10}household',
      'mary cobb.{0,10}fed',
    ],
  },
  {
    id: 'ppl-003',
    category: 'people',
    claim: 'Andrew Jackson allegedly lodged at Rocky Mount in spring 1788 for six weeks',
    source: 'Oral tradition only - Tennessee Encyclopedia, Rocky Mount Museum',
    sourceType: 'scholarly',
    confidence: 'moderate',
    contradicts: ['con-001'], // Current house didn't exist yet
    wrongVariants: [
      'jackson.{0,15}stayed.{0,15}current', // Didn't stay in CURRENT house
      'jackson.{0,15}this house',
      'jackson.{0,15}slept.{0,15}room',
    ],
  },
  {
    id: 'ppl-004',
    category: 'people',
    claim: "Mary Cobb was William Cobb Sr.'s SISTER (not wife), married to Henry Massengill Sr.",
    source: 'WikiTree Massengill-88, Massengill family genealogy',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-005',
    category: 'people',
    claim: 'Michael Massengill (grandson of William Cobb) built current structures 1827-1830',
    source: 'Dendrochronology study 2007; WikiTree genealogical records',
    sourceType: 'archaeological',
    confidence: 'verified',
  },
  {
    id: 'ppl-006',
    category: 'people',
    claim: 'William Cobb Sr. born circa 1732 in Isle of Wight County, Virginia',
    source: 'WikiTree Cobb-3509, genealogical records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-007',
    category: 'people',
    claim: 'William Cobb Sr. died circa 1803 in Knox County, Tennessee',
    source: 'WikiTree Cobb-3509, genealogical records',
    sourceType: 'scholarly',
    confidence: 'high',
  },
  {
    id: 'ppl-008',
    category: 'people',
    claim:
      'William Cobb and sons (William Jr., Pharaoh, Jerry, Arthur) supplied Overmountain Men with gunpowder, horses, blankets, and food for Kings Mountain campaign (October 1780)',
    source: 'WikiTree, Tennessee Encyclopedia, Revolutionary War records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-009',
    category: 'people',
    claim: "William Cobb moved from Rocky Mount to Bean's Station (Knox/Grainger County) in 1795",
    source: 'TN Gen Web, WikiTree, Washington County deed 1796',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-010',
    category: 'people',
    claim:
      'Hal Massengill (Henry Massengill Jr.) married Penelope Cobb at Fort Womack during Indian siege',
    source: "WikiTree Massengill-88, Goodspeed's History of Tennessee",
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-011',
    category: 'people',
    claim: 'Hal Massengill served 2 years, 3 months in Revolutionary War',
    source: 'WikiTree Massengill-88',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'ppl-012',
    category: 'people',
    claim:
      'Barsheba Whitehead Cobb fed 42 Cherokee chiefs and attendants during Treaty of Holston negotiations (July 1791)',
    source: 'COBB-FAMILY-RESEARCH.md citing historical records',
    sourceType: 'scholarly',
    confidence: 'high',
    wrongVariants: ['mary cobb.{0,15}fed.{0,15}cherokee', 'mary cobb.{0,15}42 chiefs'],
  },

  // === TREATY ===
  {
    id: 'trt-001',
    category: 'treaty',
    claim: "Treaty of Holston was signed on July 2, 1791 at White's Fort (present-day Knoxville)",
    source: 'National Archives; Founders Online; Treaty document text',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'treaty.{0,15}signed.{0,15}rocky mount', // Signed at White's Fort, NOT Rocky Mount
      'treaty.{0,15}rocky mount.{0,15}signed',
      'holston.{0,15}signed.{0,15}rocky mount',
    ],
  },
  {
    id: 'trt-002',
    category: 'treaty',
    claim: "Treaty of Holston was NEGOTIATED at White's Fort, not Rocky Mount",
    source: 'Blount to Knox June 15, 1791: "Cherokee chiefs are assembling at White\'s Fort"',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: [
      'treaty.{0,15}negotiated.{0,15}rocky mount',
      'negotiations.{0,15}at rocky mount',
      'negotiated.{0,15}holston.{0,15}rocky mount',
      'cherokee chiefs.{0,15}negotiated.{0,15}rocky mount',
    ],
  },
  {
    id: 'trt-003',
    category: 'treaty',
    claim:
      'Cherokee chiefs visited Rocky Mount in December 1790 for PRELIMINARY diplomatic talks (before treaty)',
    source: 'Blount to Knox December 15, 1790',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-004',
    category: 'treaty',
    claim: 'George Washington ratified the Treaty of Holston on November 11, 1791',
    source: 'Founders Online, National Archives',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-005',
    category: 'treaty',
    claim: 'Forty-one or forty-two Cherokee chiefs signed the Treaty of Holston (sources vary)',
    source: 'Treaty document, National Archives; various scholarly sources cite 41 or 42',
    sourceType: 'primary',
    confidence: 'high',
  },
  {
    id: 'trt-006',
    category: 'treaty',
    claim:
      'Treaty of Holston signed by seven principal Cherokee chiefs: Chuleoah (The Boots), Squollecuttah (Hanging Maw), Enoleh (Black Fox), Kanetetoka (Standing Turkey), Kunoskeskie (John Watts), Nenetooyah (Bloody Fellow), and Chuquilatague (Doublehead)',
    source:
      'Treaty of Holston document, Article signatories section, verified against War Department Papers',
    sourceType: 'primary',
    confidence: 'verified',
    wrongVariants: ['six chiefs signed', 'five chiefs signed', 'eight principal chiefs'],
  },
  {
    id: 'trt-007',
    category: 'treaty',
    claim:
      'Treaty of Holston included approximately 35 additional Cherokee signatories beyond the seven principal chiefs',
    source:
      'Treaty of Holston document, signatory list verified against National Archives 88697242',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-008',
    category: 'treaty',
    claim: 'John Thompson and James Carey served as interpreters for the Treaty of Holston',
    source: 'Treaty of Holston document, signatories section',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-009',
    category: 'treaty',
    claim:
      'United States agreed to pay Cherokee Nation $1,000 in goods plus $1,000 annually under original Treaty of Holston terms',
    source: 'Treaty of Holston, Article IV',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-010',
    category: 'treaty',
    claim:
      'Cherokee Nation acknowledged protection of United States and agreed not to hold treaties with foreign powers, individual states, or state citizens',
    source: 'Treaty of Holston, Article II',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-011',
    category: 'treaty',
    claim:
      'United States guaranteed Cherokee Nation exclusive regulation of trade under Treaty of Holston',
    source: 'Treaty of Holston, Article VI',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-012',
    category: 'treaty',
    claim:
      'United States citizens settling on Cherokee lands would forfeit federal protection, and Cherokee could punish them as they saw fit',
    source: 'Treaty of Holston, Article VIII',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-013',
    category: 'treaty',
    claim:
      'United States agreed to furnish Cherokee Nation with useful implements of husbandry and appoint up to four interpreters',
    source: 'Treaty of Holston, Article XIV',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-014',
    category: 'treaty',
    claim:
      'Additional Article signed February 17, 1792 increased Cherokee annuity from $1,000 to $1,500',
    source: 'Treaty of Holston, Additional Article (February 17, 1792)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-015',
    category: 'treaty',
    claim: 'Senate advised and consented to Treaty of Holston ratification on October 11, 1791',
    source: 'Washington Proclamation, November 11, 1791 (Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-016',
    category: 'treaty',
    claim:
      "Thomas Jefferson countersigned Washington's Treaty of Holston proclamation as Secretary of State",
    source: 'Washington Proclamation, November 11, 1791',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-017',
    category: 'treaty',
    claim:
      'Five Cherokee chiefs traveled by ship from Charleston to Philadelphia, arriving December 29, 1791 to address treaty dissatisfaction',
    source: 'Cherokee Delegation to Philadelphia report, January 1792 (Founders Online)',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-018',
    category: 'treaty',
    claim:
      'Cherokee delegation led by Bloody Fellow met with Secretary Knox on January 7, 9, and 11, 1792',
    source: 'Cherokee Delegation to Philadelphia report, Knox to Washington January 17, 1792',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-019',
    category: 'treaty',
    claim:
      'Cherokee delegation members were Nenetooyah (Bloody Fellow), Chutloh (Kingfisher), Nontuaka (the Northward), Teesteke (the Disturber), and Katigoslah (the Prince)',
    source: 'Cherokee Delegation to Philadelphia report, January 1792',
    sourceType: 'primary',
    confidence: 'verified',
  },
  {
    id: 'trt-020',
    category: 'treaty',
    claim:
      'Cherokee requested $1,500 annuity during original negotiations, but Blount claimed lack of authority; Washington and Senate approved increase on January 20, 1792',
    source: 'Knox report to Washington, January 17, 1792; Senate Executive Journal',
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
  {
    id: 'tim-004',
    category: 'timeline',
    claim:
      '15-acre parcel purchased by Rocky Mount Historical Association for $365,000 in October 2021',
    source: 'WJHL news article, October 14, 2021',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
  {
    id: 'tim-005',
    category: 'timeline',
    claim:
      'John Michael Massengill transferred property to State of Tennessee in 1958, opened to public April 1, 1962',
    source: 'Bristol Herald Courier, January 13, 2023; Tennessee Historical Commission records',
    sourceType: 'scholarly',
    confidence: 'verified',
  },
]

/**
 * Result of checking text for historical errors
 */
export interface ErrorMatch {
  factId: string
  factClaim: string
  pattern: string
  matchedText: string
  matchIndex: number
  context: string
  severity: 'critical' | 'high' | 'medium'
}

/**
 * Check text for known historical errors using wrongVariants patterns
 * This is the main function for automated fact-checking
 */
export function checkForErrors(text: string): ErrorMatch[] {
  const lowerText = text.toLowerCase()
  const errors: ErrorMatch[] = []

  for (const fact of REFERENCE_LIBRARY) {
    if (!fact.wrongVariants) continue

    for (const pattern of fact.wrongVariants) {
      try {
        const regex = new RegExp(pattern, 'gi')
        let match
        while ((match = regex.exec(lowerText)) !== null) {
          // Determine severity based on fact category and ID
          let severity: 'critical' | 'high' | 'medium' = 'medium'
          if (fact.id === 'ppl-002')
            severity = 'critical' // Mary Cobb error
          else if (fact.id.startsWith('con-001'))
            severity = 'critical' // Construction date
          else if (fact.id.startsWith('trt-001') || fact.id.startsWith('trt-002'))
            severity = 'high' // Treaty location
          else if (fact.id.startsWith('gov-')) severity = 'high'

          errors.push({
            factId: fact.id,
            factClaim: fact.claim,
            pattern: pattern,
            matchedText: match[0],
            matchIndex: match.index,
            context: text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 40),
            severity,
          })
        }
      } catch {
        // Invalid regex pattern, skip silently
      }
    }
  }

  // Deduplicate by matchIndex (same text might match multiple patterns)
  const seen = new Set<number>()
  return errors.filter((e) => {
    if (seen.has(e.matchIndex)) return false
    seen.add(e.matchIndex)
    return true
  })
}

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

  // Also check wrongVariants
  const errors = checkForErrors(claim)
  for (const error of errors) {
    const fact = REFERENCE_LIBRARY.find((f) => f.id === error.factId)
    if (fact && !contradictions.includes(fact)) {
      contradictions.push(fact)
    }
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

/**
 * Format error matches as a human-readable report
 */
export function formatErrorReport(errors: ErrorMatch[]): string {
  if (errors.length === 0) {
    return 'No historical errors detected.'
  }

  // Group by severity
  const critical = errors.filter((e) => e.severity === 'critical')
  const high = errors.filter((e) => e.severity === 'high')
  const medium = errors.filter((e) => e.severity === 'medium')

  let report = `## Historical Error Report\n\n`
  report += `Found ${errors.length} potential error(s):\n`
  report += `- Critical: ${critical.length}\n`
  report += `- High: ${high.length}\n`
  report += `- Medium: ${medium.length}\n\n`

  if (critical.length > 0) {
    report += `### CRITICAL ERRORS\n\n`
    for (const e of critical) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  if (high.length > 0) {
    report += `### HIGH PRIORITY\n\n`
    for (const e of high) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  if (medium.length > 0) {
    report += `### MEDIUM PRIORITY\n\n`
    for (const e of medium) {
      report += `**[${e.factId}]** "${e.matchedText}"\n`
      report += `- Context: "...${e.context}..."\n`
      report += `- Correct: ${e.factClaim}\n\n`
    }
  }

  return report
}

/**
 * Get all facts with wrongVariants (for checker scripts)
 */
export function getFactsWithWrongVariants(): VerifiedFact[] {
  return REFERENCE_LIBRARY.filter((f) => f.wrongVariants && f.wrongVariants.length > 0)
}

/**
 * Summary statistics about the reference library
 */
export function getReferenceStats(): {
  totalFacts: number
  byCategory: Record<string, number>
  byConfidence: Record<string, number>
  factsWithWrongVariants: number
  totalWrongVariantPatterns: number
} {
  const byCategory: Record<string, number> = {}
  const byConfidence: Record<string, number> = {}
  let factsWithWrongVariants = 0
  let totalWrongVariantPatterns = 0

  for (const fact of REFERENCE_LIBRARY) {
    byCategory[fact.category] = (byCategory[fact.category] || 0) + 1
    byConfidence[fact.confidence] = (byConfidence[fact.confidence] || 0) + 1
    if (fact.wrongVariants && fact.wrongVariants.length > 0) {
      factsWithWrongVariants++
      totalWrongVariantPatterns += fact.wrongVariants.length
    }
  }

  return {
    totalFacts: REFERENCE_LIBRARY.length,
    byCategory,
    byConfidence,
    factsWithWrongVariants,
    totalWrongVariantPatterns,
  }
}
