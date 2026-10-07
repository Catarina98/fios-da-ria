'use client';
import { FC } from 'react';
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

  return isDesktop ? (
    <nav className="navbar-desktop">
      <a className="logo">
        <img
          alt="Fios da Ria Logo"
          width={32}
          height={32}
          src={getAssetPath('/logo.png')}
        />
        Fios da Ria
      </a>

      <ul className="nav-menu">
        {Object.entries(navItems).map(([key, value]) => (
          <li key={key}>
            <a href={getHrefLink(key)} className="nav-link">
              {value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <MobileModal data={{ navItems }} />
  );
};

export default Navigation;
