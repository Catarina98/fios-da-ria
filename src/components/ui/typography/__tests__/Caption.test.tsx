import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Caption from '../Caption';

describe('<Caption />', () => {
  afterEach(cleanup);

  it('should render the children', () => {
    render(<Caption>Caption text</Caption>);

    expect(screen.getByText('Caption text')).toBeInTheDocument();
  });

  it('should apply the caption class name', () => {
    render(<Caption>Caption class</Caption>);

    expect(screen.getByText('Caption class')).toHaveClass('text-caption');
  });

  it('should default to a "span" tag', () => {
    render(<Caption>Caption span</Caption>);

    expect(screen.getByText('Caption span').tagName).toBe('SPAN');
  });

  it('should merge a custom className', () => {
    render(<Caption className="custom-class">Caption custom</Caption>);

    expect(screen.getByText('Caption custom')).toHaveClass(
      'text-caption',
      'custom-class',
    );
  });
});
