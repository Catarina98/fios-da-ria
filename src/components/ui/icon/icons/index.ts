import Hamburguer from './Hamburguer';

export const iconRegistry = {
  hamburguer: Hamburguer,
} as const;

export type IconName = keyof typeof iconRegistry;
