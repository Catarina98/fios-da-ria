import { render, screen } from '@tests/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/showcase/ShowcaseShell', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-showcase-shell">{children}</div>
  ),
}));

import ShowcaseLayout from '../layout';

describe('ShowcaseLayout', () => {
  it('wraps children in ShowcaseShell', () => {
    render(
      <ShowcaseLayout>
        <div>Showcase Page Content</div>
      </ShowcaseLayout>,
    );

    expect(screen.getByTestId('mock-showcase-shell')).toBeInTheDocument();
    expect(screen.getByText('Showcase Page Content')).toBeInTheDocument();
  });
});
