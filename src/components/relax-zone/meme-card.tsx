
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
 * Displays a single meme with like/dislike buttons, styled minimally.
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
    // Minimal card styling: subtle border, very light shadow on hover maybe
    <Card className="overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Image container */}
        <div className="aspect-w-1 aspect-h-1 relative bg-muted/10"> {/* Subtle bg */}
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 640px) 90vw, 500px"
            priority={meme.id === 'meme1'}
            data-ai-hint={meme.dataAiHint}
            className="rounded-t-lg" // Remove if card has no rounding or border radius
          />
        </div>
      </CardContent>
      {/* Footer with interaction buttons */}
      <CardFooter className="py-2 px-3 flex justify-start items-center bg-card">
        <div className="flex gap-1"> {/* Reduced gap */}
          {/* Like Button - Minimal Ghost style */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1 px-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50 ${
              liked ? 'text-foreground bg-accent/30' : '' // Subtle active state
            }`}
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} /> {/* Conditional fill */}
            <span className="text-xs font-medium">{likes}</span>
          </Button>
          {/* Dislike Button - Minimal Ghost style */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
             className={`flex items-center gap-1 px-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50 ${
              disliked ? 'text-foreground bg-accent/30' : '' // Subtle active state
            }`}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className={`h-4 w-4 ${disliked ? 'fill-current' : ''}`} /> {/* Conditional fill */}
            <span className="text-xs font-medium">{dislikes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
