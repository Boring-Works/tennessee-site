# Reference Materials for Rocky Mount

**Generated:** 2026-01-30
**By:** Dr. Sarah Okonkwo, PhD - Systems Documentation Manager

This index catalogs all reference materials, standards, and reusable knowledge relevant to the Tennessee Starts Here project.

---

## Project Documentation

### Rocky Mount Project Docs

| Document              | Location                  | Contents                                                |
| --------------------- | ------------------------- | ------------------------------------------------------- |
| **CLAUDE.md**         | `/CLAUDE.md`              | Main project instructions, owner commands, key systems  |
| **PROJECT.md**        | `/docs/PROJECT.md`        | Technical specification, site architecture              |
| **CONTRIBUTING.md**   | `/CONTRIBUTING.md`        | Code standards, pre-commit hooks, no-console rule       |
| **STYLE-GUIDE.md**    | `/docs/STYLE-GUIDE.md`    | Design system, color palette, typography                |
| **COPY.md**           | `/docs/COPY.md`           | Brand guide, messaging framework, STOP/START dictionary |
| **DATA-STANDARDS.md** | `/docs/DATA-STANDARDS.md` | JSON schemas, validation rules, maintenance             |
| **ALMANAC.md**        | `/docs/ALMANAC.md`        | Weather feature documentation                           |

### Workspace-Level Context

| Document             | Location                                  | Purpose                               |
| -------------------- | ----------------------------------------- | ------------------------------------- |
| **Global CLAUDE.md** | `/Users/codyboring/.claude/CLAUDE.md`     | PrivateBrain MCP instructions         |
| **Workspace Root**   | `/Users/codyboring/CodyML/CLAUDE.md`      | Workspace structure, session protocol |
| **Docs Index**       | `/Users/codyboring/CodyML/docs/CLAUDE.md` | Current blockers, cleanup tasks       |

---

## Data Standards

### Active Data Files (Single Source of Truth)

| File                  | Location                  | Schema             | Purpose                       |
| --------------------- | ------------------------- | ------------------ | ----------------------------- |
| **events.json**       | `/data/events.json`       | Event Object       | 2026 event calendar (27KB)    |
| **lectures.json**     | `/data/lectures.json`     | Lecture Object     | Lecture series (5.3KB)        |
| **siteInfo.json**     | `/data/siteInfo.json`     | SiteInfo Object    | Hours, prices, contact (10KB) |
| **testimonials.json** | `/data/testimonials.json` | Testimonial Object | Visitor quotes (4.4KB)        |
| **timeline.json**     | `/data/timeline.json`     | Timeline Object    | Historical timeline (2.9KB)   |
| **experiences.json**  | `/data/experiences.json`  | Experience Object  | Visitor moments (2.9KB)       |
| **integrations.json** | `/data/integrations.json` | Integration Object | External services (9.7KB)     |
| **navigation.json**   | `/data/navigation.json`   | Nav Object         | Site navigation (3.3KB)       |

### Schema Reference

**Full schema documentation:** `/data/SCHEMA.md`

**Key validation rules:**

- Events must be on Wed-Sat (open days)
- Dates in YYYY-MM-DD format
- Season: March 4 - mid-December 2026
- `requiresTicket: true` → uses default FareHarbor unless custom `ticketUrl` set
- IDs must be unique, URL-safe (lowercase, hyphens)

**Validation script:** `npm run validate:data`

---

## Marketing Knowledge

### Brand Copy System (`lib/copy/`)

**Source of Truth:** TypeScript constants, not markdown

| File              | Contents                                             | Lines |
| ----------------- | ---------------------------------------------------- | ----- |
| **brand.ts**      | Core identifiers, hooks, CTAs, STOP/START dictionary | ~200  |
| **narratives.ts** | Three-tier messaging framework, staff scripts        | ~280  |
| **metadata.ts**   | SEO content for all pages                            | ~130  |
| **index.ts**      | Public API                                           | ~20   |

