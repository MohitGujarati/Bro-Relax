
'use client'; // This page uses client-side interactivity (state, event handlers, dialog)

import type { FC } from 'react';
import MemeWall from '@/components/relax-zone/meme-wall';
import MotivationBox from '@/components/relax-zone/motivation-box';
import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Wind, ImagePlus } from 'lucide-react'; // Added Wind and ImagePlus icons
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription, // Added DialogDescription
  DialogClose // Added DialogClose for potential programmatic close
} from "@/components/ui/dialog";
import React, { useState } from 'react'; // Import useState for dialog state management


/**
 * Renders the Zenith Zone page, redesigned for a minimal, user-friendly, feed-like experience.
 * Includes a dialog for meme submission.
 */
const RelaxZonePage: FC = () => {
  // State to control the Meme Submission Dialog visibility programmatically if needed
  const [isMemeDialogOpen, setIsMemeDialogOpen] = useState(false);

  const handleMemeSubmissionSuccess = () => {
    setIsMemeDialogOpen(false); // Close the dialog on successful submission
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-3 flex items-center justify-between">
        <Link href="/" aria-label="Back to Home">
          <Button variant="ghost" size="icon">
             <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium tracking-tight text-foreground flex items-center gap-1.5">
          <Wind className="h-5 w-5 text-primary-foreground/80" /> {/* Use themed icon color */}
          Zenith Zone
        </h1>
        {/* Meme Submission Dialog Trigger */}
        <Dialog open={isMemeDialogOpen} onOpenChange={setIsMemeDialogOpen}>
          <DialogTrigger asChild>
             <Button variant="ghost" size="icon" aria-label="Share a Meme">
                <ImagePlus className="h-5 w-5" />
             </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-border/50">
            <DialogHeader>
              <DialogTitle className="text-foreground">Share a Meme</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Upload an image to share with the community.
              </DialogDescription>
            </DialogHeader>
             {/* Pass the success handler to the form */}
            <MemeSubmissionForm onSuccess={handleMemeSubmissionSuccess} />
             {/* Optionally add a manual close button if needed, DialogClose can wrap trigger */}
             {/* <DialogFooter> <Button type="button" variant="secondary" onClick={() => setIsMemeDialogOpen(false)}>Close</Button> </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content Feed */}
      <main className="flex-grow container mx-auto py-8 px-4 max-w-lg"> {/* Narrower feed */}
        <div className="space-y-8">

          {/* Meme Wall Section integrated into the feed */}
          <div>
            <MemeWall />
          </div>

          {/* Separator with more space */}
          <Separator className="my-6" />

          {/* Motivation Section integrated as a card */}
          <div>
            <MotivationBox />
          </div>

          {/* Separator with more space */}
          <Separator className="my-6" />

          {/* Community Shoutouts Section integrated into the feed */}
          <div>
            <CommunityShoutouts />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="text-center py-8 mt-12">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Zenith Zone. Find your calm.
        </p>
      </footer>
    </div>
  );
};

export default RelaxZonePage;
