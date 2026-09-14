import {
  HeadingProps,
  HeadingSize,
  typographyClassName,
} from '@typing/components/typography';
import { cn } from '@utils/cn';
import type { ElementType } from 'react';

const sizeClassName = typographyClassName.heading;

const sizeTag: Record<HeadingSize, 'h1' | 'h2' | 'h3' | 'h4'> = {
  XL: 'h1',
  L: 'h2',
  M: 'h3',
  S: 'h4',
};

const Heading = <T extends ElementType = 'h2'>({
  as,
  size,
  children,
  className,
  ...rest
}: HeadingProps<T>) => {
  const Tag = (as ?? sizeTag[size]) as ElementType;

  return (
    <Tag
      data-testid="heading-component"
      className={cn(sizeClassName[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Heading;
