# Evidence Room Data Architecture Analysis — Complete Package

**Created:** January 30, 2026
**Status:** Analysis Complete, Ready for Implementation
**Total Scope:** 5 documents, 2,643 lines, 14,000+ words

---

## You Have Been Asked to Analyze

**Questions:**

1. Should TREATY_SIGNERS data live in a separate file?
2. Are constants properly organized?
3. Should timeline events be in JSON format?
4. Is there opportunity for data normalization?
5. Could metadata be more structured?
6. Should there be a CMS for document management?

**Goal:** Provide recommendations for data architecture improvements that support scalability and authority positioning.

---

## Your Analysis Answers All Six Questions

### Question 1: Should TREATY_SIGNERS data live in a separate file?

**Answer:** YES

**Current State:**

- Hardcoded in `/app/(main)/evidence/page.tsx` (lines 54-80)
- Only 5 signers shown; needs to scale to 42

**Recommendation:**

- Move to `/content/treaty-signers.json`
- Add metadata (birth/death, descendants, sources)
- Reuse in `/evidence/people` page

**Where to Read:**

- EVIDENCE-QUICK-FIXES.md → Fix 1 (20 minutes)
- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 1 (page 2)

**Implementation:**
See EVIDENCE-QUICK-FIXES.md for step-by-step code changes.

---

### Question 2: Are constants properly organized?

**Answer:** Mixed—some good, some need migration

**Current State:**

- `/lib/copy/` well-organized for brand messaging ✓
- `PRIMARY_QUOTES` in copy system (should be data) ✗
- `SOURCE_LINKS` as constants (should be data) ✗

**Recommendation:**

- Keep `/lib/copy/` for messaging
- Move actual data to `/content/` JSON files
- Create clear boundary between data and presentation

**Where to Read:**

- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Sections 2-6 (pages 2-6)
- EVIDENCE-QUICK-FIXES.md → Fixes 2-3 (35 minutes)

**Pattern:**

- Copy system: "How do we say this?"
- Data system: "What is the truth?"

---

### Question 3: Should timeline events be in JSON format?

**Answer:** YES—and you already do this correctly! ✓

**Current State:**

- Timeline events properly structured in `/content/timeline-events.json`
- Correctly imported into `/components/evidence/Timeline.tsx`
- Full schema with type safety

**Assessment:**
This is the model to follow for other evidence data.

**Where to Read:**

- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Section 3 (page 3)
- Marked as "Scalability: ✓ Excellent"

---

### Question 4: Is there opportunity for data normalization?

**Answer:** Significant—currently fragmented

**Current Problems:**

- Evidence data scattered across multiple files and systems
- Quotes in copy, signers in React, timeline in JSON
- No unified schema

**Opportunities:**

- Create unified evidence data schema
- Normalize all evidence items consistently
- Enable deduplication and cross-referencing
- Support queries across all evidence

**Recommendation:**
Create `/lib/types/evidence.ts` with unified interfaces

**Where to Read:**

- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 2 (page 2)
- EVIDENCE-QUICK-FIXES.md → Fix 4 (15 minutes)
- EVIDENCE-CMS-SCHEMA.md → All options (comprehensive)

**Scope:**

- Treaty signers: consistent schema
- Quotes: consistent schema
- Sources: consistent schema
- Timeline: already unified ✓

---

### Question 5: Could metadata be more structured?

**Answer:** YES—needs verification/authority metadata

**Current State:**

- Minimal metadata on most evidence items
- No indication of verification status
- No confidence levels
- Limited sourcing information

**Opportunities:**

- Add verification status to each item
- Track who verified and when
- Confidence levels (high/medium/low)
- Full citation chains to authoritative sources
- Audit trail for changes

**Benefits:**

- Positions Rocky Mount as scholarly authority
- Supports academic integration
- Transparent about uncertainty
- Enables export to academic databases

**Where to Read:**

- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 5 (page 5)
- EVIDENCE-CMS-SCHEMA.md → See "verification" field in all schemas

**Example:**
From EVIDENCE-CMS-SCHEMA.md (Sanity schema):

```typescript
{
  name: 'verification',
  title: 'Verification Status',
  type: 'object',
  fields: [
    { name: 'status', type: 'string', options: ['Verified', 'Under Review', 'Unverified'] },
    { name: 'verifiedBy', type: 'string' },
    { name: 'verifiedDate', type: 'datetime' },
    { name: 'confidenceLevel', type: 'string', options: ['High', 'Medium', 'Low'] }
  ]
}
```

---

### Question 6: Should there be a CMS for document management?

**Answer:** YES—Headless CMS (Sanity Studio) recommended

**Strategic Rationale:**

1. **Non-technical Access:** Museum staff can edit content
2. **Audit Trail:** Git integration tracks all changes
3. **Academic Credibility:** Clear verification status
4. **Scalability:** Easy to add new evidence items
5. **Authority Positioning:** Transparent sourcing

**Three Options Provided:**

**Option 1: Sanity Studio** (Recommended)

- Headless CMS with JSON storage
- Git integration for version control
- Editorial UI for non-technical staff
- Works with existing Next.js setup
- Complete schema provided

**Option 2: PostgreSQL**

- Traditional backend database
- Row-level security for permissions
- Full normalization
- For larger deployments

**Option 3: Supabase** (Matches Your Stack)

- PostgreSQL + GUI + JWT auth
- Best balance of power and simplicity
- Integrates with Next.js
- Complete schema provided

**Where to Read:**

- EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 6 (page 6)
- EVIDENCE-CMS-SCHEMA.md → All three options (18 pages)
  - Sanity schema (recommended)
  - PostgreSQL schema
  - Supabase integration guide

**Timeline:**

