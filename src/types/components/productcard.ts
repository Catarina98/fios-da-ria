import { HTMLAttributes } from 'react';

export type ProductCardType = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: string;
  category: string;
  categoryTagBg?: string;
  categoryTagColor?: string;
  image: string;
  imageAlt?: string;
  price: string;
  actionText?: string;
  stock?: number;
  inStockText?: string;
  soldOutText?: string;
  url: string;
};
