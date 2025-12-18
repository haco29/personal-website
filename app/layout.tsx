import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harelcoman.dev"),
  title: {
    default: "harelcoman",
    template: "%s · harelcoman",
  },
  description:
    "Harel Coman — Staff Engineer & AI Lead. Frontend architecture, UI infrastructure, performance, accessibility, and AI-driven developer experience.",
  openGraph: {
    title: "harelcoman",
    description:
      "Harel Coman — Staff Engineer & AI Lead. Frontend architecture, UI infrastructure, performance, accessibility, and AI-driven developer experience.",
    url: "/",
    siteName: "harelcoman",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Harel Coman",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "harelcoman",
    description:
      "Harel Coman — Staff Engineer & AI Lead. Frontend architecture, UI infrastructure, performance, accessibility, and AI-driven developer experience.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harel Coman",
    url: "https://harelcoman.dev/",
    image: "https://harelcoman.dev/opengraph-image",
    sameAs: [
      "https://github.com/haco29",
      "https://www.linkedin.com/in/harel-coman-16703289/",
      "https://dev.to/haco29/series/34035",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "harelcoman",
    url: "https://harelcoman.dev/",
    publisher: {
      "@type": "Person",
      name: "Harel Coman",
    },
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd, personJsonLd]) }}
        />
        <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
          <Nav />
          <main className="pb-16">{children}</main>
          <Footer />
          <ChatWidget />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
