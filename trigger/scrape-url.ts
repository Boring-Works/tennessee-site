import { task, logger } from '@trigger.dev/sdk'

/**
 * Scrape URL Job
 * Downloads a document from a URL and stores it for processing
 */
export const scrapeUrl = task({
  id: 'scrape-url',
  maxDuration: 120, // 2 minutes max
  retry: {
    maxAttempts: 3,
  },
  run: async (payload: { url: string; sourceType: 'primary' | 'secondary' | 'tertiary' }) => {
    const { url, sourceType } = payload

    logger.info('Starting URL scrape', { url, sourceType })

    // TODO: Implement actual scraping
    // 1. Fetch the URL
    // 2. Detect content type (PDF, image, HTML)
    // 3. Download to MinIO/R2
    // 4. Create draft document record
    // 5. Trigger parse-pdf if PDF

    // Placeholder for now
    const result = {
      url,
      sourceType,
      status: 'downloaded',
      storagePath: `raw/${Date.now()}-document.pdf`,
      contentType: 'application/pdf',
      downloadedAt: new Date().toISOString(),
    }

    logger.info('URL scraped successfully', result)

    return result
  },
})
