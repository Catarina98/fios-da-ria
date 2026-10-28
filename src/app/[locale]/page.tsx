import Button from '@components/ui/button';
import GuidanceCards from '@components/ui/guidancecards/GuidanceCards';
import { HighlightsCarousel } from '@components/ui/highlights';
import ProductCard from '@components/ui/productcard';
import StoryBanner from '@components/ui/storybanner';
import TitleSection from '@components/ui/titlesection';
import { routing } from '@i18n/routing';
import { getHighlights } from '@lib/sanity/highlights';
import { getProducts } from '@lib/sanity/products';
import { ButtonVariant } from '@typing/components/button';
import { HighlightItem } from '@typing/components/highlights';
import { getAssetPath } from '@utils/getAssetPath';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { getProductDisplayPrice, StoreProduct } from './gallery/data';

import './page.scss';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt'
  ).replace(/\/$/, '');
  const isPt = locale === 'pt';
  const canonical = `${siteUrl}${isPt ? '/' : '/en/'}`;
  const title = isPt
    ? 'Fios da Ria – Amigurumis feitos à mão em Portugal'
    : 'Fios da Ria – Handmade amigurumi in Portugal';
  const description = isPt
    ? 'Amigurumis em croché feitos à mão pela Catarina, em Olhão. Explora as coleções, compra na Wallapop ou fala comigo sobre uma encomenda personalizada.'
    : 'Crochet amigurumi handmade by Catarina in Olhão, Portugal. Explore the collections, buy on Wallapop or ask about a custom order.';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        pt: `${siteUrl}/`,
        en: `${siteUrl}/en/`,
        'x-default': `${siteUrl}/`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Fios da Ria',
      url: canonical,
      locale: isPt ? 'pt_PT' : 'en_GB',
      alternateLocale: [isPt ? 'en_GB' : 'pt_PT'],
      title,
      description,
      images: [
        {
          url: `${siteUrl}/images/toystory-highlight.webp`,
          alt: isPt ? 'Amigurumis da Fios da Ria' : 'Fios da Ria amigurumis',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/toystory-highlight.webp`],
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [products, highlights] = await Promise.all([
    getProducts(locale),
    getHighlights(locale),
  ]);

  return <HomeContent products={products} highlights={highlights} />;
}

function HomeContent({
  products = [],
  highlights = [],
}: {
  products?: StoreProduct[];
  highlights?: HighlightItem[];
}) {
  const t = useTranslations('Homepage');
  const tGallery = useTranslations('Gallery');
  const featuredProducts = [...products]
    .sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0))
    .slice(0, 3);

  return (
    <div className="home-page" data-testid="homepage-container">
      <HighlightsCarousel items={highlights} primaryHeading />

      <section
        className="home-section"
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
          <div className="product-grid" data-testid="home-product-grid">
            {featuredProducts.map(product => {
              const hasStock = Boolean(
                product.vintedUrl ||
                (product.variants ?? []).some(v => Boolean(v.vintedUrl)),
              );

              return (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  categoryTagBg={product.categoryTagBg}
                  categoryTagColor={product.categoryTagColor}
                  image={product.image}
                  price={getProductDisplayPrice(
                    product,
                    tGallery('filters.from'),
                  )}
                  stock={hasStock ? 1 : 0}
                  inStockText={tGallery('filters.inStock')}
                  soldOutText={tGallery('filters.soldOut')}
                  actionText={tGallery('filters.viewDetails')}
                  url={`/product/${product.id}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="home-section section-tint home-custom-section"
        aria-label={t('custom.title')}
      >
        <div className="container home-container">
          <div className="home-custom-card">
            <div className="home-custom-image">
              <img
                src={getAssetPath('/images/anya.webp')}
                alt={t('custom.imageAlt')}
                width={3024}
                height={3024}
                loading="lazy"
              />
            </div>
            <div className="home-custom-copy">
              <TitleSection
                title={t('custom.title')}
                description={t('custom.description')}
                align="left"
              />
              <div className="buying-actions">
                <Button
                  variant={ButtonVariant.Primary}
                  url="/how-to-buy#custom"
                >
                  {t('custom.button')}
                </Button>
                <Button variant={ButtonVariant.Ghost} url="/how-to-buy">
                  {t('custom.guide')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        aria-label="Agenda de eventos"
        data-testid="home-agenda-section"
      >
        <div className="container home-container">
          <StoryBanner
            badge={t('agenda.badge')}
            title={t('agenda.title')}
            imageSrc="/images/mercadinho.webp"
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
