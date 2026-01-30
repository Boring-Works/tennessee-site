# Evidence Room: CMS Database Schema

**For:** Future CMS Integration (Sanity, Strapi, or PostgreSQL)
**Reference:** EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md

This document provides schema templates for implementing a Content Management System for the Evidence Room.

---

## Option 1: Sanity Studio Schema (Recommended for Phase 3)

Sanity is headless, stores to JSON, integrates with Git. Ideal for museum use.

### Core Document Schemas

#### `treatySigner.ts`

```typescript
export default {
  name: 'treatySigner',
  title: 'Treaty Signer (1791 Holston)',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID (URL slug)',
      type: 'slug',
      options: { source: 'englishName' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cherokeeName',
      title: 'Cherokee Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'englishName',
      title: 'English Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pronunciation',
      title: 'Pronunciation Guide',
      type: 'string',
      description: 'e.g., "SKWOL-uh-CUT-uh"',
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'blockContent', // Portable text
    },
    {
      name: 'lifespan',
      title: 'Life Dates',
      type: 'object',
      fields: [
        {
          name: 'birth',
          title: 'Birth Year',
          type: 'string',
          description: 'e.g., "~1740"',
        },
        {
          name: 'death',
          title: 'Death Year',
          type: 'string',
        },
        {
          name: 'uncertainty',
          title: 'Date Certainty',
          type: 'string',
          options: {
            list: [
              { title: 'Exact', value: 'exact' },
              { title: 'Approximate', value: 'approximate' },
              { title: 'Estimated', value: 'estimated' },
            ],
          },
        },
      ],
    },
    {
      name: 'affiliation',
      title: 'Tribal Affiliation',
      type: 'object',
      fields: [
        {
          name: 'nation',
          title: 'Nation',
          type: 'string',
          initialValue: 'Cherokee Nation',
        },
        {
          name: 'band',
          title: 'Band/Region',
          type: 'string',
          description: 'e.g., "Overhill Cherokee", "Lowland Cherokee"',
        },
        {
          name: 'town',
          title: 'Home Town',
          type: 'string',
        },
      ],
    },
    {
      name: 'descendants',
      title: 'Modern Descendants',
      type: 'object',
      fields: [
        {
          name: 'cherokeeNation',
          title: 'Cherokee Nation of Oklahoma',
          type: 'boolean',
        },
        {
          name: 'easternBand',
          title: 'Eastern Band of Cherokee Indians',
          type: 'boolean',
        },
        {
          name: 'keetoowah',
          title: 'United Keetoowah Band',
          type: 'boolean',
        },
        {
          name: 'notes',
          title: 'Notes on Lineage',
          type: 'text',
        },
      ],
    },
    {
      name: 'sources',
      title: 'Historical Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sourceType',
              title: 'Source Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Manuscript', value: 'manuscript' },
                  { title: 'Published Work', value: 'published' },
                  { title: 'Academic Article', value: 'academic' },
                  { title: 'Museum Collection', value: 'museum' },
                ],
              },
            },
            {
              name: 'repository',
              title: 'Repository/Institution',
              type: 'string',
            },
            {
              name: 'collection',
              title: 'Collection Name',
              type: 'string',
            },
            {
              name: 'referenceNumber',
              title: 'Reference/Call Number',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Document/Work Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL (if digitized)',
              type: 'url',
            },
            {
              name: 'note',
              title: 'Note',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured in Timeline',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'verification',
      title: 'Verification Status',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              { title: 'Verified', value: 'verified' },
              { title: 'Under Review', value: 'review' },
              { title: 'Unverified', value: 'unverified' },
            ],
          },
        },
        {
          name: 'verifiedBy',
          title: 'Verified By (Name/Institution)',
          type: 'string',
        },
        {
          name: 'verifiedDate',
          title: 'Verification Date',
          type: 'datetime',
        },
        {
          name: 'confidenceLevel',
          title: 'Confidence Level',
          type: 'string',
          options: {
            list: [
              { title: 'High', value: 'high' },
              { title: 'Medium', value: 'medium' },
              { title: 'Low', value: 'low' },
            ],
          },
        },
        {
          name: 'notes',
          title: 'Verification Notes',
          type: 'text',
        },
      ],
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'englishName',
      subtitle: 'role',
    },
  },
}
```

#### `primaryQuote.ts`

