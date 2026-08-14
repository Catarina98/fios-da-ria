'use client';

import { useEffect,useState } from 'react';

// Breakpoints matching src/styles/breakpoints.css
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
} as const;

export interface Viewport {
  width: number | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDesktopLarge: boolean;
}

export function useViewport(): Viewport {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width on client mount
    handleResize();

    window.addEventListener('resize', handleResize);
    
return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // During SSR (Server Side Rendering), width is null.
  // Using false for all by default prevents hydration mismatches.
  const isMobile = width !== null ? width < breakpoints.tablet : false;
  const isTablet =
    width !== null
      ? width >= breakpoints.tablet && width < breakpoints.desktop
      : false;
  const isDesktop = width !== null ? width >= breakpoints.desktop : false;
  const isDesktopLarge =
    width !== null ? width >= breakpoints.desktopLarge : false;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLarge,
  };
}
