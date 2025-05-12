'use client';

import type { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Removed AvatarImage as it's not used
import type { Shoutout } from '@/lib/relax-zone-constants';

interface ShoutoutCardProps {
  shoutout: Shoutout;
}

/**
 * Displays a single community shoutout message.
 * Uses a slightly different glassmorphic effect for depth if needed, or can be plain if parent Card provides enough.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    // This card can have its own subtle glass layer or be flat if the main CommunityShoutouts card is already glass.
    // Using bg-card/50 for a slightly more transparent look than default card, with its own blur.
    <div className="bg-card/50 backdrop-blur-sm text-card-foreground p-3.5 rounded-lg shadow-none border border-border/40 hover:bg-accent/50 transition-colors duration-150 ease-in-out">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8 text-xs border border-border/20">
          {/* Optional: <AvatarImage src={shoutout.avatarUrl} alt={`${shoutout.user}'s avatar`} /> */}
          <AvatarFallback className="bg-muted text-muted-foreground font-medium"> {/* Muted for less contrast on fallback */}
            {shoutout.avatarFallback || shoutout.user.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-foreground">{shoutout.user}</p>
            <p className="text-xs text-muted-foreground">{shoutout.timestamp}</p>
          </div>
          <p className="mt-1 text-sm text-foreground/90 leading-normal whitespace-pre-wrap break-words"> {/* Slightly more opaque text */}
            {shoutout.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;