import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Harel Coman — personal site. Coming soon.",
  openGraph: {
    title: "harelcoman",
    description: "Harel Coman — personal site. Coming soon.",
    url: "/",
    siteName: "harelcoman",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "harelcoman",
    description: "Harel Coman — personal site. Coming soon.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
