// src/app/relax/page.tsx
import { redirect } from 'next/navigation';

/**
 * Base page for the /relax route.
 * Redirects to the default tab, which is /relax/memes.
 */
export default function RelaxBasePage() {
  redirect('/relax/memes');
  // Next.js handles the redirect; no need to return JSX.
  // If a return is strictly necessary for some linting/compilation, use:
  // return null; 
}
