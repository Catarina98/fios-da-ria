'use client';

import { type ReactNode, useEffect, useRef } from 'react';

export default function BuyingAccordion({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealQuestion = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      const question = document.getElementById(id);
      if (
        question instanceof HTMLDetailsElement &&
        containerRef.current?.contains(question)
      ) {
        question.open = true;
        question.scrollIntoView({ block: 'start' });
      }
    };

    revealQuestion();
    window.addEventListener('hashchange', revealQuestion);

    return () => window.removeEventListener('hashchange', revealQuestion);
  }, []);

  return (
    <div ref={containerRef} className="buying-sections">
      {children}
    </div>
  );
}
