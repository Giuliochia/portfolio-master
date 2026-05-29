import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giulio Chiaramonte — Portfolio",
  description:
    "Portfolio di Giulio Chiaramonte — sviluppatore frontend specializzato in applicazioni web moderne con React, Next.js e TypeScript.",
  authors: [{ name: "Giulio Chiaramonte" }],
  keywords: ["portfolio", "frontend developer", "React", "Next.js", "TypeScript"],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Giulio Chiaramonte — Portfolio",
    description: "Applicazioni web moderne con React, Next.js e TypeScript.",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "GC Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#121214] text-[#f0f0f2] antialiased">
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