- Phase 1 (Week 1-2): Data migration
- Phase 2 (Week 3-4): Enhancement
- Phase 3 (Week 5-6): CMS setup
- Phase 4 (Week 7-8): API & export

---

## How the Documents Work Together

```
QUESTION → DOCUMENT PATH

1. Should TREATY_SIGNERS be separate?
   ├─→ ANALYSIS-SUMMARY.md (Quick answer)
   ├─→ EVIDENCE-QUICK-FIXES.md (Step-by-step implementation)
   └─→ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Full rationale)

2. Are constants organized?
   ├─→ ANALYSIS-SUMMARY.md (Strengths/gaps overview)
   └─→ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Detailed assessment)

3. Should timeline be JSON?
   └─→ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Assessment: already excellent)

4. Normalization opportunities?
   ├─→ EVIDENCE-QUICK-FIXES.md (Quick solution)
   └─→ EVIDENCE-CMS-SCHEMA.md (Full schemas)

5. More structured metadata?
   ├─→ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Strategy)
   └─→ EVIDENCE-CMS-SCHEMA.md (Concrete field definitions)

6. CMS for document management?
   ├─→ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Recommendation with rationale)
   └─→ EVIDENCE-CMS-SCHEMA.md (Three complete options)
```

---

## Document Quick Reference

### INDEX-EVIDENCE-ANALYSIS.md

- **Purpose:** Master navigation
- **Read time:** 10 minutes
- **Best for:** Understanding the full package
- **Contains:** Scenario-based paths, decision matrix

### ANALYSIS-SUMMARY.md

- **Purpose:** Executive overview
- **Read time:** 5 minutes
- **Best for:** Getting the gist quickly
- **Contains:** Key findings, strategic impact, document descriptions

### EVIDENCE-QUICK-FIXES.md

- **Purpose:** Phase 1 implementation
- **Read time:** 30 minutes
- **Best for:** Developers starting work this week
- **Contains:** 4 concrete fixes with code examples, testing checklist

### EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md

- **Purpose:** Comprehensive strategic analysis
- **Read time:** 40 minutes (full read)
- **Best for:** Architects, decision makers, long-term strategy
- **Contains:** 7 recommendations, 4-phase roadmap, rationale for each decision

### EVIDENCE-CMS-SCHEMA.md

- **Purpose:** Technical reference for CMS
- **Read time:** 30 minutes (reference)
- **Best for:** Planning CMS integration, technical implementation
- **Contains:** 3 complete schema options, editorial workflows, deployment considerations

---

## What You Get

| Item                     | Deliverable              |
| ------------------------ | ------------------------ |
| Analysis documents       | 5 complete (2,643 lines) |
| Concrete recommendations | 7 strategic items        |
| Implementation roadmap   | 4 phases (2-8 weeks)     |
| Code examples            | 25+ specific examples    |
| Type definitions         | Ready-to-use TypeScript  |
| CMS schemas              | 3 complete options       |
| Quick fixes              | 4 concrete (2-4 hours)   |
| Testing procedures       | Full checklist           |
| Decision matrix          | 3 scenarios covered      |

---

## Next Steps

1. **Choose your scenario:**
   - Implementing this week? → EVIDENCE-QUICK-FIXES.md
   - Want full picture? → EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md
   - Planning CMS? → EVIDENCE-CMS-SCHEMA.md
   - New to project? → ANALYSIS-SUMMARY.md
   - Need navigation? → INDEX-EVIDENCE-ANALYSIS.md (START HERE)

2. **Make decisions:**
   - [ ] Phase 1 this week?
   - [ ] CMS timeline?
   - [ ] Stakeholder communication?

3. **Take action:**
   - Assign EVIDENCE-QUICK-FIXES.md to developer, or
   - Schedule for later, or
   - Share with stakeholders for review

---

## Key Takeaways

**Your Evidence Room is well-built but fragmented.**

Current state:

- Timeline events: Good (✓ JSON-backed)
- Copy system: Good (✓ centralized)
- Evidence data: Needs work (⚠ scattered across files)

Simple fix:

- Move 3 data sets from React/copy to JSON files (2-4 hours)
- Add unified schema (15 minutes)
- Ready for CMS integration

Strategic impact:

- Scalability: From 5 items to 500+
- Authority: Verification metadata, audit trail
- Accessibility: Non-technical staff can manage content
- Scholarship: API for academic research

---

## Files Location

All in project root:

```
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/

├── README-ANALYSIS.md (you are here)
├── INDEX-EVIDENCE-ANALYSIS.md (master index)
├── ANALYSIS-SUMMARY.md (5-min overview)
├── EVIDENCE-QUICK-FIXES.md (Phase 1 implementation)
├── EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (full analysis)
└── EVIDENCE-CMS-SCHEMA.md (CMS technical reference)
```

---

## Questions Answered

| Your Question                      | Answer             | Document          | Section      |
| ---------------------------------- | ------------------ | ----------------- | ------------ |
| Should TREATY_SIGNERS be separate? | YES                | QUICK-FIXES       | Fix 1        |
| Are constants organized?           | Mixed              | ANALYSIS          | Sections 2-6 |
| Should timeline be JSON?           | YES (already done) | ANALYSIS          | Section 3    |
| Normalization opportunity?         | Significant        | ANALYSIS          | Rec. 2,4     |
| More structured metadata?          | YES                | ANALYSIS          | Rec. 5       |
| Should we have a CMS?              | YES                | ANALYSIS + SCHEMA | Rec. 6 + All |

---

## Status

✓ Analysis complete
✓ All questions answered
✓ Recommendations documented
✓ Implementation paths clear
✓ Ready for decision and action

---

_This analysis enables Rocky Mount State Historic Site to become the definitive digital authority on territorial Tennessee history, with scalable data architecture supporting both staff workflow and scholarly access._
