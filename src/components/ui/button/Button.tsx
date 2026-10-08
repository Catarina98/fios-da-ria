import { FC } from 'react';
import { Link } from '@i18n/navigation';
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
  className,
  url,
  ...props
}) => {
  const content = (
    <>
      {isLoading && <span className="btn-spinner" aria-hidden="true" />}
      {!isLoading && leftIcon && (
        <span className="btn-icon btn-icon-left">{leftIcon}</span>
      )}
      <span className="btn-content">{children}</span>
      {!isLoading && rightIcon && (
        <span className="btn-icon btn-icon-right">{rightIcon}</span>
      )}
    </>
  );

  const buttonClasses = clsx(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
    {
      'btn-loading': isLoading,
      'btn-disabled': disabled || isLoading,
    },
  );

  if (typeof url === 'string') {
    const isExternal =
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('mailto:');

    if (isExternal) {
      return (
        <a
          data-testid="button-component"
          href={url}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link data-testid="button-component" href={url} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  const handleClick = typeof url === 'function' ? (url as any) : onClick;

  return (
    <button
      data-testid="button-component"
      type="button"
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
