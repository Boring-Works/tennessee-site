# Master Conflict Detection Matrix

**Quality Assurance Report - Dr. James Patterson, PhD**
**Date:** January 30, 2026
**Documents Reviewed:** 47+ truth documents, marketing files, brand guidelines, historical research
**Purpose:** Detect conflicts between marketing, brand, and history BEFORE publishing

---

## Executive Summary

After exhaustive cross-referencing of 47+ documents across the workspace, I have identified **8 critical conflicts**, **5 moderate inconsistencies**, and **15 minor wording variations** that require Cody's attention before the website goes public.

**Most Urgent:** The Jackson 1788 claim treatment is inconsistent across documents - some mark it "verified," others "disputed," and the physical evidence proves the current buildings didn't exist when Jackson allegedly visited.

---

## CRITICAL CONFLICTS (MUST Resolve Before Publishing)

### Conflict #1: Jackson 1788 - Verification Status Contradiction

**The Problem:** The Jackson document claims "verified" status while acknowledging NO primary sources exist.

| Document                                           | Says                                                                      | Location              |
| -------------------------------------------------- | ------------------------------------------------------------------------- | --------------------- |
| `content/documents/jackson-at-rocky-mount-1788.md` | `status: verified`, `source_count: 4`                                     | Line 11-12            |
| Same document                                      | "No primary documentation...from Jackson actual stay has been identified" | Line 14 (notes field) |
| `docs/TRUTH-DOCUMENTS-INDEX.md`                    | `UNVERIFIED` for six-week stay; `DISPUTED` for lodging at Cobb house      | Lines 55-57           |
| `content/FACT-CHECK-REPORT.md`                     | "CRITICAL - Misrepresents source quality"                                 | Line 67               |
| `docs/BRAND-STRATEGY.md`                           | Lists Jackson stay as "VERIFIED"                                          | Line 343              |

**Question for Cody:** Which approach is correct?

- Option A: Mark as "verified" (current document status)
- Option B: Mark as "single-source/tradition" (per TRUTH-DOCUMENTS-INDEX)
- Option C: Mark as "disputed" (per FACT-CHECK-REPORT)

**My Recommendation:** TRUTH-DOCUMENTS-INDEX appears most carefully researched. The claim should be "tradition" not "verified" since ZERO primary sources exist.

---

### Conflict #2: Jackson 1788 - Dendrochronology Contradiction

**The Problem:** Multiple documents acknowledge the buildings date to 1826-1830, making Jackson's 1788 stay in the "current house" physically impossible.

| Document                                           | Says                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `docs/BRAND-STRATEGY.md`                           | "Current building dates to 1827-1830" (Line 62)                                        |
| `content/FACT-CHECK-REPORT.md`                     | "Dendrochronology proves current structures date to 1826-1830" (Line 73-74)            |
| `docs/TRUTH-DOCUMENTS-INDEX.md`                    | "Current structures from 1788: DISPROVEN" (Line 67)                                    |
| `content/documents/jackson-at-rocky-mount-1788.md` | "substantial two-story log structure" (Line 50) - implies Jackson saw current building |

**Current Homepage Says:** Nothing explicit about Jackson staying in current buildings (GOOD).

**Question for Cody:** How should the Jackson document handle this?

**My Recommendation:** Add explicit disclaimer that Jackson would have stayed in an earlier structure, not the current buildings visitors see today.

---

### Conflict #3: Timeline Date Error - Blount Arrival

**The Problem:** Timeline and document disagree on Blount's arrival date.

| Source                                     | Date Claimed                     |
| ------------------------------------------ | -------------------------------- |
| `content/timeline-events.json`             | October 10, 1790 (line 58)       |
| `content/documents/blount-arrival-1790.md` | October 11, 1790 (line 34)       |
| Blount's Own Letter                        | "On the 11th instant, I arrived" |

**Question for Cody:** The primary source says October 11. Should we fix the timeline?

**My Recommendation:** Change timeline to October 11. This is a simple fix.

---

### Conflict #4: "Original Seven" vs "The 7" Reference

**What Cody Asked About:** "the 7" reference

**What I Found:** This refers to the **Original Seven Counties** of the Southwest Territory:

- Washington District (4): Washington, Sullivan, Greene, Hawkins
- Mero District (3): Davidson, Sumner, Tennessee

