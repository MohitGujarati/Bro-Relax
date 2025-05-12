// src/components/layout/bottom-navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Quote, UserRound } from 'lucide-react'; // UserRound is a good modern user icon
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/relax/memes', label: 'Memes', icon: LayoutGrid },
  { href: '/relax/quotes', label: 'Quotes', icon: Quote },
  { href: '/relax/profile', label: 'Profile', icon: UserRound },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border flex items-center justify-around shadow-top-md">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === '/relax/memes' && pathname === '/relax'); // Handle base /relax redirect
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors duration-150 ease-in-out",
              isActive ? "text-primary-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className={cn("h-5 w-5 mb-0.5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
            <span className={cn(isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
