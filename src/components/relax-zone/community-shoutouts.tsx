
'use client'; // Needs state for messages, form input, and uses hooks like useRef and useToast.

import type { FC } from 'react';
import { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, MessageSquarePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Displays community shoutouts and allows users to post messages, styled minimally like a feed section.
 */
const CommunityShoutouts: FC = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(initialShoutouts);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePostMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      toast({
        title: "Empty Message",
        description: "Please write something to post.",
        variant: "destructive",
      });
      textareaRef.current?.focus(); // Focus textarea on error
      return;
    }

    const newShoutout: Shoutout = {
      id: `shoutout-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user: 'You',
      avatarFallback: '😊',
      message: newMessage,
      timestamp: 'Just now',
    };

    setShoutouts(prevShoutouts => [newShoutout, ...prevShoutouts]);
    setNewMessage('');
    toast({
      title: "Message Posted!",
      description: "Your positivity has been shared.",
    });
  };

  return (
    <section aria-labelledby="community-shoutouts-title">
       {/* Minimal Card styling */}
       <Card className="bg-card border border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-3 pt-4"> {/* Adjusted padding */}
            <CardTitle id="community-shoutouts-title" className="text-lg font-medium tracking-tight text-foreground flex items-center gap-2"> {/* Adjusted size */}
              <MessageSquarePlus className="h-5 w-5 text-muted-foreground" /> Community Positivity {/* Muted icon */}
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 px-5 pb-5 pt-0"> {/* Adjusted padding */}
          {/* New Message Form - Minimal style */}
          <form onSubmit={handlePostMessage} className="space-y-2.5">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share something positive..."
              // Minimal textarea style
              className="min-h-[70px] focus:ring-primary/50 focus-visible:ring-primary/50 bg-input border-border/70 text-sm rounded-md"
              aria-label="New shoutout message"
              rows={3}
            />
            <div className="flex justify-end">
              {/* Minimal button style */}
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 mr-1.5" /> Post
              </Button>
            </div>
          </form>

          {/* Display Area for Shoutouts */}
          {shoutouts.length > 0 ? (
            // Minimal ScrollArea style
            <ScrollArea className="h-[400px] border border-border/30 rounded-md bg-black/10 p-0.5">
              <div className="space-y-2 p-2.5"> {/* Adjusted spacing and padding */}
                {shoutouts.map((shoutout) => (
                  <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            // Message displayed when there are no shoutouts - Minimal style
            <div className="text-center py-8 border border-dashed border-border/40 rounded-md bg-black/10">
                <p className="text-muted-foreground text-sm">No messages yet.</p>
                <p className="text-muted-foreground text-sm mt-1">Be the first to share!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default CommunityShoutouts;
