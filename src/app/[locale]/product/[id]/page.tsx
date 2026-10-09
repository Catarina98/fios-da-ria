import { routing } from '@i18n/routing';
import { setRequestLocale } from 'next-intl/server';

import { CATALOG_PRODUCTS } from '../../gallery/data';
import { ProductView } from '../page';

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    CATALOG_PRODUCTS.map(product => ({
      locale,
      id: product.id,
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

  const product = CATALOG_PRODUCTS.find(item => item.id === id);

  return <ProductView product={product} />;
}
