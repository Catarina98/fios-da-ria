'use client';

import { useState } from 'react';
import Button from '@components/ui/button';
import { Body, Heading } from '@components/ui/typography';
import { routing } from '@i18n/routing';
import { ButtonVariant } from '@typing/components/button';
import { cn } from '@utils/cn';
import { Moon, Sun } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { showcaseGroups } from './registry';

type ShowcaseSidebarProps = {
  isDark: boolean;
  onToggleDark: () => void;
};

const navItemStyles =
  'flex items-center rounded-6 px-12 py-8 text-tertiary transition-colors hover:bg-secondary hover:text-primary focus-visible:bg-focus focus-visible:text-focus focus-visible:outline-none';

const activeNavItemStyles =
  'bg-accent text-primary-inverse hover:bg-accent-hover hover:text-primary-inverse';

const ShowcaseSidebar = ({ isDark, onToggleDark }: ShowcaseSidebarProps) => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const activeEntry = showcaseGroups
    .flatMap(group => group.entries)
    .find(entry => pathname?.endsWith(`/${entry.slug}`));

  return (
    <aside className="flex w-full flex-col gap-16 bg-grey border-b border-divider p-24 desktop:sticky desktop:top-0 desktop:h-screen desktop:w-240 desktop:shrink-0 desktop:gap-32 desktop:overflow-y-auto desktop:border-b-0 desktop:border-r">
      <div className="flex items-center justify-between gap-16">
        <Heading as="p" size="S" className="text-primary">
          Component library
        </Heading>
        <Button
          variant={ButtonVariant.Primary}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleDark}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>

      <button
        type="button"
        aria-expanded={isNavOpen}
        aria-controls="showcase-nav"
        onClick={() => setIsNavOpen(value => !value)}
        className="flex items-center justify-between gap-8 rounded-6 border border-divider bg-secondary px-12 py-8 desktop:hidden"
      >
        <Body size="M" className="text-primary">
          {activeEntry?.name ?? 'Browse components'}
        </Body>
      </button>

      <nav
        id="showcase-nav"
        className={cn(
          'flex-col gap-24 desktop:flex',
          isNavOpen ? 'flex' : 'hidden',
        )}
      >
        {showcaseGroups.map(group => (
          <div key={group.label} className="flex flex-col gap-8">
            <Body size="S" className="px-12 uppercase text-disable">
              {group.label}
            </Body>
            <div className="flex flex-col gap-4">
              {group.entries.map(entry => {
                const isActive = Boolean(pathname?.endsWith(`/${entry.slug}`));

                return (
                  <NextLink
                    key={entry.slug}
                    href={`/${routing.defaultLocale}/showcase/${entry.slug}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsNavOpen(false)}
                    className={cn(
                      navItemStyles,
                      isActive && activeNavItemStyles,
                    )}
                  >
                    <Body size="M">{entry.name}</Body>
                  </NextLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ShowcaseSidebar;
