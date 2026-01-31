# Source of Truth Hierarchy

## The Problem This Solves

> "I don't know what is updated because we didn't develop any AI guardrails on this. I don't know if the website itself holds the truth, the project files, or the project exports do."
> -- Cody Boring

This document establishes a clear hierarchy for which files are canonical, how content flows between systems, and what guardrails AI assistants must follow.

---

## Current State Audit (January 30, 2026)

### Where Content Currently Lives

| Location                        | Content Type                                | File Count | Status           |
| ------------------------------- | ------------------------------------------- | ---------- | ---------------- |
| `/Historical/raw/`              | Original fetched documents (PDFs, raw text) | ~15 files  | IMMUTABLE SOURCE |
| `/Historical/processed/`        | Verified transcriptions                     | 37 files   | VERIFIED         |
| `/content/documents/`           | Website-formatted documents                 | 41 files   | PUBLISHED        |
| `/content/people/`              | Biography profiles                          | 50 files   | PUBLISHED        |
| `/content/timeline-events.json` | Timeline event data                         | 1 file     | PUBLISHED        |
| `/data/timeline.json`           | Homepage timeline display                   | 1 file     | DERIVED          |
| `/app/`, `/components/`         | Website React code                          | Many       | PRESENTATION     |

### Current Data Flow

```
ORIGINAL SOURCES (immutable)
    |
    v
Historical/raw/        <-- PDFs, fetched text from archives
    |
    v
Historical/processed/  <-- AI transcriptions, human-verified
    |
    v  [Manual copy/edit]
content/documents/     <-- Website-formatted MDX
content/people/        <-- Website-formatted MDX
    |
    v  [lib/evidence/loader.ts]
Website Display        <-- Rendered on /evidence/ pages
```

**Critical Finding:** There is NO automated sync between `Historical/processed/` and `content/documents/`. Files were manually created and may have diverged.

---

## The Hierarchy (Level 1-4)

### Level 1: IMMUTABLE SOURCES

**Location:** `/Historical/raw/`

**What's Here:**

- PDFs from government archives (Founders Online, National Archives)
- Original HTML/text fetched from source repositories
- Scanned documents (if any added in future)

**Protection Rules:**

- NEVER modify files in this directory
- NEVER delete files in this directory
- AI may READ but not WRITE
- Add new original sources only; never overwrite

**Git Strategy:**

- Consider Git LFS for large PDFs/images
- Tag each addition with source URL and fetch date

**Current Contents:**

- `govinfo/STATUTE-7-Pg42-Treaty-Cherokee-1791.pdf`
- `secondary-sources/William_Blount_Biography.pdf`
- `tennessee-archives/Daniel_Smith_Papers_Finding_Aid.pdf`
- Various subdirectories with placeholder structure

---

### Level 2: VERIFIED TRANSCRIPTIONS

**Location:** `/Historical/processed/`

**What's Here:**

- Plain text/markdown transcriptions of Level 1 sources
- AI-generated transcriptions that have been human-verified
- 37 numbered documents with standardized naming

**Protection Rules:**

- AI may CREATE draft transcriptions
- Status changes (draft -> verified) require human approval
- Must link back to Level 1 source
- Changes to verified documents require human review

**Verification Status (in frontmatter):**

```yaml
verification:
  status: verified | in-review | draft
  source_count: 3 # Number of confirming sources
  method: 'Cross-referenced with National Archives'
  verified_by: 'Cody Boring' # Human who approved
  verified_date: '2025-01-28'
```

**Current Status:**

- All 37 documents marked "verified" in `VERIFICATION_LOG.md`
- Verification methodology documented
- Cross-reference matrix exists

---

### Level 3: WEBSITE CONTENT

**Location:** `/content/documents/`, `/content/people/`, `/content/collections/`

**What's Here:**

- MDX files formatted for website display
- Rich frontmatter with metadata
- `<passage>` tags for citation system
- Markdown body with formatted content

**Protection Rules:**

- MUST pull facts from Level 2 sources
- AI may format/enhance presentation
- Historical FACTS must match Level 2
- New claims require Level 2 documentation first

**Current Files:**

- `/content/documents/` - 41 historical documents
- `/content/people/` - 50 biographical profiles
- `/content/collections/` - 6 document collections
- `/content/timeline-events.json` - Timeline data

**Data Consumption:**

- `lib/evidence/loader.ts` reads these files
- `/app/(main)/evidence/` pages display them
- No runtime connection to Level 2

---

### Level 4: WEBSITE DISPLAY & EXPORTS

