'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
type BreathingPhase = 'ready' | 'inhale' | 'hold' | 'exhale';
type BreathingDuration = Exclude<BreathingPhase, 'ready'>;

// Constants
const BREATHING_DURATIONS: Record<BreathingDuration, number> = {
  inhale: 8,
  hold: 6,
  exhale: 6,
} as const;

// Utility functions
const getInstruction = (phase: BreathingPhase): string => {
  const instructions = {
    inhale: 'Breathe In...',
    hold: 'Hold...',
    exhale: 'Release...',
    ready: 'Get Ready...',
  };
  return instructions[phase];
};

const calculateProgress = (phase: BreathingPhase, countdown: number): number => {
  if (phase === 'ready') return 0;
  const duration = BREATHING_DURATIONS[phase];
  return ((duration - countdown) / duration) * 100;
};

// Breathing Circle Component
const BreathingCircle: FC<{ phase: BreathingPhase }> = ({ phase }) => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
    <div
      className={cn(
        'w-1/2 h-1/2 bg-primary/70 rounded-full transition-transform duration-1000',
        {
          'scale-100': phase === 'inhale',
          'scale-75': phase === 'hold',
          'scale-50': phase === 'exhale' || phase === 'ready',
        }
      )}
    ></div>
  </div>
);

// Timer Display Component
const TimerDisplay: FC<{ isRunning: boolean; countdown: number; phase: BreathingPhase }> = ({ 
  isRunning, 
  countdown,
  phase 
}) => (
  <div className="text-center h-16 flex flex-col justify-center items-center">
    <p className="text-2xl font-medium text-foreground">{getInstruction(phase)}</p>
    {isRunning && <p className="text-4xl font-light text-muted-foreground tabular-nums mt-1">{countdown}s</p>}
    {!isRunning && <div className="h-[40px] mt-1"></div>}
  </div>
);

// Control Buttons Component
const ControlButtons: FC<{
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}> = ({ isRunning, onStart, onPause, onReset }) => (
  <div className="flex gap-4 mt-2">
    <Button
      variant="outline"
      size="icon"
      onClick={isRunning ? onPause : onStart}
      className="border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      aria-label={isRunning ? 'Pause breathing exercise' : 'Start breathing exercise'}
    >
      {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
    </Button>
    <Button
      variant="outline"
      size="icon"
      onClick={onReset}
      className="border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      aria-label="Reset breathing exercise"
    >
      <RotateCcw className="h-5 w-5" />
    </Button>
  </div>
);

// Main Component
const BreathingExercise: FC = () => {
  const [phase, setPhase] = useState<BreathingPhase>('ready');
  const [countdown, setCountdown] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Breathing phase management
  const startPhase = (newPhase: BreathingPhase, duration: number, next: () => void) => {
    clearInterval(intervalRef.current!);
    setPhase(newPhase);
    setCountdown(duration);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          next();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const inhale = () => startPhase('inhale', BREATHING_DURATIONS.inhale, hold);
  const hold = () => startPhase('hold', BREATHING_DURATIONS.hold, exhale);
  const exhale = () => startPhase('exhale', BREATHING_DURATIONS.exhale, inhale);

  // Control functions
  const start = () => {
    setIsRunning(true);
    inhale();
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setPhase('ready');
    setCountdown(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full max-w-md mx-auto px-2 sm:px-0 py-6 pb-24">
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-xl font-medium text-foreground flex items-center gap-2">
            <Wind className="h-5 w-5 text-muted-foreground" /> Guided Breathing (8-6-6)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-6 flex flex-col items-center justify-center min-h-[400px]">
          <BreathingCircle phase={phase} />
          
          <TimerDisplay 
            isRunning={isRunning} 
            countdown={countdown} 
            phase={phase}
          />

          {isRunning && phase !== 'ready' && (
            <Progress
              value={calculateProgress(phase, countdown)}
              className="w-3/4 h-1.5 bg-muted/30"
              aria-label={`Progress for ${phase}`}
            />
          )}
          {(!isRunning || phase === 'ready') && <div className="w-3/4 h-1.5"></div>}

          <ControlButtons
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default BreathingExercise;
