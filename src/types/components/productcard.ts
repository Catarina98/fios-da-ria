import { HTMLAttributes } from 'react';

export type ProductCardType = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  price: string;
  actionText?: string;
  stock?: number;
  variantCount?: number;
  variantTextSingular?: string;
  variantTextPlural?: string;
  inStockText?: string;
  soldOutText?: string;
  url: string;
};
