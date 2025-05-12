// src/components/relax-zone/motivation-box.tsx
'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { motivationalQuotes, relaxingMusicUrl } from '@/lib/relax-zone-constants';
import { Quote as QuoteIcon, RefreshCw, Music2 } from 'lucide-react';

/**
 * Displays a random motivational quote and a minimal music player.
 * Uses Skeleton components for loading state.
 */
const MotivationBox: FC = () => {
  const [quote, setQuote] = useState<string | null>(null); // Start with null for loading state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial quote only on the client
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  const getRandomQuote = () => {
    if (!isClient) return;
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  // Skeleton Loader Component
  const MotivationBoxSkeleton: FC = () => (
     <Card className="w-full max-w-md mx-auto overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl">
       <CardHeader className="pb-3 pt-5 px-5">
         <CardTitle className="text-xl font-medium text-foreground flex items-center gap-2">
           <QuoteIcon className="h-5 w-5 text-muted-foreground" /> Inspiration
         </CardTitle>
       </CardHeader>
       <CardContent className="px-5 pb-5 space-y-5">
         {/* Skeleton for Quote Box */}
         <div className="text-center p-6 bg-muted/20 rounded-lg min-h-[120px] flex flex-col justify-center items-center border border-border/20 shadow-inner">
            <Skeleton className="h-4 w-10 mb-3" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-2/3" />
         </div>
         {/* Skeleton for Button */}
         <div className="flex justify-center">
            <Skeleton className="h-9 w-36 rounded-md" />
         </div>
       </CardContent>
        {/* Skeleton for Music Player Section */}
       <div className="bg-secondary/20 backdrop-blur-sm p-4 border-t border-border/20">
         <div className="flex items-center text-sm text-muted-foreground mb-2">
           <Music2 className="h-4 w-4 mr-2"/>
           <span>Relaxing Music</span>
         </div>
         <Skeleton className="aspect-video sm:aspect-[16/3] rounded-md w-full" />
       </div>
     </Card>
  );

  if (!isClient) {
    // Render skeleton on server and initial client render
    return <MotivationBoxSkeleton />;
  }

  return (
    <section aria-labelledby="motivation-box-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      {/* Card inherits glassmorphism */}
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle id="motivation-box-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <QuoteIcon className="h-5 w-5 text-muted-foreground" /> Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-5">
          {/* Inner quote box */}
          <div className="text-center p-6 bg-muted/10 backdrop-blur-xs rounded-lg min-h-[120px] flex flex-col justify-center items-center border border-border/10 shadow-inner relative overflow-hidden">
             <QuoteIcon className="h-8 w-8 text-muted-foreground/30 absolute top-2 left-2 transform -scale-x-100" aria-hidden="true"/>
             <QuoteIcon className="h-8 w-8 text-muted-foreground/30 absolute bottom-2 right-2 " aria-hidden="true"/>
            {quote !== null ? (
              <p className="text-lg italic text-foreground/90 leading-relaxed z-10">"{quote}"</p>
            ) : (
              // This case should ideally not be hit if isClient is true, but provides a fallback
               <p className="text-lg italic text-muted-foreground">Loading inspiration...</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline" // Outline style fits the minimal theme
              size="sm"
              onClick={getRandomQuote}
              className="text-muted-foreground border-border/50 hover:bg-accent/50 hover:text-accent-foreground rounded-md transition-all duration-150 ease-in-out hover:border-primary/30"
            >
              <RefreshCw className="h-4 w-4 mr-2 transition-transform group-hover:rotate-180 duration-300" /> Another Quote
            </Button>
          </div>
        </CardContent>

        {/* Music Player Section */}
        <div className="bg-secondary/20 backdrop-blur-sm p-4 border-t border-border/20">
          <div className="flex items-center text-sm text-muted-foreground mb-2 font-medium">
            <Music2 className="h-4 w-4 mr-2"/>
            <span>Relaxing Music</span>
          </div>
          <div className="aspect-video sm:aspect-[16/3] rounded-lg overflow-hidden border border-border/10 shadow-inner">
            <iframe
              src={relaxingMusicUrl}
              title="Relaxing Music Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full block" // Ensure it's a block element
              loading="lazy" // Lazy load the iframe
            ></iframe>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default MotivationBox;
