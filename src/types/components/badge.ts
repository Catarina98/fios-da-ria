import { HTMLAttributes, ReactNode } from 'react';

export enum BadgeVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Neutral = 'neutral',
}

export enum BadgeSize {
  Small = 'sm',
  Medium = 'md',
}

export type BadgeType = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  text?: string;
  icon?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
};
