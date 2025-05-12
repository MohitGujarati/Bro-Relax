'use client';

import type { FC } from 'react';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunityShoutouts: FC = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setShoutouts(initialShoutouts); 
  }, []);

  const handlePostMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      toast({
        title: "Empty Message",
        description: "Please write something to post.",
        variant: "destructive",
      });
      textareaRef.current?.focus();
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
      title: "Message Shared!",
      description: "Your positivity is out there.",
    });
  };
  
  if (!isClient) {
    return (
        <Card className="w-full max-w-md mx-auto"> {/* Card will be glassmorphic */}
            <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-xl font-medium text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" /> Community Vibes
                </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
                 <div className="h-20 w-full bg-muted/20 rounded-md animate-pulse"></div>
                 <div className="h-10 w-1/3 ml-auto bg-muted/20 rounded-md animate-pulse"></div>
                 <div className="h-64 w-full bg-muted/10 rounded-md animate-pulse"></div>
            </CardContent>
        </Card>
    );
  }

  return (
    <section aria-labelledby="community-shoutouts-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      {/* Card will be glassmorphic due to ui/card.tsx change */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle id="community-shoutouts-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" /> Community Vibes
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-5 space-y-4">
          <form onSubmit={handlePostMessage} className="space-y-3">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share something positive..."
              // Input field will use --input-hsl which is semi-transparent dark gray, with backdrop-blur for glass effect
              className="min-h-[80px] bg-input backdrop-blur-sm border-border/70 focus:border-primary/50 text-sm rounded-lg placeholder:text-muted-foreground"
              aria-label="New shoutout message"
              rows={3}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md text-xs">
                <Send className="h-3.5 w-3.5 mr-1.5" /> Post
              </Button>
            </div>
          </form>

          <div className="pt-2">
            {shoutouts.length > 0 ? (
              // ScrollArea with a slightly transparent dark background to complement glassmorphism
              <ScrollArea className="h-[350px] sm:h-[400px] border border-border/30 rounded-lg bg-black/20 backdrop-blur-sm p-1">
                <div className="space-y-2.5 p-2.5">
                  {shoutouts.map((shoutout) => (
                    <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-10 border border-dashed border-border/40 rounded-lg bg-black/20 backdrop-blur-sm">
                <p className="text-muted-foreground text-sm">No messages yet.</p>
                <p className="text-muted-foreground text-xs mt-1">Be the first to share something positive!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CommunityShoutouts;