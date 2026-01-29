# Documentation Cleanup Plan

**Tennessee Starts Here - Documentation Health Audit**
**Date:** January 29, 2026
**Auditor:** Dr. Kai Nakamura (Documentation Lead)

---

## Executive Summary

**Current State:** 19 markdown files in project root, 53+ files in docs/
**Documentation Health:** FAIR (documentation exists but poorly organized)
**Action Required:** Archive completed work, organize active docs into logical structure

**Key Issues:**

1. **Root folder cluttered** - Mix of completed audits, build guides, and active reference
2. **No clear hierarchy** - Hard to find current vs historical information
3. **Duplicate/overlapping content** - Multiple files about same topics (Governor's Glass, Almanac, Hero)
4. **Missing archive folder** - No place for completed work

---

## Root Folder Categorization

### ✅ KEEP (Move to docs/)

**Active Reference Documentation - Move to `docs/reference/`**

| File                          | Reason                                      | New Location                        |
| ----------------------------- | ------------------------------------------- | ----------------------------------- |
| `CLAUDE.md`                   | **Primary project context** - Keep in root  | (stays in root)                     |
| `README.md`                   | **Project overview** - Keep in root         | (stays in root)                     |
| `CONTRIBUTING.md`             | **Active development guide** - Keep in root | (stays in root)                     |
| `COMPONENT-REFERENCE.md`      | Active component inventory                  | `docs/reference/component-index.md` |
| `CODE-STANDARDS-QUICK-REF.md` | Active coding reference                     | `docs/reference/code-standards.md`  |

**Total:** 3 stay in root, 2 move to docs/reference/

---

### 📦 ARCHIVE (Move to `_archive/audits/`)

**Completed Audit Reports - Historical record, not active use**

| File                               | Category | Reason                     | Archive Path                                   |
| ---------------------------------- | -------- | -------------------------- | ---------------------------------------------- |
| `CODE-QUALITY-AUDIT-2026-01-29.md` | Audit    | Completed snapshot         | `_archive/audits/2026-01-29-code-quality.md`   |
| `PERFORMANCE-AUDIT-2026-01-29.md`  | Audit    | Completed snapshot         | `_archive/audits/2026-01-29-performance.md`    |
| `PERFORMANCE-AUDIT.md`             | Audit    | Older version (superseded) | `_archive/audits/2026-01-XX-performance-v1.md` |
| `GOVERNOR-GLASS-AUDIT.md`          | Audit    | Completed analysis         | `_archive/audits/2026-01-29-governor-glass.md` |
| `REVIEWS.md`                       | Audit    | General reviews            | `_archive/audits/reviews.md`                   |

**Total:** 5 files → `_archive/audits/`

---

### 📦 ARCHIVE (Move to `_archive/planning/`)

**Completed Implementation Guides - Work is done**

| File                             | Category       | Reason         | Archive Path                                       |
| -------------------------------- | -------------- | -------------- | -------------------------------------------------- |
| `QUICK-WINS-IMPLEMENTATION.md`   | Implementation | Work completed | `_archive/planning/quick-wins-implementation.md`   |
| `REFACTORING-RECOMMENDATIONS.md` | Implementation | Work completed | `_archive/planning/refactoring-recommendations.md` |

**Total:** 2 files → `_archive/planning/`

---

### 📦 ARCHIVE (Move to `_archive/claude-prompts/`)

**Claude Build Guides - Historical build instructions**

| File                               | Category     | Reason                          | Archive Path                                     |
| ---------------------------------- | ------------ | ------------------------------- | ------------------------------------------------ |
| `CLAUDE-BUILD-GUIDE.md`            | Build Guide  | Hero v2.0 build (completed)     | `_archive/claude-prompts/hero-v2-build-guide.md` |
| `CLAUDE-CODE-HERO-6040-PROMPT.md`  | Build Prompt | 60/40 hero redesign (completed) | `_archive/claude-prompts/hero-6040-prompt.md`    |
| `CLAUDE-CODE-HERO-CARD-PROMPT.md`  | Build Prompt | Hero card prompt (completed)    | `_archive/claude-prompts/hero-card-prompt.md`    |
| `CLAUDE-CODE-HERO-FIXES.md`        | Build Prompt | Hero fixes (completed)          | `_archive/claude-prompts/hero-fixes.md`          |
| `CLAUDE-CODE-SMART-CARD-PROMPT.md` | Build Prompt | Smart card prompt (completed)   | `_archive/claude-prompts/smart-card-prompt.md`   |

**Total:** 5 files → `_archive/claude-prompts/`

---

### 📦 ARCHIVE (Move to `_archive/projects/governor-glass/`)

**Governor's Glass Project Documentation - Separate project**

| File                        | Category | Reason                            | Archive Path                                           |
| --------------------------- | -------- | --------------------------------- | ------------------------------------------------------ |
| `CLONING-STRATEGY.md`       | Planning | Governor's Glass cloning strategy | `_archive/projects/governor-glass/cloning-strategy.md` |
| `README-GOVERNORS-GLASS.md` | Planning | Governor's Glass overview         | `_archive/projects/governor-glass/README.md`           |

**Total:** 2 files → `_archive/projects/governor-glass/`

**Note:** If Governor's Glass becomes active, these should move to a separate `/governor-glass/` folder in the project root, not archive.

---

## Proposed Documentation Structure

```
tennessee-starts-here/
│
├── CLAUDE.md                          # Primary AI context (KEEP IN ROOT)
├── README.md                          # Project overview (KEEP IN ROOT)
├── CONTRIBUTING.md                    # Development guide (KEEP IN ROOT)
├── package.json
├── next.config.ts
│
├── docs/
│   ├── README.md                      # 📍 NEW: Documentation index & navigation
│   │
│   ├── reference/                     # Quick reference guides
│   │   ├── code-standards.md          # Moved from CODE-STANDARDS-QUICK-REF.md
│   │   ├── component-index.md         # Moved from COMPONENT-REFERENCE.md
│   │   └── api-reference.md           # Future: API endpoint reference
│   │
│   ├── features/                      # Feature-specific documentation
│   │   ├── almanac/
│   │   │   ├── ALMANAC.md             # Main almanac docs
│   │   │   ├── ALMANAC-QUICK-REFERENCE.md
│   │   │   ├── 1775-ALMANAC-BUILD-GUIDE.md
│   │   │   ├── 1790-ALMANAC-TOOL.md
│   │   │   └── ... (all ALMANAC-*.md files)
│   │   │
│   │   ├── events/
│   │   │   ├── 2026-EVENT-CALENDAR-INTEGRATED.md
│   │   │   ├── EVENT-PASSPORT-SPEC.md
│   │   │   ├── EVENT-STAFF-IMPLEMENTATION-GUIDE.md
│   │   │   ├── EVENT-SYNERGY-MAP.md
│   │   │   └── EVENT-SYNERGY-SUMMARY.md
│   │   │
│   │   ├── evidence/
│   │   │   ├── EVIDENCE-ACCURACY-REVIEW.md
│   │   │   ├── EVIDENCE-ARCHIVE-REVIEW.md
│   │   │   ├── EVIDENCE-CHEROKEE-AUDIT.md
│   │   │   ├── EVIDENCE-LANGUAGE-REVIEW.md
│   │   │   ├── EVIDENCE-LIBRARY-REDIRECT.md
│   │   │   ├── EVIDENCE-QUICK-WINS.md
│   │   │   ├── EVIDENCE-ROOM-DESIGN-SYSTEM.md
│   │   │   └── EVIDENCE-TENNESSEE-PRIDE.md
│   │   │
│   │   ├── welcome/
│   │   │   ├── WELCOME-SCREEN-BUILD-GUIDE.md
│   │   │   ├── WELCOME-SCREEN-CLAUDE-CODE-PROMPT.md
│   │   │   └── WELCOME-SCREEN-PLAN-A-BUILD-GUIDE.md
│   │   │
│   │   ├── homepage/
│   │   │   ├── HOMEPAGE-RESTRUCTURE.md
│   │   │   ├── HOMEPAGE-RESTRUCTURE-SPEC.md
│   │   │   ├── HOMEPAGE-RESTRUCTURE-ADDITIONS.md
│   │   │   └── HERO-V2-VISUAL-DNA-AUDIT.md
│   │   │
│   │   └── navigation/
│   │       ├── NAVIGATION-BUILD-GUIDE.md
│   │       └── NAVIGATION-COMPARISON-ANALYSIS.md
│   │
│   ├── guides/                        # How-to guides
│   │   ├── QUICKSTART.md              # Getting started
│   │   ├── PROJECT-CLEANUP-GUIDE.md   # Cleanup instructions
│   │   └── ... (future guides)
│   │
│   ├── architecture/                  # System architecture
│   │   ├── PROJECT.md                 # Technical specification
│   │   ├── COPY.md                    # Brand copy system
│   │   ├── DATA-STANDARDS.md          # Data schemas
│   │   ├── STYLE-GUIDE.md             # Visual design system
│   │   └── schema.yaml                # API schemas
│   │
│   ├── planning/                      # Planning & strategy
│   │   ├── V2-ROADMAP.md              # Future roadmap
│   │   ├── TODO-FUTURE.md             # Future features
│   │   ├── DO-NOT-DO.md               # Anti-patterns
│   │   ├── BRAND-STRATEGY.md          # Brand guidelines
│   │   ├── EXECUTIVE-BRIEF-SYNERGY-PROGRAM.md
│   │   ├── SYNERGY-PROGRAM-INDEX.md
│   │   ├── TENNESSEE-PRIDE-QUICK-REFERENCE.md
│   │   └── PATRIOT-PERSPECTIVE-EVIDENCE-REVIEW.md
│   │
│   └── archive/                       # Historical documentation
│       ├── ARCHIVE-INTEGRATION.md
│       ├── ARCHIVE-UI-EXAMPLES.md
│       └── PHASE-5.2-COMPLETE.md
│
├── _archive/                          # 📍 NEW: Completed work archive
│   ├── audits/                        # Completed audit reports
│   │   ├── 2026-01-29-code-quality.md
│   │   ├── 2026-01-29-performance.md
│   │   ├── 2026-01-29-governor-glass.md
│   │   └── reviews.md
│   │
│   ├── planning/                      # Completed implementation plans
│   │   ├── quick-wins-implementation.md
│   │   └── refactoring-recommendations.md
│   │
│   ├── claude-prompts/                # Historical build prompts
│   │   ├── hero-v2-build-guide.md
│   │   ├── hero-6040-prompt.md
│   │   ├── hero-card-prompt.md
│   │   ├── hero-fixes.md
│   │   └── smart-card-prompt.md
│   │
│   └── projects/                      # Separate project documentation
│       └── governor-glass/
│           ├── README.md
│           └── cloning-strategy.md
│
├── app/
├── components/
├── lib/
└── data/
```

---

## New Documentation Index

**File:** `docs/README.md`

This file serves as the navigation hub for all documentation.

```markdown
# Documentation Index

**Tennessee Starts Here - Rocky Mount State Historic Site**

Welcome to the Tennessee Starts Here documentation. Start here to find what you need.

---

## Quick Links

| I want to...                | Go to                                              |
| --------------------------- | -------------------------------------------------- |
| Get started                 | [Quickstart Guide](guides/QUICKSTART.md)           |
| Understand the architecture | [Technical Specification](architecture/PROJECT.md) |
| Write code                  | [Code Standards](reference/code-standards.md)      |
| Find a component            | [Component Index](reference/component-index.md)    |
| Understand brand copy       | [Copy System](architecture/COPY.md)                |
| Work with data              | [Data Standards](architecture/DATA-STANDARDS.md)   |
| See the roadmap             | [V2 Roadmap](planning/V2-ROADMAP.md)               |

---

## Documentation Structure

### 📚 Reference

Quick lookup guides for active development.

- **Code Standards** - TypeScript, React, Next.js patterns
- **Component Index** - All components with categories
- **API Reference** - (Future) API endpoint documentation

### 🎯 Features

Feature-specific documentation organized by area.

- **Almanac** - Weather utility system (13 docs)
- **Events** - Event calendar and passport (5 docs)
- **Evidence** - Historical evidence library (8 docs)
- **Welcome** - Splash screen (3 docs)
- **Homepage** - Homepage and hero (4 docs)
- **Navigation** - Site navigation (2 docs)

### 📖 Guides

Step-by-step how-to guides.

- **Quickstart** - Getting started with development
- **Project Cleanup** - Cleanup and maintenance

### 🏗️ Architecture

System design and technical specifications.

- **Technical Spec** - Overall project architecture
- **Copy System** - Brand voice and messaging
- **Data Standards** - JSON schemas and validation
- **Style Guide** - Visual design system
- **Schema** - API schemas

### 🗺️ Planning

Strategy, roadmap, and future work.

- **V2 Roadmap** - Future features and phases
- **TODO Future** - Planned enhancements
- **Do Not Do** - Anti-patterns and what to avoid
- **Brand Strategy** - Marketing and brand guidelines

### 📦 Archive

Historical documentation (completed work, old plans).

- **Archive Integration** - Archive feature docs
- **Phase 5.2** - Phase completion notes

---

## Contributing to Documentation

### When to Update Docs

- After creating a new feature → Update architecture docs
- After establishing a new pattern → Update code standards
- After making a decision → Add to planning docs
- After completing an audit → Archive to `_archive/audits/`

### File Naming Conventions

- **Feature docs:** `FEATURE-NAME-TOPIC.md` (all caps)
- **Reference docs:** `lowercase-with-dashes.md`
- **Archive docs:** `YYYY-MM-DD-topic.md` (for audits)

### Documentation Standards

1. **Every doc needs a purpose statement** at the top
2. **Use tables for comparisons** (easier to scan)
3. **Use code blocks with language tags** for syntax highlighting
4. **Include "Last updated" date** at bottom
5. **Link to related docs** in "See also" section

---

_Last updated: January 29, 2026_
```

---

## Migration Checklist

### Phase 1: Create Structure (5 minutes)

```bash
# Create new folders
mkdir -p _archive/audits
mkdir -p _archive/planning
mkdir -p _archive/claude-prompts
mkdir -p _archive/projects/governor-glass
mkdir -p docs/reference
mkdir -p docs/features/{almanac,events,evidence,welcome,homepage,navigation}
```

### Phase 2: Move Completed Audits (5 minutes)

```bash
# Archive completed audits
mv CODE-QUALITY-AUDIT-2026-01-29.md _archive/audits/2026-01-29-code-quality.md
mv PERFORMANCE-AUDIT-2026-01-29.md _archive/audits/2026-01-29-performance.md
mv PERFORMANCE-AUDIT.md _archive/audits/2026-01-XX-performance-v1.md
mv GOVERNOR-GLASS-AUDIT.md _archive/audits/2026-01-29-governor-glass.md
mv REVIEWS.md _archive/audits/reviews.md
```

### Phase 3: Move Completed Planning (3 minutes)

```bash
# Archive completed implementation docs
mv QUICK-WINS-IMPLEMENTATION.md _archive/planning/quick-wins-implementation.md
mv REFACTORING-RECOMMENDATIONS.md _archive/planning/refactoring-recommendations.md
```

### Phase 4: Move Claude Prompts (5 minutes)

```bash
# Archive historical build prompts
mv CLAUDE-BUILD-GUIDE.md _archive/claude-prompts/hero-v2-build-guide.md
mv CLAUDE-CODE-HERO-6040-PROMPT.md _archive/claude-prompts/hero-6040-prompt.md
mv CLAUDE-CODE-HERO-CARD-PROMPT.md _archive/claude-prompts/hero-card-prompt.md
mv CLAUDE-CODE-HERO-FIXES.md _archive/claude-prompts/hero-fixes.md
mv CLAUDE-CODE-SMART-CARD-PROMPT.md _archive/claude-prompts/smart-card-prompt.md
```

### Phase 5: Move Governor's Glass (2 minutes)

```bash
# Archive separate project docs
mv CLONING-STRATEGY.md _archive/projects/governor-glass/cloning-strategy.md
mv README-GOVERNORS-GLASS.md _archive/projects/governor-glass/README.md
```

### Phase 6: Move Active Reference (3 minutes)

```bash
# Move active reference to docs/reference/
mv COMPONENT-REFERENCE.md docs/reference/component-index.md
mv CODE-STANDARDS-QUICK-REF.md docs/reference/code-standards.md
```

### Phase 7: Organize docs/ (10 minutes)

```bash
# Move almanac docs
mv docs/ALMANAC*.md docs/features/almanac/
mv docs/1775-ALMANAC-BUILD-GUIDE.md docs/features/almanac/
mv docs/1790-ALMANAC-TOOL.md docs/features/almanac/

# Move event docs
mv docs/*EVENT*.md docs/features/events/
mv docs/EVENT*.md docs/features/events/

# Move evidence docs
mv docs/EVIDENCE*.md docs/features/evidence/

# Move welcome docs
mv docs/WELCOME*.md docs/features/welcome/

# Move homepage docs
mv docs/HOMEPAGE*.md docs/features/homepage/
mv docs/HERO*.md docs/features/homepage/

# Move navigation docs
mv docs/NAVIGATION*.md docs/features/navigation/
```

### Phase 8: Create Documentation Index (5 minutes)

```bash
# Create new index file
touch docs/README.md
# (Copy content from "New Documentation Index" section above)
```

### Phase 9: Update CLAUDE.md (5 minutes)

Add reference to new docs structure in `CLAUDE.md`:

```markdown
## Documentation

All documentation is organized in `docs/` - start with `docs/README.md` for navigation.

**Quick links:**

- Architecture: `docs/architecture/PROJECT.md`
- Code Standards: `docs/reference/code-standards.md`
- Component Index: `docs/reference/component-index.md`
- Brand Copy: `docs/architecture/COPY.md`
- Data Standards: `docs/architecture/DATA-STANDARDS.md`

**Historical documentation:** See `_archive/` for completed audits and old prompts.
```

### Phase 10: Add Archive README (5 minutes)

```bash
# Create archive index
cat > _archive/README.md << 'EOF'
# Archive

Historical documentation - completed work, past audits, old build prompts.

## Structure

- **audits/** - Completed audit reports (code quality, performance, etc.)
- **planning/** - Completed implementation plans
- **claude-prompts/** - Historical Claude build instructions
- **projects/** - Documentation for separate/paused projects

## Why Archive?

Documentation is preserved for historical reference but moved out of active docs to reduce clutter. If work needs to be revisited, these documents provide context about past decisions.

_Last updated: January 29, 2026_
EOF
```

---

## Verification

After migration, verify:

### Root Folder (Should have only 3 MD files)

```bash
ls *.md
# Expected output:
# CLAUDE.md
# README.md
# CONTRIBUTING.md
```

### Archive Folder (Should have 14 files)

```bash
find _archive -type f -name "*.md" | wc -l
# Expected: 14 files
```

### Docs Folder (Should be organized)

```bash
ls docs/
# Expected:
# README.md (new index)
# reference/ (2 files)
# features/ (35+ files in subdirs)
# guides/
# architecture/
# planning/
# archive/
```

---

## Success Criteria

- [ ] Root folder has only 3 MD files (CLAUDE.md, README.md, CONTRIBUTING.md)
- [ ] All completed audits moved to `_archive/audits/`
- [ ] All Claude prompts moved to `_archive/claude-prompts/`
- [ ] Governor's Glass docs moved to `_archive/projects/governor-glass/`
- [ ] Active reference moved to `docs/reference/`
- [ ] Feature docs organized by area in `docs/features/`
- [ ] `docs/README.md` created with navigation
- [ ] `_archive/README.md` created with explanation
- [ ] `CLAUDE.md` updated with new docs structure
- [ ] All files retain proper markdown formatting
- [ ] No broken internal links (verify with grep or link checker)

---

## Benefits

### Before

- 19 files cluttered in root
- No clear separation between active and historical
- Hard to find current documentation
- Mix of completed and active work

### After

- 3 files in root (clean entry point)
- Clear archive for completed work
- Organized docs/ folder with logical hierarchy
- Easy navigation via docs/README.md
- Historical context preserved but out of the way

---

## Estimated Time

**Total migration time:** 45-60 minutes

| Phase                 | Time   |
| --------------------- | ------ |
| Create structure      | 5 min  |
| Move audits           | 5 min  |
| Move planning         | 3 min  |
| Move prompts          | 5 min  |
| Move Governor's Glass | 2 min  |
| Move reference        | 3 min  |
| Organize docs/        | 10 min |
| Create index          | 5 min  |
| Update CLAUDE.md      | 5 min  |
| Create archive README | 5 min  |
| Verification          | 10 min |

---

_Documentation audit completed by Dr. Kai Nakamura, January 29, 2026_
