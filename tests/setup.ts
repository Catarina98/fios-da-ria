import React from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';

vi.mock('@i18n/navigation', () => {
  return {
    Link: ({ href, children, ...props }: any) => {
      return React.createElement('a', { href, ...props }, children);
    },
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => '/',
    redirect: vi.fn(),
    getPathname: vi.fn(),
  };
});

afterEach(() => {
  cleanup();
});
