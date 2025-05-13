'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Meme } from '@/lib/relax-zone-constants';
import { cn } from '@/lib/utils';

interface MemeCardProps {
  meme: Meme;
}

const useMemeInteractions = (initialLikes: number, initialDislikes: number) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userInteraction, setUserInteraction] = useState<'liked' | 'disliked' | null>(null);

  const handleLike = () => {
    if (userInteraction === 'liked') {
      setLikes(likes - 1);
      setUserInteraction(null);
    } else {
      setLikes(likes + 1);
      if (userInteraction === 'disliked') setDislikes(dislikes - 1);
      setUserInteraction('liked');
    }
  };

  const handleDislike = () => {
    if (userInteraction === 'disliked') {
      setDislikes(dislikes - 1);
      setUserInteraction(null);
    } else {
      setDislikes(dislikes + 1);
      if (userInteraction === 'liked') setLikes(likes - 1);
      setUserInteraction('disliked');
    }
  };

  return { likes, dislikes, userInteraction, handleLike, handleDislike };
};

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

const MemeImage: FC<{ src: string; alt: string; onLoad: () => void; onError: () => void; isLoading: boolean; dataAiHint?: string; priority?: boolean; }> = ({ src, alt, onLoad, onError, isLoading, dataAiHint, priority }) => (
  <div className="aspect-video relative bg-black/10">
    {isLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-t-xl" />}
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: 'contain' }}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      priority={priority}
      data-ai-hint={dataAiHint}
      className={`transition-opacity duration-300 ease-in-out rounded-t-xl ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      onLoad={onLoad}
      onError={onError}
    />
  </div>
);

const InteractionButtons: FC<{ likes: number; dislikes: number; userInteraction: 'liked' | 'disliked' | null; handleLike: () => void; handleDislike: () => void; }> = ({ likes, dislikes, userInteraction, handleLike, handleDislike }) => (
  <div className="flex gap-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={cn(
        `flex items-center gap-1.5 p-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-150`,
        userInteraction === 'liked' ? 'text-primary bg-primary/10 scale-105' : ''
      )}
      aria-label={`Like meme. Current likes: ${likes}`}
    >
      <ThumbsUp className={cn('h-4 w-4 transition-colors', userInteraction === 'liked' ? 'fill-primary' : '')} />
      <span className="font-medium tabular-nums">{likes}</span>
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDislike}
      className={cn(
        `flex items-center gap-1.5 p-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-150`,
        userInteraction === 'disliked' ? 'text-primary bg-primary/10 scale-105' : ''
      )}
      aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
    >
      <ThumbsDown className={cn('h-4 w-4 transition-colors', userInteraction === 'disliked' ? 'fill-primary' : '')} />
      <span className="font-medium tabular-nums">{dislikes}</span>
    </Button>
  </div>
);

const MemeCard: FC<MemeCardProps> = ({ meme }) => {
  const { likes, dislikes, userInteraction, handleLike, handleDislike } = useMemeInteractions(meme.initialLikes, meme.initialDislikes);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return <MemeCardSkeleton />;

  return (
    <Card className="overflow-hidden shadow-none hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-xl bg-card/70 backdrop-blur-sm border border-border/20">
      <CardContent className="p-0">
        <MemeImage
          src={meme.imageUrl}
          alt={meme.altText}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          isLoading={isLoading}
          dataAiHint={meme.dataAiHint}
          priority={meme.id === 'meme1'}
        />
      </CardContent>
      <CardFooter className="py-2.5 px-4 flex justify-between items-center border-t border-border/30">
        <InteractionButtons
          likes={likes}
          dislikes={dislikes}
          userInteraction={userInteraction}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
