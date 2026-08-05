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
  title: "Zenkai Media — High-Retention Video Editing & SMM Studio",
  description: "High-retention video editing, vertical Reels & Shorts, and end-to-end Social Media Management (SMM) for creators and ambitious brands.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Zenkai Media — High-Retention Video Editing & SMM Studio",
    description: "High-impact video edits, vertical reels, thumbnails, and channel growth strategy.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "Zenkai Media — Video Editing & SMM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenkai Media — High-Retention Video Editing & SMM Studio",
    description: "High-impact video edits, vertical reels, thumbnails, and channel growth strategy.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
