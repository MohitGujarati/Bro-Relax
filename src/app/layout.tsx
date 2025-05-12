
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional: if you want to use it as a CSS variable
});

export const metadata: Metadata = {
  title: 'Zenith Zone',
  description: 'Your space to relax and recharge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}> {/* Apply Inter font class and dark mode */}
      <body className={`font-sans antialiased bg-background text-foreground`}> {/* Use 'font-sans' which will pick up Inter */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
