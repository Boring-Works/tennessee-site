import Link from 'next/link'

interface ClaimProps {
  doc: string
  passage?: string
  children: React.ReactNode
}

/**
 * Claim component - creates inline citation links to source documents.
 * Renders as subtle dotted underline that turns gold on hover.
 * Used for verifiable historical claims that link to primary sources.
 */
export function Claim({ doc, passage, children }: ClaimProps) {
  const href = passage ? `/evidence/documents/${doc}#${passage}` : `/evidence/documents/${doc}`

  return (
    <Link
      href={href}
      className="border-b border-dotted border-current/50 hover:border-solid hover:border-gold-leaf hover:text-gold-leaf transition-colors duration-200"
      title="View source document"
    >
      {children}
    </Link>
  )
}
