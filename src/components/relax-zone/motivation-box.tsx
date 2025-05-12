
"use client"; // Needs state for quote, player visibility, and effect for initial quote.

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motivationalQuotes, relaxingMusicUrl } from '@/lib/relax-zone-constants';
import { Quote, RefreshCw, Music2 } from 'lucide-react';

/**
 * Displays a random motivational quote and provides an option
 * to show/hide an embedded YouTube music player.
 */
const MotivationBox: FC = () => {
  // State to hold the currently displayed quote
  const [quote, setQuote] = useState('');
  // State to control the visibility of the music player
  const [showPlayer, setShowPlayer] = useState(false);

  // Function to select and set a random quote from the list
  const getRandomQuote = () => {
    // Math.random() is safe here as it's called within useEffect or an event handler
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  // useEffect hook to fetch the initial quote when the component mounts
  // The empty dependency array [] means this effect runs only once after the initial render
  useEffect(() => {
    getRandomQuote();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section aria-labelledby="motivation-box-title">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle id="motivation-box-title" className="text-3xl font-semibold tracking-tight text-secondary-foreground flex items-center justify-center gap-2">
             <Music2 className="h-8 w-8 text-secondary" /> Motivation & Melodies
          </CardTitle>
          <p className="mt-2 text-lg text-muted-foreground">Fuel your spirit, find your rhythm.</p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Quote Display Area */}
          <div className="text-center p-6 bg-accent/30 rounded-lg shadow-inner min-h-[120px] flex flex-col justify-center items-center">
            <Quote className="h-8 w-8 text-primary mb-2 opacity-70" />
            {quote ? (
              <p className="text-xl italic text-foreground">"{quote}"</p>
            ) : (
              // Placeholder while the quote is loading initially
              <p className="text-xl italic text-muted-foreground">Loading inspirational quote...</p>
            )}
            {/* Button to fetch a new random quote */}
            <Button variant="ghost" size="sm" onClick={getRandomQuote} className="mt-4 text-primary hover:text-primary/80">
              <RefreshCw className="h-4 w-4 mr-2" /> New Quote
            </Button>
          </div>
          
          {/* Music Player Section */}
          <div className="text-center">
             {/* Button to toggle the music player visibility */}
             <Button onClick={() => setShowPlayer(!showPlayer)} variant="outline" className="mb-4">
              {showPlayer ? 'Hide' : 'Show'} Relaxing Music Player
            </Button>
            {/* Conditional rendering of the iframe based on showPlayer state */}
            {showPlayer && (
              <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={relaxingMusicUrl}
                  title="Relaxing Music Player"
                  frameBorder="0"
                  // Allow necessary permissions for embedded content
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy" // Lazy load the iframe
                ></iframe>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MotivationBox;