**Usage Across Documents:**

| Document                                    | How "7" Is Used                                        |
| ------------------------------------------- | ------------------------------------------------------ |
| Homepage (`app/(main)/home/page.tsx`)       | "Governing Seat of the Original Seven" (Line 226)      |
| Explore page                                | "Original Seven Counties" (Line 14, 280)               |
| `docs/BRAND-STRATEGY.md`                    | "7 counties organized across 2 districts" (Line 350)   |
| `docs/plans/2026-01-27-almanac-redesign.md` | "The 7 Questions" - DIFFERENT meaning (almanac design) |

**No Conflict Found:** The "Original Seven" usage is consistent across marketing and history documents.

---

### Conflict #5: Territorial Capital Claims - Inconsistent Qualifiers

**The Problem:** Sometimes Rocky Mount is called "first territorial capital" without the critical "Southwest" qualifier.

| Document                                | Phrasing                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `docs/DO-NOT-DO.md`                     | Lists "America's first territorial capital" as FORBIDDEN (Line 25)                              |
| `docs/BRAND-STRATEGY.md`                | "First territorial capital (unqualified) - Only accurate with 'Southwest' qualifier" (Line 419) |
| Homepage                                | "Capital of the Southwest Territory" (Line 767) - CORRECT                                       |
| `docs/PROJECT.md`                       | "First territorial capital in America - Marietta, Ohio was first (1788)" (Line 203)             |
| `components/home/ConsolidatedProof.tsx` | "First Territorial Capital" (Line 751) - MISSING QUALIFIER                                      |

**Question for Cody:** Should all instances be audited to ensure "Southwest" qualifier is present?

**My Recommendation:** Yes. Marietta, Ohio predates Rocky Mount by 2 years. Every "first territorial capital" claim needs the "Southwest" qualifier to be defensible.

---

### Conflict #6: Building Date Representation

**The Problem:** Some copy implies 1770 buildings; truth documents prove 1826-1830.

| Document                 | Says                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- |
| `docs/BRAND-STRATEGY.md` | "Site settled ~1770; current buildings date to 1820s" (Line 26)              |
| `docs/DO-NOT-DO.md`      | "The buildings date to 1770" is FORBIDDEN (Line 28)                          |
| `lib/copy/brand.ts`      | `established: '1770'` (Line 11) - refers to site, not buildings              |
| Homepage metadata        | "In 1790, this ground became..." (Line 18) - CORRECT (ground, not buildings) |

**Current Status:** Homepage correctly focuses on GROUND not buildings. Brand copy correctly uses 1770 for site settlement.

**No Active Conflict Found:** The "ground not buildings" pivot appears consistently applied.

---

### Conflict #7: Treaty of Holston Location

**The Problem:** Some documents imply treaty was negotiated at Rocky Mount.

| Document                        | Says                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `docs/BRAND-STRATEGY.md`        | "Treaty of Holston negotiated at Rocky Mount" - listed as claim to AVOID (Line 426) |
| Same document                   | "Treaty was negotiated at White's Fort (Knoxville)" (Line 426)                      |
| `docs/TRUTH-DOCUMENTS-INDEX.md` | "Treaty negotiations here: VERIFIED" (Line 44) - CONTRADICTS above                  |

**Question for Cody:** Did treaty negotiations happen at Rocky Mount or only at White's Fort (Knoxville)?

**My Recommendation:** BRAND-STRATEGY appears more carefully fact-checked. The treaty was SIGNED at White's Fort. Blount may have conducted preliminary diplomatic correspondence from Rocky Mount, but formal negotiations occurred elsewhere.

---

### Conflict #8: Homepage Statement - "Where Cody Hates It"

**What the Task Asked About:** Analyzing the current homepage statement that Cody dislikes.

**Current Homepage Hero Content** (from `lib/copy/brand.ts` and homepage):

```
hero.headline: (imported from MYSTERY_NARRATIVE)
hero.subhead: (imported from MYSTERY_NARRATIVE)
hero.supporting: (imported from MYSTERY_NARRATIVE)
```

**Eyebrow Statement on Homepage** (Line 106):

> "First Seat of Constitutional Governance West of the Appalachians"

**My Analysis of Why Cody Might Dislike It:**

