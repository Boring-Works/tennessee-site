# Tennessee Starts Here

Rocky Mount State Historic Site — Where Tennessee's government began. Est. 1770.

**Live Site:** https://tennesseestartshere.com

---

## What This Is

A commemorative website for Rocky Mount State Historic Site's America 250 / Tennessee 230 programming. This is a **unified package** containing:

| Feature            | Route                              | Description                                     |
| ------------------ | ---------------------------------- | ----------------------------------------------- |
| **Welcome Screen** | `/`                                | Cinematic splash page with weather + brand hook |
| **Main Website**   | `/home`, `/visit`, `/events`, etc. | Marketing pages for the historic site           |
| **1775 Almanac**   | `/almanac`                         | Period-themed weather utility for Tennessee     |

Everything deploys together. One codebase, one build, one deployment.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, CSS Modules
- **Language:** TypeScript (strict mode)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Weather APIs:** Open-Meteo, RainViewer, NWS Alerts

---

## Development

```bash
# Install dependencies (also sets up git hooks)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Project Structure

```
app/
├── (welcome)/           # Splash screen (/)
├── (main)/              # Main site pages
│   ├── home/            # Homepage
│   ├── visit/           # Visit info
│   ├── events/          # Events calendar
│   ├── first-250/       # First 250 program
│   └── lectures/        # Lecture series
├── almanac/             # Weather utility
└── api/                 # API routes

lib/
├── copy/                # Brand copy constants (source of truth)
├── almanac/             # Weather business logic
└── logger.ts            # Dev-only logging

components/
├── welcome/             # Welcome screen components
├── almanac/             # Weather components
└── ...                  # Shared components

docs/
├── COPY.md              # Brand guide
├── ALMANAC.md           # Weather feature docs
├── PROJECT.md           # Technical spec
└── STYLE-GUIDE.md       # Design system
```

---

## Key Systems

### Brand Copy (`lib/copy/`)

All marketing copy is centralized in TypeScript:

```typescript
import { HOOKS, BUTTONS, MYSTERY_NARRATIVE } from '@/lib/copy'

// Components use constants directly
<p>{HOOKS.primaryCTA}</p>  // "Stand where they stood."
```

See `docs/COPY.md` for brand guidelines.

### Weather Almanac (`lib/almanac/`)

Farmer-focused weather utility with:

- Task scores (Sower, Shepherd, Keeper, Builder)
- Period-appropriate sayings
- Moon phase calculations
- Frost alerts
- Precipitation radar

See `docs/ALMANAC.md` for technical details.

---

## Code Quality

This project enforces quality with automated tooling:

- **Pre-commit hooks** — ESLint and Prettier run on staged files
- **No console statements** — Use `logger` from `lib/logger.ts`
- **TypeScript strict mode** — Full type safety

```typescript
// Instead of console.log, use:
import { logger } from '@/lib/logger'

logger.debug('Development info', { data })
logger.error('Something failed', error)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## Deployment

| Action                 | Result                           |
| ---------------------- | -------------------------------- |
| Push to `main`         | Auto-deploys to **production**   |
| Push to other branches | Creates **preview deployment**   |
| Open a PR              | Preview URL added to PR comments |

Everything deploys together as one package.

### Standard Workflow

```bash
# 1. Make changes locally
npm run dev

# 2. Commit your changes
git add .
git commit -m "feat: description of changes"

# 3. Push to GitHub (auto-deploys to Vercel)
git push origin main
```

---

## Documentation

| Document              | Purpose                        |
| --------------------- | ------------------------------ |
| `CLAUDE.md`           | AI assistant instructions      |
| `docs/COPY.md`        | Brand guide & messaging        |
| `docs/ALMANAC.md`     | Weather feature technical docs |
| `docs/PROJECT.md`     | Technical specification        |
| `docs/STYLE-GUIDE.md` | Visual design system           |
| `CONTRIBUTING.md`     | Coding standards               |

---

## Links

- **GitHub:** https://github.com/getboring/tennessee-starts-here
- **Vercel Dashboard:** https://vercel.com/maxtorborings-projects/tennessee-starts-here
- **Production:** https://tennesseestartshere.com

---

_Where Tennessee's government began. Stand where they stood._
