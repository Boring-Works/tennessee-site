/**
 * MEDIUM-Priority Facts Extracted from NEW-FACT-CANDIDATES.md
 *
 * Date: February 2, 2026
 * Source: Historical research documents in /Historical/
 * Quality Gate: PRIMARY SOURCE REQUIRED or HIGH-CONFIDENCE SCHOLARLY
 *
 * 10 facts extracted from 17 candidates (58.8% extraction rate)
 *
 * These facts are ready for integration into lib/dredge/reference-library.ts
 * Continue numbering from current max: adm-011 (111 facts in library)
 * New IDs: ppl-030 through ppl-039
 *
 * Format matches existing VerifiedFact interface:
 * - id: string (category-number)
 * - category: governance | construction | people | treaty | timeline | cherokee | administration | violence | geography
 * - claim: Full fact statement
 * - source: Specific citation
 * - sourceType: primary | scholarly | archaeological
 * - confidence: verified | high | moderate
 * - wrongVariants?: string[] (regex patterns for common errors)
 */

export const MEDIUM_EXTRACTED_FACTS = [
  // === PEOPLE (Extended Biographies) ===

  // Note: Daniel Smith already has 3 facts (ppl-016, ppl-017, ppl-018)
  // These are the existing facts - NOT duplicating them here

  // Note: John Sevier biographical facts - continuing from existing entries
  // Existing: ppl-019 (birth), ppl-020 (death), ppl-021 (Sarah Hawkins marriage),
  //           ppl-022 (Catherine Sherrill marriage), ppl-023 (18 children), ppl-024 (King's Mountain)
  // These are ALREADY IN THE LIBRARY - NOT duplicating them here

  // Note: James Robertson "Father of Tennessee"
  // Existing: ppl-025 already covers this
  // NOT duplicating here

  // Note: William Cobb magistrate
  // Existing: ppl-026 already covers this
  // NOT duplicating here
] as const

/**
 * IMPORTANT NOTE:
 *
 * All 10 extracted facts from the MEDIUM-priority review are ALREADY IN THE LIBRARY.
 *
 * The reference library already contains:
 * - ppl-016: Daniel Smith surveyor/cartographer
 * - ppl-017: Daniel Smith 1794 map
 * - ppl-018: Daniel Smith constitutional committee chair
 * - ppl-019: John Sevier birth date
 * - ppl-020: John Sevier death date
 * - ppl-021: John Sevier married Sarah Hawkins 1761
 * - ppl-022: John Sevier married Catherine Sherrill 1780
 * - ppl-023: John Sevier 18 children
 * - ppl-024: John Sevier King's Mountain
 * - ppl-025: James Robertson "Father of Tennessee"
 *
 * These facts were added in the Phase 0 Rescue (2026-02-02) and match
 * the bio-001 through bio-010 candidates from NEW-FACT-CANDIDATES.md.
 *
 * RESULT: No new facts to add from MEDIUM extraction.
 *
 * The 7 skipped facts (geo-001 through geo-005, trd-001, trd-002) were:
 * - 1 contradicting recent correction (geo-001)
 * - 4 lacking primary sources (geo-002 through geo-005)
 * - 2 duplicates already in library (trd-001, trd-002)
 *
 * See MEDIUM-EXTRACTION-LOG.md for full analysis.
 */

export default MEDIUM_EXTRACTED_FACTS
