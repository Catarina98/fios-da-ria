import { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';

import ShowcaseShell from '@/showcase/ShowcaseShell';

import '../../../styles/globals.css';

type ShowcaseLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ShowcaseLayout({
  children,
  params,
}: ShowcaseLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ShowcaseShell>{children}</ShowcaseShell>;
}
