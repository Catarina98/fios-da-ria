import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import MobileModal from '../MobileModal';

describe('<MobileModal />', () => {
  const navItems = {
    home: 'Início',
    gallery: 'Galeria',
    about: 'Sobre',
    contact: 'Contacto',
  };

  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders navbar header with logo and menu icon', () => {
    const { container } = render(<MobileModal data={{ navItems }} />);

    expect(screen.getAllByText('Fios da Ria').length).toBeGreaterThan(0);
    expect(container.querySelector('.menu-icon')).toBeInTheDocument();
    expect(container.querySelector('.navbar-modal')).not.toHaveClass('is-open');
  });

  it('opens and closes the modal when clicking menu and close icons', () => {
    const { container } = render(<MobileModal data={{ navItems }} />);

    const menuIcon = container.querySelector('.menu-icon');
    expect(menuIcon).toBeInTheDocument();

    if (menuIcon) {
      fireEvent.click(menuIcon);
    }
    expect(container.querySelector('.navbar-modal')).toHaveClass('is-open');

    const closeIcon = container.querySelector('.close');
    expect(closeIcon).toBeInTheDocument();

    if (closeIcon) {
      fireEvent.click(closeIcon);
    }
    expect(container.querySelector('.navbar-modal')).not.toHaveClass('is-open');
  });

  it('renders nav items with correct links and icons', () => {
    render(<MobileModal data={{ navItems }} />);

    const homeLink = screen.getByRole('link', { name: /Início/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const galleryLink = screen.getByRole('link', { name: /Galeria/i });
    expect(galleryLink).toHaveAttribute('href', '/gallery');

    const aboutLink = screen.getByRole('link', { name: /Sobre/i });
    expect(aboutLink).toHaveAttribute('href', '/about');

    const contactLink = screen.getByRole('link', { name: /Contacto/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
