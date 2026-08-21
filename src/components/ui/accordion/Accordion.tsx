'use client';

import { FC, useState } from 'react';
import type { AccordionType } from '@typing/components/accordion';
import { ChevronDown } from 'lucide-react';

import './Accordion.scss';

const Accordion: FC<AccordionType> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          className="accordion-item"
          onClick={() => toggleItem(index)}
          aria-expanded={openIndex === index}
        >
          <div className="accordion-title">
            {item.title}
            <ChevronDown
              size={20}
              className={openIndex === index ? 'is-open' : ''}
            />
          </div>
          <div
            className={`accordion-content ${openIndex === index ? 'is-open' : ''}`}
          >
            {item.content}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Accordion;
