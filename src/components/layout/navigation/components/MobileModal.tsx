import { FC, useState } from 'react';
import { Home, Images, Menu, Store,X } from 'lucide-react';
import Link from 'next/link';

import './MobileModal.scss';
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
          {Object.entries(navItems).map(([key, value]) => {
            const Icon = iconMap[key];
            
return (
              <a key={key} href={getHrefLink(key)} className="nav-item">
                {Icon && <Icon className="nav-icon" />}
                {value}
              </a>
            );
          })}
        </div>
      </div>
      {/* } */}
    </>
  );
};

export default MobileModal;
