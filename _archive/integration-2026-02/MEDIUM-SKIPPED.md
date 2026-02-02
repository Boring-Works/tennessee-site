# MEDIUM Facts Skipped (Did Not Meet Quality Standard)

**Date:** February 2, 2026
**Total Skipped:** 7 out of 17 candidates
**Extraction Rate:** 10 extracted (58.8%)

---

## Skip Categories

| Category | Count | Reason |
|----------|-------|--------|
| Contradicts Existing Correction | 1 | geo-001 contradicts recent "between rivers" fix |
| No Primary Source (Estimates) | 4 | geo-002 through geo-005 are analytical calculations |
| Already in Library (Duplicates) | 2 | trd-001 and trd-002 already exist as trt-021 and gov-017 |
| **TOTAL** | **7** | |

---

## Detailed Skip Documentation

### geo-001: Rocky Mount at fork of Holston and Watauga rivers

**Claim:** Rocky Mount was strategically located at the fork of the Holston and Watauga Rivers, controlling access to the Tennessee frontier.

**Source Reviewed:**
- GEOGRAPHIC-ANALYSIS.md, line 18: "At the fork of the Holston and Watauga Rivers"
- MASTER_INDEX.md, line 398: "Fork of Holston and Watauga Rivers"

**Reason for Skip:** ⚠️ **CONTRADICTS RECENT CORRECTION**

**Detailed Explanation:**
This fact contradicts a recent correction documented in reference-library.ts (geo-001):
- The existing library states: "Rocky Mount was strategically located **between** the Holston and Watauga Rivers"
- Explicitly notes: "the actual confluence/fork is at Kingsport, approximately 15+ miles distant"
- Includes wrongVariants patterns flagging: "at fork", "confluence", "where rivers meet"

The Comprehensive Fact-Check 2024 corrected this common error. Rocky Mount is BETWEEN the two rivers, not AT their fork. The confluence is 15+ miles away at Kingsport.

**Decision:** SKIP - Would reintroduce a known error that was recently corrected

---

### geo-002: Rocky Mount elevation 1,900-2,000 feet

**Claim:** Rocky Mount was located at approximately 1,900-2,000 feet elevation in the piedmont transition zone.

**Source Reviewed:**
- GEOGRAPHIC-ANALYSIS.md, line 20: "Elevation: Roughly 1,900-2,000 feet (piedmont transition zone)"

**Reason for Skip:** ❌ **NO PRIMARY SOURCE**

**Detailed Explanation:**
This is a scholarly geographic estimate, not a documented fact:
- No primary source measurement cited
- Modern analytical calculation based on topographic maps
- Would require actual surveyor's notes or period documentation stating elevation
- The word "Roughly" indicates approximation, not verified measurement

**Quality Standard Not Met:** Reference library requires primary source citations or high-confidence scholarly facts with multiple corroborating sources. Geographic estimates don't meet this standard.

**Decision:** SKIP - Insufficient primary source documentation

---

### geo-003: Rocky Mount to Knoxville approximately 50 miles

**Claim:** The distance from Rocky Mount to Knoxville was approximately 50 miles, requiring 3-4 days of travel year-round.

**Source Reviewed:**
- GEOGRAPHIC-ANALYSIS.md, line 170: "Rocky Mount → Knoxville | ~50 miles | 3-4 days | Year-round | Over ridge and valley"

**Reason for Skip:** ❌ **NO PRIMARY SOURCE**

**Detailed Explanation:**
This is a scholarly travel time estimate, not documented fact:
- Distance is analytical calculation (modern mapping)
- Travel time (3-4 days) is estimated, not from actual period correspondence
- Would need Blount letters stating: "I departed Rocky Mount on [date] and arrived Knoxville on [date]"
- Geographic analysis, not historical documentation

**What Would Be Needed:**
Primary source correspondence documenting actual journey:
- "Departed Rocky Mount October 15, arrived Knoxville October 18" (3 days documented)
- Multiple such citations to establish typical travel time

**Decision:** SKIP - Analytical estimate, not historical fact

---

### geo-004: Rocky Mount to Nashville approximately 200 miles

**Claim:** The distance from Rocky Mount to Nashville was approximately 200 miles, requiring 10-14 days of arduous mountain travel in spring-fall seasons.

**Source Reviewed:**
- GEOGRAPHIC-ANALYSIS.md, line 172: "Rocky Mount → Nashville | ~200 miles | 10-14 days | Spring-fall | Arduous mountain crossing"

**Reason for Skip:** ❌ **NO PRIMARY SOURCE**

**Detailed Explanation:**
Same issue as geo-003:
- Distance is modern calculation
- Travel time is estimated, not documented from period sources
- No primary correspondence cited documenting actual journey times
- Seasonal variations (spring-fall) are analytical assessments

**Quality Standard:** Reference library focuses on verifiable historical facts, not geographic calculations.

**Decision:** SKIP - Analytical estimate without primary documentation

---

### geo-005: Knoxville to Philadelphia approximately 400 miles

