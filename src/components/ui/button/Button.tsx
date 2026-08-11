'use client'

import { FC } from 'react';
import { type ButtonType, ButtonVariant } from '@typing/components/button';
import { useRouter } from 'next/navigation';

import { ButtonStyled } from './Button.styles';

const Button: FC<ButtonType> = ({
  children, url, variant = ButtonVariant.Primary, size, style, disabled, className
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof url === 'string' && url) {
      router.push(url);
    }
  };

  return (
    <ButtonStyled
      aria-label={`${variant} button`}
      data-testid={`${variant}-button`}
      typeBtn={variant === ButtonVariant.Custom ? ButtonVariant.Primary : variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      styled={style}
      className={className}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
