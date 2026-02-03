# Andrew Jackson Marketing Content Review

**Date:** February 3, 2026
**Reviewer:** Claude (AI Assistant)
**Purpose:** Identify all Andrew Jackson references in marketing materials and provide removal recommendations

---

## Executive Summary

### Total References Found: 73 files

**By Category:**

- **MARKETING (Remove Immediately):** 4 files
- **EDUCATIONAL (Keep - Properly Contextualized):** 6 files
- **ARCHIVED/RESEARCH (Already Retired):** 33 files
- **DOCUMENTATION (Reference Only):** 30 files

### Critical Finding

Andrew Jackson references appear in **key marketing materials** where they compete with Rocky Mount's actual verified story (William Blount, Southwest Territory capital 1790-1792). The site's authentic founding narrative is stronger than the unverified Jackson oral tradition.

**The Real Story:** Rocky Mount was the first capital of the Southwest Territory, where William Blount (Constitution signer) governed from 1790-1792 and conducted preliminary talks with 42 Cherokee chiefs that led to the Treaty of Holston.

**The Jackson Problem:** Oral tradition claims Jackson lodged here in 1788, but:

1. Zero primary source documentation
2. Current buildings built 1827-1830 (39 years AFTER claimed visit)
3. Competes for attention with verified Blount story
4. Not Rocky Mount's unique value proposition

---

## Priority 1: REMOVE FROM MARKETING (4 Files)

These files contain Jackson references in marketing/branding materials that visitors see. **These should be updated immediately.**

### 1. `/lib/copy/narratives.ts` (Lines 94-101)

**Status:** MARKETING - Brand Copy System (Source of Truth)
**Severity:** HIGH - This is the master brand copy file
**Current Content:**

```typescript
andrewJackson: {
  name: 'Andrew Jackson',
  title: 'Future 7th President',
  years: '1788 (oral tradition)',
  hook: 'According to local tradition, lodged at Rocky Mount while awaiting his law license. He was 21 years old.',
  highlight: 'Future President',
  note: 'Based on oral tradition, not primary documentation.',
},
```

**Recommendation:** DELETE entire `andrewJackson` object
**Rationale:** This is used throughout the site for marketing. Including Jackson in the same tier as Blount (verified Constitution signer) weakens Rocky Mount's positioning.

**Alternative:** If you want to keep ANY Jackson mention for tours, move it to a separate "Visitors in Oral Tradition" section clearly marked as unverified.

---

### 2. `/content/marketing/MARKETING-MASTER-DOCUMENT.md` (Lines 544-550)

**Status:** MARKETING - Master Marketing Reference
**Severity:** HIGH - Staff training document
**Current Content:**

```markdown
### Andrew Jackson

- **Title:** Future 7th President
- **Years:** 1788 (oral tradition)
- **Hook:** According to local tradition, lodged at Rocky Mount while awaiting his law license. He was 21 years old.
- **Highlight:** Future President
- **Note:** Based on oral tradition, not primary documentation.
```

**Recommendation:** DELETE this section entirely
**Rationale:** Marketing master document should focus on verified claims only. Jackson doesn't strengthen the brand - Blount does.

---

### 3. `/data/siteInfo.json` (Lines 382-393)

**Status:** MARKETING - Site Configuration (API for website)
**Severity:** HIGH - Powers website content
**Current Content:**

```json
{
  "id": "andrewJackson",
  "name": "Andrew Jackson",
  "title": "Future 7th President",
  "years": "1788",
  "hook": "Lodged at Rocky Mount for six weeks while awaiting his law license. He was 21 years old.",
  "highlight": "Future President",
  "details": [
    "Stayed at Rocky Mount for six weeks as a young lawyer",
    "Was awaiting his license to practice law in the territory",
    "Would later become the 7th President of the United States"
  ]
}
```

**Recommendation:** DELETE this entire object from `historicalFigures` array
**Rationale:** This JSON feeds website components. Removing it here removes it from all connected pages.

**Note:** Also check if any components import this data directly and would break.

---

### 4. `/components/home/ConsolidatedProof.tsx` (Lines 42-62)

**Status:** MARKETING - Homepage Component
**Severity:** CRITICAL - Visitors see this on homepage
**Current Content:**

