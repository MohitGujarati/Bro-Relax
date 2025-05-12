// src/app/relax/layout.tsx
'use client';

import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form';
import BottomNavigation from '@/components/layout/bottom-navigation';
import { ArrowLeft, ImagePlus } from 'lucide-react';

interface RelaxLayoutProps {
  children: ReactNode;
}

// Helper function to get title from pathname
const getTitleFromPathname = (pathname: string): string => {
  if (pathname.includes('/memes') || pathname === '/relax') return 'Meme Feed';
  if (pathname.includes('/quotes')) return 'Inspiration';
  if (pathname.includes('/breathe')) return 'Guided Breathing';
  if (pathname.includes('/profile')) return 'Community Vibes';
  return 'Zenith Zone'; // Fallback title
};

export default function RelaxLayout({ children }: RelaxLayoutProps) {
  const [isMemeDialogOpen, setIsMemeDialogOpen] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const pathname = usePathname(); // Get current pathname
  const [pageTitle, setPageTitle] = useState('Zenith Zone'); // State for dynamic title

  useEffect(() => {
    // Update timestamp on client mount
    setCurrentTimestamp(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    // Update title whenever pathname changes
    setPageTitle(getTitleFromPathname(pathname));
  }, [pathname]);


  const handleMemeSubmissionSuccess = () => {
    setIsMemeDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header - Glassmorphic */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/30">
        {/* Slightly adjusted blur and border */}
        <div className="container mx-auto h-14 px-4 flex items-center justify-between max-w-5xl">
          <Link href="/" aria-label="Back to Home">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-foreground tracking-tight">
            {pageTitle} {/* Dynamic Page Title */}
          </h1>
          <Dialog open={isMemeDialogOpen} onOpenChange={setIsMemeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Share a Meme" className="text-muted-foreground hover:text-foreground transition-colors">
                <ImagePlus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            {/* DialogContent inherits glassmorphism from ui/card */}
            <DialogContent className="sm:max-w-[450px] shadow-xl rounded-lg">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-foreground text-xl">Share a Meme</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm pt-1">
                  Got a funny or uplifting image? Share it!
                </DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-6 pt-2">
                <MemeSubmissionForm onSuccess={handleMemeSubmissionSuccess} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Added padding-bottom to accommodate fixed bottom nav */}
      <main className="flex-grow container mx-auto max-w-5xl w-full pt-4 pb-24 sm:pb-20 px-2 sm:px-0"> 
        {children}
      </main>

      <BottomNavigation />

      {/* Footer hidden on small screens, subtle glass effect */}
      <footer className="text-center py-4 border-t border-border/20 text-xs text-muted-foreground hidden sm:block bg-background/30 backdrop-blur-sm mt-auto">
         &copy; {currentTimestamp} Zenith Zone. Find your calm.
      </footer>
    </div>
  );
}
