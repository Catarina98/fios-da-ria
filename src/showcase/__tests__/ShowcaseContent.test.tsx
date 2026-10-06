import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ShowcaseContent from '../ShowcaseContent';

vi.mock('../demos', () => ({
  demoMap: {
    button: () => <div data-testid="button-demo">Button Demo Content</div>,
    'full-width-demo': () => (
      <div data-testid="full-width-demo">Full Width Demo Content</div>
    ),
  },
}));

vi.mock('../registry', () => ({
  findShowcaseEntry: (slug: string) => {
    if (slug === 'button') {
      return {
        slug: 'button',
        name: 'Button',
        summary: 'Button component description',
        fullWidth: false,
      };
    }
    if (slug === 'full-width-demo') {
      return {
        slug: 'full-width-demo',
        name: 'Full Width Demo',
        summary: 'Full width demo description',
        fullWidth: true,
      };
    }

    return undefined;
  },
}));

describe('<ShowcaseContent />', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('returns null when entry does not exist', () => {
    const { container } = render(<ShowcaseContent slug="non-existent" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders name, summary and demo when standard entry exists', async () => {
    render(<ShowcaseContent slug="button" />);

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(
      screen.getByText('Button component description'),
    ).toBeInTheDocument();
    expect(await screen.findByTestId('button-demo')).toBeInTheDocument();
  });

  it('renders full-width layout when entry.fullWidth is true', async () => {
    render(<ShowcaseContent slug="full-width-demo" />);

    expect(screen.getByText('Full Width Demo')).toBeInTheDocument();
    expect(await screen.findByTestId('full-width-demo')).toBeInTheDocument();
  });
});
