
'use client'; // Needs client-side state and event handling for likes/dislikes.

import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Meme } from '@/lib/relax-zone-constants';

interface MemeCardProps {
  meme: Meme; // Defines the expected data structure for a meme
}

/**
 * Displays a single meme with like/dislike buttons, styled like a social media post card.
 * Manages its own like/dislike state.
 */
const MemeCard: FC<MemeCardProps> = ({ meme }) => {
  // State for tracking likes and dislikes count for this specific card
  const [likes, setLikes] = useState(meme.initialLikes);
  const [dislikes, setDislikes] = useState(meme.initialDislikes);
  // State to track if the current user has liked or disliked this card
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Handles the click event on the Like button
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  // Handles the click event on the Dislike button
  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  return (
    // Adjusted card styling for feed layout
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
      <CardContent className="p-0">
        {/* Image container with adjusted aspect ratio */}
        <div className="aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 relative bg-muted/30"> {/* Adjusted aspect ratio */}
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill // Use fill
            style={{ objectFit: 'contain' }} // Changed to contain to show whole meme
            sizes="(max-width: 640px) 90vw, 500px" // Adjusted sizes
            priority={meme.id === 'meme1'} // Prioritize loading the first meme
            data-ai-hint={meme.dataAiHint}
            className="rounded-t-lg" // Ensure image corners match card if needed
          />
        </div>
      </CardContent>
      {/* Footer with interaction buttons */}
      <CardFooter className="py-2 px-3 flex justify-start items-center bg-card">
        <div className="flex gap-1.5">
          {/* Like Button - More subtle styling */}
          <Button
            variant="ghost" // Ghost variant for less emphasis
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 transition-colors rounded-md ${
              liked
                ? 'text-primary bg-primary/10 hover:bg-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} /> {/* Conditional fill */}
            <span className="text-xs font-medium">{likes}</span>
          </Button>
          {/* Dislike Button - More subtle styling */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
             className={`flex items-center gap-1 px-2 transition-colors rounded-md ${
              disliked
                ? 'text-destructive bg-destructive/10 hover:bg-destructive/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className={`h-4 w-4 ${disliked ? 'fill-current' : ''}`} /> {/* Conditional fill */}
            <span className="text-xs font-medium">{dislikes}</span>
          </Button>
        </div>
        {/* Placeholder for comments or share icon if needed later */}
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
