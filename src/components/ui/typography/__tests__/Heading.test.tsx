import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Heading from '../Heading';

describe('<Heading />', () => {
  afterEach(cleanup);

  it('should render the children', () => {
    render(<Heading size="M">Heading text</Heading>);

    expect(screen.getByText('Heading text')).toBeInTheDocument();
  });

  it('should apply the size class name', () => {
    render(<Heading size="XL">Heading XL</Heading>);

    expect(screen.getByText('Heading XL')).toHaveClass('text-heading-xl');
  });

  it.each([
    ['XL', 'H1'],
    ['L', 'H2'],
    ['M', 'H3'],
    ['S', 'H4'],
  ] as const)(
    'should default the tag to %s -> %s based on size',
    (size, tag) => {
      render(<Heading size={size}>Heading {size}</Heading>);

      expect(screen.getByText(`Heading ${size}`).tagName).toBe(tag);
    },
  );

  it('should allow overriding the tag via "as"', () => {
    render(
      <Heading as="p" size="L">
        Heading paragraph
      </Heading>,
    );

    expect(screen.getByText('Heading paragraph').tagName).toBe('P');
  });

  it('should merge a custom className', () => {
    render(
      <Heading size="S" className="custom-class">
        Heading custom
      </Heading>,
    );

    expect(screen.getByText('Heading custom')).toHaveClass(
      'text-heading-s',
      'custom-class',
    );
  });
});
