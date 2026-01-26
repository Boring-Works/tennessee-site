import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
  weight: ["400"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

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
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennessee Starts Here | Rocky Mount State Historic Site",
    description:
      "Where Tennessee's government began. Join us for America 250 and Tennessee 230 programming at Rocky Mount State Historic Site in Piney Flats, TN.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${cinzel.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
