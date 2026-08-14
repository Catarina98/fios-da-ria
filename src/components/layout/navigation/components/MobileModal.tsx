import { FC, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import './MobileModal.scss';
import { getHrefLink } from '../Navigation';

interface MobileModalProps {
  navItems: Record<string, string>;
}

const MobileModal: FC<{ data: MobileModalProps }> = ({ data }) => {
  const { navItems } = data;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar-header">
        <Link
          href="/"
          className="flex items-center justify-center gap-8 text-2xl font-bold"
        >
          <img alt="Fios da Ria Logo" width={32} height={32} src="/logo.png" />
          Fios da Ria
        </Link>
        <Menu className="menu-icon" onClick={() => setIsOpen(true)} />
      </div>

      {/* {isOpen && */}
      <div className={`navbar-modal ${isOpen ? 'is-open' : ''}`}>
        <div className="header">
          <div className="header-text font-bold">
            <img
              alt="Fios da Ria Logo"
              width={32}
              height={32}
              src="/logo.png"
            />
            Fios da Ria
          </div>
          <X className="close" onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex flex-col gap-8 px-16 pb-32">
          {Object.entries(navItems).map(([key, value]) => (
            <a
              key={key}
              href={getHrefLink(key)}
              className="p-8 rounded-6 hover:bg-tertiary"
            >
              {value}
            </a>
          ))}
        </div>
      </div>
      {/* } */}
    </>
  );
};

export default MobileModal;
