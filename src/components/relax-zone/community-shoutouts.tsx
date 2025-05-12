// src/components/relax-zone/community-shoutouts.tsx
'use client';

import type { FC } from 'react';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Added CardDescription, CardFooter

const CommunityShoutouts: FC = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

  useEffect(() => {
    setIsClient(true);
    // Simulate fetching data
    setTimeout(() => {
        setShoutouts(initialShoutouts);
    }, 500); // Short delay to show loading state
  }, []);

  const handlePostMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isSubmitting) {
      if (newMessage.trim() === '') {
        toast({
          title: "Empty Message",
          description: "Please write something positive to share.",
          variant: "destructive",
        });
        textareaRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true); // Disable button

    const newShoutout: Shoutout = {
      id: `shoutout-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user: 'You',
      avatarFallback: '😊',
      message: newMessage,
      timestamp: 'Just now',
    };

    // Simulate API call delay
    setTimeout(() => {
      setShoutouts(prevShoutouts => [newShoutout, ...prevShoutouts]);
      setNewMessage('');
      toast({
        title: "Message Shared!",
        description: "Your positivity is lighting up the zone.",
      });
      setIsSubmitting(false); // Re-enable button
    }, 300);
  };

  // Skeleton Loader Component
  const CommunityShoutoutsSkeleton: FC = () => (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-xl font-medium text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" /> Community Vibes
        </CardTitle>
         <CardDescription className="text-sm text-muted-foreground pt-1">
            Loading messages...
         </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pt-4 pb-0">
        {/* Skeleton for Input Form */}
        <div className="space-y-3 mb-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <div className="flex justify-end">
             <Skeleton className="h-9 w-24 rounded-md" />
            </div>
        </div>
         {/* Skeleton for Shoutout List */}
        <Skeleton className="h-[350px] sm:h-[400px] w-full rounded-lg p-3.5" >
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-muted/10 p-3 rounded-lg">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                             <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                ))}
            </div>
        </Skeleton>
      </CardContent>
       <CardFooter className="p-5"></CardFooter> {/* Empty footer for consistent spacing */}
    </Card>
  );

  if (!isClient) {
     // Render skeleton on server and initial client render
    return <CommunityShoutoutsSkeleton />;
  }

  return (
    <section aria-labelledby="community-shoutouts-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      {/* Card styling */}
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle id="community-shoutouts-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" /> Community Vibes
          </CardTitle>
           <CardDescription className="text-sm text-muted-foreground pt-1">
              Share your positive thoughts and see what others are saying.
           </CardDescription>
        </CardHeader>

        {/* Form moved inside CardContent for better structure */}
        <CardContent className="px-5 pt-4 pb-0">
          <form onSubmit={handlePostMessage} className="space-y-3 mb-4">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share something positive..."
              className="min-h-[80px] bg-input/50 backdrop-blur-sm border-border/40 focus:border-primary/50 text-sm rounded-lg placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/30" // Subtle focus ring
              aria-label="New shoutout message"
              rows={3}
              disabled={isSubmitting} // Disable while submitting
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md text-xs transition-opacity duration-200" disabled={isSubmitting || newMessage.trim() === ''}>
                {isSubmitting ? (
                     <>
                     <span className="animate-spin h-3.5 w-3.5 mr-1.5 border-2 border-background border-t-transparent rounded-full"></span>
                     Posting...
                     </>
                ) : (
                    <>
                     <Send className="h-3.5 w-3.5 mr-1.5" /> Post
                     </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        {/* Shoutout List */}
        <CardContent className="px-5 pb-5">
          <div className="pt-2">
            {shoutouts.length > 0 ? (
              // ScrollArea styling
              <ScrollArea className="h-[350px] sm:h-[400px] border border-border/20 rounded-lg bg-black/5 backdrop-blur-sm p-1">
                <div className="space-y-2.5 p-2.5">
                  {shoutouts.map((shoutout) => (
                    <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-10 border border-dashed border-border/30 rounded-lg bg-black/5 backdrop-blur-sm min-h-[200px] flex flex-col justify-center items-center">
                <p className="text-muted-foreground text-sm">The community is quiet...</p>
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