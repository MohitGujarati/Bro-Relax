import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Relax Bro',
  description: 'Your space to relax and recharge.',
  icons: {
    icon: '/maxcat.jpg',          // Fallback for most browsers
    shortcut: '/maxcat.jpg',
    apple: '/maxcat.jpg',
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Relax Bro',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
<head>
  <link rel="icon" href="/maxcat.jpg" />
  
</head>

      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
