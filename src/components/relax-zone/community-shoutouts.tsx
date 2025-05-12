'use client'; // Needs state for messages, form input, and uses hooks like useRef and useToast.

import type { FC } from 'react';
import { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { communityShoutouts as initialShoutouts, type Shoutout } from '@/lib/relax-zone-constants';
import ShoutoutCard from './shoutout-card';
import { Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Displays a list of community messages (shoutouts) and allows users
 * to post their own messages. Manages the list of shoutouts in local state.
 */
const CommunityShoutouts: FC = () => {
  // State to hold the list of shoutouts, initialized with data from constants
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(initialShoutouts);
  // State to hold the content of the new message input field
  const [newMessage, setNewMessage] = useState('');
  // Hook to display notifications (toasts)
  const { toast } = useToast();
  // Ref to access the textarea DOM element directly (e.g., for focusing)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handles the submission of the new message form
  const handlePostMessage = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    // Basic validation: check if the message is empty
    if (newMessage.trim() === '') {
      toast({
        title: "Empty Message",
        description: "Please write something to post.",
        variant: "destructive", // Use destructive variant for errors
      });
      return; // Stop execution if message is empty
    }

    // Create a new shoutout object
    const newShoutout: Shoutout = {
      id: `shoutout-${Date.now()}`, // Generate a simple unique ID
      user: 'You', // Placeholder for the current user
      avatarFallback: '😊', // Placeholder avatar
      message: newMessage,
      timestamp: 'Just now', // Placeholder timestamp
    };

    // Update the shoutouts state: add the new shoutout to the beginning of the list
    setShoutouts(prevShoutouts => [newShoutout, ...prevShoutouts]);
    // Clear the input field
    setNewMessage('');
    // Show a success toast
    toast({
      title: "Shoutout Posted!",
      description: "Your message is now live in the community.",
    });
    // Optionally, focus the textarea again after posting
    textareaRef.current?.focus();
  };

  return (
    <section aria-labelledby="community-shoutouts-title">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 id="community-shoutouts-title" className="text-3xl font-semibold tracking-tight text-foreground flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-primary" /> Community Shoutouts
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">Share some positivity, read uplifting messages.</p>
      </div>

      {/* Main content container */}
      <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
        {/* New Message Form */}
        <form onSubmit={handlePostMessage} className="mb-8 space-y-4">
          <Textarea
            ref={textareaRef} // Attach the ref to the textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // Update state on input change
            placeholder="Share a motivational message or positive thought..."
            className="min-h-[100px] focus:ring-primary focus-visible:ring-primary bg-input border-border" // Ensure focus ring uses primary color and consistent background
            aria-label="New shoutout message"
            rows={3} // Suggest a reasonable initial height
          />
          {/* Updated button style */}
          <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2" /> Post Message
          </Button>
        </form>

        {/* Display Area for Shoutouts */}
        <h3 className="text-xl font-medium mb-4 text-muted-foreground">Latest Shoutouts:</h3>
        {shoutouts.length > 0 ? (
          // Use ScrollArea for potentially long lists of shoutouts
          <ScrollArea className="h-[400px] pr-4 -mr-4 border rounded-md border-border"> {/* Added border for visual clarity */}
            <div className="space-y-4 p-4"> {/* Added padding inside scroll area */}
              {shoutouts.map((shoutout) => (
                <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          // Message displayed when there are no shoutouts
          <p className="text-muted-foreground text-center py-4">No shoutouts yet. Be the first to post!</p>
        )}
      </div>
    </section>
  );
};

export default CommunityShoutouts;
