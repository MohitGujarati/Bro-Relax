
'use client'; // This page uses client-side interactivity (state, effects, event handlers)

import type { FC } from 'react';
import MemeWall from '@/components/relax-zone/meme-wall';
import MotivationBox from '@/components/relax-zone/motivation-box';
import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Renders the Zenith Zone page, redesigned for a user-friendly, feed-like experience
 * inspired by social media UIs and modern design principles (Apple/Google).
 */
const RelaxZonePage: FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground flex flex-col">
      {/* Simplified Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon" aria-label="Back to Home">
             <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Zenith Zone
        </h1>
        {/* Placeholder for potential actions like user profile icon */}
        <div className="w-8"></div>
      </header>

      {/* Main Content Feed */}
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="space-y-8">
           {/* Introductory text - Optional */}
           <p className="text-center text-muted-foreground mb-8 animate-fadeIn">
            Your space to unwind, recharge, and share some positivity.
           </p>

          {/* Meme Submission - Placed prominently like a "Create Post" */}
           <div className="animate-slideUp">
            <MemeSubmissionForm />
           </div>

          <Separator className="my-8" />

          {/* Meme Wall Section integrated into the feed */}
          <div className="animate-slideUp animation-delay-200">
            <MemeWall />
          </div>

          <Separator className="my-8" />

          {/* Motivation Section integrated as a card */}
          <div className="animate-slideUp animation-delay-400">
            <MotivationBox />
          </div>

          <Separator className="my-8" />

          {/* Community Shoutouts Section integrated into the feed */}
          <div className="animate-slideUp animation-delay-600">
            <CommunityShoutouts />
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="text-center py-6 border-t border-border mt-12">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Career Navigator. Find your calm.
        </p>
      </footer>
    </div>
  );
};

export default RelaxZonePage;
