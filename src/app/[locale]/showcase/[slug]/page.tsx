import { routing } from '@i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { findShowcaseEntry, showcaseList } from '@/showcase/registry';
import ShowcaseContent from '@/showcase/ShowcaseContent';

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    showcaseList.map(entry => ({ locale, slug: entry.slug })),
  );
}

type ShowcasePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ShowcaseComponentPage({
  params,
}: ShowcasePageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  if (!findShowcaseEntry(slug)) {
    notFound();
  }

  return <ShowcaseContent slug={slug} />;
}
