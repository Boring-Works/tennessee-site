# Claude Instructions for Tennessee Starts Here

## Project Overview

**Site:** tennesseestartshere.com
**Purpose:** Rocky Mount State Historic Site's America 250 commemorative website
**Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + Vercel

This is a **monorepo-style project** containing:

- **Main Website** — Marketing pages for Rocky Mount (/home, /visit, /events, etc.)
- **Welcome Screen** — Cinematic splash page (/)
- **1775 Almanac** — Weather utility component (/almanac)

All features deploy together as one package.

---

## CRITICAL: Source of Truth Hierarchy

**READ THIS BEFORE MODIFYING HISTORICAL CONTENT**

See `SOURCE-OF-TRUTH-HIERARCHY.md` for full details. Quick reference:

| Level         | Location                                  | AI Can Modify?   |
| ------------- | ----------------------------------------- | ---------------- |
| 1 - IMMUTABLE | `/Historical/raw/`                        | NO - Never touch |
| 2 - VERIFIED  | `/Historical/processed/`                  | Drafts only      |
| 3 - WEBSITE   | `/content/documents/`, `/content/people/` | Formatting only  |
| 4 - DISPLAY   | `/app/`, `/data/`                         | Yes              |

**Key Rules:**

1. **Level 2 is the source of truth** for historical facts
2. **Never change historical facts** in Level 3 without Level 2 update first
3. **Never change verification status** - humans only
4. **New historical claims** require Level 2 documentation first

**When editing historical content, include in commit:**

```
[CONTENT] Description

Source: Level 2 file reference
Reviewed-by: pending-human-review
```

---

## Owner Commands

### HOTFIX

When Cody says **"HOTFIX"**, immediately run the full verification sequence:

1. `npm run lint` — Check for code issues
2. `npm run build` — Verify production build
3. Report results clearly:
   - "Ready to publish" if both pass
   - "Found issues" + fix them if either fails

This is the pre-publish checklist. Do not ask questions — just run it.

### CHECK DATA

When Cody says **"CHECK DATA"**, validate all JSON data files:

1. `npm run validate:data` — Run validation script
2. Report:
   - Errors (must fix): Schema violations, missing fields
   - Warnings: Events on closed days, pre-season dates
   - Info: Events using default FareHarbor booking

The validator checks `events.json`, `lectures.json`, and `siteInfo.json` against `docs/DATA-STANDARDS.md`.

---

## Key Systems

### Design Token System (`app/globals.css`)

Shadow and color design tokens for consistent visual hierarchy:

**Shadow Tokens:**

- `--shadow-xs` through `--shadow-xl` (5 neutral elevation levels)
- `--shadow-gold-sm`, `--shadow-gold-lg` (2 brand accent glows)

**Gold Color Tokens:**

