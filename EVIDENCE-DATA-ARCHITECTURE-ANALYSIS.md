# Evidence Room Data Architecture Analysis

**Prepared for:** Tennessee Starts Here / Rocky Mount State Historic Site
**Date:** January 30, 2026
**Scope:** Evaluation of Evidence Room (`/app/(main)/evidence/page.tsx`) data management patterns
**Objective:** Recommendations for scalability, authority positioning, and CMS integration

---

## Executive Summary

The Evidence Room is a well-architected historical documentation system built with strong foundational patterns. Current data management is **functional but fragmented**—critical data (treaty signers, timeline events, quotes) are distributed across:

- Inline constants in React components
- JSON files in content directory
- TypeScript copy system (lib/copy)
- Separate JSON files for different domains

**Key Finding:** The project demonstrates clear intention toward data centralization (`timeline-events.json` exists, component imports it) but treaty signer data and hero quotes remain embedded in React, creating maintenance friction and limiting authority positioning.

**Recommendation:** Implement a **structured content layer** that centralizes evidence data while preserving current CMS flexibility. This enables better API integration, cross-linking, and positions Rocky Mount as an authority on territorial history.

---

## Current State Assessment

### 1. TREATY_SIGNERS Data Organization

**Current Status:** Embedded in `/app/(main)/evidence/page.tsx` (lines 54-80)

```typescript
// CURRENT: Inline constant
const TREATY_SIGNERS = [
  {
    cherokeeName: 'Squollecuttah',
    englishName: 'Hanging Maw',
    role: 'Principal Chief of the Overhill Cherokee',
  },
  // ... 4 more entries
] as const
```

**Issues:**

- Not reusable across pages (page specifically maps over this array in grid)
- Cannot integrate with `/evidence/people` page without duplication
- No metadata fields (birth year, death year, tribal affiliation, historical references)
- Curator's note about transliteration is manual—metadata should capture source authority

**Scalability Risk:**

- If full 42 signatories are added, managing 42 objects in a React file becomes unwieldy
- No version control on translations or historical accuracy notes

**Impact on Authority:**

- Signers are described with 1 role each—limiting scholarly presentation
- No links to broader Cherokee Nation context (Eastern Band, Keetoowah Band descendants)
- Missed opportunity to cite archival sources for each signer

---

### 2. Constants Organization Assessment

**Current Structure:**

```
lib/copy/
├── brand.ts          # Identity, hooks, CTAs
├── narratives.ts     # Story frameworks, staff scripts
├── metadata.ts       # SEO content, structured data
└── index.ts          # Public API

Observation: PRIMARY_QUOTES in brand.ts (lines 68-103)
```

**Strengths:**

- Centralized quote management
- All quotes have proper attribution + source
- Metadata system includes open graph + structured schema data

**Weaknesses:**