```typescript
{
  name: 'Andrew Jackson',
  title: 'Future President',
  role: (
    <>
      <Claim doc="jackson-at-rocky-mount-1788" passage="six-weeks">
        Lodged here 1788
      </Claim>
    </>
  ),
  quote: (
    <>
      <Claim doc="jackson-at-rocky-mount-1788" passage="waiting-period">
        Six weeks at age 21, awaiting his law license.
      </Claim>
    </>
  ),
  badge: '7th President',
  initial: 'AJ',
  connection: 'Prepared for his frontier career here',
},
```

**Recommendation:** DELETE this entire figure object from the `figures` array (lines 42-62)
**Rationale:** This appears on the HOMEPAGE in the "Consolidated Proof" section. It positions Jackson equally with Blount, which dilutes Rocky Mount's unique story.

**Better Approach:** Keep only Blount (verified) and Cobb Family (documented settlers). Let visitors discover the Jackson oral tradition in the Evidence Room if they're interested, but don't lead with it.

---

## Priority 2: KEEP BUT VERIFY CONTEXT (6 Files)

These are educational/historical documents that properly contextualize Jackson as oral tradition. **These are fine to keep** because they serve an educational purpose and include disclaimers.

### 5. `/content/people/andrew-jackson.md`

**Status:** EDUCATIONAL - Evidence Room
**Severity:** LOW - Properly contextualized
**Current Content:** Includes disclaimer at line 23:

> **Note on Sources:** The following account is based on oral tradition, not primary documentation.

**Recommendation:** KEEP - This is educational content in the Evidence Room, properly labeled.

---

### 6. `/content/documents/jackson-at-rocky-mount-1788.md`

**Status:** EDUCATIONAL - Historical Document
**Severity:** LOW - Clearly marked "oral tradition only"
**Current Content:** Includes strong disclaimer at line 16:

> ORAL TRADITION ONLY - No primary documentation exists...

**Recommendation:** KEEP - This document is for researchers and includes appropriate scholarly caveats.

---

### 7. `/content/emails/post-visit-sequence.md` (Line 30)

**Status:** MARKETING EMAIL - Post-visit nurture sequence
**Severity:** MEDIUM - Visitor-facing
**Current Content:**

> "Yesterday, you walked the same ground where William Blount governed and Andrew Jackson lodged."

**Recommendation:** REWRITE to remove Jackson
**Suggested Edit:**

```markdown
# OLD:

Yesterday, you walked the same ground where William Blount governed and Andrew Jackson lodged.

# NEW:

Yesterday, you walked the same ground where William Blount governed and 42 Cherokee chiefs negotiated with the federal government.
```

**Rationale:** Focus on verified, unique stories. Cherokee diplomacy is more historically significant and better supported.

---

### 8. `/content/marketing/SPEAKERS-GUIDE.md` (Line 129)

**Status:** STAFF TRAINING - Internal use
**Severity:** LOW - Already notes removal
**Current Content:**

> **Fame Bridge (Tours):** Governor Blount governed here. The State started here.
> **Note:** Jackson claim removed pending primary source verification.

**Recommendation:** KEEP - Already acknowledges removal. This is internal staff guidance.

---

### 9-10. `/lib/dredge/reference-library.ts` + `/lib/dredge/extraction-prompt.ts`

**Status:** TECHNICAL - Truth validation system
**Severity:** LOW - Backend only
**Current Content:** Documents Jackson as "oral tradition" with moderate confidence

**Recommendation:** KEEP - These files are for fact-checking and research. They properly categorize Jackson as unverified.

---

## Priority 3: ARCHIVED/RESEARCH (33 Files)

These files are in the `/docs/_archive/`, `/content/_archive/`, or are research reports analyzing the Jackson claim. **No action needed** - they're already retired from active use.

Examples:

- `docs/_archive/JACKSON-1788-EXECUTIVE-SUMMARY.md`
- `docs/_archive/DENDROCHRONOLOGY-FACT-CHECK-EXECUTIVE-SUMMARY.md`
- `content/JACKSON-DENDRO-FACT-CHECK.md`
- `content/JACKSON-TIMELINE-FACT-CHECK.md`
- `content/JACKSON-CORRECTION-GUIDE.md`

**Recommendation:** Leave in place - Historical record of research process.

---

## Priority 4: DOCUMENTATION (30 Files)

These are technical docs, audit reports, and internal decision logs. **No action needed** - they document the decision-making process.

Examples:

