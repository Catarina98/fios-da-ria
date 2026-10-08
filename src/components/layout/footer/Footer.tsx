'use client';

import { FC } from 'react';
import { Link } from '@i18n/navigation';
import { useTranslations } from 'next-intl';

import './Footer.scss';
import { getAssetPath } from '../../../utils/getAssetPath';

const Footer: FC = () => {
  const t = useTranslations('Navigation');

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
    { label: t('contact'), href: '/about#contact' },
  ];

  return (
    <footer className="footer">
      <Link href="/" className="logo">
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
              <Link href={item.href} className="nav-link">
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <p>© 2026 Fios da Ria by Catarina.</p>
    </footer>
  );
};

export default Footer;
