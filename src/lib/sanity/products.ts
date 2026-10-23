import { isSanityConfigured, sanityClient, urlFor } from './client';

import { ProductDetails, StoreProduct } from '../../app/[locale]/gallery/data';

type Localized = { pt?: string; en?: string } | string;
interface SanityDetailsRaw {
  dimensions?: Localized;
  included?: Localized;
  materials?: Localized;
  care?: Localized;
  warnings?: Localized;
  minimumAge?: number;
  safetyReviewed?: boolean;
}

export interface SanityProductVariantRaw extends SanityDetailsRaw {
  id: string;
  name?: { pt?: string; en?: string } | string;
  price?: string | number;
  vintedUrl?: string;
  wallapopUrl?: string;
  image?: any;
  images?: any[];
}

export interface SanityProductRaw extends SanityDetailsRaw {
  acceptsOrders?: boolean;
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
        slug?: { current?: string } | string;
      }
    | string;
  categorySlug?: string;
  categoryTagBg?: string;
  categoryTagColor?: string;
  description?: { pt?: string; en?: string } | string;
  price?: string | number;
  vintedUrl?: string;
  wallapopUrl?: string;
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

const formatDetails = (
  raw: SanityDetailsRaw,
  locale: string,
): ProductDetails => ({
  dimensions: getLocalizedValue(raw.dimensions, locale) || undefined,
  included: getLocalizedValue(raw.included, locale) || undefined,
  materials: getLocalizedValue(raw.materials, locale) || undefined,
  care: getLocalizedValue(raw.care, locale) || undefined,
  warnings: getLocalizedValue(raw.warnings, locale) || undefined,
  minimumAge: raw.minimumAge,
  safetyReviewed: raw.safetyReviewed === true,
});

const purchaseLink = (raw: { wallapopUrl?: string; vintedUrl?: string }) =>
  raw.wallapopUrl?.trim() || raw.vintedUrl?.trim() || undefined;

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
      purchaseLink(v) ||
      (raw.variants && raw.variants.length > 1
        ? undefined
        : purchaseLink(raw)) ||
      undefined;
    const hasVariantStock = Boolean(variantVintedUrl);

    return {
      ...formatDetails(v, locale),
      id: v.id,
      name: getLocalizedValue(v.name, locale),
      image: variantImg || mainImage,
      images: variantGallery.length > 0 ? variantGallery : undefined,
      price: typeof v.price === 'number' ? `€${v.price}` : v.price || '',
      stock: hasVariantStock ? 1 : 0,
      vintedUrl: variantVintedUrl,
    };
  });

  const productVintedUrl = purchaseLink(raw);
  const hasVariants = Boolean(raw.variants && raw.variants.length > 0);
  const stock = hasVariants
    ? variants.filter(v => Boolean(v.vintedUrl && v.vintedUrl.trim() !== ''))
        .length
    : Boolean(productVintedUrl && productVintedUrl.trim() !== '')
      ? 1
      : 0;

  const categoryTagBg =
    raw.categoryTagBg ||
    (typeof raw.category === 'object'
      ? raw.category?.tagBackgroundColor
      : undefined);
  const categoryTagColor =
    raw.categoryTagColor ||
    (typeof raw.category === 'object' ? raw.category?.tagTextColor : undefined);

  const rawCat = raw.category;
  const categoryTranslations =
    typeof rawCat === 'object' && rawCat !== null
      ? { pt: rawCat.pt, en: rawCat.en }
      : undefined;

  const rawCatSlug =
    typeof rawCat === 'object' &&
    rawCat !== null &&
    typeof rawCat.slug === 'object'
      ? rawCat.slug?.current
      : typeof rawCat === 'object' &&
          rawCat !== null &&
          typeof rawCat.slug === 'string'
        ? rawCat.slug
        : undefined;

  const categorySlug = raw.categorySlug || rawCatSlug || undefined;

  return {
    ...formatDetails(raw, locale),
    acceptsOrders: raw.acceptsOrders !== false,
    id: productId,
    title: getLocalizedValue(raw.title, locale),
    category: getLocalizedValue(raw.category, locale) || 'Amigurumi',
    categorySlug: categorySlug ? String(categorySlug).toLowerCase() : undefined,
    categoryTranslations,
    categoryTagBg: categoryTagBg || undefined,
    categoryTagColor: categoryTagColor || undefined,
    description: getLocalizedValue(raw.description, locale),
    image: mainImage,
    images: galleryImages,
    price: typeof raw.price === 'number' ? `€${raw.price}` : raw.price || '€0',
    stock,
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
      "categorySlug": coalesce(category->slug.current, category.slug.current),
      "categoryTagBg": coalesce(category->tagBackgroundColor, category.tagBackgroundColor),
      "categoryTagColor": coalesce(category->tagTextColor, category.tagTextColor),
      description,
      price,
      vintedUrl,
      wallapopUrl,
      acceptsOrders,
      dimensions,
      included,
      materials,
      care,
      warnings,
      minimumAge,
      safetyReviewed,
      images,
      order,
      variants[] {
        id,
        name,
        price,
        vintedUrl,
        wallapopUrl,
        dimensions,
        included,
        materials,
        care,
        warnings,
        minimumAge,
        safetyReviewed,
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
      .map(p => formatSanityProduct(p, locale))
      .sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return (b.stock ?? 0) - (a.stock ?? 0);
      });
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
