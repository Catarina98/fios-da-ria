import { HTMLAttributes, ReactNode } from 'react';

import { ButtonType } from './button';

export type HighlightsNote = {
  text: string;
  icon?: ReactNode;
};

export type HighlightsType = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  badge?: string;
  title: ReactNode;
  description: string;
  button?: ButtonType;
  secondaryButton?: ButtonType;
  imageSrc: string;
  imageAlt?: string;
  note?: HighlightsNote;
  imagePosition?: 'left' | 'right';
};
