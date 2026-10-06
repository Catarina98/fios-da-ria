import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Navigation, { getHrefLink } from '../Navigation';

const mockUseViewport = vi.fn();

vi.mock('../../../../hooks/useViewport', () => ({
  useViewport: () => mockUseViewport(),
}));

const mockRaw = vi.fn(() => ({
  home: 'Home',
  gallery: 'Gallery',
  aboutUs: 'About Us',
}));

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal<typeof import('next-intl')>();

  return {
    ...actual,
    useTranslations: () => ({
      raw: mockRaw,
    }),
  };
});

describe('<Navigation />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders desktop navbar when isDesktop is true', () => {
    mockUseViewport.mockReturnValue({ isDesktop: true });

    render(<Navigation />);

    expect(screen.getByText('Fios da Ria')).toBeInTheDocument();
    expect(screen.getByAltText('Fios da Ria Logo')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');

    const galleryLink = screen.getByRole('link', { name: 'Gallery' });
    expect(galleryLink).toHaveAttribute('href', '/gallery');

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('href', '/about-us');
  });

  it('renders mobile modal when isDesktop is false', () => {
    mockUseViewport.mockReturnValue({ isDesktop: false });

    const { container } = render(<Navigation />);

    expect(container.querySelector('.navbar-header')).toBeInTheDocument();
  });

  describe('getHrefLink', () => {
    it('returns / for home', () => {
      expect(getHrefLink('home')).toBe('/');
    });

    it('formats camelCase to kebab-case with leading slash', () => {
      expect(getHrefLink('aboutUs')).toBe('/about-us');
      expect(getHrefLink('gallery')).toBe('/gallery');
    });
  });
});
