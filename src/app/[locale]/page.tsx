import { useTranslations } from 'next-intl';

import '../../styles/globals.css';

export default function Home() {
  const t = useTranslations('Homepage');

  return (
    <p className="text-2xl font-bold" data-testid="heading-component">
      {t('title')}
    </p>
  );
}
