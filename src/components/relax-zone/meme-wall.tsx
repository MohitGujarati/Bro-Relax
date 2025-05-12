'use client';

import type { FC } from 'react';
import { memes } from '@/lib/relax-zone-constants';
import MemeCard from './meme-card';
// Icon for section header, can be themed
// import { Image as ImageIcon } from 'lucide-react'; // Example icon

/**
 * Displays a responsive grid of memes.
 * Styled minimally for integration into a feed-like layout.
 */
const MemeWall: FC = () => {
  return (
    <section aria-labelledby="meme-wall-title" className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-6">
      {/* Section Header - Optional and minimal */}
      {/* <div className="mb-6 text-center">
        <h2 id="meme-wall-title" className="text-2xl font-medium text-foreground flex items-center justify-center gap-2">
           <ImageIcon className="h-6 w-6 text-muted-foreground" />
           Meme Feed
        </h2>
         <p className="mt-1 text-sm text-muted-foreground">A little humor for your day.</p>
      </div> */}
      
      {/* Responsive grid layout for memes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6"> {/* Adjusted for max 2 columns in most views for better focus */}
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </section>
  );
};

export default MemeWall;
