import {
  type DisplayProps,
  typographyClassName,
  type TypographySize,
} from '@typing/components';
import { cn } from '@utils/cn';
import type { ElementType } from 'react';

const sizeClassName = typographyClassName.display;

const sizeTag: Record<TypographySize, 'h1' | 'h2' | 'h3'> = {
  L: 'h1',
  M: 'h2',
  S: 'h3',
};

const Display = <T extends ElementType = 'h1'>({
  as,
  size,
  children,
  className,
  ...rest
}: DisplayProps<T>) => {
  const Tag = (as ?? sizeTag[size]) as ElementType;

  return (
    <Tag className={cn(sizeClassName[size], className)} {...rest}>
      {children}
    </Tag>
  );
};

export default Display;
