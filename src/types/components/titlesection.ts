import { HTMLAttributes, ReactNode } from 'react';

export type TitleSectionAlign = 'center' | 'left';

export type TitleSectionType = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: TitleSectionAlign;
};
