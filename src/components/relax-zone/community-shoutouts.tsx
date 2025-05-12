"use client";

import type { FC } from 'react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const CommunityShoutouts: FC = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(initialShoutouts);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      toast({
        title: "Empty Message",
        description: "Please write something to post.",
        variant: "destructive",
      });
      return;
    }

    const newShoutout: Shoutout = {
      id: `shoutout-${Date.now()}`,
      user: 'You',
      avatarFallback: '😊',
      message: newMessage,
      timestamp: 'Just now',
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setNewMessage('');
    toast({
      title: "Shoutout Posted!",
      description: "Your message is now live in the community.",
    });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <section aria-labelledby="community-shoutouts-title">
      <div className="text-center mb-8">
        <h2 id="community-shoutouts-title" className="text-3xl font-semibold tracking-tight text-accent-foreground flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-accent" /> Community Shoutouts
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">Share some positivity, read uplifting messages.</p>
      </div>

      <div className="bg-background p-6 rounded-lg shadow-lg border border-border">
        <form onSubmit={handlePostMessage} className="mb-8 space-y-4">
          <Textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share a motivational message or positive thought..."
            className="min-h-[100px] focus:ring-primary"
            aria-label="New shoutout message"
          />
          <Button type="submit" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="h-4 w-4 mr-2" /> Post Message
          </Button>
        </form>

        <h3 className="text-xl font-medium mb-4 text-muted-foreground">Latest Shoutouts:</h3>
        {shoutouts.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4 -mr-4"> {/* Added pr-4 and -mr-4 to compensate for scrollbar */}
            <div className="space-y-4">
              {shoutouts.map((shoutout) => (
                <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-center py-4">No shoutouts yet. Be the first to post!</p>
        )}
      </div>
    </section>
  );
};

export default CommunityShoutouts;
