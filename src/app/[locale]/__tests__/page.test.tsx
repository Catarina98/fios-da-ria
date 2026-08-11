import { render, screen } from '@tests/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockUseTranslations } = vi.hoisted(() => ({
  mockUseTranslations: vi.fn(() => (key: string) => key),
}));

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal<typeof import('next-intl')>();

  return {
    ...actual,
    useTranslations: mockUseTranslations,
  };
});

import Home from '../page';

describe('<Home />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Heading Component', () => {
    render(<Home />);

    expect(screen.getByTestId('heading-component')).toBeInTheDocument();
  });
});