**Usage pattern:**

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE } from '@/lib/copy'
```

**Documentation:** `/docs/COPY.md` (brand guide, approved messaging)

### Three-Tier Messaging Framework

| Tier          | Hook                                                             | Use For                        | Status               |
| ------------- | ---------------------------------------------------------------- | ------------------------------ | -------------------- |
| **MYSTERY**   | "Before there was a Tennessee, there was this ground."           | Permanent brand, all audiences | Active               |
| **SCARCITY**  | "For approximately 16 months, this ground was the capital..."    | 2026 campaign, ads, urgency    | Expires Dec 31, 2026 |
| **AUTHORITY** | "The first federal seat of government under the Constitution..." | Grants, press, academic        | Active               |

### STOP/START Dictionary (Key Items)

| STOP (Never Use)                   | START (Use Instead)                                       |
| ---------------------------------- | --------------------------------------------------------- |
| The Cobb Mansion                   | The Cobb House                                            |
| 256 years you can walk through     | The buildings evolved. The ground endures.                |
| America's first western capital    | First Constitutional federal ground west of the mountains |
| Where the frontier became a nation | Where Tennessee's government began                        |
| Walk the halls                     | Stand where they stood                                    |

**Full dictionary:** `/lib/copy/brand.ts` (lines 85-150)

---

## Reusable Patterns

### Design Token System

**Location:** `/app/globals.css`

**Shadow Tokens:**

- `--shadow-xs` through `--shadow-xl` (5 neutral elevation levels)
- `--shadow-gold-sm`, `--shadow-gold-lg` (2 brand accent glows)

**Gold Color Tokens:**

- `--gold-primary` (#c9a227) - main brand gold
- `--gold-hover` (#d4af37) - interactive states
- `--gold-shimmer` (rgba 0.4) - glows, borders

**Documentation:**

- `/docs/DESIGN-TOKENS.md` - System architecture
- `/docs/TOKEN-QUICK-REFERENCE.md` - Developer quick guide
- `/docs/TOKEN-EXAMPLES.md` - Real-world usage patterns
- `/docs/TOKEN-VISUAL-REFERENCE.md` - Visual reference chart

### Logging Pattern (No Console Statements)

**Rule:** ESLint enforces `no-console` across entire project

**Pattern:**

```typescript
import { logger } from '@/lib/logger'

logger.debug('info', { data })
logger.info('message')
logger.warn('potential issue')
logger.error('failed', error)
```

**Why:** Production-safe, consistent format, extensible

**Source:** `/lib/logger.ts`

### Smart Ticket URLs

**Pattern:** Events with `requiresTicket: true` automatically use default FareHarbor unless custom `ticketUrl` specified

```typescript
import { getTicketUrl } from '@/lib/data'

const bookingUrl = getTicketUrl(event) // Returns default or custom URL
```

**Default:** `https://fareharbor.com/embeds/book/rockymountmuseum/`

**Source:** `/lib/data/`

---

## Cross-Project Reference Materials

### Workspace Reference Folder

**Location:** `/Users/codyboring/CodyML/projects/reference/`

