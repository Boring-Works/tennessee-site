import type { Metadata } from 'next'
import { ProgramsContent } from './ProgramsContent'

export const metadata: Metadata = {
  title: 'Programs | Rocky Mount State Historic Site',
  description:
    'Hands-on workshops, exclusive tours, and educational programs at Rocky Mount. Blacksmithing, hearth cooking, twilight tours, and more.',
  openGraph: {
    title: 'Programs & Workshops | Tennessee Starts Here',
    description:
      'Experience history hands-on with blacksmithing workshops, hearth cooking classes, twilight tours, and exclusive behind-the-scenes experiences.',
    url: 'https://tennesseestartshere.com/programs',
  },
}

export default function ProgramsPage() {
  return <ProgramsContent />
}