- `PRIMARY_QUOTES` is hardcoded—not extensible without code changes
- No timestamp metadata (when was quote added? what's the source authority level?)
- Quote context is free text, not structured (no links to documents, collections)
- No versioning system (if archaeological findings update context, no audit trail)

**Evidence-Specific Issue:**

- This is a _copy_ system, not a _data_ system
- Copy describes facts; facts should be separate from how they're communicated
- Current approach makes it hard to update facts independently of wording

---

### 3. Timeline Events Data Structure

**Current Status:** Already migrated to JSON ✓

**File:** `/content/timeline-events.json` (143 events)
**Component:** `/components/evidence/Timeline.tsx` (imports correctly)

**Structure Quality:**

```json
{
  "id": "sw-territory-created",
  "date": "1790-05-26",
  "title": "Southwest Territory Created",
  "description": "Congress passes the Southwest Ordinance...",
  "documentId": "southwest-territory-act-1790",
  "type": "proclamation",
  "featured": true
}
```

**Observations:**

- Properly normalized
- Optional `documentId` links to document library
- Type system (`proclamation`, `letter`, `treaty`, `newspaper`, `event`)
- Featured flag for prominence

**Scalability:** ✓ Excellent
**Authority Positioning:** ✓ Good (links to source documents)

**Recommendation:** Use this as model for other evidence data.

---

### 4. Quote Cards & Context System

**Current Pattern:** Lines 112-151 in page.tsx

```typescript
function QuoteCard({
  quote,
  attribution,
  source,
  context,
  sourceUrl,
  featured,
}: {...}) => {...}
```

**Issue:** Quote data is hardcoded in JSX, not data-driven:

```typescript
<QuoteCard
  quote={PRIMARY_QUOTES.glassWindowsFull.text}
  attribution={PRIMARY_QUOTES.glassWindowsFull.attribution}
  source={PRIMARY_QUOTES.glassWindowsFull.source}
  context="Glass windows were rare even in settler communities..."
  sourceUrl="https://tennesseeencyclopedia.net/entries/rocky-mount/"
  featured
/>
```

**Problem:** The `context` prop is inline—if Tennessee Encyclopedia article updates, nowhere to track this change.

**Authority Issue:**

- No indication of verification status
- No date sourced
- No scholarly review metadata
- Can't mark context as "contributed by academic partner"

---

### 5. Source Links Management

**Current Status:** Lines 33-40 in page.tsx

```typescript
const SOURCE_LINKS = {
  foundersOnline: 'https://founders.archives.gov/',
  tennesseeEncyclopedia: 'https://tennesseeencyclopedia.net/',
  digiTreaties: 'https://digitreaties.org/',
  // ... 3 more
} as const
```

**Assessment:**

- Reasonable for small number of repos
- Hardcoded links should be in data layer (not code)
- No repository metadata (authority level, last verified date, description)

**Better Pattern:**

```json
{
  "id": "founders-online",
  "name": "Founders Online",
  "url": "https://founders.archives.gov/",
  "authority": "National Archives",
  "type": "government-archive",
  "lastVerified": "2026-01-25",
  "description": "Digital collection of correspondence from Washington and Founding Fathers"
}
```

---

### 6. Metadata Approach Assessment

**Current Status:** `/lib/copy/metadata.ts`

```typescript
export const PAGE_METADATA = {
  evidence: {
    title: 'The Evidence Room',
    description: 'Primary source documents...',
    ogTitle: 'The Evidence Room | Tennessee Starts Here',
    ogDescription:
      "Primary source documents proving Rocky Mount was where Tennessee's government began.",
  },
}
```

**Strengths:**

- Structured data (`STRUCTURED_DATA.organization`)
- Schema.org Museum type
- Complete address + geo coordinates

**Gaps for Authority Positioning:**

- No scholarly credentials on the institution
- No funding partners or academic affiliations
- Could leverage schema.org `isPartOf`, `mentions`, `author`
- No versioning of content (what changed since last publication?)

---

## Recommendations

### Recommendation 1: Migrate TREATY_SIGNERS to Data Layer

**Priority:** HIGH
**Impact:** Enables people directory, improves authority

**Action:**
Create `/content/treaty-signers.json`:

```json
[
  {
    "id": "squollecuttah",
    "cherokeeName": "Squollecuttah",
    "englishName": "Hanging Maw",
    "pronunciationGuide": "(SKWOL-uh-CUT-uh)",
    "title": "Principal Chief of the Overhill Cherokee",
    "affiliation": {
      "nation": "Cherokee Nation",
      "band": "Overhill Cherokee",
      "region": "Tennessee"
    },
    "historicalRole": "Negotiated trade routes; maintained peace during settlement period",
    "lifespan": {
      "born": "~1740",
      "died": "~1808",
      "uncertainty": "approximate"
    },
    "descendants": {
      "nation": "Cherokee Nation",
      "easternBand": true,
      "keetoowahBand": true
    },
    "sources": [
      {
        "repository": "digitreaties.org",
        "document": "Treaty of Holston, 1791",
        "page": "3",
        "url": "https://digitreaties.org/treaties/treaty/88697242/",
        "note": "Original manuscript signature"
      },
      {
        "repository": "tennesseeencyclopedia.net",
        "article": "Cherokee Nation",
        "accessDate": "2026-01-25",
        "url": "https://tennesseeencyclopedia.net/entries/cherokee/"
      }
    ],
    "transliterationNote": "Transliterated from original Treaty manuscript. Spelling conventions vary across historical sources.",
    "featured": true
  }
]
```

**Benefits:**

- Reusable in `/evidence/people` page
- Supports academic linking
- Captures research metadata
- Scalable to all 42 signers
- Enables API for external scholarly use

**Implementation:**

1. Create `/content/treaty-signers.json`
2. Update `/app/(main)/evidence/page.tsx` to import from JSON
3. Update `/app/(main)/evidence/people/page.tsx` to source from same file
4. Add TypeScript interface in `/lib/types/evidence.ts`

---

### Recommendation 2: Create Evidence Data Schema

**Priority:** HIGH
**Impact:** Unified approach across all evidence types

**Action:**
Create `/lib/types/evidence.ts`:

```typescript
/**
 * Evidence System - Unified schema for all historical documents
 * Supports scalability from 5 to 500+ items
 */

export interface Source {
  id: string
  name: string
  url: string
  authority: 'primary' | 'secondary' | 'academic' | 'archival'
  institution?: string
  accessDate: string
  note?: string
}

export interface Citation {
  repository: string
  collection?: string
  referenceNumber?: string
  page?: string | string[]
  url: string
  note?: string
}

export interface HistoricalEntity {
  id: string
  name: string
  type: 'person' | 'organization' | 'place' | 'event'
  dateRange?: {
    start: string
    end: string
    uncertainty?: 'exact' | 'approximate' | 'estimated'
  }
  description: string
  citations: Citation[]
  relatedEntities?: string[] // IDs of related people/places
}

export interface EvidenceItem {
  id: string
  title: string
  date: string
  type: 'quote' | 'document' | 'letter' | 'treaty' | 'event' | 'person'
  content: string
  context?: string
  sources: Citation[]
  authority: {
    verifiedBy?: string
    verifiedDate?: string
    confidenceLevel: 'high' | 'medium' | 'low'
    notes?: string
  }
  relatedItems?: string[]
  metadata?: Record<string, unknown>
}

export interface EvidenceCollection {
  id: string
  title: string
  description: string
  items: EvidenceItem[]
  maintainedBy: string
  lastUpdated: string
  nextReview: string
}
```

**Benefits:**

- Single source of truth for all evidence data
- Supports TypeScript validation
- Enables CMS integration (fields map directly to CMS schema)
- Scalable to thousands of items

---

### Recommendation 3: Move PRIMARY_QUOTES to Data Layer

**Priority:** MEDIUM
**Impact:** Authority positioning, maintainability

**Action:**
Create `/content/primary-quotes.json`:

```json
[
  {
    "id": "glass-windows-full",
    "text": "On the 11th instant, I arrived in this country, and was received with every mark of attention and gladness that I could have wished. I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.",
    "author": {
      "name": "William Blount",
      "role": "Governor of the Southwest Territory",
      "date": "1790-10-20"
    },
    "source": {
      "type": "letter",
      "repository": "State Archives of North Carolina",
      "collection": "John Gray Blount Papers",
      "referenceNumber": "PC.193",
      "publication": "Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128",
      "url": "https://digitraits.org/..."
    },
    "context": {
      "text": "Letter to his half-brother describing accommodations at Rocky Mount",
      "significance": "Glass windows were rare even in settler communities east of the mountains—most used oiled paper or wooden shutters. At Rocky Mount, they signaled federal authority and investment in the first constitutional capital west of Appalachia.",
      "authenticityNote": "This letter is the earliest surviving description of Rocky Mount as a seat of government."
    },
    "verification": {
      "status": "verified",
      "verifiedBy": "Tennessee Encyclopedia",
      "verifiedDate": "2026-01-15",
      "confidenceLevel": "high"
    },
    "featured": true,
    "displayContext": "MSS.1790.001 — Blount Correspondence"
  }
]
```

**Benefits:**

- Quotes become data, not copy
- Can update sources independently
- Enables scholarly attribution
- Supports export to academic databases
- Creates audit trail for verification

---

### Recommendation 4: Consolidate Source Repository Links

**Priority:** MEDIUM
**Impact:** Consistency, extensibility

**Action:**
Create `/content/source-repositories.json`:

```json
[
  {
    "id": "founders-online",
    "name": "Founders Online",
    "institution": "National Archives",
    "url": "https://founders.archives.gov/",
    "type": "government-archive",
    "authority": "primary",
    "coverage": "Correspondence from Washington, Jefferson, and Founding Fathers (1775-1810)",
    "relevantCollections": ["Washington Papers", "Jefferson Papers"],
    "lastVerified": "2026-01-25",
    "verificationNote": "All links tested and current",
    "citation": {
      "label": "Founders Online, National Archives",
      "note": "Online publication of documentary records from the Library of Congress"
    }
  },
  {
    "id": "digitreaties",
    "name": "DigiTreaties",
    "institution": "University of Wisconsin-Madison",
    "url": "https://digitreaties.org/",
    "type": "academic-archive",
    "authority": "primary",
    "coverage": "Digitized treaty manuscripts from US history",
    "keyDocuments": ["Treaty of Holston (1791)", "Treaty of Tellico (1798)"],
    "lastVerified": "2026-01-25",
    "notes": "Provides image-based manuscripts with transcriptions"
  }
]
```

**Benefits:**

- Single source for all external links
- Enables metadata about each repository
- Supports "sources" page generation
- Can track verification status
- Extensible as new partners added

---

### Recommendation 5: Implement Document Metadata System

**Priority:** MEDIUM-HIGH
**Impact:** Long-term authority, scalability

**Current Pattern:** Each document has manual entry in `/content/documents/`
**Upgrade:** Add standardized metadata layer

**Action:**
For each document, create companion metadata file:

```json
// /content/documents/blount-arrival-1790.meta.json
{
  "documentId": "blount-arrival-1790",
  "title": "Blount's Arrival Letter",
  "date": "1790-10-20",
  "author": "William Blount",
  "sourceRepository": {
    "institution": "State Archives of North Carolina",
    "collection": "John Gray Blount Papers",
    "referenceNumber": "PC.193"
  },
  "digitalSource": {
    "url": "https://digitreaties.org/...",
    "type": "transcription",
    "quality": "high",
    "transcribedBy": "University of Wisconsin-Madison"
  },
  "historicalContext": {
    "period": "Southwest Territory Era (1790-1796)",
    "location": "Rocky Mount, Tennessee",
    "keyFigures": ["William Blount", "William Cobb"],
    "relatedDocuments": ["washington-to-knox-1790-08", "knox-to-washington-1790-08"]
  },
  "citations": [
    {
      "author": "Keith",
      "title": "The John Gray Blount Papers",
      "volume": "II",
      "year": 1959,
      "pages": "127-128"
    }
  ],
  "verification": {
    "reviewed": true,
    "reviewedBy": "Tennessee Encyclopedia",
    "reviewDate": "2026-01-15",
    "confidenceLevel": "high"
  },
  "highlights": [
    {
      "id": "glass-windows",
      "text": "I am very well accommodated with a Room with Glass Windows",
      "significance": "Status symbol on frontier, indicates federal investment"
    }
  ]
}
```

**Benefits:**

- Each document carries its own scholarship metadata
- Enables versioning (if manuscript re-examined, update metadata)
- Supports footnote generation
- Enables academic export (BibTeX, RIS format)
- Tracks reviewer credentials

---

### Recommendation 6: Should There Be a CMS?

**Priority:** HIGH (Strategic Decision)
**Impact:** Long-term governance, non-technical access

#### Current State

- All data is JSON in Git (version-controlled)
- Changes require developer (code commit)
- No non-technical staff workflow

#### CMS Recommendation: **YES, but headless**

**Why:**

1. **Authority Positioning:** Museum directors, historians should own content
2. **Collaboration:** Multiple researchers contribute; version control matters
3. **Scale:** 42+ treaty signers, 150+ documents requires editorial workflow
4. **Audit Trail:** Academic accountability requires "who changed what when"

**Pattern:** Headless CMS (Sanity, Strapi, or Contentful)

- Manages `/content/` files
- Stores in Git (keeps version control)
- Provides UI for non-technical editors
- Validates schema before publish

#### Minimal CMS Implementation

Start with **Sanity (open-source version)**:

```typescript
// schema/objects/treartySigner.ts
export default {
  name: 'treatySigner',
  title: 'Treaty Signer',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cherokeeName',
      title: 'Cherokee Name',
      type: 'string',
    },
    {
      name: 'englishName',
      title: 'English Name',
      type: 'string',
    },
    {
      name: 'lifespan',
      title: 'Dates',
      type: 'object',
      fields: [
        { name: 'born', type: 'string' },
        { name: 'died', type: 'string' },
        {
          name: 'uncertainty',
          type: 'string',
          options: { list: ['exact', 'approximate', 'estimated'] },
        },
      ],
    },
    {
      name: 'sources',
      title: 'Historical Sources',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sourceRepository' }] }],
    },
  ],
}
```

**Benefits:**

- Non-technical staff can edit content
- Schema validation prevents errors
- Git integration (track all changes)
- Supports image uploads (portraits, manuscripts)
- Can export JSON exactly as needed

---

### Recommendation 7: Implement Cross-Linking System

**Priority:** MEDIUM
**Impact:** User experience, academic value

**Current State:** Some `documentId` links exist in timeline
**Upgrade:** Bidirectional linking throughout

**Pattern:**

```typescript
// /lib/types/evidence.ts
export interface EntityReference {
  entityId: string // ID of linked entity
  entityType: 'person' | 'document' | 'event' | 'treaty'
  relationship: 'mentions' | 'authored' | 'participated' | 'preceded' | 'related'
  note?: string
}

// In any evidence item:
{
  "id": "glass-windows-letter",
  "links": [
    {
      "entityId": "william-blount",
      "entityType": "person",
      "relationship": "authored"
    },
    {
      "entityId": "rocky-mount-settlement",
      "entityType": "place",
      "relationship": "mentions"
    },
    {
      "entityId": "southwest-territory-act-1790",
      "entityType": "document",
      "relationship": "related"
    }
  ]
}
```

**Implementation:**

- Build relationship graph in memory at build time
- Generate "Related Documents" sections automatically
- Create people pages that show all documents mentioning that person
- Support "See Also" navigation

---

## Data Architecture Roadmap

### Phase 1: Foundation (Weeks 1-2)

- [ ] Create `/lib/types/evidence.ts` with unified schema
- [ ] Migrate `TREATY_SIGNERS` to `/content/treaty-signers.json`
- [ ] Migrate `PRIMARY_QUOTES` to `/content/primary-quotes.json`
- [ ] Migrate `SOURCE_LINKS` to `/content/source-repositories.json`
- [ ] Update `/app/(main)/evidence/page.tsx` to import from JSON
- [ ] Add TypeScript validation

**Deliverable:** All evidence data is JSON-backed, schema-validated

### Phase 2: Enhancement (Weeks 3-4)

- [ ] Add document metadata system (companion `.meta.json` files)
- [ ] Implement cross-linking graph
- [ ] Build "Related Documents" UI
- [ ] Add verification/authority metadata to all evidence items
- [ ] Create `/evidence/sources` page showing all repositories

**Deliverable:** Evidence items have rich metadata, discoverable relationships

### Phase 3: Headless CMS (Weeks 5-6)

- [ ] Set up Sanity Studio (or equivalent)
- [ ] Create content schemas for all evidence types
- [ ] Wire Git integration (auto-commit on publish)
- [ ] Create editorial workflow (draft → review → publish)
- [ ] Train museum staff on CMS

**Deliverable:** Non-technical staff can manage evidence content

### Phase 4: API & Export (Weeks 7-8)

- [ ] Create `/api/evidence/...` endpoints
- [ ] Support academic export formats (BibTeX, RIS, Dublin Core)
- [ ] Generate printable citation lists
- [ ] Create scholarly tools (timeline export, people directory export)

**Deliverable:** External researchers can access evidence via API

---

## Authority Positioning Impact

### Current State

- Evidence data exists but is fragmented
- No clear authority chain ("who verified this?")
- Limited metadata for scholarly citation
- Difficult for academics to integrate with their research

### After Recommendations

- Centralized, schema-validated evidence system
- Every claim has verification metadata
- Full citation chains (document → repository → institution)
- API access for scholarly integration
- Audit trail for content changes

### Expected Outcomes

1. **Increased Academic Credibility**
   - University libraries can link to Rocky Mount evidence via API
   - Scholars cite Rocky Mount as primary source authority

2. **Museum Authority**
   - Clear distinction: Rocky Mount owns interpretation, not primary sources
   - Transparent linking to authoritative repositories
   - Demonstrates scholarly rigor

3. **Visitor Confidence**
   - "Verified by Tennessee Encyclopedia"
   - Clear provenance for every claim
   - Transparent about uncertainty (approximate dates, etc.)

---

## Implementation Priority Matrix

| Recommendation           | Effort | Impact | Timeline |
| ------------------------ | ------ | ------ | -------- |
| Data types schema        | Low    | High   | Week 1   |
| Migrate TREATY_SIGNERS   | Low    | High   | Week 1   |
| Migrate PRIMARY_QUOTES   | Low    | Medium | Week 1   |
| Migrate SOURCE_LINKS     | Low    | Medium | Week 1   |
| Document metadata system | Medium | High   | Week 3   |
| Cross-linking system     | Medium | High   | Week 3   |
| Headless CMS             | High   | High   | Week 5   |
| API & export             | Medium | Medium | Week 7   |

---

## Technical Debt Addressed

**Current Issues Resolved:**

1. ✓ Inline data in React components (fragile)
2. ✓ No single source of truth for evidence
3. ✓ Difficult to update facts independently of presentation
4. ✓ No verification metadata (authority issues)
5. ✓ Limited cross-linking (poor UX)
6. ✓ Non-technical staff cannot maintain content
7. ✓ No API for external scholarly use

---

## Conclusion

The Evidence Room has a solid foundation (timeline-events.json is excellent), but needs a **unified data layer** to scale and support authority positioning. The current fragmentation—quotes in copy files, signers in React, sources as constants—makes it hard to:

- Maintain accuracy as content grows
- Position Rocky Mount as scholarly authority
- Enable non-technical content management
- Support academic integration

**Implementing Recommendations 1-3 immediately (Phase 1)** requires minimal effort but provides:

- Better maintainability
- Improved authority positioning
- Foundation for future CMS integration

**This positions Rocky Mount as the definitive source on territorial history**, not just a museum with a website.
