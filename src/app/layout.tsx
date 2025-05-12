import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// Removed GeistMono import as it caused issues
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans;
// Using GeistSans for mono as well to fix build error
const geistMono = GeistSans; 

export const metadata: Metadata = {
  title: 'Zenith Zone - Career Navigator',
  description: 'Your space to unwind and recharge, part of Career Navigator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applied geistSans variable only */}
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
