import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lecture Series | Rocky Mount State Historic Site',
  description:
    'Join us for the 2026 Commemorative Lecture Series exploring the founding of Tennessee and the Southwest Territory.',
  openGraph: {
    title: 'Lecture Series | Tennessee Starts Here',
    description:
      'Join us for the 2026 Commemorative Lecture Series exploring the founding of Tennessee and the Southwest Territory.',
    url: 'https://tennesseestartshere.com/lectures',
  },
}

export default function LecturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
