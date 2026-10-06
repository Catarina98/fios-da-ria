import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type TypographySize<HasXL extends boolean = false> = HasXL extends true
  ? 'XL' | 'L' | 'M' | 'S'
  : 'L' | 'M' | 'S';

export const typographyClassName = {
  display: {
    L: 'text-display-l',
    M: 'text-display-m',
    S: 'text-display-s',
  },
  heading: {
    XL: 'text-heading-xl',
    L: 'text-heading-l',
    M: 'text-heading-m',
    S: 'text-heading-s',
  },
  body: {
    L: 'text-body-l',
    M: 'text-body-m',
    S: 'text-body-s',
  },
  caption: 'text-caption',
} as const;

export type HeadingSize = TypographySize<true>;

export type DisplayProps<T extends ElementType = 'h1'> = {
  as?: T;
  size: TypographySize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'size' | 'children' | 'className'>;

export type HeadingProps<T extends ElementType = 'h1'> = {
  as?: T;
  size: HeadingSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'size' | 'children' | 'className'>;

export type BodyProps = {
  size: TypographySize;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'p'>, 'children'>;

export type LabelProps = {
  size: TypographySize;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

export type CaptionProps = {
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;