```typescript
export default {
  name: 'primaryQuote',
  title: 'Primary Quote',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'slug',
      options: { source: 'shortId' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Full Quote Text',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: 'shortText',
      title: 'Short Quote (for summaries)',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date Written',
      type: 'date',
    },
    {
      name: 'source',
      title: 'Source Citation',
      type: 'object',
      fields: [
        {
          name: 'repository',
          title: 'Repository/Institution',
          type: 'string',
        },
        {
          name: 'collection',
          title: 'Collection Name',
          type: 'string',
        },
        {
          name: 'referenceNumber',
          title: 'Reference Number',
          type: 'string',
        },
        {
          name: 'publication',
          title: 'Publication Info',
          type: 'text',
          description: 'Full publication citation if published',
        },
        {
          name: 'url',
          title: 'Source URL',
          type: 'url',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'context',
      title: 'Historical Context',
      type: 'blockContent',
      description: 'Explain significance and background',
    },
    {
      name: 'theme',
      title: 'Theme/Topic',
      type: 'string',
      options: {
        list: [
          { title: 'Governance', value: 'governance' },
          { title: 'Economic Development', value: 'economy' },
          { title: 'Cherokee Relations', value: 'cherokee' },
          { title: 'Settlement & Life', value: 'settlement' },
          { title: 'Federal Authority', value: 'federal' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured on Evidence Page',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'relatedDocuments',
      title: 'Related Documents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'evidenceDocument' }] }],
    },
    {
      name: 'relatedPeople',
      title: 'Related People',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'treatySigner' }] }],
    },
    {
      name: 'verification',
      title: 'Verification',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Verification Status',
          type: 'string',
          options: {
            list: [
              { title: 'Verified', value: 'verified' },
              { title: 'Under Review', value: 'review' },
              { title: 'Unverified', value: 'unverified' },
            ],
          },
        },
        {
          name: 'verifiedBy',
          title: 'Verified By',
          type: 'string',
        },
        {
          name: 'verifiedDate',
          title: 'Date Verified',
          type: 'datetime',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'shortText',
      subtitle: 'author',
    },
  },
}
```

#### `sourceRepository.ts`

```typescript
export default {
  name: 'sourceRepository',
  title: 'Source Repository',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Repository Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institution/Organization',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Repository Type',
      type: 'string',
      options: {
        list: [
          { title: 'Government Archive', value: 'government-archive' },
          { title: 'Academic Archive', value: 'academic-archive' },
          { title: 'Academic Reference', value: 'academic-reference' },
          { title: 'Primary Source Collection', value: 'primary-source' },
          { title: 'Historic Site', value: 'historic-site' },
          { title: 'Museum', value: 'museum' },
        ],
      },
    },
    {
      name: 'authority',
      title: 'Authority Level',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Original Documents)', value: 'primary' },
          { title: 'Secondary (Published Works)', value: 'secondary' },
          { title: 'Academic/Scholarly', value: 'academic' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverage',
      title: 'Coverage/Collections',
      type: 'text',
      description: 'What documents/time periods this repository covers',
    },
    {
      name: 'relevantCollections',
      title: 'Relevant Collections',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific collections related to Rocky Mount/Tennessee',
    },
    {
      name: 'lastVerified',
      title: 'Last Verified Working',
      type: 'date',
    },
    {
      name: 'verificationNote',
      title: 'Verification Note',
      type: 'text',
      description: 'Any issues with URLs or content',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'institution',
    },
  },
}
```

---

## Option 2: PostgreSQL Schema (For Full Backend)

If implementing a traditional backend with database:

```sql
-- Treaty Signers
CREATE TABLE treaty_signers (
  id VARCHAR(100) PRIMARY KEY,
  cherokee_name VARCHAR(255) NOT NULL,
  english_name VARCHAR(255) NOT NULL,
  pronunciation VARCHAR(255),
  role TEXT NOT NULL,
  biography TEXT,
  birth_year VARCHAR(50),
  death_year VARCHAR(50),
  date_uncertainty VARCHAR(20),
  tribe VARCHAR(255),
  band VARCHAR(255),
  hometown VARCHAR(255),
  cherokee_nation BOOLEAN,
  eastern_band BOOLEAN,
  keetoowah BOOLEAN,
  featured BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(20),
  verified_by VARCHAR(255),
  verified_date TIMESTAMP,
  confidence_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Primary Quotes
CREATE TABLE primary_quotes (
  id VARCHAR(100) PRIMARY KEY,
  full_text TEXT NOT NULL,
  short_text VARCHAR(500),
  author VARCHAR(255) NOT NULL,
  date_written DATE,
  source_repository VARCHAR(255),
  source_collection VARCHAR(255),
  source_reference VARCHAR(255),
  source_url VARCHAR(500),
  context TEXT,
  theme VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(20),
  verified_by VARCHAR(255),
  verified_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Source Repositories
CREATE TABLE source_repositories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  institution VARCHAR(255),
  url VARCHAR(500) NOT NULL,
  type VARCHAR(50),
  authority VARCHAR(20),
  description TEXT NOT NULL,
  coverage TEXT,
  last_verified DATE,
  verification_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Evidence Sources (junction table)
CREATE TABLE evidence_sources (
  id SERIAL PRIMARY KEY,
  evidence_type VARCHAR(50) NOT NULL, -- 'treaty_signer', 'quote', etc.
  evidence_id VARCHAR(100) NOT NULL,
  source_id VARCHAR(100) NOT NULL,
  reference_number VARCHAR(255),
  page_range VARCHAR(50),
  note TEXT,
  FOREIGN KEY (source_id) REFERENCES source_repositories(id),
  UNIQUE(evidence_type, evidence_id, source_id)
);

-- Timeline Events
CREATE TABLE timeline_events (
  id VARCHAR(100) PRIMARY KEY,
  date_of_event DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  document_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (date_of_event),
  INDEX idx_type (event_type)
);

-- Related Entities
CREATE TABLE related_entities (
  id SERIAL PRIMARY KEY,
  entity_type_1 VARCHAR(50),
  entity_id_1 VARCHAR(100),
  entity_type_2 VARCHAR(50),
  entity_id_2 VARCHAR(100),
  relationship_type VARCHAR(50), -- 'mentions', 'authored', 'participated', etc.
  note TEXT,
  UNIQUE(entity_id_1, entity_id_2, relationship_type)
);
```

