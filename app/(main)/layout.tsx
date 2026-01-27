import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import ScrollProgress from '@/components/ScrollProgress'
import Analytics from '@/components/Analytics'

// Dynamic import for Footer (code splitting, SSR enabled)
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => (
    <footer
      style={{
        minHeight: '400px',
        background: 'var(--primary)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
  ),
})

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Analytics />
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