**Location:** `/app/`, `/components/`, `/data/`, `/Historical/exports/`

**What's Here:**

- React components that render Level 3 content
- JSON data files derived from content
- Export files for distribution

**Protection Rules:**

- Pure presentation layer - no source of truth
- Must not contain historical claims not in Level 3
- JSON data should be generated, not hand-edited
- Exports are SNAPSHOTS, not authoritative

**Current Files:**

- `/data/timeline.json` - Homepage timeline (SHOULD derive from Level 3)
- `/data/events.json` - Event calendar (separate domain)
- `/Historical/exports/HISTORICAL_DOCUMENTS_ROCKY_MOUNT.md` - Compiled export

---

## AI Guardrails

### What AI CAN Do

| Action                     | Level 1 | Level 2    | Level 3             | Level 4 |
| -------------------------- | ------- | ---------- | ------------------- | ------- |
| READ                       | Yes     | Yes        | Yes                 | Yes     |
| CREATE new file            | No      | Draft only | Yes                 | Yes     |
| MODIFY content             | No      | Draft only | Formatting only     | Yes     |
| DELETE                     | No      | No         | With human approval | Yes     |
| Change verification status | No      | No         | No                  | N/A     |

### What AI CANNOT Do Without Human Approval

1. **Change a document's verification status** (draft -> verified)
2. **Modify verified historical facts** in Level 2 or 3
3. **Delete any Level 1 or Level 2 files**
4. **Add new historical claims** without Level 2 documentation
5. **Change dates, names, or quotations** in verified documents

### When AI Makes Changes to Content

AI must include in commit message:

```
[CONTENT] Description of change

Source: Level 2 file this is based on
Verification: verified | unverified-draft
Reviewed-by: pending-human-review

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Answering Cody's Question: Which Currently Holds Truth?

### THE TRUTH IS: Level 2 (`/Historical/processed/`)

**Why:**

1. These files have documented verification methodology
2. Cross-referenced against multiple authoritative sources
3. Human-verified and logged in `VERIFICATION_LOG.md`
4. Link directly to Level 1 original sources

**However, Level 3 (`/content/`) is what the website displays.**

**The Risk:**

- Level 3 files may have DIVERGED from Level 2
- Edits to `/content/documents/` may not reflect Level 2
- No automated sync or validation exists

---

## Recommended Actions

### Immediate (This Session)

1. **Add verification frontmatter** to all Level 3 documents linking to Level 2 sources
2. **Document current divergence** by comparing Level 2 and Level 3 content

### Short-Term (Next Sprint)

1. **Create validation script** that checks Level 3 facts against Level 2
2. **Add Level 2 source reference** to every Level 3 document frontmatter:
   ```yaml
   source_document: '/Historical/processed/005-treaty-of-holston-1791-07-02.md'
   source_hash: 'abc123' # Content hash for drift detection
   ```

### Long-Term (Architecture Change)

1. **Generate Level 3 from Level 2** - Make Level 3 files derived, not manually edited
2. **Single source editing** - Edit facts in Level 2, regenerate Level 3
3. **Git hooks** - Prevent Level 1 modification, require review for Level 2

---

## File Structure After Implementation

```
/Historical/
  raw/                    # Level 1: IMMUTABLE SOURCES
    *.pdf, *.txt, *.html
  processed/              # Level 2: VERIFIED TRANSCRIPTIONS
    *.md (with verification frontmatter)
  VERIFICATION_LOG.md     # Human approval records

/content/
  documents/              # Level 3: WEBSITE CONTENT (derived)
    *.md (with source_document reference)
  people/
    *.md
  collections/
    *.md

/app/                     # Level 4: PRESENTATION (generated)
/components/
/data/                    # Level 4: derived JSON data
```

---

## Quick Reference Card

| Question                                  | Answer                             |
| ----------------------------------------- | ---------------------------------- |
| "Where is the source of truth?"           | `/Historical/processed/` (Level 2) |
| "Can I edit content/documents directly?"  | Formatting yes, facts no           |
| "How do I add a new historical claim?"    | Add to Level 2 first, then Level 3 |
| "Who can change verification status?"     | Humans only                        |
| "What if Level 3 disagrees with Level 2?" | Level 2 wins                       |
| "Can AI create new documents?"            | Drafts only, pending human review  |

---

## Document Metadata

- **Created:** January 30, 2026
- **Author:** Dr. Marcus Webb (Source of Truth Architect)
- **Status:** Initial framework
- **Review Required:** Yes - by Cody Boring before implementation

---

_This document is itself a Level 3 file. The hierarchy it describes is the authoritative structure._
