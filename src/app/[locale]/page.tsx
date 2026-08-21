import Label from '@components/ui/label';
import MediaDisplay from '@components/ui/mediadisplay';
import { LabelVariant } from '@typing/components/label';
import { useTranslations } from 'next-intl';

import '../../styles/globals.css';

export default function Home() {
  const t = useTranslations('Homepage');

  const characterImages = [
    '/images/chopper.jpeg',
    '/images/luffy.jpeg',
    '/images/nami.jpeg',
    '/images/zoro.jpeg',
    '/images/usop.jpeg',
  ];

  return (
    <>
      <p className="text-2xl font-bold" data-testid="heading-component">
        {t('title')}
      </p>
      <Label text="Cinema" variant={LabelVariant.Secondary} />
      <MediaDisplay images={characterImages} activeIndex={1} />
    </>
  );
}
