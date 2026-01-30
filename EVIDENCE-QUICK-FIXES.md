# Evidence Room: Quick Implementation Guide

**Target Audience:** Developers implementing Phase 1 recommendations
**Time Estimate:** 2-4 hours for all fixes
**Impact:** Immediately improves maintainability and authority

---

## Fix 1: Migrate TREATY_SIGNERS (20 minutes)

### Current Problem

Treaty signers are hardcoded in `/app/(main)/evidence/page.tsx` (lines 54-80). This means:

- Cannot reuse in `/evidence/people` page without duplication
- Cannot add additional signers without modifying React code
- No metadata about each signer (birth/death dates, descendants, sources)

### Step 1: Create Data File

Create `/content/treaty-signers.json`:

```json
[
  {
    "id": "hanging-maw",
    "cherokeeName": "Squollecuttah",
    "englishName": "Hanging Maw",
    "pronunciation": "SKWOL-uh-CUT-uh",
    "role": "Principal Chief of the Overhill Cherokee",
    "featured": true
  },
  {
    "id": "bloody-fellow",
    "cherokeeName": "Nenetooyah",
    "englishName": "Bloody Fellow",
    "pronunciation": "neh-neh-TOO-yuh",
    "role": "War chief, given name \"Clear Sky\" by President Washington",
    "featured": true
  },
  {
    "id": "john-watts",
    "cherokeeName": "Kunoskeskie",
    "englishName": "John Watts",
    "pronunciation": "koo-nos-KES-kee",
    "role": "Succeeded Dragging Canoe as head of the war council",
    "featured": true
  },
  {
    "id": "doublehead",
    "cherokeeName": "Chuquilatague",
    "englishName": "Doublehead",
    "pronunciation": "choo-kee-luh-TAG",
    "role": "One of the most feared warriors of the Cherokee-American wars",
    "featured": true
  },
  {
    "id": "black-fox",
    "cherokeeName": "Enoleh",
    "englishName": "Black Fox",
    "pronunciation": "eh-NOH-luh",
    "role": "Later served as Principal Chief, 1801-1811",
    "featured": true
  }
]
```

### Step 2: Update React Component

Replace lines 54-80 in `/app/(main)/evidence/page.tsx`:

**Before:**

```typescript
// Treaty of Holston signatories - Cherokee leaders
const TREATY_SIGNERS = [
  {
    cherokeeName: 'Squollecuttah',
    englishName: 'Hanging Maw',
    role: 'Principal Chief of the Overhill Cherokee',
  },
  // ... rest
] as const
```

**After:**

```typescript
// Treaty of Holston signatories - imported from data
import signers from '@/content/treaty-signers.json'

type TreatySigner = (typeof signers)[0]
```

### Step 3: Update Component Usage

Change line 434:

```typescript
// Before
{TREATY_SIGNERS.map((signer) => (

// After
{signers.map((signer: TreatySigner) => (
```

### Step 4: Verify

- [ ] `npm run build` succeeds
- [ ] `/evidence` page loads
- [ ] Treaty signers section displays correctly

---

## Fix 2: Migrate PRIMARY_QUOTES (15 minutes)

### Current Problem

Quotes are hardcoded in `/lib/copy/brand.ts` (lines 68-103). This makes it hard to:

- Add new quotes without modifying copy constants
- Track verification status of each quote
- Link quotes to source documents

### Step 1: Create Data File

Create `/content/primary-quotes.json`:

