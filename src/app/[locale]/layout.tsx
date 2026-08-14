import { ReactNode } from 'react';
import Footer from '@components/layout/footer/Footer';
import Navigation from '@components/layout/navigation';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import '../../styles/globals.css';
import { routing } from '../../i18n/routing';
import { Providers } from '../../providers';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fios da Ria',
  description: 'Gallery for fios da ria',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable}`}>
        <Providers messages={messages} locale={locale}>
          <main>
            <Navigation />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
