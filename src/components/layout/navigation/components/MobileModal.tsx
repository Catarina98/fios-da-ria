'use client';

import { FC, useEffect, useId, useRef, useState } from 'react';
import { Link } from '@i18n/navigation';
import { Home, Images, Menu, Store, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import './MobileModal.scss';
import { getAssetPath } from '../../../../utils/getAssetPath';
import { getHrefLink } from '../Navigation';

interface MobileModalProps {
  navItems: Record<string, string>;
}

const iconMap: Record<string, FC<{ className?: string }>> = {
  home: Home,
  gallery: Images,
  about: Store,
};

const MobileModal: FC<{ data: MobileModalProps }> = ({ data }) => {
  const { navItems } = data;
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Accessibility');
  const dialogId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen) {
      if (dialog.open) {
        dialog.close();
        triggerRef.current?.focus();
      }

      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  return (
    <>
      <div className="navbar-header">
        <Link href="/" className="logo" prefetch={false}>
          <img
            alt="Fios da Ria Logo"
            width={32}
            height={32}
            src={getAssetPath('/logo.png')}
          />
          Fios da Ria
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className="navigation-icon-button"
          aria-label={t('openMenu')}
          aria-expanded={isOpen}
          aria-controls={dialogId}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="menu-icon" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className={`navbar-modal ${isOpen ? 'is-open' : ''}`}
        aria-label={t('mainNavigation')}
        onCancel={event => {
          event.preventDefault();
          setIsOpen(false);
        }}
        onClose={() => {
          triggerRef.current?.focus();
        }}
      >
        <div className="header">
          <Link
            href="/"
            className="header-text"
            prefetch={false}
            onClick={() => setIsOpen(false)}
          >
            <img
              alt="Fios da Ria Logo"
              width={32}
              height={32}
              src={getAssetPath('/logo.png')}
            />
            Fios da Ria
          </Link>
          <button
            type="button"
            className="navigation-icon-button"
            aria-label={t('closeMenu')}
            onClick={() => setIsOpen(false)}
            autoFocus
          >
            <X className="close" aria-hidden="true" />
          </button>
        </div>
        <nav className="nav-links" aria-label={t('mainNavigation')}>
          {Object.entries(navItems).map(([key, value]) => {
            const Icon = iconMap[key];

            return (
              <Link
                key={key}
                href={getHrefLink(key)}
                className="nav-item"
                prefetch={false}
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon className="nav-icon" />}
                {value}
              </Link>
            );
          })}
        </nav>
      </dialog>
    </>
  );
};

export default MobileModal;
