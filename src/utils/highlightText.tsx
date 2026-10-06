import { ReactNode } from 'react';

export interface HighlightTextOptions {
  className?: string;
  tag?: 'em' | 'span';
}

export const highlightText = (
  text: ReactNode,
  options?: HighlightTextOptions,
): ReactNode => {
  if (typeof text !== 'string') {
    return text;
  }

  const parts = text.split(/(<highlight>[\s\S]*?<\/highlight>)/g);
  if (parts.length === 1) {
    return text;
  }

  const Tag = options?.tag ?? 'em';
  const className = options?.className ?? 'highlights-highlight';

  return parts.map((part, index) => {
    if (part.startsWith('<highlight>') && part.endsWith('</highlight>')) {
      const content = part.slice(11, -12);

      return (
        <Tag key={index} className={className}>
          {content}
        </Tag>
      );
    }

    return part;
  });
};
