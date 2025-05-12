// src/app/relax/layout.tsx
'use client';

import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { ArrowLeft, ImagePlus } from 'lucide-react'; // Using ImagePlus for "share"

interface RelaxLayoutProps {
  children: ReactNode;
}

export default function RelaxLayout({ children }: RelaxLayoutProps) {
  const [isMemeDialogOpen, setIsMemeDialogOpen] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  useEffect(() => {
    // Set timestamp on client to avoid hydration issues
    setCurrentTimestamp(new Date().getFullYear().toString());
  }, []);


  const handleMemeSubmissionSuccess = () => {
    setIsMemeDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto h-14 px-4 flex items-center justify-between max-w-5xl">
          <Link href="/" aria-label="Back to Home">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-foreground tracking-tight">
            Zenith Zone
          </h1>
          <Dialog open={isMemeDialogOpen} onOpenChange={setIsMemeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Share a Meme" className="text-muted-foreground hover:text-foreground">
                <ImagePlus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-card border-border shadow-xl rounded-lg">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-foreground text-xl">Share a Meme</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm pt-1">
                  Upload an image to share with the community.
                </DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-6 pt-2">
                <MemeSubmissionForm onSuccess={handleMemeSubmissionSuccess} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content Area for Tabs */}
      {/* pb-16 is padding-bottom to ensure content doesn't hide behind fixed bottom nav */}
      <main className="flex-grow container mx-auto max-w-5xl w-full pt-2 pb-20 sm:pb-16"> {/* Added padding for bottom nav */}
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Footer - Optional, can be removed if BottomNav is enough */}
      <footer className="text-center py-5 border-t border-border text-xs text-muted-foreground hidden sm:block">
         &copy; {currentTimestamp} Zenith Zone. Find your calm.
      </footer>
    </div>
  );
}
