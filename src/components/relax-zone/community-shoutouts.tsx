
'use client'; // Needs state for messages, form input, and uses hooks like useRef and useToast.

import type { FC } from 'react';
import { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, MessageSquarePlus } from 'lucide-react'; // Changed Icon
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Use Card for structure

/**
 * Displays community shoutouts and allows users to post messages, styled like a feed section.
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
      id: `shoutout-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // More unique ID
      user: 'You', // Placeholder
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
    // Keep focus on the textarea after posting for quick successive posts
    // textareaRef.current?.focus(); // Optional: re-focus after post
  };

  return (
    <section aria-labelledby="community-shoutouts-title">
       {/* Use Card for overall structure */}
       <Card className="shadow-lg bg-card border-border overflow-hidden">
        <CardHeader className="pb-4">
            <CardTitle id="community-shoutouts-title" className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5 text-primary" /> Community Positivity
            </CardTitle>
            {/* Optional: Add a description if needed */}
            {/* <CardDescription>Share and read uplifting messages.</CardDescription> */}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* New Message Form - Styled within the card */}
          <form onSubmit={handlePostMessage} className="space-y-3">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share something positive..."
              className="min-h-[80px] focus:ring-primary focus-visible:ring-primary bg-input border-border text-sm" // Adjusted style
              aria-label="New shoutout message"
              rows={3}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 mr-1.5" /> Post
              </Button>
            </div>
          </form>

          {/* Separator between form and list */}
          {/* <Separator className="my-4" /> */}

          {/* Display Area for Shoutouts */}
          {shoutouts.length > 0 ? (
            // Use ScrollArea for potentially long lists of shoutouts
            // Limit height and add styling for better integration
            <ScrollArea className="h-[450px] border rounded-lg border-border bg-muted/20 p-1">
              <div className="space-y-3 p-3"> {/* Added padding inside scroll area */}
                {shoutouts.map((shoutout) => (
                  <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            // Message displayed when there are no shoutouts
            <div className="text-center py-6 border rounded-lg border-dashed border-border bg-muted/20">
                <p className="text-muted-foreground text-sm">No messages yet.</p>
                <p className="text-muted-foreground text-sm mt-1">Be the first to share something positive!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default CommunityShoutouts;
