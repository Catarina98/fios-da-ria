import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Display from '../Display';

describe('<Display />', () => {
  afterEach(cleanup);

  it('should render the children', () => {
    render(<Display size="M">Display text</Display>);

    expect(screen.getByText('Display text')).toBeInTheDocument();
  });

  it('should apply the size class name', () => {
    render(<Display size="L">Display L</Display>);

    expect(screen.getByText('Display L')).toHaveClass('text-display-l');
  });

  it.each([
    ['L', 'H1'],
    ['M', 'H2'],
    ['S', 'H3'],
  ] as const)(
    'should default the tag to %s -> %s based on size',
    (size, tag) => {
      render(<Display size={size}>Display {size}</Display>);

      expect(screen.getByText(`Display ${size}`).tagName).toBe(tag);
    },
  );

  it('should allow overriding the tag via "as"', () => {
    render(
      <Display as="span" size="L">
        Display span
      </Display>,
    );

    expect(screen.getByText('Display span').tagName).toBe('SPAN');
  });

  it('should merge a custom className', () => {
    render(
      <Display size="M" className="custom-class">
        Display custom
      </Display>,
    );

    expect(screen.getByText('Display custom')).toHaveClass(
      'text-display-m',
      'custom-class',
    );
  });
});
