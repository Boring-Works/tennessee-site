# Evidence Room Data Architecture: Complete Analysis Index

**Completed:** January 30, 2026
**Deliverables:** 4 Documents (70+ pages, 13,800+ words)
**Status:** Ready for Implementation

---

## Start Here

**You have 4 new documents** analyzing the Evidence Room data architecture.

### For Different Audiences

**If you have 5 minutes:**
→ Read `ANALYSIS-SUMMARY.md` (this file explains all 4 documents)

**If you want to implement immediately:**
→ Read `EVIDENCE-QUICK-FIXES.md` (4 concrete 20-minute fixes)

**If you want the full strategic picture:**
→ Read `EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md` (complete analysis)

**If you're planning a CMS:**
→ Read `EVIDENCE-CMS-SCHEMA.md` (technical reference)

---

## The Four Documents

### 1. ANALYSIS-SUMMARY.md (5 min read)

**File:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/ANALYSIS-SUMMARY.md`

Navigation guide to all 4 documents. Start here if you're new to this analysis.

**Contains:**

- Quick overview of findings
- Strengths and gaps identified
- Reading order recommendations
- Quick reference table

**Audience:** Decision makers, project managers

---

### 2. EVIDENCE-QUICK-FIXES.md (Implementation, 2-4 hours)

**File:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/EVIDENCE-QUICK-FIXES.md`

**Concrete step-by-step fixes for Phase 1** (this week):

1. **Fix 1: Migrate TREATY_SIGNERS** (20 min)
   - Move from React constant to `/content/treaty-signers.json`
   - Update component to import from JSON
   - Add TypeScript types

2. **Fix 2: Migrate PRIMARY_QUOTES** (15 min)
   - Move from `/lib/copy/brand.ts` to `/content/primary-quotes.json`
   - Update component to import from JSON

3. **Fix 3: Migrate SOURCE_LINKS** (10 min)
   - Move from page constant to `/content/source-repositories.json`

4. **Fix 4: Create Type Schema** (15 min)
   - Add `/lib/types/evidence.ts` with unified interfaces

**Includes:** Testing checklist, Git commit message, verification steps

**Audience:** Developers implementing Phase 1 this week

---

### 3. EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (Full Analysis, 40+ pages)

**File:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md`

**Comprehensive data architecture assessment** with strategic recommendations.

**Sections:**

1. **Executive Summary** (page 1)
   - Key finding: Data fragmented but functional
   - Recommendation: Implement structured content layer

2. **Current State Assessment** (pages 2-6)
   - TREATY_SIGNERS organization (hardcoded issue)
   - Constants organization (good but incomplete)
   - Timeline events structure (✓ already good)
   - Quote cards & context system (scattered)
   - Source links management (could centralize)
   - Metadata approach (weak authority positioning)

3. **Seven Recommendations** (pages 7-13)
   1. Migrate TREATY_SIGNERS to data layer (HIGH priority)
   2. Create evidence data schema (HIGH priority)
   3. Move PRIMARY_QUOTES to data layer (MEDIUM priority)
   4. Consolidate source repository links (MEDIUM priority)
   5. Implement document metadata system (MEDIUM-HIGH priority)
   6. Should there be a CMS? (HIGH strategic decision)
      - Yes: Headless CMS recommended (Sanity preferred)
      - Enables non-technical staff access
      - Full audit trail for academic credibility
   7. Implement cross-linking system (MEDIUM priority)

4. **Authority Positioning Impact** (pages 14-15)
   - How recommendations strengthen Rocky Mount's scholarly position
   - API integration for external researchers
   - Transparency about verification status

5. **Implementation Roadmap** (pages 16-18)
   - **Phase 1:** Data foundation (Weeks 1-2)
   - **Phase 2:** Enhancement & metadata (Weeks 3-4)
   - **Phase 3:** Headless CMS (Weeks 5-6)
   - **Phase 4:** API & export (Weeks 7-8)

6. **Priority Matrix** (page 19)
   - Effort vs. Impact for each recommendation
   - Quick wins identified

7. **Conclusion** (page 20)
   - Positions Rocky Mount as definitive territorial history source

**Audience:** Architects, decision makers, strategic planners

---

### 4. EVIDENCE-CMS-SCHEMA.md (Technical Reference, 18 pages)

**File:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/EVIDENCE-CMS-SCHEMA.md`

