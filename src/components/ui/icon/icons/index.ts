import Close from './Close';
import Hamburguer from './Hamburguer';

export const iconRegistry = {
  hamburguer: Hamburguer,
  close: Close,
} as const;

export type IconName = keyof typeof iconRegistry;
