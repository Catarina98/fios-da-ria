import { HTMLAttributes, ReactNode } from 'react';

export type CardIconVariant = 'primary' | 'secondary' | 'neutral';

export type CardType = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  icon?: ReactNode;
  iconVariant?: CardIconVariant;
  items?: string[];
  description?: string;
};
