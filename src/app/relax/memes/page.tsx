// src/app/relax/memes/page.tsx
'use client'; // MemeWall is a client component

import MemeWall from '@/components/relax-zone/meme-wall';
import type { FC } from 'react';

/**
 * Page for displaying the Meme Wall.
 * This is one of the main tabs in the Relax Zone.
 */
const MemesPage: FC = () => {
  return <MemeWall />;
};

export default MemesPage;
