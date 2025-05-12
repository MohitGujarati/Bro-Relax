'use client'; // This page uses client-side interactivity (state, effects, event handlers)

import type { FC } from 'react';
import MemeWall from '@/components/relax-zone/meme-wall';
import MotivationBox from '@/components/relax-zone/motivation-box';
import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form'; // Optional Bonus feature

/**
 * Renders the Zenith Zone page, a dedicated space for relaxation featuring
 * memes, motivational quotes, community messages, and a music player.
 */
const RelaxZonePage: FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent">
            Zenith Zone
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your personal sanctuary. A space to unwind, recharge, and find a moment of peace amidst the hustle.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto space-y-16">
          {/* Meme Wall Section */}
          <div className="animate-slideUp animation-delay-200">
            <MemeWall />
          </div>

          {/* Motivation & Music Section */}
          <div className="animate-slideUp animation-delay-400">
            <MotivationBox />
          </div>

          {/* Community Shoutouts Section */}
          <div className="animate-slideUp animation-delay-600">
            <CommunityShoutouts />
          </div>

          {/* Optional Bonus: Meme Submission Form */}
          <div className="animate-slideUp animation-delay-800">
            <MemeSubmissionForm />
          </div>
        </main>

        {/* Page Footer */}
        <footer className="text-center mt-20 py-8 border-t border-border">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Career Navigator. Keep shining.
          </p>
        </footer>
      </div>
      {/* Note: Animation styles moved to globals.css */}
    </div>
  );
};

export default RelaxZonePage;
