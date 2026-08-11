import { ReactNode } from 'react';

interface ButtonLayout {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Custom = 'custom',
}

export enum ButtonSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export type ButtonType = {
  children: ReactNode;
  url?: string | ((e: React.MouseEvent) => void);
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ButtonLayout;
  disabled?: boolean;
  className?: string;
};
