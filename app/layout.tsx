import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Space",
  description: "Your content production machine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#000000', margin: 0 }}>

        {/* Navigation Bar */}
        <nav style={{
          backgroundColor: '#0d0d1a',
          borderBottom: '1px solid #a855f7',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#a855f7',
            textDecoration: 'none',
          }}>
            AI Space
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem' }}>
              Home
            </Link>
            <Link href="/content" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem' }}>
              Content Generator
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}