| Folder                     | Used By     | Contains                             |
| -------------------------- | ----------- | ------------------------------------ |
| **american-250-grants/**   | Rocky Mount | Grant discovery database (87 grants) |
| **auctionworx/**           | SPE         | AWX API docs (7.7MB)                 |
| **foundation/**            | SPE         | Business flows, TypeScript types     |
| **lifeos-v1/**             | Personal    | Previous LifeOS architecture         |
| **cbos-prism/**            | Personal    | Prompt vault architecture            |
| **prompt-infrastructure/** | All         | CLAUDE.md improvement tool           |

### Key Reference Docs

| Document                 | Location                          | Relevance to Rocky Mount                               |
| ------------------------ | --------------------------------- | ------------------------------------------------------ |
| **PATTERNS.md**          | `/reference/PATTERNS.md`          | Reusable code patterns from all projects               |
| **BORING-FOUNDATION.md** | `/reference/BORING-FOUNDATION.md` | Laravel/Filament stack standards (not applicable here) |
| **BIDSPX-CLAUDE.md**     | `/reference/BIDSPX-CLAUDE.md`     | SPE seller onboarding patterns                         |

### Grant Research Database

**Location:** `/Users/codyboring/CodyML/projects/reference/american-250-grants/`

**Contents:**

- 87 identified grant opportunities
- Private foundation profiles
- Regional Appalachian grants
- Service club funding sources
- Tourism industry funding
- Education partnerships
- Quick reference funding table

**Applicable to:** Future Rocky Mount fundraising initiatives

---

## SPE (Southern Property Exchange) Context

### Why This Matters

Cody Boring runs both Rocky Mount AND SPE. Understanding his full context helps:

**SPE Projects:**

- BIDSPX Hub (main portal)
- CSV Tool (bulk lot imports)
- Template Tester (AWX templates)
- Leader Finder (auction research)

**Stack:** Next.js 15, TypeScript, Supabase, Tailwind, shadcn/ui

**Architecture patterns from SPE applicable to Rocky Mount:**

- JSON data as single source of truth
- Validation scripts before deployment
- Pre-commit hooks (ESLint + Prettier)
- TypeScript strict mode
- Component-based architecture

**SPE Reference:** `/Users/codyboring/CodyML/projects/spe/CLAUDE.md`

---

## PrivateBrain MCP Context

### What It Is

**PrivateBrain** is Cody's personal context MCP (Model Context Protocol) that provides:

- State management (`get_state()`, `set_focus()`, `add_task()`)
- Session logging
- Intent detection
- Work mode tracking

### Relevant Commands

**When Cody says:**

- "HOTFIX" → Run full verification (`npm run lint && npm run build`)
- "CHECK DATA" → Run `npm run validate:data`
- "hey", "morning" → May trigger `/day start` workflow
- "done", "wrap up" → May trigger `/day end` workflow

### Dashboard

Browser-based Mission Control at `/Users/codyboring/CodyML/projects/life/privatebrain/dashboard/index.html`

**Reference:** `/Users/codyboring/CodyML/projects/life/privatebrain/CLAUDE.md`

---

## Technology Patterns

### Next.js 16 App Router Standards

**From Rocky Mount project:**

**Route Groups:**

- `(welcome)/` - Splash screen layout
- `(main)/` - Main site layout
- `(almanac)/` - Weather utility layout

**Component Patterns:**

- Prefer Server Components
- `'use client'` only when necessary
- CSS Modules for styling (`.module.css`)

**Data Fetching:**

- JSON imports for static data
- API routes for external data (weather, NWS alerts)

**Code Quality:**

- Strict TypeScript (`strict: true`)
- No `console.*` statements (use logger)
- Explicit return types for exported functions

### Pre-Commit Automation

**Husky + lint-staged pattern:**

```json
// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix"],
  "*": ["prettier --write"]
}
```

**Runs on every commit:**

1. ESLint with auto-fix
2. Prettier formatting
3. Blocks commit if fails

**Applicable to:** All future projects

---

## Historical Accuracy Guidelines

### Verified Claims (Safe to Use)

| Claim                                                            | Source                                  |
| ---------------------------------------------------------------- | --------------------------------------- |
| First seat of government for Southwest Territory (1790-1792)     | Tennessee Encyclopedia, primary sources |
| Site settled by William Cobb around 1769-1770                    | Historical documentation                |
| Governor William Blount administered territorial government here | Primary sources, Blount correspondence  |
| Cobb family supplied Overmountain Men                            | Historical accounts                     |
| Andrew Jackson lodged here six weeks                             | Historical accounts                     |
| William Blount signed U.S. Constitution                          | Historical fact                         |

### Inaccurate Claims (NEVER Use)

| Incorrect                            | Why                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------- |
| Tennessee's first capital            | Knoxville was first STATE capital (1796). Rocky Mount was TERRITORIAL. |
| First territorial capital in America | Marietta, Ohio was first (1788)                                        |
| Buildings date to 1770               | UT dendrochronology dates current structures to 1826-1830              |
| George Washington visited            | No documentation                                                       |

**Full guidelines:** `/docs/COPY.md` (Historical Accuracy section)

**Evidence documentation:** `/docs/EVIDENCE-ACCURACY-REVIEW.md`, `/docs/CITATION-MATRIX.md`

---

## Recommendations

### Must Keep

**Essential reference docs:**

1. `/CLAUDE.md` - Main project instructions
2. `/docs/DATA-STANDARDS.md` - JSON validation rules
3. `/docs/COPY.md` - Brand messaging framework
4. `/lib/copy/` - Source of truth for all copy
5. `/data/*.json` - Single source of truth for dynamic content

**Workspace-level essentials:**

1. Global CLAUDE.md - PrivateBrain MCP instructions
2. Workspace CLAUDE.md - Session protocol
3. `/projects/reference/PATTERNS.md` - Cross-project code patterns

### Update Needed

**Docs requiring refresh:**

1. `/docs/V2-ROADMAP.md` - Outdated, written before V1 launched
2. `/docs/PHASE-*.md` files - Historical artifacts from build phases
3. `/_archive/` docs - Mark as historical, don't delete

**Data requiring maintenance:**

1. `/data/events.json` - Quarterly updates for 2026 season
2. `/data/siteInfo.json` - Update hours/prices when changed
3. Archive 2026 events after season ends

### Consolidate

**Scattered docs to merge:**

1. Design token docs (4 files) → Keep as-is (each serves purpose)
2. Marketing component docs (5 files) → Consolidate into `/docs/MARKETING-COMPONENTS-INDEX.md`
3. CSS documentation (3 files) → Keep `/docs/CSS-INDEX.md` as master

**Not recommended:** Don't consolidate brand copy into markdown - TypeScript constants in `/lib/copy/` are source of truth

### Archive

**Historical but not current:**

1. `/docs/_archive/` - Already archived, keep for reference
2. Phase summaries (RA-03, RA-04) - Move to `/_archive/build-phases/`
3. Governor delivery docs - Move to `/_archive/special-projects/`

**Don't delete:** These contain valuable context for future questions

---

## Quick Reference

### Common Commands

```bash
# Development
npm install          # Install dependencies (sets up git hooks)
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Run Prettier

# Data validation
npm run validate:data  # Check all JSON files

# Pre-publish checklist (HOTFIX)
npm run lint && npm run build
```

### Key Paths

```
/CLAUDE.md                                   # Main project instructions
/docs/DATA-STANDARDS.md                      # JSON schemas
/docs/COPY.md                                # Brand guide
/lib/copy/                                   # Copy constants (source of truth)
/data/                                       # JSON data files
/components/                                 # React components
/app/                                        # Next.js pages

# Workspace
/Users/codyboring/CodyML/CLAUDE.md          # Workspace root
/Users/codyboring/CodyML/docs/              # Workspace docs
/Users/codyboring/CodyML/projects/reference/ # Cross-project reference
```

### External Resources

| Resource               | URL/Location                                           | Purpose                     |
| ---------------------- | ------------------------------------------------------ | --------------------------- |
| **FareHarbor Default** | `https://fareharbor.com/embeds/book/rockymountmuseum/` | Default ticket booking      |
| **Deployed Site**      | `tennesseestartshere.com`                              | Production (Vercel)         |
| **Main Site**          | `rockymountmuseum.com`                                 | Squarespace site (separate) |
| **Grant Database**     | `/projects/reference/american-250-grants/`             | Funding research            |

---

## For Future AI Sessions

### Context Loading Priority

**Read first (essential):**

1. `/CLAUDE.md` - Owner commands, key systems
2. `/docs/DATA-STANDARDS.md` - How data works
3. `/docs/COPY.md` - Brand voice, what NOT to say

**Read when needed:**

- `/docs/STYLE-GUIDE.md` - Design system details
- `/docs/ALMANAC.md` - Weather feature specifics
- `/CONTRIBUTING.md` - Code quality rules
- `/docs/PROJECT.md` - Original technical spec

### Pattern Recognition

**When asked to:**

- Add marketing copy → Check `/lib/copy/` first, update constants
- Add new event → Follow `/docs/DATA-STANDARDS.md`, run validation
- Fix design → Reference `/docs/STYLE-GUIDE.md` tokens
- Debug code → Remember no-console rule, use logger
- Add documentation → Check if overlaps with existing docs

### Cross-Project Learning

**Patterns from SPE applicable here:**

- JSON as source of truth
- Validation before deploy
- Pre-commit automation
- TypeScript strict mode

**Patterns from PrivateBrain applicable here:**

- Command detection ("HOTFIX", "CHECK DATA")
- Session workflow awareness
- Intent-based responses

**NOT applicable from SPE:**

- Laravel/Filament patterns (Rocky Mount uses Next.js)
- Supabase RLS patterns (Rocky Mount uses static JSON)
- AuctionWorx integrations (unrelated domains)

---

## Maintenance Schedule

| Task                  | Frequency           | Owner    | Notes                    |
| --------------------- | ------------------- | -------- | ------------------------ |
| Update events.json    | Quarterly           | Staff    | Before season milestones |
| Run data validation   | Before deploy       | Dev      | `npm run validate:data`  |
| Review brand copy     | As needed           | Director | Stop/Start audit         |
| Update grant research | Annual              | Dev      | After 250th anniversary  |
| Archive past events   | Post-season         | Dev      | After Dec 2026           |
| Update CLAUDE.md      | After major changes | Dev      | Keep current             |

---

**End of Index**

_This is a living document. Update as project evolves._
