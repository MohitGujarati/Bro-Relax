'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Meme } from '@/lib/relax-zone-constants';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: FC<MemeCardProps> = ({ meme }) => {
  const [likes, setLikes] = useState(meme.initialLikes);
  const [dislikes, setDislikes] = useState(meme.initialDislikes);
  const [userInteraction, setUserInteraction] = useState<'liked' | 'disliked' | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleLike = () => {
    if (userInteraction === 'liked') {
      setLikes(likes - 1);
      setUserInteraction(null);
    } else {
      setLikes(likes + 1);
      if (userInteraction === 'disliked') {
        setDislikes(dislikes - 1);
      }
      setUserInteraction('liked');
    }
  };

  const handleDislike = () => {
    if (userInteraction === 'disliked') {
      setDislikes(dislikes - 1);
      setUserInteraction(null);
    } else {
      setDislikes(dislikes + 1);
      if (userInteraction === 'liked') {
        setLikes(likes - 1);
      }
      setUserInteraction('disliked');
    }
  };

  if (!isClient) {
    // Render placeholder or null on the server to avoid hydration mismatch for likes/dislikes
    return (
      <Card className="overflow-hidden bg-card border border-border shadow-none hover:shadow-md transition-shadow duration-200 rounded-lg">
        <CardContent className="p-0">
          <div className="aspect-video relative bg-muted/10"> {/* Changed to aspect-video for wider memes */}
             {/* Placeholder for image */}
          </div>
        </CardContent>
        <CardFooter className="py-2 px-3 flex justify-start items-center bg-card border-t border-border">
          <div className="flex gap-1">
            <div className="h-8 w-16 bg-muted/20 rounded-md animate-pulse"></div>
            <div className="h-8 w-16 bg-muted/20 rounded-md animate-pulse"></div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-card border border-border shadow-none hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-xl"> {/* More pronounced rounding and shadow on hover */}
      <CardContent className="p-0">
        <div className="aspect-video relative bg-muted/5"> {/* Maintain aspect ratio, subtle bg for image loading */}
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill
            style={{ objectFit: 'cover' }} // Changed to cover for better fill, can be 'contain'
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={meme.id === 'meme1'}
            data-ai-hint={meme.dataAiHint}
            className="rounded-t-xl" // Match card rounding
            // For local dev, unoptimized can help if external images are slow or blocked
            // unoptimized={process.env.NODE_ENV === 'development'}
          />
        </div>
      </CardContent>
      <CardFooter className="py-2.5 px-4 flex justify-between items-center bg-card border-t border-border"> {/* Increased padding slightly */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1.5 p-1.5 rounded-md 
                        text-muted-foreground hover:text-foreground hover:bg-accent 
                        ${userInteraction === 'liked' ? 'text-primary-foreground bg-accent' : ''}`}
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className={`h-4 w-4 ${userInteraction === 'liked' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={`flex items-center gap-1.5 p-1.5 rounded-md 
                        text-muted-foreground hover:text-foreground hover:bg-accent 
                        ${userInteraction === 'disliked' ? 'text-primary-foreground bg-accent' : ''}`}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className={`h-4 w-4 ${userInteraction === 'disliked' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{dislikes}</span>
          </Button>
        </div>
        {/* Placeholder for potential share button or other actions */}
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
