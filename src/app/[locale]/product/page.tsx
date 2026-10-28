import { getProducts } from '@lib/sanity/products';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import ProductDetails from './ProductDetails';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [product] = await getProducts(locale);
  if (!product) notFound();

  return (
    <ProductDetails key={`${locale}:${product.id}`} initialProduct={product} />
  );
}
