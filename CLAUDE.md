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

## Owner Commands

### HOTFIX

When Cody says **"HOTFIX"**, immediately run the full verification sequence:

1. `npm run lint` — Check for code issues
2. `npm run build` — Verify production build
3. Report results clearly:
   - "Ready to publish" if both pass
   - "Found issues" + fix them if either fails

This is the pre-publish checklist. Do not ask questions — just run it.

---

## Key Systems

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
├── logger.ts            # Dev-only logging
└── utils.ts             # Shared utilities

data/
├── events.json          # 2026 events
├── lectures.json        # Lecture series
└── siteInfo.json        # Hours, prices, contact

docs/
├── COPY.md              # Brand guide (references lib/copy/)
├── ALMANAC.md           # Weather feature docs
├── PROJECT.md           # Technical specification
└── STYLE-GUIDE.md       # Visual design system
```

---

## Key Files

| File              | Purpose                                |
| ----------------- | -------------------------------------- |
| `lib/copy/`       | Brand copy constants (source of truth) |
| `lib/almanac/`    | Weather calculation logic              |
| `lib/logger.ts`   | Dev-only logging utility               |
| `docs/COPY.md`    | Brand guidelines                       |
| `docs/ALMANAC.md` | Weather feature docs                   |
| `CONTRIBUTING.md` | Full coding standards                  |

---

## Common Tasks

### Update Marketing Copy

1. Edit `lib/copy/brand.ts` or `lib/copy/narratives.ts`
2. Components import from `@/lib/copy`
3. Run `npm run build` to verify

### Add New Event

1. Edit `data/events.json`
2. Events page auto-generates from JSON

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
