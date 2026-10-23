import { routing } from '@i18n/routing';
import { getAllProductIds, getProductById } from '@lib/sanity/products';
import { setRequestLocale } from 'next-intl/server';

import ProductPage from '../page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt';

type ProductDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllProductIds();
  const safeIds = ids.length > 0 ? ids : ['_'];

  return routing.locales.flatMap(locale =>
    safeIds.map(id => ({
      locale,
      id,
    })),
  );
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, id } = await params;
  const product = await getProductById(id, locale);

  if (!product) {
    return {
      title: locale === 'pt' ? 'Produto não encontrado' : 'Product not found',
    };
  }

  const isPt = locale === 'pt';
  const title = `${product.title} | Fios da Ria`;
  const description =
    product.description ||
    (isPt
      ? `${product.title} – amigurumi feito à mão por Catarina, Fios da Ria.`
      : `${product.title} – handmade amigurumi by Catarina, Fios da Ria.`);
  const canonical = isPt
    ? `${siteUrl}/product/${id}`
    : `${siteUrl}/en/product/${id}`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical,
      languages: {
        pt: `${siteUrl}/product/${id}`,
        en: `${siteUrl}/en/product/${id}`,
      },
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: canonical,
      images: product.image
        ? [{ url: product.image, alt: product.title }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ProductPage productId={id} />;
}