```json
[
  {
    "id": "glass-windows-full",
    "text": "On the 11th instant, I arrived in this country, and was received with every mark of attention and gladness that I could have wished. I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.",
    "shortText": "I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.",
    "attribution": "William Blount to John Gray Blount, October 20, 1790",
    "author": "William Blount",
    "date": "1790-10-20",
    "source": "State Archives of North Carolina, John Gray Blount Papers, PC.193. Keith, ed., The John Gray Blount Papers, Vol. II (1959), pp. 127-128",
    "sourceUrl": "https://tennesseeencyclopedia.net/entries/rocky-mount/",
    "context": "Glass windows were rare even in settler communities east of the mountains—most used oiled paper or wooden shutters. At Rocky Mount, they signaled federal authority and investment in the first constitutional capital west of Appalachia.",
    "featured": true
  },
  {
    "id": "washingtons-question",
    "text": "Where ought the Governor to reside?",
    "attribution": "George Washington to Henry Knox, August 13, 1790",
    "author": "George Washington",
    "date": "1790-08-13",
    "source": "Founders Online",
    "sourceUrl": "https://founders.archives.gov/documents/Washington/05-06-02-0135",
    "context": "The answer was Rocky Mount",
    "featured": true
  },
  {
    "id": "williamson-recommendation",
    "text": "there is not any other Man who possesses the Esteem and Confidence of both Parties so fully as Mr Blount",
    "attribution": "Hugh Williamson to George Washington, May 28, 1790",
    "author": "Hugh Williamson",
    "date": "1790-05-28",
    "source": "Founders Online",
    "sourceUrl": "https://founders.archives.gov/documents/Washington/05-05-02-0277",
    "context": "Hugh Williamson's endorsement persuaded Washington that Blount was uniquely qualified to unite factional divisions.",
    "featured": true
  },
  {
    "id": "treaty-proclamation",
    "text": "I, George Washington, President of the United States, having seen and considered the said Treaty, do, by and with the advice and consent of the Senate, accept, ratify and confirm the same, and every clause and article thereof.",
    "attribution": "George Washington, November 11, 1791",
    "author": "George Washington",
    "date": "1791-11-11",
    "source": "Founders Online, National Archives",
    "sourceUrl": "https://founders.archives.gov/",
    "context": "Washington's proclamation made the Treaty of Holston—negotiated by Blount during the Rocky Mount capital period—binding federal law.",
    "featured": true
  }
]
```

### Step 2: Create Type

Add to `/lib/types/evidence.ts`:

```typescript
export interface PrimaryQuote {
  id: string
  text: string
  shortText?: string
  attribution: string
  author: string
  date: string
  source: string
  sourceUrl?: string
  context?: string
  featured?: boolean
}
```

### Step 3: Update Component

In `/app/(main)/evidence/page.tsx`:

```typescript
import quotes from '@/content/primary-quotes.json'

// Replace PRIMARY_QUOTES.glassWindowsFull.text with:
// quotes.find(q => q.id === 'glass-windows-full')
```

### Step 4: Verify

- [ ] All quote sections render correctly
- [ ] Links are accessible
- [ ] No console errors

---

## Fix 3: Migrate SOURCE_LINKS (10 minutes)

### Current Problem

Source links are hardcoded in page component. Better to have a data file that can be:

- Used on `/evidence/sources` page
- Accessed by CMS
- Updated without code changes

### Step 1: Create Data File

Create `/content/source-repositories.json`:

```json
[
  {
    "id": "founders-online",
    "name": "Founders Online",
    "url": "https://founders.archives.gov/",
    "description": "National Archives collection of correspondence from Washington, Jefferson, and the Founding Fathers.",
    "institution": "National Archives",
    "type": "government-archive"
  },
  {
    "id": "tennessee-encyclopedia",
    "name": "Tennessee Encyclopedia",
    "url": "https://tennesseeencyclopedia.net/",
    "description": "Scholarly reference for Tennessee history, including Rocky Mount and Southwest Territory articles.",
    "institution": "Tennessee Historical Society",
    "type": "academic-reference"
  },
  {
    "id": "digitreaties",
    "name": "DigiTreaties",
    "url": "https://digitreaties.org/",
    "description": "Digitized treaty manuscripts including the full 23-page Treaty of Holston.",
    "institution": "University of Wisconsin-Madison",
    "type": "academic-archive"
  },
  {
    "id": "digitreaties-holston",
    "name": "Treaty of Holston (DigiTreaties)",
    "url": "https://digitreaties.org/treaties/treaty/88697242/",
    "description": "Original Treaty of Holston manuscript, 23 pages, fully digitized.",
    "institution": "University of Wisconsin-Madison",
    "type": "primary-source"
  },
  {
    "id": "national-archives",
    "name": "National Archives",
    "url": "https://www.archives.gov/",
    "description": "U.S. government archives containing federal documents and records.",
    "institution": "National Archives",
    "type": "government-archive"
  },
  {
    "id": "blount-mansion",
    "name": "Blount Mansion",
    "url": "https://blountmansion.org/",
    "description": "Governor Blount's later residence in Knoxville, with family history and primary documents.",
    "institution": "Blount Mansion Foundation",
    "type": "historic-site"
  }
]
```

