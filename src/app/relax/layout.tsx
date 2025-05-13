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
  return 'Relax Bro'; // Updated fallback title
};

export default function RelaxLayout({ children }: RelaxLayoutProps) {
  const [isMemeDialogOpen, setIsMemeDialogOpen] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date().getFullYear());
  const pathname = usePathname(); // Get current pathname
  const [pageTitle, setPageTitle] = useState('Relax Bro'); // Updated initial title

  useEffect(() => {
    // Update timestamp on client mount
    setCurrentTimestamp(new Date().getFullYear());
  }, []);

  useEffect(() => {
    // Update title whenever pathname changes
    setPageTitle(getTitleFromPathname(pathname));
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>
          <Dialog open={isMemeDialogOpen} onOpenChange={setIsMemeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ImagePlus className="h-4 w-4" />
                <span className="hidden sm:inline">Share Meme</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share a Meme</DialogTitle>
                <DialogDescription>
                  Spread some joy! Share your favorite meme with the community.
                </DialogDescription>
              </DialogHeader>
              <MemeSubmissionForm onSuccess={() => setIsMemeDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
