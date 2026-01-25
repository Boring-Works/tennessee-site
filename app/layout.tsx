import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export const metadata: Metadata = {
  title: {
    default: "Tennessee Starts Here | Rocky Mount State Historic Site",
    template: "%s | Tennessee Starts Here",
  },
  description:
    "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
  metadataBase: new URL("https://tennesseestartshere.com"),
  openGraph: {
    title: "Tennessee Starts Here | Rocky Mount State Historic Site",
    description:
      "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
    url: "https://tennesseestartshere.com",
    siteName: "Tennessee Starts Here",
    // PRE-LAUNCH: Replace og-image.svg with a real 1200x630 JPG
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennessee Starts Here | Rocky Mount State Historic Site",
    description:
      "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // PRE-LAUNCH: Replace SVG favicons with PNG versions
  // Use https://realfavicongenerator.net/ to generate from a source image
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Analytics />
        <Navigation />
        <main id="main-content" className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
