import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Body from '../Body';

describe('<Body />', () => {
  afterEach(cleanup);

  it('should render the children', () => {
    render(<Body size="M">Body text</Body>);

    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it.each([
    ['L', 'text-body-l'],
    ['M', 'text-body-m'],
    ['S', 'text-body-s'],
  ] as const)('should apply the %s size class name', (size, className) => {
    render(<Body size={size}>Body {size}</Body>);

    expect(screen.getByText(`Body ${size}`)).toHaveClass(className);
  });

  it('should default to a "p" tag', () => {
    render(<Body size="M">Body paragraph</Body>);

    expect(screen.getByText('Body paragraph').tagName).toBe('P');
  });

  it('should merge a custom className', () => {
    render(
      <Body size="S" className="custom-class">
        Body custom
      </Body>,
    );

    expect(screen.getByText('Body custom')).toHaveClass(
      'text-body-s',
      'custom-class',
    );
  });
});
