'use client';

import { useEffect, useMemo, useState } from 'react';
import Badge from '@components/ui/badge';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import GuidanceCards from '@components/ui/guidancecards';
import MediaDisplay from '@components/ui/mediadisplay';
import { Body, Heading } from '@components/ui/typography';
import { Link } from '@i18n/navigation';
import { getProductById, getProducts } from '@lib/sanity/products';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ArrowLeft, ExternalLink, Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import './page.scss';
import { StoreProduct } from '../gallery/data';

export interface ProductPageProps {
  params?: Promise<{ locale?: string; id?: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
  productId?: string;
}

export default function ProductPage(props: any = {}) {
  const productId = props?.productId;
  const t = useTranslations('Product');
  const locale = useLocale();

  const [product, setProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    if (productId) {
      getProductById(productId, locale).then(res => {
        if (res) setProduct(res);
      });
    } else {
      getProducts(locale).then(res => {
        if (res && res.length > 0) setProduct(res[0]);
      });
    }
  }, [productId, locale]);

  const variants = useMemo(() => product?.variants ?? [], [product?.variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    return variants[0]?.id ?? '';
  });

  useEffect(() => {
    if (
      variants.length > 0 &&
      !variants.some(v => v.id === selectedVariantId)
    ) {
      setSelectedVariantId(variants[0].id);
    }
  }, [variants, selectedVariantId]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    const variantImages = (product.variants ?? [])
      .map(v => v.image)
      .filter(Boolean);
    const combined = [product.image, ...variantImages].filter(Boolean);

    return Array.from(new Set(combined));
  }, [product]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const currentPrice = activeVariant?.price || product.price;
  const currentStock = activeVariant?.stock ?? product.stock ?? 0;
  const isSoldOut = currentStock <= 0;
  const currentVintedUrl =
    activeVariant?.vintedUrl || product.vintedUrl || 'https://www.vinted.pt';

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
    const targetVariant = variants.find(v => v.id === variantId);
    if (targetVariant?.image) {
      const imgIdx = galleryImages.findIndex(
        img => img === targetVariant.image,
      );
      if (imgIdx !== -1) {
        setCurrentImageIndex(imgIdx);
      }
    }
  };

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
    const targetImg = galleryImages[index];
    const matchingVariant = variants.find(v => v.image === targetImg);
    if (matchingVariant) {
      setSelectedVariantId(matchingVariant.id);
    }
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
          {/* Main Product Media & Gallery */}
          <div className="product-media">
            <MediaDisplay
              images={galleryImages}
              selectedIndex={currentImageIndex}
              onSelectImage={handleSelectImage}
              alt={
                activeVariant?.name
                  ? `${product.title} - ${activeVariant.name}`
                  : product.title
              }
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

            {/* Link to Buy on Vinted Button */}
            <Button
              variant={ButtonVariant.Primary}
              className="buy-button"
              disabled={isSoldOut}
              url={isSoldOut ? undefined : currentVintedUrl}
              rightIcon={<ExternalLink size={18} />}
              data-testid="product-buy-button"
            >
              {isSoldOut
                ? t('status.soldOut') || 'Sold out'
                : t('linkToBuy') || 'Link to the buy'}
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
