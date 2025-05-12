// src/app/relax/breathe/page.tsx
'use client'; // BreathingExercise is a client component

import BreathingExercise from '@/components/relax-zone/breathing-exercise';
import type { FC } from 'react';

/**
 * Page for displaying the Guided Breathing Exercise.
 * This is a new main tab in the Relax Zone.
 */
const BreathePage: FC = () => {
  return <BreathingExercise />;
};

export default BreathePage;
```