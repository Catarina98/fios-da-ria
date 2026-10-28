import { cleanup, fireEvent, render, screen, waitFor } from '@tests/test-utils';
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
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));

    const homeLink = screen.getByRole('link', { name: /Início/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const galleryLink = screen.getByRole('link', { name: /Galeria/i });
    expect(galleryLink).toHaveAttribute('href', '/gallery');

    const aboutLink = screen.getByRole('link', { name: /Sobre/i });
    expect(aboutLink).toHaveAttribute('href', '/about');

    const contactLink = screen.getByRole('link', { name: /Contacto/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('exposes the dialog state and restores focus when cancelled', async () => {
    render(<MobileModal data={{ navItems }} />);
    const trigger = screen.getByRole('button', { name: 'Abrir menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Navegação principal' });
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent(dialog, new Event('cancel', { cancelable: true }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(dialog).not.toHaveAttribute('open');
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('closes the dialog after selecting a navigation link', () => {
    render(<MobileModal data={{ navItems }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent.click(screen.getByRole('link', { name: 'Galeria' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('restores the previous scroll setting when unmounted while open', () => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    const { unmount } = render(<MobileModal data={{ navItems }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
    document.body.style.overflow = previousOverflow;
  });
});
