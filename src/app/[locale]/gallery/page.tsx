import { routing } from '@i18n/routing';
import { setRequestLocale } from 'next-intl/server';

import GalleryContent from './GalleryContent';

import './page.scss';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryContent />;
}
