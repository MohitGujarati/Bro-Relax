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
    runCycle();
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
      pauseAnimation();
      setPhase('ready');
      setInstruction("Get Ready...");
      if (animationRef.current) {
          // Reset animation classes/styles if needed
           animationRef.current.style.animation = 'none'; // Remove animation to reset
           // Force reflow
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           const reflow = animationRef.current.offsetHeight;
           animationRef.current.style.animation = ''; // Re-add default or nothing
           animationRef.current.style.animationPlayState = 'running';
      }
  };

  const runCycle = () => {
    if (!isAnimating && phase !== 'ready') return; // Don't proceed if paused unless starting fresh

    setPhase('inhale');
    setInstruction("Breathe In...");
    timerRef.current = setTimeout(() => {
      setPhase('hold');
      setInstruction("Hold...");
      timerRef.current = setTimeout(() => {
        setPhase('exhale');
        setInstruction("Breathe Out...");
        timerRef.current = setTimeout(() => {
          // Loop back to inhale
          runCycle();
        }, cycleDuration.exhale);
      }, cycleDuration.hold);
    }, cycleDuration.inhale);
  };

  // Cleanup timer on component unmount or when animation stops definitively
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

   // Start animation when isAnimating becomes true
   useEffect(() => {
    if (isAnimating) {
        runCycle();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAnimating]);

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
                    "w-1/2 h-1/2 bg-primary/70 rounded-full transition-all duration-1000 ease-in-out",
                    isAnimating && phase === 'inhale' && 'animate-breath-inhale',
                    isAnimating && phase === 'hold' && 'animate-breath-hold', // Use scale from inhale end
                    isAnimating && phase === 'exhale' && 'animate-breath-exhale'
                 )}
                 style={{
                     animationDuration: `${cycleDuration.inhale / 1000}s, ${cycleDuration.hold / 1000}s, ${cycleDuration.exhale / 1000}s`,
                     animationPlayState: isAnimating ? 'running' : 'paused'
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
      {/* Keyframes defined globally or scoped needed for animation */}
      <style jsx global>{`
        @keyframes breath-inhale {
          from { transform: scale(0.5); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        /* Hold just maintains the 'to' state of inhale */
        @keyframes breath-exhale {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.5); opacity: 0.7; }
        }
        .animate-breath-inhale {
          animation-name: breath-inhale;
          animation-duration: ${cycleDuration.inhale / 1000}s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
         .animate-breath-hold {
           /* Keep the final state of inhale */
           transform: scale(1);
           opacity: 1;
        }
        .animate-breath-exhale {
          animation-name: breath-exhale;
          animation-duration: ${cycleDuration.exhale / 1000}s;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
          /* Start exhale animation after hold finishes */
          animation-delay: 0s; /* Managed by JS timeout */
        }
      `}</style>
    </section>
  );
};

export default BreathingExercise;

```