import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDocument, getDocumentSlugs, getRespondingDocuments } from '@/lib/evidence/loader'
import { DocumentViewerClient } from '@/components/evidence/DocumentViewerClient'
import { ConnectionsPanel } from '@/components/evidence'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getDocumentSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const document = await getDocument(slug)

  if (!document) {
    return { title: 'Document Not Found' }
  }

  return {
    title: `${document.title} | Evidence Room`,
    description: `Primary source document: ${document.title} (${document.date})`,
  }
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params
  const document = await getDocument(slug)

  if (!document) {
    notFound()
  }

  // Fetch related documents for conversation threading
  const [respondingDocs, respondedToDoc] = await Promise.all([
    getRespondingDocuments(document.id),
    document.responds_to ? getDocument(document.responds_to) : Promise.resolve(null),
  ])

  return (
    <div className="min-h-screen bg-midnight">
      <div className="container mx-auto px-4 py-12">
        {/* Back link */}
        <nav className="mb-8">
          <Link
            href="/evidence"
            className="text-sm text-gold-leaf/60 hover:text-gold-leaf transition-colors"
          >
            ← Back to Evidence Room
          </Link>
        </nav>

        <DocumentViewerClient document={document} />

        {/* Conversation Threading */}
        <div className="max-w-3xl mx-auto mt-8">
          <ConnectionsPanel
            document={document}
            respondedToDocument={
              respondedToDoc
                ? { id: respondedToDoc.id, title: respondedToDoc.title, date: respondedToDoc.date }
                : null
            }
            respondingDocuments={respondingDocs.map((d) => ({
              id: d.id,
              title: d.title,
              date: d.date,
            }))}
          />
        </div>
      </div>
    </div>
  )
}
