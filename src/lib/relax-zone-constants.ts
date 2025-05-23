
/**
 * @fileoverview Defines constants and types used in the Relax Zone feature.
 * This includes sample data for memes, quotes, and community shoutouts.
 */

/**
 * Interface defining the structure for a Meme object.
 */
export interface Meme {
  id: string;             // Unique identifier for the meme
  imageUrl: string;       // URL of the meme image
  altText: string;        // Alt text for accessibility
  dataAiHint: string;     // Keywords for AI image search/generation (max 2 words)
  initialLikes: number;   // Starting number of likes
  initialDislikes: number;// Starting number of dislikes
}

/**
 * An array of sample Meme objects used to populate the Meme Wall.
 */
export const memes: Meme[] = [

  {
    id: 'meme0',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png',
    altText: 'Van cat sitting proudly',
    initialLikes: 12,
    initialDislikes: 1,
    dataAiHint: 'white cat with odd eyes',
  }
,  
  {
    id: 'meme1',
    imageUrl: 'https://picsum.photos/seed/jobhunt/600/400',
    altText: 'Funny meme about job hunting stress',
    dataAiHint: 'job hunting',
    initialLikes: 15,
    initialDislikes: 2,
  },
  {
    id: 'meme2',
    imageUrl: 'https://picsum.photos/seed/workcat/600/400',
    altText: 'Cat looking tired while working on a laptop meme',
    dataAiHint: 'cat work',
    initialLikes: 22,
    initialDislikes: 1,
  },
  {
    id: 'meme3',
    imageUrl: 'https://picsum.photos/seed/coffee/600/400',
    altText: 'Illustration showing stages of programmer needing coffee',
    dataAiHint: 'coffee programming',
    initialLikes: 30,
    initialDislikes: 0,
  },
  {
    id: 'meme4',
    imageUrl: 'https://picsum.photos/seed/relax/600/400',
    altText: 'Person relaxing peacefully in a hammock meme style',
    dataAiHint: 'relax chill',
    initialLikes: 18,
    initialDislikes: 3,
  },
 
];

/**
 * An array of motivational quotes for display.
 */
export const motivationalQuotes: string[] = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction."
];

/**
 * Interface defining the structure for a Community Shoutout object.
 */
export interface Shoutout {
  id: string;             // Unique identifier for the shoutout
  user: string;           // Name of the user posting the shoutout
  avatarFallback: string; // Fallback text/initials for the avatar
  message: string;        // The content of the shoutout message
  timestamp: string;      // Relative time when the shoutout was posted (e.g., "2 hours ago")
}

/**
 * An array of sample Shoutout objects used to populate the Community Shoutouts section.
 */
export const communityShoutouts: Shoutout[] = [
  {
    id: 'shoutout1',
    user: 'Alex P.',
    avatarFallback: 'AP',
    message: "Keep pushing, everyone! Your hard work will pay off. ✨",
    timestamp: "2 hours ago",
  },
  {
    id: 'shoutout2',
    user: 'Sarah K.',
    avatarFallback: 'SK',
    message: "Don't forget to take breaks and celebrate small wins! You got this! 💪",
    timestamp: "5 hours ago",
  },
  {
    id: 'shoutout3',
    user: 'Mike B.',
    avatarFallback: 'MB',
    message: "Networking is key! Reach out and connect. Opportunities are everywhere.",
    timestamp: "1 day ago",
  },
  {
    id: 'shoutout4',
    user: 'Jessica L.',
    avatarFallback: 'JL',
    message: "Feeling a bit down today but seeing your positive messages helps a lot! Thanks community! ❤️",
    timestamp: "3 days ago",
  },
  {
    id: 'shoutout5',
    user: 'Chris T.',
    avatarFallback: 'CT',
    message: "Just landed an interview! Persistence is everything. Don't give up!",
    timestamp: "1 week ago",
  },
];

/**
 * The URL for the embedded relaxing music player (YouTube video).
 * Includes parameters to prevent autoplay and start muted.
 */
export const relaxingMusicUrl = "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0&mute=1";
