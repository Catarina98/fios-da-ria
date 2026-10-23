import React from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';

vi.mock('@i18n/navigation', () => {
  return {
    getPathname: ({ locale, href }: { locale: string; href: string }) =>
      locale === 'pt' ? href : `/en${href === '/' ? '' : href}`,
    Link: ({ href, children, ...props }: any) => {
      const { prefetch: _unused, ...rest } = props;
      void _unused;

      return React.createElement('a', { href, ...rest }, children);
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
  };
});

vi.mock('next/navigation', () => {
  return {
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => '/',
    notFound: vi.fn(),
    redirect: vi.fn(),
  };
});

afterEach(() => {
  cleanup();
});
