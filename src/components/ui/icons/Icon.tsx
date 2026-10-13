import type { IconProps } from '@typing/components';
import { cn } from '@utils/cn';

import { iconRegistry } from './icons';

const Icon = ({
  icon,
  size = 24,
  backgroundColor,
  className,
  ...rest
}: IconProps) => {
  const BaseIcon = iconRegistry[icon];

  const iconElement = (
    <BaseIcon
      data-testid="icon-component"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn('shrink-0', className)}
      {...rest}
    />
  );

  if (!backgroundColor) return iconElement;

  return (
    <div className={cn('w-fit h-fit p-8 rounded-6', backgroundColor)}>
      {iconElement}
    </div>
  );
};

export default Icon;
