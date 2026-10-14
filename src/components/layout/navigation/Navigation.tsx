'use client';

import { FC } from 'react';
import { Link } from '@i18n/navigation';
import { useTranslations } from 'next-intl';

import MobileModal from './components/MobileModal';

import './Navigation.scss';
import { useViewport } from '../../../hooks/useViewport';
import { getAssetPath } from '../../../utils/getAssetPath';

export const getHrefLink = (menuTitle: string) => {
  return menuTitle === 'home'
    ? '/'
    : `/${menuTitle.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
};

const Navigation: FC = () => {
  const t = useTranslations('');

  const navItems = t.raw('Navigation') as Record<string, string>;

  const { isDesktop } = useViewport();

  return (
    <header className="site-header">
      {isDesktop ? (
        <nav className="navbar-desktop">
          <Link href="/" className="logo" prefetch={false}>
            <img
              alt="Fios da Ria Logo"
              width={32}
              height={32}
              src={getAssetPath('/logo.png')}
            />
            Fios da Ria
          </Link>

          <ul className="nav-menu">
            {Object.entries(navItems).map(([key, value]) => (
              <li key={key}>
                <Link
                  href={getHrefLink(key)}
                  className="nav-link"
                  prefetch={false}
                >
                  {value}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <MobileModal data={{ navItems }} />
      )}
    </header>
  );
};

export default Navigation;
