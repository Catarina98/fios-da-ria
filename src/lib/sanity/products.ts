import { isSanityConfigured, sanityClient, urlFor } from './client';

import { StoreProduct } from '../../app/[locale]/gallery/data';

export interface SanityProductVariantRaw {
  id: string;
  name?: { pt?: string; en?: string } | string;
  price?: string | number;
  vintedUrl?: string;
  image?: any;
  images?: any[];
}

export interface SanityProductRaw {
  _id?: string;
  id?: { current?: string } | string;
  title?: { pt?: string; en?: string } | string;
  category?:
    | {
        pt?: string;
        en?: string;
        available?: boolean;
        tagBackgroundColor?: string;
        tagTextColor?: string;
      }
    | string;
  categoryTagBg?: string;
  categoryTagColor?: string;
  description?: { pt?: string; en?: string } | string;
  price?: string | number;
  vintedUrl?: string;
  images?: any[];
  variants?: SanityProductVariantRaw[];
  isVisible?: boolean;
  visibleFrom?: string;
  visibleUntil?: string;
  order?: number;
}

const getLocalizedValue = (
  value: { pt?: string; en?: string } | string | undefined,
  locale: string,
): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const target = locale === 'pt' ? value.pt : value.en;

  return target || value.pt || value.en || '';
};

const formatSanityProduct = (
  raw: SanityProductRaw,
  locale: string,
): StoreProduct => {
  const productId =
    (typeof raw.id === 'object' ? raw.id?.current : raw.id) ||
    raw._id ||
    'product';

  const galleryImages = (raw.images || [])
    .map(img => (typeof img === 'string' ? img : urlFor(img)))
    .filter(Boolean);

  const mainImage = galleryImages[0] || '';

  const variants = (raw.variants || []).map(v => {
    const variantImg = v.image
      ? typeof v.image === 'string'
        ? v.image
        : urlFor(v.image)
      : '';
    const variantGallery = (v.images || [])
      .map(img => (typeof img === 'string' ? img : urlFor(img)))
      .filter(Boolean);

    const variantVintedUrl =
      v.vintedUrl ||
      (raw.variants && raw.variants.length > 1 ? undefined : raw.vintedUrl) ||
      undefined;
    const hasVariantStock = Boolean(variantVintedUrl);

    return {
      id: v.id,
      name: getLocalizedValue(v.name, locale),
      image: variantImg || mainImage,
      images: variantGallery.length > 0 ? variantGallery : undefined,
      price: typeof v.price === 'number' ? `€${v.price}` : v.price || '',
      stock: hasVariantStock ? 1 : 0,
      vintedUrl: variantVintedUrl,
    };
  });

  const productVintedUrl = raw.vintedUrl || undefined;
  const hasProductStock = Boolean(
    productVintedUrl || variants.some(v => Boolean(v.vintedUrl)),
  );

  const categoryTagBg =
    raw.categoryTagBg ||
    (typeof raw.category === 'object'
      ? raw.category?.tagBackgroundColor
      : undefined);
  const categoryTagColor =
    raw.categoryTagColor ||
    (typeof raw.category === 'object' ? raw.category?.tagTextColor : undefined);

  return {
    id: productId,
    title: getLocalizedValue(raw.title, locale),
    category: getLocalizedValue(raw.category, locale) || 'Amigurumi',
    categoryTagBg: categoryTagBg || undefined,
    categoryTagColor: categoryTagColor || undefined,
    description: getLocalizedValue(raw.description, locale),
    image: mainImage,
    images: galleryImages,
    price: typeof raw.price === 'number' ? `€${raw.price}` : raw.price || '€0',
    stock: hasProductStock ? 1 : 0,
    variants,
    vintedUrl: productVintedUrl,
    order: typeof raw.order === 'number' ? raw.order : undefined,
  };
};

export async function getProducts(
  locale: string = 'pt',
): Promise<StoreProduct[]> {
  if (!isSanityConfigured() || !sanityClient) {
    return [];
  }

  try {
    const query = `*[_type == "product"
      && coalesce(isVisible, true) == true
      && (!defined(category) || coalesce(category->available, category.available, true) == true)
      && (!defined(visibleFrom) || visibleFrom <= now())
      && (!defined(visibleUntil) || visibleUntil > now())
    ] | order(coalesce(order, 9999) asc, _createdAt desc) {
      _id,
      "id": coalesce(id.current, _id),
      title,
      "category": coalesce(category->title, category),
      "categoryTagBg": coalesce(category->tagBackgroundColor, category.tagBackgroundColor),
      "categoryTagColor": coalesce(category->tagTextColor, category.tagTextColor),
      description,
      price,
      vintedUrl,
      images,
      order,
      variants[] {
        id,
        name,
        price,
        vintedUrl,
        image,
        images
      }
    }`;

    const sanityProducts = await sanityClient.fetch<SanityProductRaw[]>(query);
    if (!sanityProducts || sanityProducts.length === 0) {
      return [];
    }

    return sanityProducts
      .filter(p => {
        if (typeof p.category === 'object' && p.category?.available === false) {
          return false;
        }

        return true;
      })
      .map(p => formatSanityProduct(p, locale));
  } catch (error) {
    console.warn('Failed to fetch products from Sanity:', error);

    return [];
  }
}

export async function getProductById(
  id: string,
  locale: string = 'pt',
): Promise<StoreProduct | null> {
  const products = await getProducts(locale);

  return products.find(p => p.id === id) ?? null;
}

export async function getAllProductIds(): Promise<string[]> {
  if (!isSanityConfigured() || !sanityClient) {
    return [];
  }

  try {
    const query = `*[_type == "product"
      && coalesce(isVisible, true) == true
      && (!defined(category) || coalesce(category->available, category.available, true) == true)
      && (!defined(visibleFrom) || visibleFrom <= now())
      && (!defined(visibleUntil) || visibleUntil > now())
    ] | order(coalesce(order, 9999) asc, _createdAt desc).id.current`;
    const ids = await sanityClient.fetch<string[]>(query);
    if (!ids || ids.length === 0) {
      return [];
    }

    return ids.filter(Boolean);
  } catch {
    return [];
  }
}