### Step 2: Update Component

In `/app/(main)/evidence/page.tsx`:

Replace lines 33-40:

```typescript
// Before
const SOURCE_LINKS = {
  foundersOnline: 'https://founders.archives.gov/',
  // ...
} as const

// After
import repositories from '@/content/source-repositories.json'

const getRepositoryUrl = (id: string) => {
  const repo = repositories.find((r) => r.id === id)
  return repo?.url || ''
}
```

### Step 3: Verify

- [ ] All source links in `/evidence/sources` section work
- [ ] No broken references

---

## Fix 4: Create Evidence Types (15 minutes)

### Create Type File

Add `/lib/types/evidence.ts`:

```typescript
/**
 * Evidence System Type Definitions
 * Unified schema for all historical documents and sources
 */

export interface Citation {
  repository: string
  collection?: string
  referenceNumber?: string
  page?: string | string[]
  url: string
  note?: string
}

export interface TreatySigner {
  id: string
  cherokeeName: string
  englishName: string
  pronunciation?: string
  role: string
  featured?: boolean
}

export interface PrimaryQuote {
  id: string
  text: string
  shortText?: string
  attribution: string
  author: string
  date: string
  source: string
  sourceUrl?: string
  context?: string
  featured?: boolean
}

export interface SourceRepository {
  id: string
  name: string
  url: string
  description: string
  institution: string
  type:
    | 'government-archive'
    | 'academic-archive'
    | 'academic-reference'
    | 'primary-source'
    | 'historic-site'
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  documentId?: string | null
  type: 'treaty' | 'letter' | 'proclamation' | 'newspaper' | 'event'
  featured?: boolean
}
```

### Verify

- [ ] TypeScript compiles without errors
- [ ] All data files are properly typed

---

## Testing Checklist

After all fixes:

```bash
# Build verification
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Manual testing
- [ ] /evidence page loads
- [ ] Treaty signers display correctly
- [ ] All quotes render with links
- [ ] Source links work
- [ ] /evidence/timeline loads
- [ ] No console errors

# Data validation
- [ ] treaty-signers.json is valid JSON
- [ ] primary-quotes.json is valid JSON
- [ ] source-repositories.json is valid JSON
```

---

## Next Steps (Phase 2)

Once Phase 1 is complete:

1. **Add metadata to quotes:**
   - verification status
   - verified by (name)
   - verified date
   - confidence level

2. **Expand signers data:**
   - birth/death dates with uncertainty markers
   - tribal affiliations
   - descendants (Nation, Band)
   - archival sources for each signer

3. **Build "Related Documents":**
   - Link quotes to timeline events
   - Link signers to documents
   - Create cross-reference system

4. **Create `/evidence/sources` page:**
   - Display all repositories
   - Show verification status
   - List documents from each repository

---

## Files Modified

| File                                | Change                                       | Impact                        |
| ----------------------------------- | -------------------------------------------- | ----------------------------- |
| `/app/(main)/evidence/page.tsx`     | Import from JSON instead of inline constants | Removes 50 lines of code      |
| `/lib/copy/brand.ts`                | Remove PRIMARY_QUOTES constant               | Clean separation of data/copy |
| `/lib/types/evidence.ts`            | Create unified type schema                   | Enables validation across app |
| `/content/treaty-signers.json`      | NEW                                          | Reusable signer data          |
| `/content/primary-quotes.json`      | NEW                                          | Quote versioning + metadata   |
| `/content/source-repositories.json` | NEW                                          | Centralized source links      |

---

## Git Commit Message

```
chore: migrate evidence data from inline constants to JSON layer

- Move TREATY_SIGNERS to content/treaty-signers.json
- Move PRIMARY_QUOTES to content/primary-quotes.json
- Move SOURCE_LINKS to content/source-repositories.json
- Add comprehensive type definitions (lib/types/evidence.ts)
- Update Evidence page component to import from data layer

Benefits:
- Separates data from presentation
- Enables reuse across pages
- Easier to maintain and extend
- Foundation for CMS integration

No functional changes; all displays remain identical.
```
