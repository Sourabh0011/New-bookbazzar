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
  metadataBase: new URL("https://www.bookbazzar.in"),

  title: {
    default: "Book Bazzar - Buy, Sell & Discover Books Online",
    template: "%s | Book Bazzar",
  },

  description:
    "Book Bazzar is an online marketplace to buy, sell, and discover new and used books at the best prices.",

  keywords: [
    "book bazzar",
    "buy books online",
    "sell books online",
    "used books",
    "second hand books",
    "online book store",
    "book marketplace",
  ],

  authors: [{ name: "Book Bazzar Team" }],
  creator: "Book Bazzar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Book Bazzar - Buy, Sell & Discover Books Online",
    description:
      "Buy and sell new or used books online. Discover best deals on Book Bazzar.",
    url: "https://www.bookbazzar.in",
    siteName: "Book Bazzar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book Bazzar - Online Book Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Bazzar - Buy, Sell & Discover Books Online",
    description:
      "Buy and sell books online at the best prices on Book Bazzar.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://www.bookbazzar.in",
  },

  category: "Books",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
