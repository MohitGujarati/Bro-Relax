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
    return (
      // Card will be glassmorphic due to ui/card.tsx update
      <Card className="overflow-hidden shadow-none hover:shadow-md transition-shadow duration-200 rounded-lg">
        <CardContent className="p-0">
          <div className="aspect-video relative bg-muted/10">
          </div>
        </CardContent>
        <CardFooter className="py-2 px-3 flex justify-start items-center border-t border-border">
          <div className="flex gap-1">
            <div className="h-8 w-16 bg-muted/20 rounded-md animate-pulse"></div>
            <div className="h-8 w-16 bg-muted/20 rounded-md animate-pulse"></div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    // Card will be glassmorphic. Added rounded-xl for slightly more modern feel.
    <Card className="overflow-hidden shadow-none hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-xl">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-black/20"> {/* Darker placeholder for image loading */}
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill
            style={{ objectFit: 'contain' }} // Use 'contain' to ensure whole meme is visible
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={meme.id === 'meme1'}
            data-ai-hint={meme.dataAiHint}
            className="rounded-t-xl"
          />
        </div>
      </CardContent>
      {/* CardFooter bg-card will also be glassmorphic. Border adjusted. */}
      <CardFooter className="py-2.5 px-4 flex justify-between items-center border-t border-border/50">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1.5 p-1.5 rounded-md 
                        text-muted-foreground hover:text-foreground hover:bg-white/10
                        ${userInteraction === 'liked' ? 'text-primary bg-white/20' : ''}`} // Adjusted active state for monochrome
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className={`h-4 w-4 ${userInteraction === 'liked' ? 'fill-primary' : ''}`} />
            <span className="text-xs font-medium">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={`flex items-center gap-1.5 p-1.5 rounded-md 
                        text-muted-foreground hover:text-foreground hover:bg-white/10
                        ${userInteraction === 'disliked' ? 'text-primary bg-white/20' : ''}`} // Adjusted active state for monochrome
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className={`h-4 w-4 ${userInteraction === 'disliked' ? 'fill-primary' : ''}`} />
            <span className="text-xs font-medium">{dislikes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;