// src/components/layout/bottom-navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Quote, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/relax/memes', label: 'Memes', icon: LayoutGrid },
  { href: '/relax/quotes', label: 'Quotes', icon: Quote },
  { href: '/relax/profile', label: 'Profile', icon: UserRound },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border/50 flex items-center justify-around shadow-top-md">
      {/* Minimal background, subtle border */}
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === '/relax/memes' && pathname === '/relax');
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors duration-150 ease-in-out group", // Base styling
              isActive
                ? "text-primary" // Active: Use primary color for text/icon (high contrast)
                : "text-muted-foreground hover:text-foreground" // Inactive: Muted, brighter text on hover
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className={cn(
              "h-5 w-5 mb-0.5 transition-colors duration-150 ease-in-out", // Added transition here too
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            <span className={cn(
              "transition-colors duration-150 ease-in-out", // Added transition here too
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
