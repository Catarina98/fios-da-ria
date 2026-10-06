import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../ShowcaseSidebar', () => ({
  default: ({
    isDark,
    onToggleDark,
  }: {
    isDark: boolean;
    onToggleDark: () => void;
  }) => (
    <div data-testid="mock-sidebar">
      <button onClick={onToggleDark}>Toggle Theme</button>
      <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  ),
}));

import ShowcaseShell from '../ShowcaseShell';

describe('<ShowcaseShell />', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders children and toggles dark mode class', () => {
    const { container } = render(
      <ShowcaseShell>
        <div>Showcase Shell Content</div>
      </ShowcaseShell>,
    );

    expect(screen.getByText('Showcase Shell Content')).toBeInTheDocument();
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass('dark');

    const toggleButton = screen.getByRole('button', { name: 'Toggle Theme' });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('dark');

    fireEvent.click(toggleButton);
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass('dark');
  });
});
