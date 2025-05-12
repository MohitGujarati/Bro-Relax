
'use client'; // Simple display component, but uses client components (Avatar), safe as client component.

import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Added AvatarImage
import type { Shoutout } from '@/lib/relax-zone-constants';

interface ShoutoutCardProps {
  shoutout: Shoutout; // Defines the expected data structure for a shoutout
}

/**
 * Displays a single community shoutout message in a card-like format,
 * optimized for a feed layout.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    // Use a simple div structure, styling handled by parent container usually
    // Added subtle hover effect and padding
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        {/* User Avatar */}
        <Avatar className="h-8 w-8 text-xs border border-border/50">
           {/* Optional: Add AvatarImage if URLs are available */}
           {/* <AvatarImage src={shoutout.avatarUrl} alt={`${shoutout.user}'s avatar`} /> */}
          <AvatarFallback className="bg-muted text-muted-foreground font-medium">
            {shoutout.avatarFallback || shoutout.user.charAt(0)} {/* Improved fallback */}
          </AvatarFallback>
        </Avatar>
        {/* User Info & Message */}
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-foreground">{shoutout.user}</p>
            <p className="text-xs text-muted-foreground">{shoutout.timestamp}</p>
          </div>
          {/* Message Content */}
          <p className="mt-1 text-sm text-foreground/90 leading-snug whitespace-pre-wrap break-words"> {/* Ensure line breaks are respected */}
            {shoutout.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
