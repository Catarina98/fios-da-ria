import { FC } from 'react';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import { Body, Heading } from '@components/ui/typography';
import { BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import type { ProductCardType } from '@typing/components/productcard';
import { cn } from '@utils/cn';
import { ArrowRight } from 'lucide-react';

import './ProductCard.scss';

const ProductCard: FC<ProductCardType> = ({
  title,
  category,
  description,
  image,
  imageAlt = '',
  price,
  actionText = 'Ver detalhes',
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      data-testid="product-card-component"
      className={cn('product-card', className)}
      {...props}
    >
      <button
        type="button"
        className="product-image-container"
        data-testid="product-card-image-button"
        onClick={onClick}
        aria-label={`Ver ${title}`}
      >
        <img src={image} alt={imageAlt || title} />
        {category && (
          <Badge
            variant={BadgeVariant.Secondary}
            className="product-category-badge"
            data-testid="product-card-category"
          >
            {category}
          </Badge>
        )}
      </button>

      <div className="product-card-body">
        <div className="product-card-header">
          <Heading
            as="h3"
            size="S"
            className="product-card-title"
            data-testid="product-card-title"
          >
            {title}
          </Heading>
          <Heading
            as="span"
            size="S"
            className="product-card-price"
            data-testid="product-card-price"
          >
            {price}
          </Heading>
        </div>

        <Body
          size="S"
          className="product-card-description"
          data-testid="product-card-description"
        >
          {description}
        </Body>

        <div data-testid="product-card-action">
          <Button
            variant={ButtonVariant.Ghost}
            rightIcon={<ArrowRight size={16} />}
            onClick={onClick}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
