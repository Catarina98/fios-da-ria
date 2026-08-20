import { ReactNode } from 'react';

export type AccordionElementType = {
  title: string;
  content: ReactNode;
};

export type AccordionType = {
  items: AccordionElementType[];
};
