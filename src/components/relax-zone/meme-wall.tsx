'use client'; // This component renders a list based on imported data, no server-specific logic needed.

import type { FC } from 'react';
import { memes } from '@/lib/relax-zone-constants';
import MemeCard from './meme-card';

/**
 * Displays a grid of memes fetched from the constants file.
 * It maps over the meme data and renders a MemeCard for each.
 */
const MemeWall: FC = () => {
  return (
    <section aria-labelledby="meme-wall-title">
      <div className="text-center mb-8">
        {/* Updated title color */}
        <h2 id="meme-wall-title" className="text-3xl font-semibold tracking-tight text-foreground">Meme Wall</h2>
        <p className="mt-2 text-lg text-muted-foreground">Have a laugh, you deserve it!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </section>
  );
};

export default MemeWall;
