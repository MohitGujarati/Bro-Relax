"use client";

import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Shoutout } from '@/lib/relax-zone-constants';
import { MessageSquareText } from 'lucide-react';

interface ShoutoutCardProps {
  shoutout: Shoutout;
}

const ShoutoutCard: FC<ShoutoutCardProps> = ({ shoutout }) => {
  return (
    <Card className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-3 pb-3">
        <Avatar>
          {/* You can add real image URLs if available */}
          {/* <AvatarImage src={`https://github.com/${shoutout.user.toLowerCase()}.png`} alt={shoutout.user} /> */}
          <AvatarFallback className="bg-primary text-primary-foreground">{shoutout.avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold text-card-foreground">{shoutout.user}</CardTitle>
          <p className="text-xs text-muted-foreground">{shoutout.timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-card-foreground leading-relaxed">{shoutout.message}</p>
      </CardContent>
    </Card>
  );
};

export default ShoutoutCard;
