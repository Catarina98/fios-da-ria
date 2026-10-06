import { render } from '@tests/test-utils';
import { describe, expect, it } from 'vitest';

import { highlightText } from '../highlightText';

describe('highlightText utility', () => {
  it('returns non-string values as-is', () => {
    expect(highlightText(null)).toBeNull();
    expect(highlightText(undefined)).toBeUndefined();
    expect(highlightText(123 as unknown as string)).toBe(123);
  });

  it('returns strings without <highlight> tags unchanged', () => {
    expect(highlightText('Just regular text')).toBe('Just regular text');
  });

  it('parses <highlight> tags into default <em> tags with default className', () => {
    const result = highlightText(
      'Histórias feitas de fio, <highlight>ponto a ponto.</highlight>',
    );

    const { container } = render(<div>{result}</div>);
    const em = container.querySelector('em');

    expect(em).toBeInTheDocument();
    expect(em).toHaveClass('highlights-highlight');
    expect(em).toHaveTextContent('ponto a ponto.');
    expect(container).toHaveTextContent(
      'Histórias feitas de fio, ponto a ponto.',
    );
  });

  it('supports custom tag and className options', () => {
    const result = highlightText('Hello <highlight>World</highlight>!', {
      tag: 'span',
      className: 'text-accent',
    });

    const { container } = render(<div>{result}</div>);
    const span = container.querySelector('span');

    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('text-accent');
    expect(span).toHaveTextContent('World');
  });
});
