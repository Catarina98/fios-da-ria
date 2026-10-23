import { ReactNode } from 'react';
import Footer from '@components/layout/footer';
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
  display: 'swap',
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fios da Ria – Amigurumi feitos à mão em Portugal',
    template: '%s | Fios da Ria',
  },
  description:
    'Fios da Ria é um projeto de crochet artesanal criado por Catarina, em Olhão. Amigurumi feitos à mão com fio 100% algodão — personagens de filmes, anime, cultura pop e muito mais.',
  keywords: [
    'amigurumi',
    'crochet',
    'croché',
    'feito à mão',
    'handmade',
    'Portugal',
    'Olhão',
    'Algarve',
    'bonecos de crochet',
    'fios da ria',
    'artesanato',
    'personagens crochet',
    'amigurumi portugal',
    'encomendas personalizadas',
  ],
  authors: [{ name: 'Catarina', url: siteUrl }],
  creator: 'Catarina – Fios da Ria',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    alternateLocale: ['en_GB'],
    url: siteUrl,
    siteName: 'Fios da Ria',
    title: 'Fios da Ria – Amigurumi feitos à mão em Portugal',
    description:
      'Amigurumi artesanais criados com amor, ponto a ponto. Personagens únicos feitos à mão em Olhão, Portugal.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Fios da Ria – Amigurumi feitos à mão',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fios da Ria – Amigurumi feitos à mão em Portugal',
    description:
      'Amigurumi artesanais criados com amor, ponto a ponto. Personagens únicos feitos à mão em Olhão, Portugal.',
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: `${basePath}/favicon.ico`,
    shortcut: `${basePath}/favicon.ico`,
    apple: `${basePath}/favicon.ico`,
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Fios da Ria',
        description:
          'Amigurumi feitos à mão em Portugal por Catarina — personagens únicos de crochet.',
        inLanguage: ['pt-PT', 'en'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#business`,
        name: 'Fios da Ria',
        description:
          'Projeto de crochet artesanal criado por Catarina, em Olhão. Amigurumi feitos à mão.',
        url: siteUrl,
        image: `${siteUrl}/logo.png`,
        email: 'fiosdaria@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Olhão',
          addressRegion: 'Algarve',
          addressCountry: 'PT',
        },
        sameAs: ['https://www.instagram.com/fiosdaria'],
        priceRange: '€',
      },
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.className} ${manrope.variable}`}>
        <Providers messages={messages} locale={locale}>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