**Claim:** The distance from Knoxville to Philadelphia (federal capital) was approximately 400 miles, requiring 30-40 days of travel during spring-summer months for government correspondence.

**Source Reviewed:**
- GEOGRAPHIC-ANALYSIS.md, line 172: "Knoxville → Philadelphia | ~400 miles | 30-40 days | Spring-summer | Main government correspondence route"

**Reason for Skip:** ❌ **NO PRIMARY SOURCE**

**Detailed Explanation:**
Same issues as geo-003 and geo-004:
- Distance is modern calculation
- Travel time (30-40 days) is estimated range, not documented
- Would need actual correspondence with dated letters showing dispatch and receipt times
- Example of what would work: "Knox to Blount, dated August 10, received September 15" = 36 days documented

**Note:** Blount's extensive correspondence with Knox and Jefferson exists - could potentially extract actual travel times from dated letters, but that analysis hasn't been done yet.

**Decision:** SKIP - Needs actual correspondence analysis to document travel times

---

### trd-001: Chickasaw-Choctaw trade agreement October 12, 1794

**Claim:** A trade agreement was signed on October 12, 1794, between David Moore (boat captain) and tribal representatives including Opoca Mingo, facilitating goods transport with Chickasaw and Choctaw assistance.

**Source Reviewed:**
- MASTER_INDEX.md, line 205: "Chickasaw-Choctaw Trade Agreement | October 12, 1794 | TeVA (p15138coll18)"
- Tennessee Virtual Archive primary source

**Reason for Skip:** ✅ **ALREADY IN LIBRARY**

**Detailed Explanation:**
This fact already exists in reference-library.ts as **trt-021** (lines 654-666):
```typescript
{
  id: 'trt-021',
  category: 'treaty',
  claim: 'A trade agreement was signed on October 12, 1794, between David Moore (boat captain) and tribal representatives including Opoca Mingo, facilitating goods transport with Chickasaw and Choctaw assistance',
  source: 'MASTER_INDEX.md (Tennessee Virtual Archive p15138coll18)',
  sourceType: 'primary',
  confidence: 'verified',
  wrongVariants: [
    'chickasaw.{0,20}trade.{0,20}179[0-3]',
    'chickasaw.{0,20}trade.{0,20}179[5-9]',
    'chickasaw.{0,20}october [1-9]\\,',
  ],
}
```

**Decision:** SKIP - Duplicate extraction (already exists as trt-021)

---

### trd-002: Blount-Moore articles of agreement October 12, 1794

**Claim:** Articles of agreement were signed between William Blount and David Moore on October 12, 1794, regarding tribal goods transport.

**Source Reviewed:**
- MASTER_INDEX.md, line 206: "Articles of Agreement (Blount & Moore) | October 12, 1794 | TeVA (p15138coll30/4364)"
- Tennessee Virtual Archive primary source

**Reason for Skip:** ✅ **ALREADY IN LIBRARY**

**Detailed Explanation:**
This fact already exists in reference-library.ts as **gov-017** (lines 215-226):
```typescript
{
  id: 'gov-017',
  category: 'governance',
  claim: 'Articles of agreement were signed between William Blount and David Moore on October 12, 1794, regarding tribal goods transport',
  source: 'MASTER_INDEX.md (Tennessee Virtual Archive p15138coll30/4364)',
  sourceType: 'primary',
  confidence: 'verified',
  wrongVariants: [
    'blount.{0,20}moore.{0,20}agreement.{0,20}179[0-3]',
    'blount.{0,20}moore.{0,20}agreement.{0,20}179[5-9]',
    'blount.{0,20}moore.{0,20}october [1-9]\\,',
  ],
}
```

**Decision:** SKIP - Duplicate extraction (already exists as gov-017)

---

## Summary of Skip Reasons

### By Type
1. **Quality Standard Issues (5 facts):**
   - geo-001: Contradicts recent correction
   - geo-002 through geo-005: No primary source (scholarly estimates)

2. **Duplicate Entries (2 facts):**
   - trd-001: Already exists as trt-021
   - trd-002: Already exists as gov-017

### Conservative Gatekeeping
This 58.8% extraction rate (10 out of 17) demonstrates appropriate quality control:
- We extracted facts with solid primary source documentation
- We rejected geographic estimates lacking period documentation
- We caught duplicates that would have inflated fact count
- We protected against reintroducing a recently corrected error

### Recommendations for Future Research

**Geographic Facts (geo-002 through geo-005):**
Could potentially be extracted IF we:
1. Find period surveyor notes documenting elevation
2. Analyze dated Blount correspondence to document actual travel times
3. Find letters like "departed [date], arrived [date]" for each route

**Example of what we'd need:**
```
Blount to Knox, October 20, 1790: "I departed Rocky Mount on the 15th
and arrived at Knoxville on the 18th after an arduous three-day journey..."
```

Without such documentation, these remain analytical estimates, not historical facts.

---

_Skip documentation completed: February 2, 2026_
_Conservative approach maintained quality standard_
_Result: Protected reference library from errors and duplicates_
