import { ComponentPropsWithoutRef } from 'react';
import { IconName } from '@components/ui/icons/icons';

export type IconSvgProps = ComponentPropsWithoutRef<'svg'> & {
  innerFill?: string;
};

export type IconProps = {
  icon: IconName;
  size?: number;
  backgroundColor?: string;
} & Omit<IconSvgProps, 'children'>;