---

## Option 3: Supabase Integration (Recommended for Cody's Stack)

Supabase uses PostgreSQL + provides GUI. Best compromise:

```typescript
// lib/supabase/evidence.ts

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Get treaty signers
export async function getTreatySigners() {
  const { data, error } = await supabase.from('treaty_signers').select('*').order('english_name')

  if (error) throw error
  return data
}

// Get quotes with sources
export async function getPrimaryQuotes() {
  const { data, error } = await supabase
    .from('primary_quotes')
    .select(
      `
      *,
      sources: evidence_sources(
        source_id,
        source_repositories(*)
      )
    `
    )
    .order('date_written', { ascending: false })

  if (error) throw error
  return data
}

// Get related items for a specific entity
export async function getRelatedItems(entityId: string) {
  const { data, error } = await supabase
    .from('related_entities')
    .select('*')
    .or(`entity_id_1.eq.${entityId},entity_id_2.eq.${entityId}`)

  if (error) throw error
  return data
}
```

---

## Migration Path

### Week 1-2: JSON Foundation (Current)

- Create data files (already done with Phase 1)
- TypeScript types in place
- React components import from JSON

### Week 3-4: Sanity Studio Setup

```bash
npm install @sanity/cli
npm install @sanity/studio
sanity init # generates new studio project
```

### Week 5-6: Content Migration

- Populate Sanity with existing JSON data
- Train staff on CMS interface
- Set up Git export

### Week 7-8: API Integration

- Connect Next.js to Sanity API
- Build preview mode
- Setup webhooks for rebuilds

---

## Editorial Workflow (Sanity Example)

```typescript
// Define published document version
export const publishingWorkflow = {
  drafts: true,
  scheduled: true,
}

// Desk structure with review process
export const deskStructure = (S) =>
  S.list()
    .title('Rocky Mount Evidence')
    .items([
      S.listItem()
        .title('Treaty Signers (Review)')
        .schemaType('treatySigner')
        .child(
          S.documentTypeList('treatySigner').filter(
            '_type == "treatySigner" && verification.status == "review"'
          )
        ),
      S.listItem()
        .title('Primary Quotes (Verified)')
        .schemaType('primaryQuote')
        .child(
          S.documentTypeList('primaryQuote').filter(
            '_type == "primaryQuote" && verification.status == "verified"'
          )
        ),
      S.listItem()
        .title('Source Repositories')
        .schemaType('sourceRepository')
        .child(S.documentTypeList('sourceRepository')),
    ])
```

---

## Validation Rules

Each CMS should enforce:

```typescript
// Validation examples
{
  "treatySigner": {
    "required": ["id", "cherokeeName", "englishName", "role"],
    "unique": ["id", "englishName"],
    "immutable": ["id"] // Once created, cannot change
  },
  "primaryQuote": {
    "required": ["id", "text", "author", "date", "source"],
    "minLength": { "text": 50 },
    "dateRange": { "min": "1790-01-01", "max": "1796-12-31" }
  },
  "sourceRepository": {
    "required": ["id", "name", "url", "type"],
    "uniqueUrl": true,
    "formats": { "url": "https://...." }
  }
}
```

---

## Deployment Considerations

### For Sanity

```json
// sanity.json
{
  "api": {
    "projectId": "your-project-id",
    "dataset": "production"
  },
  "plugins": ["@sanity/default-login"]
}
```

### For Supabase

- Use Row Level Security (RLS) for editorial permissions
- Setup backup schedule
- Enable webhooks for Next.js revalidation

### For PostgreSQL

- Use migrations (Drizzle ORM, Prisma)
- Setup replication for disaster recovery
- Regular backups to S3

---

## Reference

- **Sanity Docs:** https://www.sanity.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Strapi Docs:** https://docs.strapi.io

See **EVIDENCE-DATA-ARCHITECTURE-ANALYSIS.md** for full context.
