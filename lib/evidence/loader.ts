/**
 * Document Loader for Evidence Transparency Engine
 *
 * Loads MDX documents from the content/documents directory,
 * parses frontmatter using gray-matter, and extracts passage tags.
 */

import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  Document,
  DocumentFrontmatter,
  DocumentVerification,
  Passage,
  VerificationStatus,
  DocumentContentType,
} from './types'

// Path to documents directory
const DOCUMENTS_DIR = path.join(process.cwd(), 'content', 'documents')

// =============================================================================
// Passage Extraction
// =============================================================================

/**
 * Extract passages from document content
 *
 * Finds all <passage id="...">...</passage> tags and converts them to Passage objects.
 */
function extractPassages(content: string, documentId: string): Passage[] {
  const passages: Passage[] = []

  // Match <passage id="...">...</passage> tags
  // Handles both single-line and multi-line passages
  const passageRegex = /<passage\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/passage>/g

  let match
  while ((match = passageRegex.exec(content)) !== null) {
    const anchor = match[1]
    const text = match[2].trim()

    // Calculate line numbers
    const startIndex = match.index
    const endIndex = startIndex + match[0].length

    // Count lines before start
    const textBeforeStart = content.slice(0, startIndex)
    const startLine = textBeforeStart.split('\n').length

    // Count lines to end
    const textBeforeEnd = content.slice(0, endIndex)
    const endLine = textBeforeEnd.split('\n').length

    passages.push({
      id: `${documentId}#${anchor}`,
      document_id: documentId,
      anchor,
      text,
      line_range: [startLine, endLine],
    })
  }

  return passages
}

// =============================================================================
// Document Loading Functions
// =============================================================================

/**
 * Get all document slugs for static generation
 *
 * Returns an array of document slugs (filenames without extension)
 */
export async function getDocumentSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(DOCUMENTS_DIR)
    return files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx?$/, ''))
  } catch (error) {
    // Directory doesn't exist yet
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Get a single document by slug
 *
 * @param slug - The document slug (filename without extension)
 * @returns The parsed Document or null if not found
 */
export async function getDocument(slug: string): Promise<Document | null> {
  // Try both .md and .mdx extensions
  const extensions = ['.md', '.mdx']

  for (const ext of extensions) {
    const filePath = path.join(DOCUMENTS_DIR, `${slug}${ext}`)

    try {
      const rawContent = await fs.readFile(filePath, 'utf-8')

      // Parse frontmatter using gray-matter
      const parsed = matter(rawContent)
      const frontmatter = parsed.data as DocumentFrontmatter
      const content = parsed.content

      // Extract passages from content
      const passages = extractPassages(rawContent, frontmatter.id)

      // Build verification object with defaults
      const verification: DocumentVerification = {
        status: (frontmatter.verification?.status || 'under-review') as VerificationStatus,
        source_count: frontmatter.verification?.source_count || 1,
        method: frontmatter.verification?.method,
        notes: frontmatter.verification?.notes,
      }

      // Build the Document object
      const document: Document = {
        id: frontmatter.id,
        title: frontmatter.title,
        date: String(frontmatter.date),
        content_type: frontmatter.content_type as DocumentContentType,
        source: frontmatter.source,
        source_url: frontmatter.source_url,
        collection: frontmatter.collection,
        author: frontmatter.author,
        recipient: frontmatter.recipient,
        people_mentioned: frontmatter.people_mentioned || [],
        responds_to: frontmatter.responds_to,
        responses: frontmatter.responses,
        verification,
        content,
        passages,
      }

      return document
    } catch (error) {
      // File not found, try next extension
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
  }

  return null
}

/**
 * Get all documents
 *
 * Loads and parses all document files from the content directory
 */
export async function getAllDocuments(): Promise<Document[]> {
  const slugs = await getDocumentSlugs()

  const documents = await Promise.all(
    slugs.map(async (slug) => {
      const doc = await getDocument(slug)
      return doc
    })
  )

  // Filter out any null results
  return documents.filter((doc): doc is Document => doc !== null)
}

/**
 * Get documents by collection
 *
 * @param collection - The collection ID to filter by
 */
export async function getDocumentsByCollection(collection: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.collection === collection)
}

/**
 * Get documents by author
 *
 * @param authorId - The author's person ID
 */
export async function getDocumentsByAuthor(authorId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter((doc) => doc.author === authorId)
}

/**
 * Get documents mentioning a person
 *
 * @param personId - The person's ID to search for
 */
export async function getDocumentsMentioning(personId: string): Promise<Document[]> {
  const allDocs = await getAllDocuments()
  return allDocs.filter(
    (doc) =>
      doc.author === personId ||
      doc.recipient === personId ||
      doc.people_mentioned.includes(personId)
  )
}

/**
 * Get a specific passage by its compound ID
 *
 * @param passageId - The passage ID in format "documentId#anchor"
 */
export async function getPassage(passageId: string): Promise<Passage | null> {
  const [documentId, anchor] = passageId.split('#')

  if (!documentId || !anchor) {
    return null
  }

  const doc = await getDocument(documentId)

  if (!doc) {
    return null
  }

  return doc.passages.find((p) => p.anchor === anchor) || null
}
