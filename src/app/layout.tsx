import type { Metadata } from "next";
import { Lora, Inter, Caveat } from "next/font/google";
import "./globals.css";

// Display / serif font for big headings
const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Clean readable body font
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Handwritten-style font for nav / small labels
const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "learn genAI — your personal AI learning tracker",
  description:
    "A calm, minimal learning tracker for generative AI and its mathematical foundations. Track your progress through NPTEL courses and curated resources.",
  keywords: [
    "generative AI",
    "learning tracker",
    "NPTEL",
    "machine learning",
    "deep learning",
    "LLMs",
  ],
  openGraph: {
    title: "learn genAI",
    description: "Your personal AI learning tracker",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F5F2E8] text-[#29391D] antialiased">
        {children}
      </body>
    </html>
  );
}
