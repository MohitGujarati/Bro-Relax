// src/components/layout/bottom-navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Quote, UserRound, Wind } from 'lucide-react'; // Added Wind icon for Breathe tab
import { cn } from '@/lib/utils';

// Navigation items configuration
const navItems = [
  { href: '/relax/memes', label: 'Memes', icon: LayoutGrid },
  { href: '/relax/quotes', label: 'Quotes', icon: Quote },
  { href: '/relax/breathe', label: 'Breathe', icon: Wind }, // Added Breathe tab
  { href: '/relax/profile', label: 'Community', icon: UserRound }, // Renamed Profile to Community for clarity
];

// Helper function to determine if a nav item is active
const isNavItemActive = (itemHref: string, currentPath: string): boolean => {
  return itemHref === currentPath || (itemHref === '/relax/memes' && currentPath === '/relax');
};

// Component for individual navigation item
const NavItem = ({ item, isActive }: { item: typeof navItems[0], isActive: boolean }) => {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors duration-200 ease-in-out group", // Base styling, faster transition
        isActive
          ? "text-primary" // Active: Use primary color (high contrast)
          : "text-muted-foreground hover:text-foreground" // Inactive: Muted, brighter text on hover
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={cn(
        "h-5 w-5 mb-0.5 transition-transform duration-200 ease-in-out transform group-hover:scale-110", // Icon scaling on hover
        isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground" // Active icon scaling
      )} />
      <span className={cn(
        "transition-colors duration-200 ease-in-out", // Text transition
        isActive ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground" // Active text style
      )}>
        {item.label}
      </span>
    </Link>
  );
};

// Main navigation component
export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background/80 backdrop-blur-lg border-t border-border/30 flex items-center justify-around shadow-top-md">
      {/* Slightly more blurred background, adjusted border */}
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          item={item}
          isActive={isNavItemActive(item.href, pathname)}
        />
      ))}
    </nav>
  );
}
