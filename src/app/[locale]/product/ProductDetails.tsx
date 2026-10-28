'use client';

import { useEffect, useMemo, useState } from 'react';
import Badge from '@components/ui/badge';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import GuidanceCards from '@components/ui/guidancecards';
import MediaDisplay from '@components/ui/mediadisplay';
import { Body, Heading } from '@components/ui/typography';
import { Link } from '@i18n/navigation';
import { getProductById } from '@lib/sanity/products';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { ButtonVariant } from '@typing/components/button';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ExternalLink, Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import './page.scss';
import { StoreProduct } from '../gallery/data';

export default function ProductDetails({
  initialProduct,
}: {
  initialProduct: StoreProduct;
}) {
  const t = useTranslations('Product');
  const locale = useLocale();

  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    let cancelled = false;

    // Keep live availability from Sanity without replacing the prerendered content.
    void getProductById(initialProduct.id, locale)
      .then(updated => {
        if (!cancelled && updated) setProduct(updated);
      })
      .catch(() => {
        // The complete product from the static export remains available offline.
      });

    return () => {
      cancelled = true;
    };
  }, [initialProduct.id, locale]);

  const variants = useMemo(() => product.variants ?? [], [product.variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    return variants[0]?.id ?? '';
  });

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

  const activeVariant =
    variants.find(variant => variant.id === selectedVariantId) ?? variants[0];

  const currentPrice = activeVariant?.price || product.price;
  const currentVintedUrl =
    activeVariant?.vintedUrl ||
    (variants.length <= 1 ? product.vintedUrl : undefined);
  const isSoldOut = !currentVintedUrl;
  const acceptsOrders = product.acceptsOrders !== false;
  const dimensions = activeVariant?.dimensions || product.dimensions;
  const included = activeVariant?.included || product.included;
  const materials = activeVariant?.materials || product.materials;
  const care = activeVariant?.care || product.care;
  const warnings = activeVariant?.warnings || product.warnings;

  // A variant with its own age indication needs its own documented review.
  const ageDetails =
    activeVariant?.minimumAge !== undefined ? activeVariant : product;

  const requestedProductName =
    activeVariant?.name && activeVariant.name !== product.title
      ? `${product.title} (${activeVariant.name})`
      : product.title;

  const contactMessage =
    locale === 'pt'
      ? `Olá! Gostaria de encomendar a peça: ${requestedProductName}`
      : `Hello! I would like to order the piece: ${requestedProductName}`;

  const instagramDmUrl = `https://ig.me/m/fiosdaria?text=${encodeURIComponent(
    contactMessage,
  )}`;

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
    const targetVariant = variants.find(v => v.id === variantId);
    if (targetVariant?.image) {
      const imgIdx = galleryImages.indexOf(targetVariant.image);
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
              <Badge
                variant={BadgeVariant.Secondary}
                size={BadgeSize.Small}
                style={{
                  ...(product.categoryTagBg
                    ? { backgroundColor: product.categoryTagBg }
                    : {}),
                  ...(product.categoryTagColor
                    ? { color: product.categoryTagColor }
                    : {}),
                }}
              >
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

            <div className="product-price-tag">
              {currentPrice?.startsWith('€')
                ? currentPrice
                : `€${currentPrice}`}
            </div>

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

            {/* Availability remains tied to the purchase link. */}
            <Button
              variant={
                isSoldOut ? ButtonVariant.Tertiary : ButtonVariant.Primary
              }
              className={cn('buy-button', isSoldOut && 'contact-seller-button')}
              url={isSoldOut ? instagramDmUrl : currentVintedUrl}
              rightIcon={<ExternalLink size={18} />}
              data-testid="product-buy-button"
            >
              {isSoldOut
                ? acceptsOrders
                  ? t('contactSeller')
                  : t('details.customUnavailable')
                : t('linkToBuy')}
            </Button>

            <div className="product-buying-info">
              <p>
                {isSoldOut
                  ? t(acceptsOrders ? 'orderNote' : 'contactNote')
                  : t('buyingNote')}
              </p>
              <p>{t('localDelivery')}</p>
              <Link href="/how-to-buy">{t('buyingGuide')}</Link>
            </div>

            <dl className="product-facts">
              {!included && variants.length > 0 && (
                <div>
                  <dt>{t('details.included')}</dt>
                  <dd>{t('details.unit')}</dd>
                </div>
              )}
              {dimensions && (
                <div>
                  <dt>{t('details.dimensions')}</dt>
                  <dd>{dimensions}</dd>
                </div>
              )}
              {included && (
                <div>
                  <dt>{t('details.included')}</dt>
                  <dd>{included}</dd>
                </div>
              )}
              {warnings && (
                <div>
                  <dt>{t('details.warnings')}</dt>
                  <dd>{warnings}</dd>
                </div>
              )}
              {ageDetails.safetyReviewed &&
                ageDetails.minimumAge !== undefined && (
                  <div>
                    <dt>{t('details.age')}</dt>
                    <dd>
                      {ageDetails.minimumAge} {t('details.years')}
                    </dd>
                  </div>
                )}
            </dl>
            <p className="product-safety-note">{t('details.safety')}</p>

            {/* Materials and Care Cards */}
            <GuidanceCards
              materialsTitle={materials ? t('details.materials') : undefined}
              materialsItems={materials ? [materials] : undefined}
              careItems={care ? [care] : undefined}
            />

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
