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
        <Link href="/" className="logo">
          <img alt="Fios da Ria Logo" width={32} height={32} src="/logo.png" />
          Fios da Ria
        </Link>
        <Menu className="menu-icon" onClick={() => setIsOpen(true)} />
      </div>

      {/* {isOpen && */}
      <div className={`navbar-modal ${isOpen ? 'is-open' : ''}`}>
        <div className="header">
          <div className="header-text">
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
        <div className="nav-links">
          {Object.entries(navItems).map(([key, value]) => (
            <a key={key} href={getHrefLink(key)} className="nav-item">
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
