export type DocumentCategory = 'correspondence' | 'treaties' | 'proclamations' | 'cherokee-sources'

export type DocumentBadge =
  | 'Presidential'
  | 'Cabinet'
  | 'Treaty'
  | 'Proclamation'
  | 'Cherokee Source'

export interface DocumentSource {
  name: string
  url: string
}

export interface RelatedDocument {
  slug: string
  title: string
}

export interface ChiefBiography {
  cherokeeName: string
  englishName: string
  alternateNames?: string
  birthDeath?: string
  role: string
  biography: string
}

export interface TreatySignatory {
  number: number
  cherokeeName: string
  englishName?: string
}

export interface HistoricalDocument {
  slug: string
  title: string
  date: string
  dateDisplay: string
  category: DocumentCategory
  badge: DocumentBadge
  author?: string
  recipient?: string
  keyQuote?: string
  keyQuoteAttribution?: string
  whyThisMatters: string
  content: string // Full document text as HTML or markdown
  sources: DocumentSource[]
  citation: string
  relatedDocuments?: RelatedDocument[]
  // For Cherokee signatories document
  chiefBiographies?: ChiefBiography[]
  signatories?: TreatySignatory[]
}
