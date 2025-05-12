
'use client'; // Simple display component, but uses client components (Avatar), safe as client component.

import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Added AvatarImage
import type { Shoutout } from '@/lib/relax-zone-constants';

interface ShoutoutCardProps {
  shoutout: Shoutout; // Defines the expected data structure for a shoutout
}

/**
 * Displays a single community shoutout message in a minimal format
 * optimized for the feed layout.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    // Minimal styling: subtle background, border, less padding
    <div className="bg-card/70 text-card-foreground p-3 rounded-md shadow-none border border-border/30 hover:bg-accent/20 transition-colors duration-200">
      <div className="flex items-start space-x-2.5">
        {/* User Avatar - Smaller */}
        <Avatar className="h-7 w-7 text-xs border border-border/30">
           {/* Optional: Add AvatarImage if URLs are available */}
           {/* <AvatarImage src={shoutout.avatarUrl} alt={`${shoutout.user}'s avatar`} /> */}
          <AvatarFallback className="bg-muted/50 text-muted-foreground font-medium"> {/* Subtle fallback bg */}
            {shoutout.avatarFallback || shoutout.user.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {/* User Info & Message */}
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-medium text-foreground/90">{shoutout.user}</p> {/* Slightly less emphasis */}
            <p className="text-[11px] text-muted-foreground">{shoutout.timestamp}</p> {/* Even smaller timestamp */}
          </div>
          {/* Message Content */}
          <p className="mt-1 text-sm text-foreground/95 leading-snug whitespace-pre-wrap break-words"> {/* Ensure line breaks are respected */}
            {shoutout.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
