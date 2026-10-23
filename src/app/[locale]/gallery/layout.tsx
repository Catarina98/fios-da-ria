import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}${locale === 'pt' ? '' : '/en'}/gallery/`,
      languages: { pt: `${siteUrl}/gallery/`, en: `${siteUrl}/en/gallery/` },
    },
  };
}

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
