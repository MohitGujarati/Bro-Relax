'use client'; // Simple display component, but uses client components (Avatar), safe as client component.

import type { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Shoutout } from '@/lib/relax-zone-constants';

interface ShoutoutCardProps {
  shoutout: Shoutout; // Defines the expected data structure for a shoutout
}

/**
 * Displays a single community shoutout message in a card format.
 * Includes user avatar (fallback), name, timestamp, and message content.
 */
const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    <Card className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 border-border">
      <CardHeader className="flex flex-row items-center space-x-3 pb-3">
        {/* User Avatar - Updated styles */}
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">{shoutout.avatarFallback}</AvatarFallback>
        </Avatar>
        {/* User Info */}
        <div>
          <CardTitle className="text-base font-semibold text-card-foreground">{shoutout.user}</CardTitle>
          <p className="text-xs text-muted-foreground">{shoutout.timestamp}</p>
        </div>
      </CardHeader>
      {/* Message Content */}
      <CardContent className="pb-4 pt-0"> {/* Adjusted padding for better spacing */}
        <p className="text-sm text-card-foreground leading-relaxed">{shoutout.message}</p>
      </CardContent>
      {/* CardFooter is removed as it was empty */}
    </Card>
  );
};

export default ShoutoutCard;
