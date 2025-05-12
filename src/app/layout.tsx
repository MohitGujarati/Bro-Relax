
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// Removed GeistMono import as it caused issues
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans;
// Using GeistSans for mono as well to fix build error
const geistMono = GeistSans;

export const metadata: Metadata = {
  title: 'Career Navigator', // Updated Title
  description: 'Your AI-powered guide to navigating the job market, with a space to relax.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applied geistSans variable only */}
      <body className={`${geistSans.variable} font-sans antialiased bg-background text-foreground`}> {/* Ensure base styles apply */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
