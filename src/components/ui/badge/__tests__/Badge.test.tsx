import {
  neutralBadgeMock,
  primaryBadgeMock,
  secondaryBadgeMock,
} from '@tests/__mocks__/components/badge';
import { cleanup, render, screen } from '@tests/test-utils';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { afterEach, describe, expect, it } from 'vitest';

import Badge from '../Badge';

describe('Badge Component', () => {
  afterEach(cleanup);

  it('renders children correctly', () => {
    render(<Badge {...primaryBadgeMock} />);
    const badge = screen.getByTestId('badge-component');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Feito à mão em Portugal');
    expect(badge).toHaveClass('badge-container-primary');
    expect(badge).toHaveClass('badge-container-sm');
  });

  it('renders text prop when children is not provided', () => {
    render(<Badge text="Fallback Text" />);
    const badge = screen.getByTestId('badge-component');

    expect(badge).toHaveTextContent('Fallback Text');
  });

  it('renders icon when provided', () => {
    render(
      <Badge
        {...secondaryBadgeMock}
        icon={<span data-testid="test-icon">★</span>}
      />,
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

  it('renders custom variants and sizes', () => {
    render(
      <Badge
        {...neutralBadgeMock}
        variant={BadgeVariant.Neutral}
        size={BadgeSize.Medium}
      />,
    );
    const badge = screen.getByTestId('badge-component');

    expect(badge).toHaveClass('badge-container-neutral');
    expect(badge).toHaveClass('badge-container-md');
  });

  it('merges custom className and spreads HTML attributes', () => {
    render(
      <Badge className="custom-badge" id="badge-id" aria-label="Label badge">
        Badge
      </Badge>,
    );
    const badge = screen.getByTestId('badge-component');

    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveAttribute('id', 'badge-id');
    expect(badge).toHaveAttribute('aria-label', 'Label badge');
  });
});
