import Badge from '@components/ui/badge';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import { Icon } from '@components/ui/icons';
import TitleSection from '@components/ui/titlesection';
import { Body, Heading } from '@components/ui/typography';
import { routing } from '@i18n/routing';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import { getAssetPath } from '@utils/getAssetPath';
import { ArrowRight, Mail } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import './page.scss';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');
  const tNav = await getTranslations('Navigation');

  const processSteps = [
    {
      number: t('process.step1.number'),
      title: t('process.step1.title'),
      description: t('process.step1.description'),
    },
    {
      number: t('process.step2.number'),
      title: t('process.step2.title'),
      description: t('process.step2.description'),
    },
    {
      number: t('process.step3.number'),
      title: t('process.step3.title'),
      description: t('process.step3.description'),
    },
  ];

  const emailAddress = t('contact.email');
  const emailSubject = encodeURIComponent(t('contact.emailSubject'));
  const mailtoHref = `mailto:${emailAddress}?subject=${emailSubject}`;

  return (
    <>
      <div className="about-page" data-testid="about-page-container">
        {/* Hero Section */}
        <section
          className="about-hero"
          aria-label={t('hero.badge')}
          data-testid="about-hero-section"
        >
          <div className="container">
            <Breadcrumbs
              items={[
                { label: tNav('home'), href: '/' },
                { label: tNav('about') },
              ]}
            />
            <div className="about-grid">
              <div className="about-hero-copy">
                <Badge
                  variant={BadgeVariant.Secondary}
                  size={BadgeSize.Small}
                  className="about-badge"
                  data-testid="about-badge"
                >
                  {t('hero.badge')}
                </Badge>

                <h1 className="about-hero-title" data-testid="about-title">
                  {t('hero.greeting')} <em>{t('hero.name')}</em>
                </h1>

                <p className="about-hero-lead" data-testid="about-lead">
                  {t('hero.lead')}
                </p>

                <Button
                  variant={ButtonVariant.Primary}
                  url="/gallery"
                  rightIcon={<ArrowRight size={16} />}
                  data-testid="about-gallery-btn"
                >
                  {t('hero.galleryButton')}
                </Button>
              </div>

              <div className="about-hero-image-wrapper">
                <img
                  src={getAssetPath('/images/catarina.jpg')}
                  alt={t('hero.imageAlt')}
                  data-testid="about-hero-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          className="about-process-section"
          aria-label={t('process.eyebrow')}
          data-testid="about-process-section"
        >
          <div className="container">
            <TitleSection
              eyebrow={t('process.eyebrow')}
              title={t('process.title')}
              description={t('process.description')}
              align="center"
            />

            <div className="process-grid" data-testid="about-process-grid">
              {processSteps.map(step => (
                <div
                  key={step.number}
                  className="process-card"
                  data-testid={`process-card-${step.number}`}
                >
                  <span className="process-number">{step.number}</span>
                  <Heading
                    as="h3"
                    size="M"
                    className="process-card-title"
                    data-testid={`process-title-${step.number}`}
                  >
                    {step.title}
                  </Heading>
                  <Body
                    size="S"
                    className="process-card-text"
                    data-testid={`process-desc-${step.number}`}
                  >
                    {step.description}
                  </Body>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          className="about-contact-section"
          id="contact"
          aria-label={t('contact.badge')}
          data-testid="about-contact-section"
        >
          <div className="container">
            <div className="contact-card" data-testid="about-contact-card">
              <div className="contact-info">
                <Badge
                  variant={BadgeVariant.Secondary}
                  size={BadgeSize.Small}
                  className="contact-badge"
                >
                  {t('contact.badge')}
                </Badge>

                <Heading
                  as="h2"
                  size="L"
                  className="contact-title"
                  data-testid="about-contact-title"
                >
                  {t('contact.title')}
                </Heading>

                <Body
                  size="M"
                  className="contact-lead"
                  data-testid="about-contact-lead"
                >
                  {t('contact.lead')}
                </Body>
              </div>

              <div className="contact-links" data-testid="about-contact-links">
                <a
                  href={mailtoHref}
                  className="contact-link-item"
                  data-testid="about-email-link"
                >
                  <Mail
                    size={18}
                    className="contact-link-icon"
                    aria-hidden="true"
                  />
                  <span>{emailAddress}</span>
                </a>

                <a
                  href="https://instagram.com/fiosdaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                  data-testid="about-instagram-link"
                >
                  <Icon
                    icon="instagram"
                    size={18}
                    className="contact-link-icon"
                  />
                  <span>{t('contact.instagram')}</span>
                </a>

                <Button
                  variant={ButtonVariant.Secondary}
                  url={mailtoHref}
                  className="contact-action-btn"
                  data-testid="about-send-message-btn"
                >
                  {t('contact.sendMessage')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
