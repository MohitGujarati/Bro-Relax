
'use client'; // This component renders a list based on imported data, no server-specific logic needed.

import type { FC } from 'react';
import { memes } from '@/lib/relax-zone-constants';
import MemeCard from './meme-card';
import { Laugh } from 'lucide-react'; // Added icon

/**
 * Displays a grid (feed) of memes fetched from the constants file.
 * It maps over the meme data and renders a MemeCard for each.
 * Styled minimally for integration into a feed layout.
 */
const MemeWall: FC = () => {
  return (
    <section aria-labelledby="meme-wall-title">
      {/* Section Header - Minimal style */}
      <div className="mb-4"> {/* Reduced margin */}
        <h2 id="meme-wall-title" className="text-lg font-medium tracking-tight text-foreground flex items-center gap-2"> {/* Adjusted size */}
           <Laugh className="h-5 w-5 text-muted-foreground" /> {/* Muted icon color */}
           Meme Feed
        </h2>
         {/* Optional: Removed description for cleaner look */}
         {/* <p className="mt-1 text-sm text-muted-foreground">A little humor for your day.</p> */}
      </div>
      {/* Single column layout for feed style */}
      <div className="grid grid-cols-1 gap-6"> {/* Keep single column */}
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </section>
  );
};

export default MemeWall;
