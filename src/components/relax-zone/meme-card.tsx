"use client";

import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import type { Meme } from '@/lib/relax-zone-constants';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: FC<MemeCardProps> = ({ meme }) => {
  const [likes, setLikes] = useState(meme.initialLikes);
  const [dislikes, setDislikes] = useState(meme.initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <Image
            src={meme.imageUrl}
            alt={meme.altText}
            layout="fill"
            objectFit="cover"
            data-ai-hint={meme.dataAiHint}
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-card-foreground/5">
        <div className="flex gap-2">
          <Button
            variant={liked ? 'default' : 'outline'}
            size="sm"
            onClick={handleLike}
            className={`transition-colors ${liked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}`}
            aria-label={`Like meme. Current likes: ${likes}`}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {likes}
          </Button>
          <Button
            variant={disliked ? 'destructive' : 'outline'}
            size="sm"
            onClick={handleDislike}
            className={`transition-colors ${disliked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'hover:bg-accent'}`}
            aria-label={`Dislike meme. Current dislikes: ${dislikes}`}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            {dislikes}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
