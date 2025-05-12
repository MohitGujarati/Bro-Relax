
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// Removed GeistMono import as it caused issues
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans;
// Using GeistSans for mono as well to fix build error
const geistMono = GeistSans;

export const metadata: Metadata = {
  title: 'Zenith Zone', // Updated Title
  description: 'Your space to relax and recharge.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add 'dark' class here to default to dark mode
    <html lang="en" className="dark">
      {/* Applied geistSans variable only */}
      <body className={`${geistSans.variable} font-sans antialiased bg-background text-foreground`}> {/* Ensure base styles apply */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
