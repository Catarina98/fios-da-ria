import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockUsePathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

import ShowcaseSidebar from '../ShowcaseSidebar';

describe('<ShowcaseSidebar />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders light mode state and toggles when clicked', () => {
    mockUsePathname.mockReturnValue('/en/showcase/button');
    const onToggleDark = vi.fn();

    render(<ShowcaseSidebar isDark={false} onToggleDark={onToggleDark} />);

    expect(screen.getByText('Component library')).toBeInTheDocument();
    const toggleBtn = screen.getByTestId('button-component');
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn.querySelector('.lucide-moon')).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(onToggleDark).toHaveBeenCalledTimes(1);
  });

  it('renders dark mode state with sun icon', () => {
    mockUsePathname.mockReturnValue('/en/showcase/button');
    const onToggleDark = vi.fn();

    render(<ShowcaseSidebar isDark={true} onToggleDark={onToggleDark} />);

    const toggleBtn = screen.getByTestId('button-component');
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn.querySelector('.lucide-sun')).toBeInTheDocument();
  });

  it('marks active navigation item and displays active entry name on mobile toggle', () => {
    mockUsePathname.mockReturnValue('/en/showcase/button');

    render(<ShowcaseSidebar isDark={false} onToggleDark={vi.fn()} />);

    expect(screen.getAllByText('Button').length).toBeGreaterThan(0);

    const buttonLink = screen.getByRole('link', { name: 'Button' });
    expect(buttonLink).toHaveAttribute('aria-current', 'page');

    const accordionLink = screen.getByRole('link', { name: 'Accordion' });
    expect(accordionLink).not.toHaveAttribute('aria-current');
  });

  it('displays default label when no entry matches pathname', () => {
    mockUsePathname.mockReturnValue('/en/unknown');

    render(<ShowcaseSidebar isDark={false} onToggleDark={vi.fn()} />);

    expect(screen.getByText('Browse components')).toBeInTheDocument();
  });

  it('toggles mobile menu open and closes on link click', () => {
    mockUsePathname.mockReturnValue('/en/showcase/button');

    const { container } = render(
      <ShowcaseSidebar isDark={false} onToggleDark={vi.fn()} />,
    );

    const mobileMenuBtn = screen.getByRole('button', {
      name: 'Button',
    });
    expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');

    const nav = container.querySelector('#showcase-nav');
    expect(nav).toHaveClass('hidden');

    fireEvent.click(mobileMenuBtn);
    expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(nav).toHaveClass('flex');

    const link = screen.getByRole('link', { name: 'Accordion' });
    fireEvent.click(link);
    expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
