'use client';

import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Shoutout } from '@/lib/relax-zone-constants';

interface ShoutoutCardProps {
  shoutout: Shoutout;
}

/**
 * Displays a single community shoutout message in a minimal format.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    <div className="bg-card/80 text-card-foreground p-3.5 rounded-lg shadow-none border border-border/40 hover:bg-accent/30 transition-colors duration-150 ease-in-out">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8 text-xs border border-border/20">
          {/* Optional: <AvatarImage src={shoutout.avatarUrl} alt={`${shoutout.user}'s avatar`} /> */}
          <AvatarFallback className="bg-muted/40 text-muted-foreground font-medium">
            {shoutout.avatarFallback || shoutout.user.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-foreground">{shoutout.user}</p>
            <p className="text-xs text-muted-foreground">{shoutout.timestamp}</p>
          </div>
          <p className="mt-1 text-sm text-foreground/80 leading-normal whitespace-pre-wrap break-words">
            {shoutout.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
