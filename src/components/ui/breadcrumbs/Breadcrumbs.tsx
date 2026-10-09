import { FC, Fragment } from 'react';
import { Link } from '@i18n/navigation';
import type { BreadcrumbsType } from '@typing/components/breadcrumbs';
import { cn } from '@utils/cn';
import { ChevronRight } from 'lucide-react';

import './Breadcrumbs.scss';

const Breadcrumbs: FC<BreadcrumbsType> = ({ items, className, ...props }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      data-testid="breadcrumbs-component"
      className={cn('breadcrumbs', className)}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={index}>
            {index > 0 && (
              <ChevronRight
                size={14}
                className="breadcrumb-sep"
                aria-hidden="true"
                data-testid="breadcrumb-separator"
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="breadcrumb-link"
                data-testid={`breadcrumb-link-${index}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="breadcrumb-current"
                aria-current={isLast ? 'page' : undefined}
                data-testid={`breadcrumb-current-${index}`}
              >
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
