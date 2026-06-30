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
  title: "Premium E-Commerce",
  description: "Modern and minimalist product discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      {/* Global styles applied here using Tailwind utility classes.
        - bg-surface: sets the elegant off-white background
        - text-ink: sets the primary dark text
        - antialiased: smooths out font rendering
        - selection:*: styles the text highlight color elegantly
      */}
      <body className="min-h-full flex flex-col bg-surface text-ink antialiased selection:bg-ink selection:text-surface-50">
        {children}
      </body>
    </html>
  );
}