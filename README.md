# Tennessee Starts Here

Rocky Mount State Historic Site - The first capital of the Southwest Territory, est. 1770.

**Live Site:** https://tennessee-starts-here.vercel.app

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, CSS Modules
- **Language:** TypeScript
- **Deployment:** Vercel (auto-deploy from GitHub)

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

### Code Quality

This project enforces code quality with automated tooling:

- **Pre-commit hooks** - ESLint and Prettier run automatically on staged files
- **No console statements** - Use `logger` from `lib/logger.ts` instead
- **TypeScript strict mode** - Full type safety

```typescript
// Instead of console.log, use:
import { logger } from '@/lib/logger'

logger.debug('Development info', { data })
logger.error('Something failed', error)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## Deployment Workflow

This project uses **GitHub + Vercel** for continuous deployment:

| Action                 | Result                           |
| ---------------------- | -------------------------------- |
| Push to `main`         | Auto-deploys to **production**   |
| Push to other branches | Creates **preview deployment**   |
| Open a PR              | Preview URL added to PR comments |

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

### Manual Deploy (if needed)

```bash
# Deploy to production manually
vercel --prod

# Deploy preview
vercel
```

## Project Structure

```
app/
├── (welcome)/       # Splash/landing page (/)
├── (main)/          # Main site pages (/home, /events, /visit, etc.)
└── (almanac)/       # The 1775 Almanac (/almanac)

components/
├── welcome/         # Welcome screen components
├── Header/          # Navigation styles
└── ...              # Shared components

lib/
└── almanac/         # Almanac business logic

docs/
└── *.md             # Build guides and documentation
```

## Links

- **GitHub:** https://github.com/getboring/tennessee-starts-here
- **Vercel Dashboard:** https://vercel.com/maxtorborings-projects/tennessee-starts-here
- **Production:** https://tennessee-starts-here.vercel.app
