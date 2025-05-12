export interface Meme {
  id: string;
  imageUrl: string;
  altText: string;
  dataAiHint: string;
  initialLikes: number;
  initialDislikes: number;
}

export const memes: Meme[] = [
  {
    id: 'meme1',
    imageUrl: 'https://picsum.photos/seed/jobhunt/600/400',
    altText: 'Funny meme about job hunting',
    dataAiHint: 'job hunting',
    initialLikes: 15,
    initialDislikes: 2,
  },
  {
    id: 'meme2',
    imageUrl: 'https://picsum.photos/seed/workcat/600/400',
    altText: 'Cat working on a laptop meme',
    dataAiHint: 'cat work',
    initialLikes: 22,
    initialDislikes: 1,
  },
  {
    id: 'meme3',
    imageUrl: 'https://picsum.photos/seed/coffee/600/400',
    altText: 'Meme about needing coffee',
    dataAiHint: 'coffee programming',
    initialLikes: 30,
    initialDislikes: 0,
  },
  {
    id: 'meme4',
    imageUrl: 'https://picsum.photos/seed/relax/600/400',
    altText: 'Meme about relaxation',
    dataAiHint: 'relax chill',
    initialLikes: 18,
    initialDislikes: 3,
  },
];

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

export interface Shoutout {
  id: string;
  user: string;
  avatarFallback: string;
  message: string;
  timestamp: string;
}

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

export const relaxingMusicUrl = "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0&mute=1"; // Generic relaxing music, muted by default