- `--gold-primary` (#c9a227) - main brand gold
- `--gold-hover` (#d4af37) - interactive states
- `--gold-shimmer` (rgba 0.4) - glows, borders

**Documentation:**

- `docs/DESIGN-TOKENS.md` - System architecture
- `docs/TOKEN-QUICK-REFERENCE.md` - Developer quick guide
- `docs/TOKEN-EXAMPLES.md` - Real-world usage patterns
- `docs/TOKEN-VISUAL-REFERENCE.md` - Visual reference chart

### Brand Copy System (`lib/copy/`)

All marketing copy is centralized in TypeScript constants:

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE } from '@/lib/copy'
```

| File            | Contents                                             |
| --------------- | ---------------------------------------------------- |
| `brand.ts`      | Core identifiers, hooks, CTAs, STOP/START dictionary |
| `narratives.ts` | Three-tier framework, staff scripts                  |
| `metadata.ts`   | SEO content for all pages                            |
| `index.ts`      | Public API                                           |

**Brand Guide:** `docs/COPY.md`

### Almanac Weather System (`lib/almanac/`)

Weather utility with farmer-focused task scores:

| File              | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `weather.ts`      | Data transformation                      |
| `taskScores.ts`   | Sower, Shepherd, Keeper, Builder indices |
| `sayings.ts`      | Period-appropriate weather quotes        |
| `moonPhase.ts`    | SunCalc lunar calculations               |
| `farmerMemory.ts` | Cross-day pattern detection              |

**Almanac Docs:** `docs/ALMANAC.md`

### Data System (`data/` + `lib/data/`)

All dynamic site data uses JSON files as single source of truth.

| File            | Purpose                              |
| --------------- | ------------------------------------ |
| `siteInfo.json` | Hours, prices, contact, social links |
| `events.json`   | 2026 events calendar                 |
| `lectures.json` | Lecture series details               |
| `lib/data/`     | Data utilities (ticket URL helpers)  |

**Data Standards:** `docs/DATA-STANDARDS.md`

**Smart Ticket URLs:** Events with `requiresTicket: true` automatically use FareHarbor's default booking flow unless a custom `ticketUrl` is specified.

```typescript
import { getTicketUrl } from '@/lib/data'

// Uses default FareHarbor if ticketUrl is null
const bookingUrl = getTicketUrl(event)
```

**Validation:** Run `npm run validate:data` to check all JSON files against standards.

### JSON Data Architecture

All dynamic site data uses JSON files as single source of truth.

| File                                 | Purpose                      | Used By                              |
| ------------------------------------ | ---------------------------- | ------------------------------------ |
| `data/siteInfo.json`                 | Hours, prices, contact       | useHours hook, Footer, PlanYourVisit |
| `data/events.json`                   | 2026 events calendar         | Events page, QuickBookingCard        |
| `data/navigation.json`               | Site nav structure           | Navigation.tsx                       |
| `data/testimonials.json`             | Verified visitor quotes      | TestimonialCarousel                  |
| `data/timeline.json`                 | Historical timeline          | Homepage story section               |
| `data/experiences.json`              | Visitor experience moments   | Experience section                   |
| `data/integrations.json`             | External service configs     | ReviewCTA, booking                   |
| `data/config/operatingSchedule.json` | Year-agnostic hours/closures | lib/siteHours.ts                     |

### Marketing Components

Reusable components that pull from JSON data:

| Component             | Data Source       | Purpose                                   |
| --------------------- | ----------------- | ----------------------------------------- |
| `SiteStatusBanner`    | lib/siteHours.ts  | Open/closed status with friendly messages |
| `TestimonialCarousel` | testimonials.json | Rotating visitor quotes                   |
| `QuickBookingCard`    | events.json       | Next event with Book Now CTA              |
| `ReviewCTA`           | integrations.json | Encourage reviews with platform links     |

**Component Registry:** `data/config/components.json` - Master documentation of all components, props, and data flows.

### Staff Content Updates

Non-technical staff can update website content by editing JSON files on GitHub:

| Content      | File                                 | Guide                                      |
| ------------ | ------------------------------------ | ------------------------------------------ |
| Events       | `data/events.json`                   | [Staff Guide](docs/STAFF-CONTENT-GUIDE.md) |
| Testimonials | `data/testimonials.json`             | [Staff Guide](docs/STAFF-CONTENT-GUIDE.md) |
| Hours/Prices | `data/siteInfo.json`                 | [Staff Guide](docs/STAFF-CONTENT-GUIDE.md) |
| Closures     | `data/config/operatingSchedule.json` | [Staff Guide](docs/STAFF-CONTENT-GUIDE.md) |

**Staff Guide:** `docs/STAFF-CONTENT-GUIDE.md` - Step-by-step instructions for non-developers.

### Site Hours System

The `lib/siteHours.ts` utility calculates site status automatically:

- Season: First week of March through December 20
- Hours: Wed-Sat 10am-5pm
- Closures: Thanksgiving (Thu+Fri), calculated by pattern
- Special events: Evening hours replace regular hours

```typescript
import { getSiteStatus } from '@/lib/siteHours'

const status = getSiteStatus() // Returns current status
// { isOpen: true, message: "Open until 5pm", ... }
```

---

## Code Standards

### No Console Statements

ESLint enforces `no-console`. Use the logger instead:

```typescript
import { logger } from '@/lib/logger'

logger.debug('info', { data })
logger.error('failed', error)
```

### Pre-commit Hooks

Husky + lint-staged run automatically on every commit:

- ESLint with auto-fix
- Prettier formatting

---

## Project Structure

```
app/
├── (welcome)/           # Splash screen (/)
├── (main)/              # Main site pages
│   ├── home/            # Homepage (/home)
│   ├── visit/           # Visit info (/visit)
│   ├── events/          # Events calendar (/events)
│   ├── first-250/       # First 250 program (/first-250)
│   └── lectures/        # Lecture series (/lectures)
├── almanac/             # Weather utility (/almanac)
└── api/                 # API routes
    ├── weather/         # Weather proxy
    ├── nws-alerts/      # NWS alerts
    └── stream-levels/   # USGS stream data

components/
├── welcome/             # Welcome screen components
├── almanac/             # Weather components
├── Header/              # Navigation
├── HeroSection.tsx      # Homepage hero
├── FinalCTA.tsx         # Page closing CTA
└── ...

lib/
├── copy/                # Brand copy constants
├── almanac/             # Weather business logic
├── data/                # Data utilities (ticket URL helpers)
├── logger.ts            # Dev-only logging
└── utils.ts             # Shared utilities

data/
├── events.json          # 2026 events (single source of truth)
├── lectures.json        # Lecture series
└── siteInfo.json        # Hours, prices, contact

scripts/
└── validate-data.ts     # JSON validation script

data/config/
├── operatingSchedule.json  # Year-agnostic hours/closures
└── components.json         # Master component registry

docs/
├── STAFF-CONTENT-GUIDE.md  # Non-developer content update guide
├── COPY.md                 # Brand guide (references lib/copy/)
├── ALMANAC.md              # Weather feature docs
├── DATA-STANDARDS.md       # JSON schemas & validation rules
├── PROJECT.md              # Technical specification
└── STYLE-GUIDE.md          # Visual design system
```

---

## Key Files

| File                     | Purpose                                |
| ------------------------ | -------------------------------------- |
| `lib/copy/`              | Brand copy constants (source of truth) |
| `lib/almanac/`           | Weather calculation logic              |
| `lib/data/`              | Data utilities (ticket URL helpers)    |
| `lib/logger.ts`          | Dev-only logging utility               |
| `docs/COPY.md`           | Brand guidelines                       |
| `docs/ALMANAC.md`        | Weather feature docs                   |
| `docs/DATA-STANDARDS.md` | JSON data schemas & validation         |
| `CONTRIBUTING.md`        | Full coding standards                  |

---

## Common Tasks

### Update Marketing Copy

1. Edit `lib/copy/brand.ts` or `lib/copy/narratives.ts`
2. Components import from `@/lib/copy`
3. Run `npm run build` to verify

### Add New Event

1. Edit `data/events.json` (keep chronological order)
2. Required fields: `id`, `title`, `date`, `type`, `category`, `description`, `requiresTicket`
3. For ticketed events: Set `requiresTicket: true`. Add `ticketUrl` only if NOT using default FareHarbor
4. Run `npm run validate:data` to check for errors
5. Events page auto-generates from JSON

**Validation Rules:**

- Single-day events must be on Wed-Sat (Rocky Mount open days)
- Dates must be in YYYY-MM-DD format
- Season runs March 4 - mid-December 2026

See `docs/DATA-STANDARDS.md` for full schema and examples.

### Modify Weather Logic

1. Edit files in `lib/almanac/`
2. Components in `components/almanac/` consume the logic
3. Test at `/almanac`

---

## Deployment

Push to `main` → Auto-deploys to Vercel (production)
Push to other branches → Creates preview deployment

Everything deploys together. The almanac is part of the main site build.

---

_Last updated: January 2026_
