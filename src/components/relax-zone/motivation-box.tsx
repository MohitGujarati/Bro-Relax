
'use client'; // Needs state for quote and effect for initial quote.

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motivationalQuotes } from '@/lib/relax-zone-constants';
import { Quote, RefreshCw, Sparkles } from 'lucide-react';

/**
 * Displays a random motivational quote in a minimal card format.
 * Music player removed for simplicity and minimal design.
 */
const MotivationBox: FC = () => {
  // State to hold the currently displayed quote
  const [quote, setQuote] = useState('');

  // Function to select and set a random quote from the list
  const getRandomQuote = () => {
    // Math.random() is safe here as it's called within useEffect or an event handler
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  // useEffect hook to fetch the initial quote when the component mounts
  useEffect(() => {
    getRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section aria-labelledby="motivation-box-title">
      {/* Minimal card styling */}
      <Card className="bg-card border border-border/50 shadow-sm">
        <CardHeader className="pb-3 pt-4"> {/* Adjusted padding */}
          <CardTitle id="motivation-box-title" className="text-lg font-medium tracking-tight text-foreground flex items-center gap-2"> {/* Adjusted size */}
             <Sparkles className="h-5 w-5 text-muted-foreground" /> {/* Muted icon color */}
             Motivation Moment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-5 pt-0"> {/* Adjusted padding */}
          {/* Quote Display Area - Minimal styling */}
          <div className="text-center p-4 bg-secondary/30 rounded-md min-h-[90px] flex flex-col justify-center items-center border border-border/20 shadow-inner">
            <Quote className="h-5 w-5 text-muted-foreground mb-2 opacity-70 transform -scale-x-100" /> {/* Smaller icon */}
            {quote ? (
              <p className="text-base italic text-foreground/90 leading-relaxed">"{quote}"</p> // Slightly smaller text
            ) : (
              // Placeholder while the quote is loading initially
              <p className="text-base italic text-muted-foreground">Loading inspiration...</p>
            )}
          </div>
          {/* Button to fetch a new random quote - Minimal outline style */}
           <div className="flex justify-center pt-1">
             <Button
                variant="outline"
                size="sm"
                onClick={getRandomQuote}
                className="text-foreground border-border/50 hover:bg-accent/50 hover:text-foreground" // Minimal outline button
             >
                <RefreshCw className="h-4 w-4 mr-1.5" /> Another Quote
              </Button>
            </div>

            {/* Removed Music Player Section */}

        </CardContent>
      </Card>
    </section>
  );
};

export default MotivationBox;