- `MASTER-CONFLICT-MATRIX.md`
- `SOURCE-DIVERGENCE-ANALYSIS.md`
- `docs/HISTORICAL-ACCURACY-AUDIT.md`
- `docs/EDUCATIONAL-CITATION-GUIDE.md`

**Recommendation:** Leave in place - Process documentation.

---

## Why Remove Jackson from Marketing?

### 1. Weakens Your Actual Story

**Rocky Mount's Unique Value:**

- ONLY site where Southwest Territory government was established (1790-1792)
- William Blount = Constitution signer appointed by George Washington
- Cherokee diplomatic talks on this ground led to Treaty of Holston
- First federal constitutional government west of Appalachians

**Jackson's Connection:**

- Alleged visit in 1788 (2 years BEFORE capital period)
- Zero primary sources
- Buildings he supposedly saw don't exist anymore
- Story doesn't differentiate Rocky Mount from dozens of "Jackson slept here" sites

### 2. Competes for Limited Attention

Marketing has ~5 seconds to establish why someone should care. Leading with Jackson (famous but unverified) instead of Blount (less famous but VERIFIED Constitution signer) is backwards.

**What visitors remember:**

- Option A: "Andrew Jackson stayed here" (so did 100 other places)
- Option B: "This is where Tennessee's government began - the Constitution's first test west of the mountains"

Option B is unique. Option A is generic.

### 3. Sets Wrong Expectations

When you mention Jackson in marketing:

- Visitors expect to learn about Jackson
- You can't deliver (because it's oral tradition)
- Visitor leaves disappointed or confused

When you lead with Blount + Capital story:

- Visitors expect to learn about territorial government
- You CAN deliver (verified primary sources)
- Visitor leaves educated and impressed

### 4. Ethical Marketing

Including Jackson alongside Blount implies equal historical standing. It doesn't exist. Blount's presence is documented in his own handwriting. Jackson's is not.

**Current approach risks:**

- Academic credibility concerns
- Visitor trust issues if they research later
- Competitors questioning your claims

---

## Recommended Marketing Strategy

### Lead With What You Can Prove

**Tier 1: Hero Claims (Homepage, Ads, Social)**

- William Blount (Constitution signer) governed here 1790-1792
- First capital of Southwest Territory
- Cherokee chiefs negotiated here before Treaty of Holston
- "Where Tennessee's government began"

**Tier 2: Supporting Stories (Tours, Evidence Room)**

- Cobb family settlement (1770)
- Overmountain Men supplied from this ground (1780)
- Glass windows Blount wrote about (verified 1790 letter)
- 42 Cherokee leaders hosted here (December 1790)

**Tier 3: Oral Traditions (Evidence Room Only, Clearly Labeled)**

- Andrew Jackson alleged stay (1788) - NO PRIMARY SOURCES
- Other visitors in regional histories

### Positioning Shift

**OLD Positioning (Weak):**
"Famous people visited here"

**NEW Positioning (Strong):**
"This is the ground where Tennessee began - where the Constitution was tested on the frontier and succeeded."

### Competitor Differentiation

**Sycamore Shoals:**

- Army muster point
- Military story

**Rocky Mount:**

- Government headquarters
- Constitutional story

**Tagline Options:**

- "They gathered at the Shoals. The State started here."
- "The Constitution's first test west of the mountains."
- "Stand where Tennessee began."

---

## Implementation Checklist

### Phase 1: Remove from Code (Immediate)

- [ ] Delete Jackson from `/lib/copy/narratives.ts`
- [ ] Delete Jackson from `/data/siteInfo.json`
- [ ] Delete Jackson from `/components/home/ConsolidatedProof.tsx`
- [ ] Remove Jackson from `/content/marketing/MARKETING-MASTER-DOCUMENT.md`

### Phase 2: Update Marketing Materials (This Week)

- [ ] Rewrite post-visit email sequence (remove Jackson line)
- [ ] Update any printed brochures mentioning Jackson
- [ ] Review gift shop signage
- [ ] Update tour scripts (staff training)

### Phase 3: Redirect Attention (This Month)

- [ ] Create "Constitution on the Frontier" content series
- [ ] Amplify Cherokee diplomatic story
- [ ] Feature Blount's letters in social media
- [ ] Develop "Where Tennessee Began" campaign

### Phase 4: Educational Context (Ongoing)

- [ ] Keep Jackson content in Evidence Room (properly labeled)
- [ ] Create "Oral Traditions in History" educational module
- [ ] Train interpreters to address visitor questions about Jackson
- [ ] Maintain research files for academic inquiries

