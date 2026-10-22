import { getAllProductIds } from '@lib/sanity/products';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.com';

const staticRoutes = ['', '/about', '/gallery'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getAllProductIds().catch(() => [] as string[]);

  const ptStaticRoutes: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        pt: `${siteUrl}${route}`,
        en: `${siteUrl}/en${route}`,
      },
    },
  }));

  const productRoutes: MetadataRoute.Sitemap = productIds.map(id => ({
    url: `${siteUrl}/product/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        pt: `${siteUrl}/product/${id}`,
        en: `${siteUrl}/en/product/${id}`,
      },
    },
  }));

  return [...ptStaticRoutes, ...productRoutes];
}
