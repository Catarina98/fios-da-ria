import { FC } from 'react';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import { Body, Heading } from '@components/ui/typography';
import { Link } from '@i18n/navigation';
import { BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import type { ProductCardType } from '@typing/components/productcard';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ArrowRight } from 'lucide-react';

import './ProductCard.scss';

const ProductCard: FC<ProductCardType> = ({
  title,
  category,
  description,
  image,
  imageAlt = '',
  price,
  actionText = 'View details',
  stock,
  variantCount,
  variantTextSingular = 'variant',
  variantTextPlural = 'variants',
  inStockText = 'in stock',
  soldOutText = 'Sold out',
  url,
  className,
  ...props
}) => {
  const imageContent = (
    <>
      <img src={getAssetPath(image)} alt={imageAlt || title} />
      {category && (
        <Badge
          variant={BadgeVariant.Secondary}
          className="product-category-badge"
          data-testid="product-card-category"
        >
          {category}
        </Badge>
      )}
    </>
  );

  return (
    <div
      data-testid="product-card-component"
      className={cn('product-card', className)}
      {...props}
    >
      <Link
        href={url}
        className="product-image-container"
        data-testid="product-card-image-button"
        aria-label={`Ver ${title}`}
      >
        {imageContent}
      </Link>

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

        {typeof variantCount === 'number' && variantCount > 0 && (
          <span
            className="product-card-variant-count"
            data-testid="product-card-variant-count"
          >
            {variantCount}{' '}
            {variantCount === 1 ? variantTextSingular : variantTextPlural}
          </span>
        )}

        {typeof stock === 'number' && (
          <span
            className={cn(
              'product-card-stock',
              stock <= 0 && 'product-card-stock-sold-out',
            )}
            data-testid="product-card-stock"
          >
            {stock > 0 ? `${stock} ${inStockText}` : soldOutText}
          </span>
        )}

        <div data-testid="product-card-action">
          <Button
            variant={ButtonVariant.Ghost}
            rightIcon={<ArrowRight size={16} />}
            url={url}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
