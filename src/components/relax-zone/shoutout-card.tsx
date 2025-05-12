// src/components/relax-zone/shoutout-card.tsx
'use client';

import type { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Shoutout } from '@/lib/relax-zone-constants';
import { cn } from '@/lib/utils'; // Import cn

interface ShoutoutCardProps {
  shoutout: Shoutout;
}

/**
 * Displays a single community shoutout message.
 * Styled for clarity within the shoutout feed.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  const isUserPost = shoutout.user === 'You'; // Check if the post is by the current user (simulated)

  return (
    // Apply slightly different styling for user's own posts
    <div className={cn(
        "text-card-foreground p-3.5 rounded-lg shadow-none border transition-colors duration-150 ease-in-out",
        isUserPost
            ? "bg-primary/10 border-primary/20" // Subtle highlight for user's own post
            : "bg-card/30 backdrop-blur-sm border-border/30 hover:bg-accent/20" // Standard card style
         )}>
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8 text-xs border border-border/20 shrink-0">
          {/* Optional: <AvatarImage src={shoutout.avatarUrl} alt={`${shoutout.user}'s avatar`} /> */}
          <AvatarFallback className={cn(
              "font-medium",
               isUserPost ? "bg-primary/30 text-primary-foreground" : "bg-muted/50 text-muted-foreground"
             )}>
            {shoutout.avatarFallback || shoutout.user.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0"> {/* Ensure content wraps */}
          <div className="flex items-baseline justify-between flex-wrap gap-x-2">
            <p className={cn(
                "text-sm font-medium",
                 isUserPost ? "text-primary" : "text-foreground"
               )}>
                {shoutout.user}
            </p>
            <p className="text-xs text-muted-foreground shrink-0">{shoutout.timestamp}</p>
          </div>
          <p className="mt-1 text-sm text-foreground/90 leading-normal whitespace-pre-wrap break-words">
            {shoutout.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
