import { HTMLAttributes } from 'react';

export type GuidanceCardsType = HTMLAttributes<HTMLDivElement> & {
  materialsTitle?: string;
  materialsItems?: string[];
  careTitle?: string;
  careItems?: string[];
};
