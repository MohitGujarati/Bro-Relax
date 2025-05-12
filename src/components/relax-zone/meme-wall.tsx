
'use client'; // This component renders a list based on imported data, no server-specific logic needed.

import type { FC } from 'react';
import { memes } from '@/lib/relax-zone-constants';
import MemeCard from './meme-card';
import { Laugh } from 'lucide-react'; // Added icon

/**
 * Displays a grid of memes fetched from the constants file.
 * It maps over the meme data and renders a MemeCard for each.
 * Styled for integration into a feed layout.
 */
const MemeWall: FC = () => {
  return (
    <section aria-labelledby="meme-wall-title">
      {/* Section Header - More integrated style */}
      <div className="mb-6">
        <h2 id="meme-wall-title" className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
           <Laugh className="h-5 w-5 text-primary" /> Meme Feed
        </h2>
         <p className="mt-1 text-sm text-muted-foreground">A little humor for your day.</p>
      </div>
      {/* Grid layout for memes */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6"> {/* Changed to single column for feed style */}
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </section>
  );
};

export default MemeWall;
