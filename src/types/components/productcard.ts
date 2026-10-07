import { HTMLAttributes } from 'react';

export type ProductCardType = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  price: string;
  actionText?: string;
  onClick?: () => void;
};
