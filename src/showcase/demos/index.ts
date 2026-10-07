import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// One lazy chunk per demo — visiting `/showcase/<slug>` only loads that demo.
// Keep the keys alphabetical by slug (see CLAUDE.md → Showcase).
export const demoMap: Record<string, ComponentType> = {
  accordion: dynamic(() => import('./accordion')),
  badge: dynamic(() => import('./badge')),
  button: dynamic(() => import('./button')),
  card: dynamic(() => import('./card')),
  colors: dynamic(() => import('./colors')),
  highlights: dynamic(() => import('./highlights')),
  productcard: dynamic(() => import('./productcard')),
  storybanner: dynamic(() => import('./storybanner')),
  titlesection: dynamic(() => import('./titlesection')),
  typography: dynamic(() => import('./typography')),
};
