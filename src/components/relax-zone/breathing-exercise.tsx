// src/components/relax-zone/breathing-exercise.tsx
'use client';

import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A simple guided breathing exercise component.
 */
const BreathingExercise: FC = () => {
  const [instruction, setInstruction] = useState<string>("Get Ready...");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const animationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cycleDuration = { inhale: 4000, hold: 4000, exhale: 6000 }; // ms
  const totalCycleTime = cycleDuration.inhale + cycleDuration.hold + cycleDuration.exhale;

  const startAnimation = () => {
    setIsAnimating(true);
    // runCycle will be triggered by the useEffect watching isAnimating
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Keep current instruction but pause animation visually
    if (animationRef.current) {
        animationRef.current.style.animationPlayState = 'paused';
    }
  };

  const resetAnimation = () => {
      pauseAnimation(); // Ensure timers are cleared and state is false
      setPhase('ready');
      setInstruction("Get Ready...");
      // Clear animation styles to reset visual state
      if (animationRef.current) {
          animationRef.current.style.animation = 'none';
          // Force reflow might not be strictly necessary but ensures reset
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const reflow = animationRef.current.offsetHeight;
          animationRef.current.removeAttribute('style'); // Remove all inline styles including play state
      }
  };


  const runCycle = () => {
    // This function should only be called when isAnimating is true
    if (!isAnimating) return;

    setPhase('inhale');
    setInstruction("Breathe In...");
    if (animationRef.current) {
      animationRef.current.style.animation = `breath-inhale ${cycleDuration.inhale / 1000}s ease-out forwards`;
      animationRef.current.style.animationPlayState = 'running';
    }

    timerRef.current = setTimeout(() => {
      if (!isAnimating) return; // Check again in case paused during timeout
      setPhase('hold');
      setInstruction("Hold...");
      // No visual change needed, inhale animation already set 'forwards'

      timerRef.current = setTimeout(() => {
        if (!isAnimating) return; // Check again
        setPhase('exhale');
        setInstruction("Breathe Out...");
        if (animationRef.current) {
          animationRef.current.style.animation = `breath-exhale ${cycleDuration.exhale / 1000}s ease-in forwards`;
          animationRef.current.style.animationPlayState = 'running';
        }

        timerRef.current = setTimeout(() => {
          if (!isAnimating) return; // Check again before looping
          // Loop back
          runCycle();
        }, cycleDuration.exhale);
      }, cycleDuration.hold);
    }, cycleDuration.inhale);
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

   // Control animation based on isAnimating state
   useEffect(() => {
    if (isAnimating) {
      if (animationRef.current?.style.animationPlayState === 'paused') {
        // Resume animation if previously paused
         animationRef.current.style.animationPlayState = 'running';
      } else {
        // Start cycle if not already running or paused
        runCycle();
      }
    } else {
      // Pause animation if isAnimating becomes false
      pauseAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAnimating]); // Depend only on isAnimating

  return (
    <section aria-labelledby="breathing-exercise-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle id="breathing-exercise-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <Wind className="h-5 w-5 text-muted-foreground" /> Guided Breathing
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-8 flex flex-col items-center justify-center min-h-[350px]">
          {/* Visual Animation */}
          <div className="relative w-48 h-48 flex items-center justify-center">
             {/* Static Outer Circle */}
             <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
             {/* Animated Inner Circle */}
             <div
                ref={animationRef}
                className={cn(
                    "w-1/2 h-1/2 bg-primary/70 rounded-full",
                    // Apply initial state style if not ready (e.g., scale(0.5))
                    phase === 'ready' || phase === 'exhale' ? 'scale-[0.5] opacity-70' : 'scale-[1] opacity-100'
                 )}
                 style={{
                    // Inline styles are now primarily managed by the runCycle function setting animation property
                    // Transition for smooth reset/initial state
                    transition: phase === 'ready' ? 'transform 0.3s ease, opacity 0.3s ease' : 'none',
                 }}
             ></div>
           </div>

           {/* Instruction Text */}
           <p className="text-2xl font-medium text-foreground text-center h-8">
             {instruction}
           </p>

          {/* Controls */}
          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={isAnimating ? pauseAnimation : startAnimation}
              className="border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              aria-label={isAnimating ? 'Pause breathing exercise' : 'Start breathing exercise'}
            >
              {isAnimating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
             <Button
              variant="outline"
              size="icon"
              onClick={resetAnimation}
              className="border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              aria-label="Reset breathing exercise"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Keyframes defined globally needed for animation */}
      <style jsx global>{`
        @keyframes breath-inhale {
          from { transform: scale(0.5); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes breath-exhale {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.5); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
};

export default BreathingExercise;
