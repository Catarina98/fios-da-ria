'use client';

import { useMemo, useState } from 'react';
import Badge from '@components/ui/badge';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import GuidanceCards from '@components/ui/guidancecards';
import { Body, Heading } from '@components/ui/typography';
import { Link } from '@i18n/navigation';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ArrowLeft, Check, Heart, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';

import './page.scss';
import { CATALOG_PRODUCTS, StoreProduct } from '../gallery/data';

export function ProductView({ product }: { product?: StoreProduct | null }) {
  const t = useTranslations('Product');

  const variants = useMemo(() => product?.variants ?? [], [product?.variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    return variants[0]?.id ?? '';
  });
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-page">
        <div className="container product-container product-not-found">
          <Heading as="h2" size="L">
            {t('notFound.title') || 'Product not found'}
          </Heading>
          <Body size="M">
            {t('notFound.description') ||
              'The piece you are looking for does not exist or is no longer available.'}
          </Body>
          <Link href="/gallery">
            <Button variant={ButtonVariant.Primary}>
              <ArrowLeft size={16} />
              {t('notFound.backToGallery') || 'Back to gallery'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeVariant =
    variants.find(variant => variant.id === selectedVariantId) ?? variants[0];

  const currentImage = activeVariant?.image || product.image;
  const currentPrice = activeVariant?.price || product.price;
  const currentStock = activeVariant?.stock ?? product.stock ?? 0;
  const isSoldOut = currentStock <= 0;

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
    setAdded(false);
  };

  const handleAddToBag = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  return (
    <div className="product-page">
      <div className="container product-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: t('breadcrumbs.home') || 'Home', href: '/' },
            { label: t('breadcrumbs.gallery') || 'Gallery', href: '/gallery' },
            { label: product.title },
          ]}
        />

        {/* Product Details Section */}
        <div className="product-detail">
          {/* Main Product Media */}
          <div className="product-media">
            <img
              src={getAssetPath(currentImage)}
              alt={
                activeVariant?.name
                  ? `${product.title} - ${activeVariant.name}`
                  : product.title
              }
              className="product-main-image"
            />
          </div>

          {/* Product Information */}
          <div className="product-info">
            <div className="badge-row">
              <Badge variant={BadgeVariant.Secondary} size={BadgeSize.Small}>
                {product.category}
              </Badge>
              <Badge variant={BadgeVariant.Neutral} size={BadgeSize.Small}>
                {isSoldOut
                  ? t('status.soldOut') || 'Sold out'
                  : t('status.available') || 'In stock'}
              </Badge>
            </div>

            <Heading as="h1" size="XL" className="product-title">
              {product.title}
            </Heading>

            <div className="product-price-tag">{currentPrice}</div>

            <Body size="M" className="product-lead">
              {product.description}
            </Body>

            <div className="product-rule" />

            {/* Character Variants (if collection) */}
            {variants.length > 0 && (
              <div className="variant-section">
                <span className="variant-label">
                  {t('chooseCharacter') || 'Choose a character'}
                </span>
                <div
                  className="variant-selector"
                  role="radiogroup"
                  aria-label={t('chooseCharacter') || 'Choose a character'}
                >
                  {variants.map(variant => {
                    const isSelected =
                      (activeVariant?.id ?? variants[0]?.id) === variant.id;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={cn('variant-option', isSelected && 'active')}
                        onClick={() => handleSelectVariant(variant.id)}
                      >
                        <img
                          src={getAssetPath(variant.image)}
                          alt={variant.name}
                        />
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Bag Button */}
            <Button
              variant={ButtonVariant.Primary}
              className={cn('add-button', added && 'added')}
              disabled={isSoldOut}
              onClick={handleAddToBag}
              leftIcon={added ? <Check size={18} /> : <ShoppingBag size={18} />}
            >
              {added ? (
                <>{t('addedToBag') || 'Added to bag'}</>
              ) : (
                <>
                  {isSoldOut
                    ? t('status.soldOut') || 'Sold out'
                    : t('addToBag') || 'Add to bag'}
                </>
              )}
            </Button>

            {/* Materials and Care Cards */}
            <GuidanceCards />

            {/* Maker Note */}
            <div className="maker-note">
              <Heart size={20} className="maker-note-icon" />
              <p className="maker-quote">
                {t('makerNote.quote') ||
                  '“Each piece takes many hours of work and a little bit of my story.”'}
              </p>
              <small>{t('makerNote.author') || '— Catarina'}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return <ProductView product={CATALOG_PRODUCTS[0]} />;
}
