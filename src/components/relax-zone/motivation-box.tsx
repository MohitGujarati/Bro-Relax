'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motivationalQuotes, relaxingMusicUrl } from '@/lib/relax-zone-constants';
import { Quote as QuoteIcon, RefreshCw, Music2 } from 'lucide-react';

/**
 * Displays a random motivational quote and a minimal music player.
 * Card will be glassmorphic.
 */
const MotivationBox: FC = () => {
  const [quote, setQuote] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  if (!isClient) {
    return (
        <Card className="w-full max-w-md mx-auto"> {/* Card will be glassmorphic */}
            <CardHeader className="pb-3 pt-5 px-5">
                 <CardTitle className="text-xl font-medium text-foreground flex items-center gap-2">
                    <QuoteIcon className="h-5 w-5 text-muted-foreground" /> Inspiration
                </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-5">
                <div className="text-center p-6 bg-muted/20 rounded-lg min-h-[120px] flex flex-col justify-center items-center border border-border/20 shadow-inner">
                    <p className="text-base italic text-muted-foreground">Loading inspiration...</p>
                </div>
                <div className="h-8 w-full bg-muted/20 rounded-md animate-pulse"></div>
                 <div className="h-10 w-1/2 mx-auto bg-muted/20 rounded-md animate-pulse"></div>
            </CardContent>
        </Card>
    );
  }

  return (
    <section aria-labelledby="motivation-box-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      {/* Card will be glassmorphic due to ui/card.tsx update */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle id="motivation-box-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <QuoteIcon className="h-5 w-5 text-muted-foreground" /> Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-5">
          {/* Inner quote box with subtle glass effect or just a themed background */}
          <div className="text-center p-6 bg-muted/30 backdrop-blur-sm rounded-lg min-h-[120px] flex flex-col justify-center items-center border border-border/20 shadow-inner">
            <QuoteIcon className="h-6 w-6 text-muted-foreground mb-3 opacity-60 transform -scale-x-100" />
            {quote ? (
              <p className="text-lg italic text-foreground/90 leading-relaxed">"{quote}"</p>
            ) : (
              <p className="text-lg italic text-muted-foreground">Loading inspiration...</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline" // Outline buttons now have subtle border based on --border-hsl
              size="sm"
              onClick={getRandomQuote}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Another Quote
            </Button>
          </div>
        </CardContent>
        
        {/* Music Player Section with glassmorphic background */}
        <div className="bg-secondary/30 backdrop-blur-sm p-4 border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Music2 className="h-4 w-4 mr-2"/>
            <span>Relaxing Music</span>
          </div>
          <div className="aspect-video sm:aspect-[16/3] rounded-md overflow-hidden border border-border/20"> {/* Added subtle border to iframe container */}
            <iframe
              src={relaxingMusicUrl}
              title="Relaxing Music Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default MotivationBox;