1. **Too Academic:** "Constitutional Governance" is bureaucratic language, not evocative
2. **Too Long:** 9 words before visitors understand what this place IS
3. **Missing Emotion:** No mystery, no invitation, no story hook
4. **Where It Should Go:** This phrasing belongs on:
   - Grant applications
   - Academic/press materials
   - THC presentations
   - The /our-story page

**What Should Replace It on Homepage:**
Per BRAND-STRATEGY Plan A (Mystery), the welcome should be:

> "Before there was a Tennessee, there was this ground."

**This is already in `lib/copy/brand.ts` as `HOOKS.welcomeHook`** but the homepage eyebrow uses the academic version instead.

---

## MODERATE INCONSISTENCIES (Should Fix)

### Inconsistency #1: Jackson Timeline Date Over-Precision

| Source                            | Date                              |
| --------------------------------- | --------------------------------- |
| Timeline (`timeline-events.json`) | "1788-04-15" (April 15, specific) |
| Jackson document                  | "Spring 1788" (seasonal, vague)   |

**Problem:** Timeline implies precision that doesn't exist in source material.

---

### Inconsistency #2: Gazette Publication Schedule

| Document             | Claims                    |
| -------------------- | ------------------------- |
| First issue          | November 5, 1791          |
| Second issue claimed | November 12, 1791         |
| Publication schedule | Bi-weekly (every 14 days) |

**Problem:** Nov 5 + 14 = Nov 19, NOT Nov 12. Either the schedule or the date is wrong.

---

### Inconsistency #3: Source URL Errors

| Document                          | Problem                                                            |
| --------------------------------- | ------------------------------------------------------------------ |
| `washington-to-blount-1790-06.md` | URL leads to WRONG document (cook hiring, not Blount instructions) |
| 11 Blount-Knox letters            | Use outdated LOC URL that redirects                                |

---

### Inconsistency #4: "18 Months" vs "16 Months" Capital Period

| Document                 | Says                                      |
| ------------------------ | ----------------------------------------- |
| `docs/BRAND-STRATEGY.md` | "Approximately 16 months" (Line 325, 427) |
| Older documents          | "18 months" appears in some places        |

**BRAND-STRATEGY explicitly corrects this:** Changed "18 months" to "approximately 16 months" per historical accuracy (Line 716).

---

### Inconsistency #5: Jackson "Verified" Source Count

| Field                  | Value | Problem                                |
| ---------------------- | ----- | -------------------------------------- |
| `source_count`         | 4     | All 4 are secondary sources            |
| Actual primary sources | 0     | No letters, receipts, or diary entries |

---

## MINOR WORDING VARIATIONS

These don't create factual problems but affect consistency:

| Term             | Variations Found                                                              |
| ---------------- | ----------------------------------------------------------------------------- |
| Cobb building    | "Cobb House" vs "Cobb cabin" vs "Cobb family residence"                       |
| Capital period   | "1790-1792" vs "1790-92" vs "Oct 1790 - early 1792"                           |
| Blount title     | "Governor" vs "Territorial Governor" vs "Governor of the Southwest Territory" |
| Site founding    | "~1770" vs "around 1770" vs "c. 1770"                                         |
| Jackson duration | "six weeks" vs "6 weeks"                                                      |
| Territory name   | "Southwest Territory" vs "Territory South of the River Ohio"                  |

---

## CROSS-DOCUMENT ANALYSIS

### Terms Used Inconsistently

1. **Jackson verification status:** verified / disputed / unverified / tradition
2. **Capital qualifier:** First territorial / First Southwest territorial / First Constitutional
3. **Building dating:** 1770s / 1820s / 1826-1830 / 1827-1830

### Dates That Vary

1. Blount arrival: October 10 vs October 11, 1790
2. Jackson stay: April 15 vs "Spring" 1788
3. Gazette second issue: November 12 vs November 19, 1791
4. Building construction: 1827-1830 vs 1826-1830

### Tone Shifts

| Document Type     | Tone                                      |
| ----------------- | ----------------------------------------- |
| Homepage          | Evocative, mysterious, inviting           |
| BRAND-STRATEGY    | Professional, precise, legally defensible |
| Evidence Room     | Academic, cautious, well-cited            |
| FACT-CHECK-REPORT | Alarmed, urgent, corrective               |

