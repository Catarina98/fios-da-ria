import { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export type BreadcrumbsType = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
};