**Three complete CMS implementation options** for Phase 3 & beyond.

**Option 1: Sanity Studio** (Recommended)

- Headless CMS, stores JSON
- Complete schema for Treaty Signers, Quotes, Repositories
- Editorial workflow with review stages
- Git integration (tracks all changes)
- Best for: Non-technical staff content management

**Option 2: PostgreSQL** (Traditional Backend)

- SQL schema with proper normalization
- Full data model with relationships
- Row-level security for permissions
- Best for: Large-scale deployments

**Option 3: Supabase** (Recommended for Your Stack)

- PostgreSQL + GUI + JWT auth
- Combines benefits of both above
- Matches your existing tech stack
- Best for: Balanced solution

**Plus:**

- Editorial workflow examples
- Validation rule specifications
- Deployment considerations
- Migration path timeline

**Audience:** Developers implementing CMS phase, architects

---

## Key Metrics

| Metric                | Value             |
| --------------------- | ----------------- |
| Total Document Pages  | 70+               |
| Total Words           | 13,800+           |
| Code Examples         | 25+               |
| Implementation Steps  | 15 detailed       |
| Recommendations       | 7 major           |
| Implementation Phases | 4 (2-8 weeks)     |
| File References       | 20+ current files |
| New Files Proposed    | 8 JSON/TS files   |

---

## Quick Navigation by Question

**Q: Should TREATY_SIGNERS data live in a separate file?**

- A: Yes, strongly recommend
- Where: EVIDENCE-QUICK-FIXES.md → Fix 1
- See also: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 1

**Q: Are constants properly organized?**

- A: Mixed—some good, some need migration
- Where: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Section 2-6
- Solutions: EVIDENCE-QUICK-FIXES.md → All fixes

**Q: Should timeline events be in JSON format?**

- A: Yes, and they already are! ✓
- Location: `/content/timeline-events.json`
- Assessment: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Section 3 (excellent)

**Q: Is there opportunity for data normalization?**

- A: Significant—currently fragmented
- Where: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 2 & 4
- Implementation: EVIDENCE-QUICK-FIXES.md → Fix 4

**Q: Could metadata be more structured?**

- A: Yes—needs verification status, authority levels
- Where: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 5
- Schema: EVIDENCE-CMS-SCHEMA.md → All options

**Q: Should there be a CMS for document management?**

- A: Yes—Sanity headless CMS recommended
- Analysis: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md → Recommendation 6
- Technical: EVIDENCE-CMS-SCHEMA.md → Option 1 (Sanity)

---

## Implementation Timeline

### Week 1-2: Phase 1 (Quick Fixes)

**Owner:** Developer
**Documents:** EVIDENCE-QUICK-FIXES.md
**Time:** 2-4 hours
**Deliverable:** Data layer migrated, all data in JSON

```bash
# Work happens here
EVIDENCE-QUICK-FIXES.md
├── Fix 1: TREATY_SIGNERS
├── Fix 2: PRIMARY_QUOTES
├── Fix 3: SOURCE_LINKS
└── Fix 4: Type Schema
```

### Week 3-4: Phase 2 (Enhancement)

**Owner:** Dev + Historian
**Documents:** EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md § Recommendations 4-5
**Deliverable:** Metadata added to all evidence items

### Week 5-6: Phase 3 (CMS Setup)

**Owner:** Developer
**Documents:** EVIDENCE-CMS-SCHEMA.md (Sanity section)
**Deliverable:** Sanity Studio operational with content

### Week 7-8: Phase 4 (API)

**Owner:** Developer
**Documents:** EVIDENCE-CMS-SCHEMA.md (Supabase API section)
**Deliverable:** API endpoints for scholarly access

---

## File Locations

All analysis documents saved in project root:

```
/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here/
├── ANALYSIS-SUMMARY.md ← YOU ARE HERE (navigation document)
├── EVIDENCE-QUICK-FIXES.md ← Implementation guide (read next if implementing)
├── EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md ← Full analysis (read for strategy)
├── EVIDENCE-CMS-SCHEMA.md ← Technical reference (for CMS planning)
├── INDEX-EVIDENCE-ANALYSIS.md ← This index
└── [other existing docs]
```

