import { routing } from '@i18n/routing';
import { setRequestLocale } from 'next-intl/server';

import ProductContent from './ProductContent';

import { CATALOG_PRODUCTS } from '../gallery/data';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type ProductPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductContent product={CATALOG_PRODUCTS[0]} />;
}
