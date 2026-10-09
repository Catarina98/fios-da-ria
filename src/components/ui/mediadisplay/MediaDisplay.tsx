'use client';

import { FC, useState } from 'react';
import { MediaDisplayProps } from '@typing/components/mediadisplay';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import './MediaDisplay.scss';

export const MediaDisplay: FC<MediaDisplayProps> = ({
  images = [],
  selectedIndex,
  onSelectImage,
  alt = 'Product image',
  className,
}) => {
  const t = useTranslations('Product');
  const [internalIndex, setInternalIndex] = useState(0);

  const activeIndex =
    typeof selectedIndex === 'number' ? selectedIndex : internalIndex;

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    const nextIdx = activeIndex <= 0 ? images.length - 1 : activeIndex - 1;
    if (typeof selectedIndex !== 'number') {
      setInternalIndex(nextIdx);
    }
    onSelectImage?.(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex >= images.length - 1 ? 0 : activeIndex + 1;
    if (typeof selectedIndex !== 'number') {
      setInternalIndex(nextIdx);
    }
    onSelectImage?.(nextIdx);
  };

  const handleThumbnailClick = (index: number) => {
    if (typeof selectedIndex !== 'number') {
      setInternalIndex(index);
    }
    onSelectImage?.(index);
  };

  return (
    <div
      className={cn('media-display', className)}
      data-testid="media-display-component"
    >
      {/* Main image display */}
      <div className="media-display-main">
        <img
          src={getAssetPath(currentImage)}
          alt={alt}
          className="media-display-image product-main-image"
          data-testid="product-main-image"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="media-display-nav-btn media-display-prev gallery-nav-btn gallery-prev"
              onClick={handlePrev}
              aria-label={t('gallery.previousImage') || 'Previous image'}
              data-testid="gallery-prev-button"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="media-display-nav-btn media-display-next gallery-nav-btn gallery-next"
              onClick={handleNext}
              aria-label={t('gallery.nextImage') || 'Next image'}
              data-testid="gallery-next-button"
            >
              <ChevronRight size={22} />
            </button>
            <span className="media-display-counter gallery-counter">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="media-display-thumbnails product-thumbnails"
          role="tablist"
          aria-label="Thumbnails"
          data-testid="product-thumbnails"
        >
          {images.map((imgSrc, index) => {
            const isSelected = index === activeIndex;

            return (
              <button
                key={imgSrc + index}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={cn(
                  'media-display-thumbnail thumbnail-btn',
                  isSelected && 'active',
                )}
                onClick={() => handleThumbnailClick(index)}
                aria-label={
                  t('gallery.thumbnail', { number: index + 1 }) ||
                  `View image ${index + 1}`
                }
                data-testid={`gallery-thumbnail-${index}`}
              >
                <img src={getAssetPath(imgSrc)} alt={`${alt} ${index + 1}`} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaDisplay;
