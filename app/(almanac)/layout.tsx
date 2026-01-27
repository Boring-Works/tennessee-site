import Link from 'next/link'
import './almanac-layout.css'

export default function AlmanacLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Link
        href="/"
        className="almanac-home-button"
        aria-label="Return to Rocky Mount"
        title="Return to Rocky Mount"
      >
        <span className="home-button-text">RM</span>
      </Link>
      {children}
    </>
  )
}
