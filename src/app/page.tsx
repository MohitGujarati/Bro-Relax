import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-background via-muted to-background">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight text-primary">
          Welcome to Career Navigator
        </h1>
        <p className="text-2xl text-muted-foreground">
          Your AI-powered guide to navigating the job market.
        </p>
        <div className="mt-10">
          <Link href="/relax">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Coffee className="mr-2 h-5 w-5" />
              Visit the Zenith Zone (Relax Area)
            </Button>
          </Link>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          This is a starter Next.js application. The Relax Zone is a newly added feature.
        </p>
      </div>
    </main>
  );
}
