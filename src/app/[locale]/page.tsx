import Accordion from '@components/ui/accordion';
import Label from '@components/ui/label';
import { LabelVariant } from '@typing/components/label';
import { useTranslations } from 'next-intl';

import '../../styles/globals.css';

const accordionData = {
  items: [
    { title: 'Title 1', content: 'Content 1' },
    { title: 'Title 2', content: 'Content 2' },
    { title: 'Title 3', content: 'Content 3' },
  ],
};

export default function Home() {
  const t = useTranslations('Homepage');

  return (
    <>
      <p className="text-2xl font-bold" data-testid="heading-component">
        {t('title')}
      </p>
      <Label text="Cinema" variant={LabelVariant.Secondary} />
      <Accordion {...accordionData} />
    </>
  );
}
