import { task, logger } from '@trigger.dev/sdk'

/**
 * Parse PDF Job
 * Extracts text and metadata from a PDF using OCR and AI
 */
export const parsePdf = task({
  id: 'parse-pdf',
  maxDuration: 300, // 5 minutes for large PDFs
  retry: {
    maxAttempts: 2,
  },
  run: async (payload: { storagePath: string; documentId: string }) => {
    const { storagePath, documentId } = payload

    logger.info('Starting PDF parse', { storagePath, documentId })

    // TODO: Implement actual parsing
    // 1. Download PDF from storage
    // 2. Run OCR (using Joyce Research patterns)
    // 3. Send to Gemini Flash for metadata extraction
    // 4. Update document record with extracted data
    // 5. Set status to 'pending-review'

    // Placeholder extraction result
    const result = {
      documentId,
      storagePath,
      extractedText: '[PDF text will be extracted here]',
      metadata: {
        title: 'Extracted Title',
        date: null,
        datePrecision: 'unknown',
        author: null,
        documentType: 'unknown',
        summary: null,
        keyPeople: [],
        keyPlaces: [],
        rockyMountRelevance: 'unknown',
        cherokeeContent: false,
        confidence: {
          overall: 0,
          date: 0,
          author: 0,
        },
      },
      status: 'pending-review',
      parsedAt: new Date().toISOString(),
    }

    logger.info('PDF parsed successfully', { documentId, confidence: result.metadata.confidence.overall })

    return result
  },
})
