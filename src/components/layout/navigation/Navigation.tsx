import { FC } from 'react';
import { useTranslations } from 'next-intl';

const getHrefLink = (menuTitle: string) => {
  return menuTitle === 'home'
    ? '/'
    : `/${menuTitle.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
};

const Navigation: FC = () => {
  const t = useTranslations('');

  const navItems = t.raw('Navigation') as Record<string, string>;

  return (
    <nav className="flex items-center justify-between px-40 py-16 rounded-6 bg-white text-secondary shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <a className="flex items-center justify-center gap-8 text-2xl font-bold">
        <img alt="Fios da Ria Logo" width={32} height={32} src="/logo.png" />
        Fios da Ria
      </a>

      <ul className="flex items-center justify-center gap-24 text-sm font-medium">
        {Object.entries(navItems).map(([key, value]) => (
          <li key={key}>
            <a
              href={getHrefLink(key)}
              className="relative py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
            >
              {value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
