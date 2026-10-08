import { FC } from 'react';
import { Body, Heading } from '@components/ui/typography';
import type { CardType } from '@typing/components/card';
import { cn } from '@utils/cn';

import './Card.scss';

const Card: FC<CardType> = ({
  title,
  icon,
  iconVariant = 'primary',
  items,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div
      data-testid="card-component"
      className={cn('card', className)}
      {...props}
    >
      {icon && (
        <span
          data-testid="card-icon"
          className={cn('card-icon', `card-icon-${iconVariant}`)}
        >
          {icon}
        </span>
      )}

      {title && (
        <Heading
          as="h3"
          size="M"
          data-testid="card-title"
          className="card-title"
        >
          {title}
        </Heading>
      )}

      {items && items.length > 0 && (
        <ul data-testid="card-list" className="card-list">
          {items.map((item, index) => (
            <li key={index}>
              <Body size="S">{item}</Body>
            </li>
          ))}
        </ul>
      )}

      {description && (
        <div data-testid="card-content" className="card-content">
          <Body size="M">{description}</Body>
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