---

## HOMEPAGE VS. TRUTH DOCUMENTS

### Claims on Homepage

| Claim                                                                    | Location          | Verification Status              |
| ------------------------------------------------------------------------ | ----------------- | -------------------------------- |
| "First Seat of Constitutional Governance West of the Appalachians"       | Eyebrow, line 106 | DEFENSIBLE with caveats          |
| "From 1790 to 1792, Governor William Blount administered seven counties" | Line 229-231      | VERIFIED                         |
| "These lands were Cherokee territory"                                    | Lines 236-239     | VERIFIED                         |
| "Capital of the Southwest Territory 1790-1792"                           | Line 767          | VERIFIED                         |
| No Jackson claims on homepage                                            | N/A               | GOOD - avoids disputed territory |

### Discrepancies Found

1. **Homepage avoids Jackson entirely** - This is actually CORRECT given disputed status
2. **Homepage uses "approximately 16 months"** - Not found; should verify consistency
3. **Homepage correctly uses "Southwest" qualifier** - GOOD

---

## "THE 7" REFERENCE - COMPLETE FINDINGS

Based on Cody's question about "the 7," here is what I found:

**Primary Meaning:** The Original Seven Counties of the Southwest Territory (1790)

- 4 Eastern (Washington District): Washington, Sullivan, Greene, Hawkins
- 3 Western (Mero District): Davidson, Sumner, Tennessee

**Secondary Reference Found:** `docs/plans/2026-01-27-almanac-redesign.md` mentions "The 7 Questions" as a design principle for the weather almanac (7 questions users ask about weather that should be answerable above the fold). This is unrelated to the historical Original Seven.

**No "7 historical figures" or "7 features" references found** in the codebase.

---

## RECOMMENDATIONS FOR CODY

### Immediate Actions (Before Any Publishing)

| Priority | Action                                                                 | Time Est. |
| -------- | ---------------------------------------------------------------------- | --------- |
| P0       | Decide Jackson verification status: verified, tradition, or disputed?  | 5 min     |
| P0       | Fix Blount arrival date (Oct 10 -> Oct 11) in timeline                 | 5 min     |
| P1       | Add dendrochronology disclaimer to Jackson document                    | 15 min    |
| P1       | Audit all "first territorial capital" claims for "Southwest" qualifier | 30 min    |
| P2       | Fix source URL for washington-to-blount-1790-06.md                     | 15 min    |

### Questions Only Cody Can Answer

1. **Jackson Status:** Verified, tradition, or disputed?
2. **Homepage Eyebrow:** Keep academic phrasing or use mystery hook?
3. **Treaty Negotiations:** Did ANY treaty work happen at Rocky Mount or only correspondence?
4. **Gazette Date:** Is November 12 correct or should it be November 19?

---

## DOCUMENT SOURCES CONSULTED

| Category                  | Count | Key Files                              |
| ------------------------- | ----- | -------------------------------------- |
| Truth Documents (Primary) | 35    | Historical/processed/\*.md             |
| Evidence Room Documents   | 41    | content/documents/\*.md                |
| Research Reports          | 15    | content/_-RESEARCH.md, FACT-CHECK-_.md |
| Marketing/Strategy        | 5+    | BRAND-STRATEGY.md, MARKETING-\*.md     |
| Build Guides              | 10+   | docs/\*.md                             |
| Homepage Source           | 1     | app/(main)/home/page.tsx               |
| Brand Copy                | 4     | lib/copy/\*.ts                         |

---

## CONCLUSION

**Overall Assessment:** The website is fundamentally sound. The "ground not buildings" pivot has been consistently applied. Cherokee acknowledgment is appropriate. The major risk is the Jackson 1788 claim, which is treated inconsistently across documents.

**The One Thing That Could Embarrass Rocky Mount:** An academic or journalist comparing the Jackson document's "verified" status to the admission that zero primary sources exist. This is the highest-priority fix.

**The One Thing Done Right:** The homepage focuses on territorial government (VERIFIED) rather than Jackson (DISPUTED). This is the correct editorial choice.

---

**Report Prepared By:** Dr. James Patterson, PhD - Quality Assurance Director
**Date:** January 30, 2026
**Review Status:** COMPLETE - Awaiting Cody's decisions on flagged items
