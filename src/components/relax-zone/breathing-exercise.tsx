// src/components/relax-zone/breathing-exercise.tsx
'use client';

import type { FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import { cn } from '@/lib/utils';

/**
 * A guided breathing exercise component with specific timing (8s inhale, 6s hold, 6s exhale).
 */
const BreathingExercise: FC = () => {
  const [instruction, setInstruction] = useState<string>("Get Ready...");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [countdown, setCountdown] = useState<number | null>(null); // For displaying timer
  const animationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // For countdown interval

  // Updated timings: 8s inhale, 6s hold, 6s exhale
  const cycleDuration = { inhale: 8000, hold: 6000, exhale: 6000 };
  // Total cycle time is 20 seconds

  const startCountdown = (durationSeconds: number) => {
    setCountdown(durationSeconds);
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear previous interval
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = null;
    intervalRef.current = null;
    setCountdown(null);
  };

  const runCycle = useCallback(() => {
    // Ensure timers are clear before starting a new phase
    clearTimers();

    setPhase('inhale');
    setInstruction("Breathe In...");
    startCountdown(cycleDuration.inhale / 1000);
    if (animationRef.current) {
      animationRef.current.style.animation = `breath-inhale ${cycleDuration.inhale / 1000}s ease-out forwards`;
      animationRef.current.style.animationPlayState = 'running';
    }

    timerRef.current = setTimeout(() => {
      // Check if still animating before proceeding
       if (!isAnimatingRef.current) { clearTimers(); return; }

      setPhase('hold');
      setInstruction("Hold...");
      startCountdown(cycleDuration.hold / 1000);
      // Inhale animation already set 'forwards', visual stays expanded

      timerRef.current = setTimeout(() => {
         if (!isAnimatingRef.current) { clearTimers(); return; }

        setPhase('exhale');
        setInstruction("Breathe Out...");
        startCountdown(cycleDuration.exhale / 1000);
        if (animationRef.current) {
          animationRef.current.style.animation = `breath-exhale ${cycleDuration.exhale / 1000}s ease-in forwards`;
          animationRef.current.style.animationPlayState = 'running';
        }

        timerRef.current = setTimeout(() => {
           if (!isAnimatingRef.current) { clearTimers(); return; }
          // Loop back
          runCycle();
        }, cycleDuration.exhale);
      }, cycleDuration.hold);
    }, cycleDuration.inhale);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleDuration.inhale, cycleDuration.hold, cycleDuration.exhale]); // Add dependencies

  // Use a ref for isAnimating inside timeouts/intervals to get the latest value
  const isAnimatingRef = useRef(isAnimating);
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);


  const startAnimation = () => {
    setIsAnimating(true);
    // runCycle will be triggered by the useEffect watching isAnimating
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
    clearTimers();
    // Keep current instruction but pause animation visually
    if (animationRef.current) {
        animationRef.current.style.animationPlayState = 'paused';
    }
  };

  const resetAnimation = () => {
      setIsAnimating(false); // Set animating state to false
      clearTimers(); // Ensure timers are cleared
      setPhase('ready');
      setInstruction("Get Ready...");
      setCountdown(null); // Reset countdown display
      // Clear animation styles to reset visual state
      if (animationRef.current) {
          animationRef.current.style.animation = 'none';
          // Force reflow might not be strictly necessary but ensures reset
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const reflow = animationRef.current.offsetHeight;
          animationRef.current.removeAttribute('style'); // Remove all inline styles including play state
      }
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

   // Control animation based on isAnimating state
   useEffect(() => {
    if (isAnimating) {
      // Determine if resuming or starting fresh
      const playState = animationRef.current?.style.animationPlayState;
      if (playState === 'paused') {
        // Resume animation and restart countdown for the current phase
        if (animationRef.current) animationRef.current.style.animationPlayState = 'running';
         const currentPhaseDuration = phase === 'inhale' ? cycleDuration.inhale : phase === 'hold' ? cycleDuration.hold : phase === 'exhale' ? cycleDuration.exhale : 0;
         // Resume countdown - this might be slightly off depending on pause timing, simple restart is easier
         if(phase !== 'ready') startCountdown(Math.ceil(currentPhaseDuration / 1000)); // Restart countdown for current phase
      } else if (phase === 'ready'){
        // Start the cycle only if in ready state or just toggled on
        runCycle();
      }
    } else {
      // Pause animation if isAnimating becomes false
      pauseAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAnimating, runCycle]); // Add runCycle to dependencies


  const getProgressValue = () => {
      if (!isAnimating || countdown === null) return 0;
      let duration = 0;
      switch(phase) {
          case 'inhale': duration = cycleDuration.inhale / 1000; break;
          case 'hold': duration = cycleDuration.hold / 1000; break;
          case 'exhale': duration = cycleDuration.exhale / 1000; break;
          default: return 0;
      }
      if (duration === 0) return 0;
      // Calculate remaining percentage
      return ((duration - countdown + 1) / duration) * 100;
  };


  return (
    <section aria-labelledby="breathing-exercise-title" className="w-full max-w-md mx-auto px-2 sm:px-0 py-6">
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle id="breathing-exercise-title" className="text-xl font-medium text-foreground flex items-center gap-2">
            <Wind className="h-5 w-5 text-muted-foreground" /> Guided Breathing (8-6-6)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-6 flex flex-col items-center justify-center min-h-[400px]"> {/* Increased min-height slightly */}
          {/* Visual Animation */}
          <div className="relative w-48 h-48 flex items-center justify-center">
             {/* Static Outer Circle */}
             <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
             {/* Animated Inner Circle */}
             <div
                ref={animationRef}
                className={cn(
                    "w-1/2 h-1/2 bg-primary/70 rounded-full",
                    // Apply initial state style based on phase
                    phase === 'ready' || phase === 'exhale' ? 'scale-[0.5] opacity-70' : 'scale-[1] opacity-100'
                 )}
                 style={{
                    // Inline styles are now primarily managed by the runCycle function setting animation property
                    transition: phase === 'ready' ? 'transform 0.3s ease, opacity 0.3s ease' : 'none',
                 }}
             ></div>
           </div>

           {/* Instruction Text and Timer */}
           <div className="text-center h-16 flex flex-col justify-center items-center"> {/* Added fixed height */}
                <p className="text-2xl font-medium text-foreground">
                {instruction}
                </p>
                {countdown !== null && isAnimating && (
                 <p className="text-4xl font-light text-muted-foreground tabular-nums mt-1">
                    {countdown}s
                 </p>
                )}
                {/* Placeholder for when not animating or in ready state */}
                 {(!isAnimating || countdown === null) && <div className="h-[40px] mt-1"></div>} {/* Match height of timer */}
           </div>

           {/* Progress Bar - Optional visual indicator */}
           {isAnimating && phase !== 'ready' && (
             <Progress
                value={getProgressValue()}
                className="w-3/4 h-1.5 bg-muted/30"
                aria-label={`Progress for ${phase} phase`}
            />
           )}
           {/* Placeholder for progress bar space when not animating */}
            {(!isAnimating || phase === 'ready') && <div className="w-3/4 h-1.5"></div>}


          {/* Controls */}
          <div className="flex gap-4 mt-2"> {/* Reduced margin-top slightly */}
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
       {/* Keyframes remain the same, durations are applied via inline style */}
    </section>
  );
};

export default BreathingExercise;
