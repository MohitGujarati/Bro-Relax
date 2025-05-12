import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Import the plugin

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
            // Minimal Black & White Theme (Dark Mode Active)
            background: 'hsl(0 0% 0%)', /* Black */
            foreground: 'hsl(0 0% 95%)', /* Near White */
            card: {
                DEFAULT: 'hsl(0 0% 7%)', /* Very Dark Gray */
                foreground: 'hsl(0 0% 95%)', /* Near White */
            },
            popover: {
                DEFAULT: 'hsl(0 0% 5%)', /* Slightly darker gray */
                foreground: 'hsl(0 0% 95%)', /* Near White */
            },
            primary: {
                DEFAULT: 'hsl(0 0% 98%)', /* White/Very Light Gray */
                foreground: 'hsl(0 0% 9%)', /* Black */
            },
            secondary: {
                DEFAULT: 'hsl(0 0% 13%)', /* Dark Gray (#222222) */
                foreground: 'hsl(0 0% 98%)', /* Very Light Gray */
            },
            muted: {
                DEFAULT: 'hsl(0 0% 15%)', /* Darker Gray (#262626) */
                foreground: 'hsl(0 0% 65%)', /* Medium Gray (#A6A6A6) */
            },
            accent: {
                DEFAULT: 'hsl(0 0% 20%)', /* Medium Dark Gray (#333333) - for hover/focus */
                foreground: 'hsl(0 0% 98%)', /* Very Light Gray */
            },
            destructive: {
                DEFAULT: 'hsl(0 62.8% 30.6%)', /* Darker Red */
                foreground: 'hsl(0 0% 98%)', /* Light text */
            },
            border: 'hsl(0 0% 27%)', /* Medium Gray Border (#444444) */
            input: 'hsl(0 0% 10%)', /* Dark Gray Input (#1A1A1A) */
            ring: 'hsl(0 0% 80%)', /* Light Gray Ring */
            chart: {
              '1': 'hsl(0 0% 70%)',
              '2': 'hsl(0 0% 50%)',
              '3': 'hsl(0 0% 90%)',
              '4': 'hsl(0 0% 40%)',
              '5': 'hsl(0 0% 60%)'
            },
            sidebar: { // Sidebar uses dark theme colors by default
              DEFAULT: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              primary: 'hsl(var(--primary))',
              'primary-foreground': 'hsl(var(--primary-foreground))',
              accent: 'hsl(var(--accent))',
              'accent-foreground': 'hsl(var(--accent-foreground))',
              border: 'hsl(var(--border))',
              ring: 'hsl(var(--ring))'
            }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
   // Ensure tailwindcss-animate plugin is correctly added
  plugins: [tailwindcssAnimate],
} satisfies Config;
