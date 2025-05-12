import MemeWall from '@/components/relax-zone/meme-wall';
import MotivationBox from '@/components/relax-zone/motivation-box';
import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import MemeSubmissionForm from '@/components/relax-zone/meme-submission-form'; // Optional Bonus

export default function RelaxZonePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent-foreground/80">
            Zenith Zone
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your personal sanctuary. A space to unwind, recharge, and find a moment of peace amidst the hustle.
          </p>
        </header>

        <main className="max-w-5xl mx-auto space-y-16">
          <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <MemeWall />
          </div>
          
          <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <MotivationBox />
          </div>

          <div className="animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <CommunityShoutouts />
          </div>
          
          {/* Optional Bonus Feature */}
          <div className="animate-slideUp" style={{ animationDelay: '0.8s' }}>
            <MemeSubmissionForm />
          </div>
        </main>

        <footer className="text-center mt-20 py-8 border-t border-border">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Career Navigator. Keep shining.
          </p>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden for animation */
        }
      `}</style>
    </div>
  );
}
