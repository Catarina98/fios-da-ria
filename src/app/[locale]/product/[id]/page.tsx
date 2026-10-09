import { routing } from '@i18n/routing';
import { getAllProductIds } from '@lib/sanity/products';
import { setRequestLocale } from 'next-intl/server';

import ProductPage from '../page';

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

type ProductDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ProductPage productId={id} />;
}
