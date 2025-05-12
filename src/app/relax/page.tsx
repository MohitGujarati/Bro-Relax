
'use client'; // This page uses client-side interactivity (state, event handlers)

import type { FC } from 'react';
import MemeWall from '@/components/relax-zone/meme-wall';
import MotivationBox from '@/components/relax-zone/motivation-box';
import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Wind } from 'lucide-react'; // Added Wind icon

/**
 * Renders the Zenith Zone page, redesigned for a minimal, user-friendly, feed-like experience.
 */
const RelaxZonePage: FC = () => {
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
        {/* Minimal action placeholder */}
        <div className="w-9 h-9"></div> {/* Keep alignment balanced */}
      </header>

      {/* Main Content Feed */}
      <main className="flex-grow container mx-auto py-8 px-4 max-w-lg"> {/* Narrower feed */}
        <div className="space-y-8">
           {/* Meme Submission - Placed prominently */}
           <div>
             <MemeSubmissionForm />
           </div>

          {/* Separator with more space */}
          <Separator className="my-6" />

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
