
'use client'; // Needs state for quote and effect for initial quote.

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motivationalQuotes } from '@/lib/relax-zone-constants';
import { Quote, RefreshCw, Sparkles } from 'lucide-react'; // Changed icon

/**
 * Displays a random motivational quote in a card format.
 * Simplified to focus on quotes for better feed integration.
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
      <Card className="shadow-lg bg-card border-border overflow-hidden">
        <CardHeader className="pb-4">
          {/* Updated title styling for a cleaner look */}
          <CardTitle id="motivation-box-title" className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
             <Sparkles className="h-5 w-5 text-primary" /> A Moment of Motivation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6 pt-0">
          {/* Quote Display Area - Adjusted styling */}
          <div className="text-center p-4 bg-secondary/30 rounded-lg shadow-inner min-h-[100px] flex flex-col justify-center items-center border border-border/50">
            <Quote className="h-6 w-6 text-primary mb-3 opacity-70 transform -scale-x-100" /> {/* Flipped quote icon */}
            {quote ? (
              <p className="text-lg italic text-foreground leading-relaxed">"{quote}"</p>
            ) : (
              // Placeholder while the quote is loading initially
              <p className="text-lg italic text-muted-foreground">Loading inspiration...</p>
            )}
          </div>
          {/* Button to fetch a new random quote - Adjusted styling */}
           <div className="flex justify-center">
             <Button variant="outline" size="sm" onClick={getRandomQuote} className="mt-2 text-primary border-primary/50 hover:bg-primary/10 hover:text-primary">
                <RefreshCw className="h-4 w-4 mr-2" /> Another Quote
              </Button>
            </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MotivationBox;
