import { notFound } from 'next/navigation'
import { getDocument, getDocumentSlugs } from '@/lib/evidence/loader'
import { DocumentViewerClient } from '@/components/evidence/DocumentViewerClient'

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

  return (
    <div className="min-h-screen bg-midnight">
      <div className="container mx-auto px-4 py-12">
        {/* Back link */}
        <nav className="mb-8">
          <a
            href="/evidence"
            className="text-sm text-gold-leaf/60 hover:text-gold-leaf transition-colors"
          >
            ← Back to Evidence Room
          </a>
        </nav>

        <DocumentViewerClient document={document} />
      </div>
    </div>
  )
}
