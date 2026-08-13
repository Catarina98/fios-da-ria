import { ComponentPropsWithoutRef } from 'react';
import { IconName } from '@components/ui/icon/icons';

export type IconProps = {
  icon: IconName;
  size?: number;
} & Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;
