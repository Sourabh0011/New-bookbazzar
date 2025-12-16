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
  title: "Book Bazzar",
  description: "Buy, sell, and explore books at Book Bazzar",

  openGraph: {
    title: "Book Bazzar",
    description: "Buy, sell, and explore books at Book Bazzar",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Bazzar",
    description: "Buy, sell, and explore books at Book Bazzar",
  },
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
