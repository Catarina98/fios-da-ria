export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price: string;
  stock: number;
  vintedUrl?: string;
}

export interface StoreProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  price: string;
  stock: number;
  variants: ProductVariant[];
  vintedUrl?: string;
}

export function getProductPrices(product: StoreProduct): number[] {
  const variants = product.variants ?? [];
  const source =
    variants.length > 0
      ? variants.map(variant => variant.price)
      : [product.price];

  return source
    .map(price => Number(String(price).replace('€', '').trim()))
    .filter(price => Number.isFinite(price));
}

export function getProductDisplayPrice(
  product: StoreProduct,
  fromPrefix = 'From',
): string {
  if ((product.variants ?? []).length === 0) return product.price;

  const prices = getProductPrices(product);

  return prices.length > 0
    ? `${fromPrefix} €${Math.min(...prices)}`
    : product.price;
}
