import { ComponentPropsWithoutRef } from 'react';

export type IconSvgProps = ComponentPropsWithoutRef<'svg'> & {
  innerFill?: string;
};

export type IconProps = {
  icon: IconName;
  size?: number;
  backgroundColor?: string;
} & Omit<IconSvgProps, 'children'>;