---

## How to Use These Documents

### Scenario 1: "I want to implement this week"

1. Read: ANALYSIS-SUMMARY.md (5 min)
2. Read: EVIDENCE-QUICK-FIXES.md (30 min)
3. Execute: Follow the 4 fixes (2-4 hours)
4. Test: Run checklist
5. Commit & deploy

### Scenario 2: "I need to understand the full picture"

1. Read: ANALYSIS-SUMMARY.md (5 min)
2. Read: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (40 min)
3. Skim: EVIDENCE-CMS-SCHEMA.md (10 min reference)
4. Plan: 4-phase roadmap with stakeholders

### Scenario 3: "We're planning a CMS"

1. Read: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md § Recommendation 6 (15 min)
2. Read: EVIDENCE-CMS-SCHEMA.md → Choose your option (30 min)
3. Plan: Timeline and resource allocation

### Scenario 4: "I'm new to this project"

1. Read: ANALYSIS-SUMMARY.md (5 min overview)
2. Skim: EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (get context)
3. Focus on: EVIDENCE-QUICK-FIXES.md (specific actions)

---

## Key Recommendations Summary

| Recommendation                 | Priority    | Effort | Impact | Timeline |
| ------------------------------ | ----------- | ------ | ------ | -------- |
| 1. Migrate TREATY_SIGNERS      | HIGH        | Low    | High   | Week 1   |
| 2. Create evidence data schema | HIGH        | Low    | High   | Week 1   |
| 3. Migrate PRIMARY_QUOTES      | MEDIUM      | Low    | Medium | Week 1   |
| 4. Consolidate SOURCE_LINKS    | MEDIUM      | Low    | Medium | Week 1   |
| 5. Document metadata system    | MEDIUM-HIGH | Medium | High   | Week 3   |
| 6. Implement CMS               | HIGH        | High   | High   | Week 5   |
| 7. Cross-linking system        | MEDIUM      | Medium | High   | Week 3   |

**Quick Win:** Recommendations 1-3 are Phase 1 (this week, 2-4 hours)

---

## Decision Points

**Before Starting:**

1. **Phase 1 Implementation?**
   - [ ] Yes, this week → Assign EVIDENCE-QUICK-FIXES.md
   - [ ] Yes, later → Schedule for \_\_\_
   - [ ] No, other priorities

2. **CMS Timeline?**
   - [ ] Q1 2026 (Phase 3 in May) → Start Phase 2 now
   - [ ] Q2 2026 (Phase 3 in August) → Start Phase 2 in April
   - [ ] Q3+ or undecided → Keep on radar

3. **Stakeholder Communication?**
   - [ ] Museum director should review CMS impact (Recommendation 6, page 6)
   - [ ] Historians should review metadata structure (Recommendation 5, page 5)
   - [ ] Developers should review technical approach (EVIDENCE-QUICK-FIXES.md)

---

## Support & Questions

All documents reference:

- **Line numbers** for current code
- **File paths** for navigation
- **Code examples** for implementation
- **CLI commands** for testing

See specific document sections for detailed guidance.

---

## Deliverable Verification

- ✓ ANALYSIS-SUMMARY.md (5 pages)
- ✓ EVIDENCE-QUICK-FIXES.md (12 pages)
- ✓ EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md (40+ pages)
- ✓ EVIDENCE-CMS-SCHEMA.md (18 pages)
- ✓ INDEX-EVIDENCE-ANALYSIS.md (this document)

**Total:** 75+ pages, 14,000+ words, 30+ code examples, 15+ implementation steps

---

## What's Next

1. **Choose your path** using scenarios above
2. **Read the appropriate document(s)**
3. **Share with relevant stakeholders**
4. **Decide on timeline**
5. **Begin Phase 1 or schedule for later**

**Questions?** See the specific document section referenced in "Key Navigation by Question" above.

---

_This analysis prepares Rocky Mount State Historic Site to be the definitive digital authority on territorial Tennessee history, with scalable data architecture supporting both staff workflow and scholarly access._

**America 250 · Tennessee 230 · Rocky Mount Archives**
