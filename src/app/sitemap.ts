import { getAllProductIds } from '@lib/sanity/products';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt'
).replace(/\/$/, '');

const staticRoutes = ['', '/about', '/gallery', '/how-to-buy'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getAllProductIds().catch(() => [] as string[]);

  const routes = [...staticRoutes, ...productIds.map(id => `/product/${id}`)];

  return routes.flatMap(route => {
    const languages = {
      pt: `${siteUrl}${route}/`,
      en: `${siteUrl}/en${route}/`,
    };

    return Object.values(languages).map(url => ({
      url,

      // No lastModified until an actual content modification date is available.
      alternates: { languages },
    }));
  });
}
