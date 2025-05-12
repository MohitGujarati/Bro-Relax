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
 * Displays a single meme with like/dislike buttons.
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
      // If already liked, unlike it
      setLikes(likes - 1);
      setLiked(false);
    } else {
      // If not liked, like it
      setLikes(likes + 1);
      setLiked(true);
      // If it was previously disliked, undo the dislike
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  // Handles the click event on the Dislike button
  const handleDislike = () => {
    if (disliked) {
      // If already disliked, undislike it
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      // If not disliked, dislike it
      setDislikes(dislikes + 1);
      setDisliked(true);
      // If it was previously liked, undo the like
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border-border">
      <CardContent className="p-0">
        {/* Using Next.js Image component for optimization */}
        <div className="aspect-video relative">
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill // Use fill instead of layout="fill"
            style={{ objectFit: 'cover' }} // Use style object for objectFit
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Provide sizes prop for responsive images
            priority={meme.id === 'meme1'} // Prioritize loading the first meme
            data-ai-hint={meme.dataAiHint} // Hint for AI image generation/selection later
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-card-foreground/5">
        {/* Like/Dislike Buttons */}
        <div className="flex gap-2">
          <Button
            variant={liked ? 'default' : 'outline'} // Use default (primary) when liked, outline otherwise
            size="sm"
            onClick={handleLike}
            className={`transition-colors ${liked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
            aria-label={`Like meme. Current likes: ${likes}`} // Accessibility label
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {likes} {/* Display current like count */}
          </Button>
          <Button
            variant={disliked ? 'destructive' : 'outline'} // Use destructive when disliked, outline otherwise
            size="sm"
            onClick={handleDislike}
            className={`transition-colors ${disliked ? 'hover:bg-destructive/90' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`} // Accessibility label
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            {dislikes} {/* Display current dislike count */}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
