import { FC } from 'react';
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@typing/components/button';
import clsx from 'clsx';

import './Button.scss';

const Button: FC<ButtonType> = ({
  children,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Medium,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
}) => {
  return (
    <button
      data-testid="button-component"
      type="button"
      className={clsx('btn', `btn-${variant}`, `btn-${size}`, {
        'btn-loading': isLoading,
        'btn-disabled': disabled || isLoading,
      })}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className="btn-spinner" aria-hidden="true" />}
      {!isLoading && leftIcon && (
        <span className="btn-icon btn-icon-left">{leftIcon}</span>
      )}
      <span className="btn-content">{children}</span>
      {!isLoading && rightIcon && (
        <span className="btn-icon btn-icon-right">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
