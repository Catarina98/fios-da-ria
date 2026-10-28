import { HTMLAttributes, ReactNode } from 'react';

import { ButtonType } from './button';

export type HighlightsNote = {
  text: string;
  icon?: ReactNode;
};

export type HighlightItem = {
  id?: string;
  badge?: string;
  title: ReactNode;
  description: string;
  button?: ButtonType;
  secondaryButton?: ButtonType;
  imageSrc: string;
  imageAlt?: string;
  note?: HighlightsNote;
  imagePosition?: 'left' | 'right';
  order?: number;
  isFullHeight?: boolean;
  fullHeight?: boolean;
  breadcrumbs?: ReactNode;
};

export type HighlightsCarouselProps = Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> & {
  items: HighlightItem[];
  primaryHeading?: boolean;
  autoPlayInterval?: number;
  autoPlay?: boolean;
  isFullHeight?: boolean;
  fullHeight?: boolean;
  breadcrumbs?: ReactNode;
};

export type HighlightsType = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  primaryHeading?: boolean;
  badge?: string;
  title: ReactNode;
  description: string;
  button?: ButtonType;
  secondaryButton?: ButtonType;
  imageSrc: string;
  imageAlt?: string;
  note?: HighlightsNote;
  imagePosition?: 'left' | 'right';
  isFullHeight?: boolean;
  breadcrumbs?: ReactNode;
};
