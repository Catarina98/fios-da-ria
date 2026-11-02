import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import { Body, Caption, Heading } from '@components/ui/typography';
import { routing } from '@i18n/routing';
import { ButtonVariant } from '@typing/components/button';
import { ChevronDown } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import BuyingAccordion from './BuyingAccordion';

import './page.scss';

type Props = { params: Promise<{ locale: string }> };
type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Buying' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiosdaria.pt';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}${locale === 'pt' ? '' : '/en'}/how-to-buy/`,
      languages: {
        pt: `${siteUrl}/how-to-buy/`,
        en: `${siteUrl}/en/how-to-buy/`,
      },
    },
  };
}

export default async function BuyingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Buying' });
  const nav = await getTranslations({ locale, namespace: 'Navigation' });
  const sections = t.raw('sections') as Section[];

  return (
    <div className="buying-page container">
      <Breadcrumbs
        items={[{ label: nav('home'), href: '/' }, { label: t('title') }]}
      />
      <header className="buying-heading">
        <Caption>{t('eyebrow')}</Caption>
        <Heading as="h1" size="XL">
          {t('title')}
        </Heading>
        <Body size="M">{t('description')}</Body>
      </header>
      <BuyingAccordion>
        {sections.map(section => (
          <details
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
          >
            <summary>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <ChevronDown size={22} aria-hidden="true" />
            </summary>
            <div className="buying-answer">
              {section.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.links && (
                <ul className="buying-resource-links">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {section.id === 'custom' && (
                <div className="buying-actions">
                  <Button
                    url="https://ig.me/m/fiosdaria"
                    variant={ButtonVariant.Primary}
                  >
                    {t('customButton')}
                  </Button>
                  <Button
                    url="mailto:fiosdaria@gmail.com"
                    variant={ButtonVariant.Ghost}
                  >
                    {t('emailButton')}
                  </Button>
                </div>
              )}
            </div>
          </details>
        ))}
      </BuyingAccordion>
      <Button url="/gallery" variant={ButtonVariant.Primary}>
        {t('galleryButton')}
      </Button>
    </div>
  );
}
