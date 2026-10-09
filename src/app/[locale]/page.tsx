import Button from '@components/ui/button';
import GuidanceCards from '@components/ui/guidancecards/GuidanceCards';
import Highlights from '@components/ui/highlights';
import ProductCard from '@components/ui/productcard';
import StoryBanner from '@components/ui/storybanner';
import TitleSection from '@components/ui/titlesection';
import { routing } from '@i18n/routing';
import { ButtonVariant } from '@typing/components/button';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import './page.scss';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

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
    <div className="home-page" data-testid="homepage-container">
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
          url: '/gallery',
        }}
        secondaryButton={{
          children: t('highlights.aboutButton'),
          variant: ButtonVariant.Ghost,
          url: '/about',
        }}
        note={{
          text: t('highlights.note'),
          icon: <Heart size={16} />,
        }}
      />

      <section
        className="home-section"
        aria-label="O que nos guia"
        data-testid="home-guidance-section"
      >
        <div className="container home-container">
          <TitleSection
            eyebrow={t('guidance.eyebrow')}
            title={t('guidance.title')}
            description={t('guidance.description')}
            align="center"
          />
          <GuidanceCards />
        </div>
      </section>

      <section
        className="home-section section-tint"
        aria-label="Pequenos tesouros"
        data-testid="home-featured-section"
      >
        <div className="container home-container">
          <TitleSection
            eyebrow={t('featured.eyebrow')}
            title={t('featured.title')}
            action={
              <Button variant={ButtonVariant.Ghost} url="/gallery">
                {t('featured.viewAll')}
              </Button>
            }
          />
          <div className="product-grid">
            <ProductCard
              title={t('featured.products.woody.title')}
              category={t('featured.products.woody.category')}
              description={t('featured.products.woody.description')}
              image="/images/woody.jpg"
              price={t('featured.products.woody.price')}
              url="/product/collection-toy-story"
            />
            <ProductCard
              title={t('featured.products.snowWhite.title')}
              category={t('featured.products.snowWhite.category')}
              description={t('featured.products.snowWhite.description')}
              image="/images/snow-white.jpg"
              price={t('featured.products.snowWhite.price')}
              url="/product/collection-disney-princesses"
            />
            <ProductCard
              title={t('featured.products.anya.title')}
              category={t('featured.products.anya.category')}
              description={t('featured.products.anya.description')}
              image="/images/anya.jpg"
              price={t('featured.products.anya.price')}
              url="/product/collection-spy-family"
            />
          </div>
        </div>
      </section>

      <section
        className="home-section"
        aria-label="Agenda de eventos"
        data-testid="home-agenda-section"
      >
        <div className="container home-container">
          <StoryBanner
            badge={t('agenda.badge')}
            title={t('agenda.title')}
            imageSrc="/images/mercadinho.jpg"
            imageAlt={t('agenda.imageAlt')}
            events={[
              {
                title: t('agenda.eventTitle'),
                location: t('agenda.eventLocation'),
                frequency: t('agenda.eventFrequency'),
                schedule: t('agenda.eventSchedule'),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
