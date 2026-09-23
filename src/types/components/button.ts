import { ButtonHTMLAttributes, ReactNode } from 'react';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Ghost = 'ghost',
}

export enum ButtonSize {
  Medium = 'md',
  Large = 'lg',
}

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  url?: string | ((e: React.MouseEvent) => void);
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};
