import Instagram from './Instagram';

export const iconRegistry = {
  instagram: Instagram,
} as const;

export type IconName = keyof typeof iconRegistry;
