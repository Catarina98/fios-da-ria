import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockUseTranslations } = vi.hoisted(() => ({
  mockUseTranslations: vi.fn(() => (key: string) => {
    if (key === 'contact') return 'Contacto';

    return key;
  }),
}));

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal<typeof import('next-intl')>();

  return {
    ...actual,
    useTranslations: mockUseTranslations,
  };
});

import Footer from '../Footer';

describe('<Footer />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders logo and copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('Fios da Ria')).toBeInTheDocument();
    expect(screen.getByAltText('Fios da Ria Logo')).toBeInTheDocument();
    expect(
      screen.getByText('© 2026 Fios da Ria by Catarina.'),
    ).toBeInTheDocument();
  });

  it('renders all navigation and external contact links correctly', () => {
    render(<Footer />);

    // Email link
    const emailLink = screen.getByRole('link', { name: 'Email' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:fiosdaria@gmail.com');
    expect(emailLink).not.toHaveAttribute('target');

    // Instagram link
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/fiosdaria',
    );
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Contact link
    const contactLink = screen.getByRole('link', { name: 'Contacto' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/about#contact');
    expect(contactLink).not.toHaveAttribute('target');
  });
});
