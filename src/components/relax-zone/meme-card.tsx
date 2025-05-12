// src/components/relax-zone/meme-card.tsx
'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import type { Meme } from '@/lib/relax-zone-constants';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: FC<MemeCardProps> = ({ meme }) => {
  const [likes, setLikes] = useState(meme.initialLikes);
  const [dislikes, setDislikes] = useState(meme.initialDislikes);
  const [userInteraction, setUserInteraction] = useState<'liked' | 'disliked' | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  useEffect(() => {
    setIsClient(true);
    // No need to set isLoading here, Image component handles it
  }, []);


  const handleLike = () => {
    if (!isClient) return; // Prevent interaction before hydration
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
    if (!isClient) return; // Prevent interaction before hydration
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

  // Skeleton Loader Component
  const MemeCardSkeleton: FC = () => (
    <Card className="overflow-hidden shadow-none rounded-xl bg-card/70 backdrop-blur-sm">
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full rounded-t-xl" />
      </CardContent>
      <CardFooter className="py-2.5 px-4 flex justify-between items-center border-t border-border/30">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );


  if (!isClient) {
    // Render skeleton on the server and initial client render
    return <MemeCardSkeleton />;
  }

  return (
    // Card inherits glassmorphism. Added rounded-xl.
    <Card className="overflow-hidden shadow-none hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-xl bg-card/70 backdrop-blur-sm border border-border/20">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-black/10"> {/* Slightly darker placeholder */}
          {isLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-t-xl" />}
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            fill
            style={{ objectFit: 'contain' }} // Use 'contain'
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={meme.id === 'meme1'} // Prioritize first meme
            data-ai-hint={meme.dataAiHint}
            className={`transition-opacity duration-300 ease-in-out rounded-t-xl ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)} // Handle loading errors too
          />
        </div>
      </CardContent>
      {/* Footer styling */}
      <CardFooter className="py-2.5 px-4 flex justify-between items-center border-t border-border/30">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              `flex items-center gap-1.5 p-1.5 rounded-md text-xs
               text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-150`,
              userInteraction === 'liked' ? 'text-primary bg-primary/10 scale-105' : '' // Subtle scale on active
            )}
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className={cn("h-4 w-4 transition-colors", userInteraction === 'liked' ? 'fill-primary' : '')} />
            <span className="font-medium tabular-nums">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
             className={cn(
              `flex items-center gap-1.5 p-1.5 rounded-md text-xs
               text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-150`,
              userInteraction === 'disliked' ? 'text-primary bg-primary/10 scale-105' : '' // Subtle scale on active
            )}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className={cn("h-4 w-4 transition-colors", userInteraction === 'disliked' ? 'fill-primary' : '')} />
            <span className="font-medium tabular-nums">{dislikes}</span>
          </Button>
        </div>
        {/* Optional: Add a share button or other actions here */}
      </CardFooter>
    </Card>
  );
};

export default MemeCard;

```