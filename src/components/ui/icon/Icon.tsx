import { IconProps } from '@typing/components/icon';
import clsx from 'clsx';

import { iconRegistry } from './icons';

const Icon = ({ icon, size = 24, className, ...rest }: IconProps) => {
  const BaseIcon = iconRegistry[icon];

  return (
    <BaseIcon
      width={size}
      height={size}
      aria-hidden="true"
      className={clsx('shrink-0', className)}
      {...rest}
    />
  );
};

export default Icon;