---

## Staff Training Talking Points

### If Visitors Ask About Jackson

**DON'T SAY:**

- "That's not true" (sounds defensive)
- "We used to say that but we were wrong" (damages credibility)
- "I don't know" (sounds uninformed)

**DO SAY:**
"That's a great question. Local tradition holds that Jackson may have passed through this area in 1788, but we focus on what we can document with primary sources - and that's the incredible story of William Blount establishing the first constitutional government west of the Appalachians right here. Jackson's career was just beginning in 1788, but Blount was already a Constitution signer working directly with President Washington. Would you like to hear about how this ground became the capital?"

**Key Phrase:** "We focus on what we can document."

---

## Expected Questions & Answers

**Q: Why remove Jackson? He's famous and draws visitors.**

**A:** Jackson is famous, but his connection to Rocky Mount is unverified. Meanwhile, Blount's connection IS verified - and he's a Constitution signer personally appointed by George Washington. That's a more powerful story and it's provably true. We're trading a maybe-famous-person for a definitely-important-historical-event.

---

**Q: Won't we lose visitors if we remove a president from our marketing?**

**A:** We're not losing a president - we're gaining clarity about our unique story. The Southwest Territory capital period (1790-1792) is what makes Rocky Mount nationally significant, not an alleged overnight stop by a future president in 1788. Sycamore Shoals has the military story. Jonesborough has the state history story. Rocky Mount has the territorial government story - and that's unique.

---

**Q: What if primary sources confirming Jackson emerge later?**

**A:** Excellent! Then we reintroduce him to marketing with "newly discovered evidence." But until then, we lead with what we can prove. The Evidence Room still documents the oral tradition for researchers interested in the full picture.

---

**Q: Should we mention Jackson on tours at all?**

**A:** Tour guides can acknowledge the tradition if asked: "Local history suggests Jackson may have passed through in 1788, but we don't have primary documentation. What we DO know for certain is that William Blount governed from this room starting in 1790..." Don't lead with Jackson, but don't hide from the question either.

---

## Files Requiring Updates (Summary)

### CRITICAL (4 files - Update First)

1. `/lib/copy/narratives.ts` - Delete andrewJackson object
2. `/data/siteInfo.json` - Delete andrewJackson from historicalFigures
3. `/components/home/ConsolidatedProof.tsx` - Delete Jackson from figures array
4. `/content/marketing/MARKETING-MASTER-DOCUMENT.md` - Delete Jackson section

### MEDIUM (1 file - Update Soon)

5. `/content/emails/post-visit-sequence.md` - Rewrite line 30 to remove Jackson

### LOW (Keep with context - No changes)

6. `/content/people/andrew-jackson.md` - Educational, properly labeled
7. `/content/documents/jackson-at-rocky-mount-1788.md` - Research doc, disclaimered
8. `/lib/dredge/reference-library.ts` - Fact-checking backend
9. `/lib/dredge/extraction-prompt.ts` - Fact-checking backend
10. `/content/marketing/SPEAKERS-GUIDE.md` - Already notes removal

### ARCHIVED (33 files - Leave alone)

All files in `/docs/_archive/` and `/content/_archive/` related to Jackson research

### DOCUMENTATION (30 files - Leave alone)

Process docs, audit reports, research logs

---

## Final Recommendation

**Remove Andrew Jackson from all marketing materials immediately.** The oral tradition can remain in the Evidence Room for educational purposes, but it should not be part of the visitor acquisition or engagement strategy.

**Your actual story is stronger:**

- William Blount (Constitution signer) governed here
- First capital of Southwest Territory (1790-1792)
- Cherokee diplomatic meetings preceding Treaty of Holston
- "Where Tennessee's government began"

This is Rocky Mount's unique value proposition. It's verified. It's significant. It's defensible.

Let Blount be your hero. Let the Constitution be your hook. Let the capital period be your story.

Jackson can wait in the archives until primary sources emerge.

---

**Next Steps:**

1. Review this report with leadership
2. Approve file changes in checklist
3. Execute Phase 1 code updates
4. Train staff on new talking points
5. Monitor visitor feedback for 30 days

---

_Report compiled by Claude (AI Assistant) on February 3, 2026_
_Files reviewed: 73 | Recommendations: 5 critical updates, 1 rewrite, maintain 6 educational_
