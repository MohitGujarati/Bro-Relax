import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'; // Using a more common "entry" icon

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-background">
      <div className="text-center space-y-8 max-w-3xl"> {/* Increased max-width slightly */}
        <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-foreground"> {/* Adjusted font weight and size */}
          Relax Bro
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed"> {/* Improved leading for readability */}
          Your sanctuary to unwind, recharge, and find a moment of calm. Discover memes, motivation, and community positivity.
        </p>
        <div className="mt-12">
          <Link href="/relax/memes"> {/* Default to memes tab */}
            <Button
              variant="default" // Use default variant which is now white text on black (or vice versa depending on theme)
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg text-base font-medium" // Ensure button stands out
            >
              Enter the Zone
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        {/* Removed redundant message, main description covers it */}
      </div>
    </main>
  );
}
