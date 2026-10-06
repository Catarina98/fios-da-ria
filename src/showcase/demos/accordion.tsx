'use client';

import Accordion from '@components/ui/accordion';
import { Caption } from '@components/ui/typography';
import { AccordionElementType } from '@typing/components/accordion';

const accordionItems: AccordionElementType[] = [
  {
    title: 'What does Flaga deliver?',
    content: 'Propane gas plus planning, installation and maintenance.',
  },
  {
    title: 'How fast is delivery?',
    content: 'Standard orders arrive within 48 hours.',
  },
  {
    title: 'Disabled item',
    content: 'Shown here to demonstrate the disabled state.',
  },
];

const AccordionDemo = () => (
  <div className="flex flex-col gap-40">
    <div className="flex flex-col gap-8">
      <Caption className="uppercase text-tertiary">Accordion</Caption>
      <Accordion items={accordionItems} />
    </div>
  </div>
);

export default AccordionDemo;
