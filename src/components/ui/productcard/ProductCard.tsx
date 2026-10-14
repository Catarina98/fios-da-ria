import { FC } from 'react';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import { Heading } from '@components/ui/typography';
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
  categoryTagBg,
  categoryTagColor,
  image,
  imageAlt = '',
  price,
  actionText = 'View details',
  stock,
  inStockText = 'in stock',
  soldOutText = 'Sold out',
  url,
  className,
  ...props
}) => {
  const badgeStyle = {
    ...(categoryTagBg ? { backgroundColor: categoryTagBg } : {}),
    ...(categoryTagColor ? { color: categoryTagColor } : {}),
  };

  const imageContent = (
    <>
      <img src={getAssetPath(image)} alt={imageAlt || title} loading="lazy" />
      {category && (
        <Badge
          variant={BadgeVariant.Secondary}
          className="product-category-badge"
          data-testid="product-card-category"
          style={Object.keys(badgeStyle).length > 0 ? badgeStyle : undefined}
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
        prefetch={false}
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

        {typeof stock === 'number' && (
          <span
            className={cn(
              'product-card-stock',
              stock <= 0 && 'product-card-stock-sold-out',
            )}
            data-testid="product-card-stock"
          >
            {stock > 0
              ? stock === 1
                ? inStockText
                : `${stock} ${inStockText}`
              : soldOutText}
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
