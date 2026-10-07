import Highlights from '@components/ui/highlights';
import { ButtonVariant } from '@typing/components/button';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import './page.scss';

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('Homepage');

  return (
    <div className="home-container">
      <Highlights
        badge={t('highlights.badge')}
        title={t.rich('highlights.title', {
          highlight: chunks => (
            <em className="highlights-highlight">{chunks}</em>
          ),
        })}
        description={t('highlights.description')}
        imageSrc="/images/toystory-highlight.jpg"
        imageAlt={t('highlights.imageAlt')}
        button={{
          children: t('highlights.galleryButton'),
          variant: ButtonVariant.Primary,
        }}
        secondaryButton={{
          children: t('highlights.aboutButton'),
          variant: ButtonVariant.Ghost,
        }}
        note={{
          text: t('highlights.note'),
          icon: <Heart size={16} />,
        }}
      />
    </div>
  );
}
