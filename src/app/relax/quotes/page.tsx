// src/app/relax/quotes/page.tsx
'use client'; // MotivationBox is a client component

import MotivationBox from '@/components/relax-zone/motivation-box';
import type { FC } from 'react';

/**
 * Page for displaying Motivational Quotes.
 * This is one of the main tabs in the Relax Zone.
 */
const QuotesPage: FC = () => {
  return <MotivationBox />;
};

export default QuotesPage;
