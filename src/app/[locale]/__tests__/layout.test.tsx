import { render, screen } from '@tests/test-utils';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockSetRequestLocale,
  mockGetMessages,
  mockHasLocale,
  mockProviders,
  mockNotFound,
} = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
  mockGetMessages: vi.fn(),
  mockHasLocale: vi.fn(),
  mockProviders: vi.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="providers">{children}</div>
  )),
  mockNotFound: vi.fn(() => {
    throw new Error('notFound');
  }),
}));

vi.mock('next-intl/server', () => ({
  getMessages: mockGetMessages,
  setRequestLocale: mockSetRequestLocale,
}));

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
  usePathname: vi.fn(() => '/en'),
}));

vi.mock('next/font/google', () => ({
  Manrope: () => ({ variable: '--font-manrope' }),
}));

vi.mock('../../../providers', () => ({
  Providers: mockProviders,
}));

import RootLayout from '../layout';

describe('<RootLayout />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHasLocale.mockReturnValue(true);
    mockGetMessages.mockResolvedValue({ Homepage: { title: 'Welcome' } });
  });

  it('renders the layout shell and passes locale and messages to providers', async () => {
    const result = await RootLayout({
      children: <div>Page content</div>,
      params: Promise.resolve({ locale: 'pt' }),
    });

    render(result);

    expect(document.documentElement.lang).toBe('pt');
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
    expect(mockGetMessages).toHaveBeenCalled();
    expect(mockProviders).toHaveBeenCalled();
  });

  it('calls notFound when the locale is not supported', async () => {
    mockHasLocale.mockReturnValue(false);

    await expect(
      RootLayout({
        children: <div>Page content</div>,
        params: Promise.resolve({ locale: 'fr' }),
      }),
    ).rejects.toThrow('notFound');

    expect(mockNotFound).toHaveBeenCalled();
  });
});
