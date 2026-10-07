import { FC } from 'react';
import {
  BadgeSize,
  type BadgeType,
  BadgeVariant,
} from '@typing/components/badge';
import { cn } from '@utils/cn';

import './Badge.scss';

const Badge: FC<BadgeType> = ({
  children,
  text,
  icon,
  variant = BadgeVariant.Primary,
  size = BadgeSize.Small,
  className,
  ...props
}) => {
  const content = children ?? text;

  return (
    <span
      data-testid="badge-component"
      className={cn(
        'badge-container',
        `badge-container-${variant}`,
        `badge-container-${size}`,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="badge-icon" data-testid="badge-icon">
          {icon}
        </span>
      )}
      {content && <span className="badge-content">{content}</span>}
    </span>
  );
};

export default Badge;
