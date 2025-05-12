import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, Zap } from 'lucide-react'; // Changed icon

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl font-bold tracking-tight text-foreground">
          Welcome to Zenith Zone {/* Updated App Name */}
        </h1>
        <p className="text-2xl text-muted-foreground">
          Your sanctuary to unwind, recharge, and find a moment of calm.
        </p>
        <div className="mt-10">
          <Link href="/relax">
            {/* Button uses primary colors from the theme */}
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Zap className="mr-2 h-5 w-5" /> {/* Changed icon */}
              Enter the Zone
            </Button>
          </Link>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Find memes, motivation, and community positivity inside.
        </p>
      </div>
    </main>
  );
}
