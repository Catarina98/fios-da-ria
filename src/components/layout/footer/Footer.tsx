'use client';

import { FC } from 'react';
import { getPathname, Link, usePathname } from '@i18n/navigation';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import './Footer.scss';
import { getAssetPath } from '../../../utils/getAssetPath';

const Footer: FC = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const pathname = usePathname();

  const footerItems = [
    {
      label: 'Email',
      href: 'mailto:fiosdaria@gmail.com',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/fiosdaria',
      isExternal: true,
    },
    { label: t('Contact'), href: '/about#contact' },
  ];

  return (
    <footer className="footer">
      <Link href="/" className="logo" prefetch={false}>
        <img
          alt="Fios da Ria Logo"
          width={32}
          height={32}
          src={getAssetPath('/logo.png')}
        />
        Fios da Ria
      </Link>

      <ul className="footer-menu">
        {footerItems.map((item, index) => (
          <li key={index}>
            {item.isExternal || item.href.startsWith('mailto:') ? (
              <a
                href={item.href}
                className="nav-link"
                {...(item.isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span>{item.label}</span>
              </a>
            ) : (
              <Link href={item.href} className="nav-link" prefetch={false}>
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="footer-lang-switcher" aria-label="Language selection">
        <a
          href={getPathname({ locale: 'pt', href: pathname })}
          className={clsx('lang-link', locale === 'pt' && 'active')}
          aria-current={locale === 'pt' ? 'true' : undefined}
          data-testid="footer-lang-pt"
        >
          PT
        </a>
        <span className="lang-divider" aria-hidden="true">
          |
        </span>
        <a
          href={getPathname({ locale: 'en', href: pathname })}
          className={clsx('lang-link', locale === 'en' && 'active')}
          aria-current={locale === 'en' ? 'true' : undefined}
          data-testid="footer-lang-en"
        >
          EN
        </a>
      </div>

      <p>© 2026 Fios da Ria by Catarina.</p>
    </footer>
  );
};

export default Footer;
