'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@utils/cn';

import ShowcaseSidebar from './ShowcaseSidebar';

const ShowcaseShell = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col desktop:flex-row',
        isDark && 'dark',
      )}
    >
      <ShowcaseSidebar
        isDark={isDark}
        onToggleDark={() => setIsDark(value => !value)}
      />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
};

export default ShowcaseShell;
