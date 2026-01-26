import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ScrollProgress from "@/components/ScrollProgress";
import Analytics from "@/components/Analytics";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Analytics />
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
