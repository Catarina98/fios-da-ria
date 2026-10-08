import Button from '@components/ui/button';
import Card from '@components/ui/card';
import Highlights from '@components/ui/highlights';
import ProductCard from '@components/ui/productcard';
import StoryBanner from '@components/ui/storybanner';
import TitleSection from '@components/ui/titlesection';
import { routing } from '@i18n/routing';
import { ButtonVariant } from '@typing/components/button';
import { Flower, Heart, Shield } from 'lucide-react';
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

  const materialsItems = t.raw('guidance.materialsItems') as string[];
  const careItems = t.raw('guidance.careItems') as string[];

  return (
    <main className="home-page" data-testid="homepage-container">
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
        <div className="home-container">
          <TitleSection
            eyebrow={t('guidance.eyebrow')}
            title={t('guidance.title')}
            description={t('guidance.description')}
            align="center"
          />
          <div className="feature-grid">
            <Card
              title={t('guidance.materialsTitle')}
              icon={<Flower size={20} />}
              iconVariant="primary"
              items={materialsItems}
            />
            <Card
              title={t('guidance.careTitle')}
              icon={<Shield size={20} />}
              iconVariant="secondary"
              items={careItems}
            />
          </div>
        </div>
      </section>

      <section
        className="home-section section-tint"
        aria-label="Pequenos tesouros"
        data-testid="home-featured-section"
      >
        <div className="home-container">
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
            />
            <ProductCard
              title={t('featured.products.snowWhite.title')}
              category={t('featured.products.snowWhite.category')}
              description={t('featured.products.snowWhite.description')}
              image="/images/snow-white.jpg"
              price={t('featured.products.snowWhite.price')}
            />
            <ProductCard
              title={t('featured.products.anya.title')}
              category={t('featured.products.anya.category')}
              description={t('featured.products.anya.description')}
              image="/images/anya.jpg"
              price={t('featured.products.anya.price')}
            />
          </div>
        </div>
      </section>

      <section
        className="home-section"
        aria-label="Agenda de eventos"
        data-testid="home-agenda-section"
      >
        <div className="home-container">
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
    </main>
  );
}
