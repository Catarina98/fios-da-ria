'use client';

import { FC, useMemo, useState } from 'react';
import { MediaDisplayProps } from '@typing/components/mediadisplay';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import './MediaDisplay.scss';

const MAX_THUMBNAILS = 4;

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

  const visibleThumbnails = useMemo(() => {
    if (images.length <= MAX_THUMBNAILS) {
      return images.map((src, index) => ({ src, originalIndex: index }));
    }

    let start = activeIndex - Math.floor(MAX_THUMBNAILS / 2);
    if (start < 0) {
      start = 0;
    }
    if (start + MAX_THUMBNAILS > images.length) {
      start = images.length - MAX_THUMBNAILS;
    }

    return images.slice(start, start + MAX_THUMBNAILS).map((src, idx) => ({
      src,
      originalIndex: start + idx,
    }));
  }, [images, activeIndex]);

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

      {/* Thumbnails grid: neatly fills the width of the main image */}
      {images.length > 1 && (
        <div
          className="media-display-thumbnails product-thumbnails"
          role="tablist"
          aria-label="Thumbnails"
          data-testid="product-thumbnails"
          style={{
            gridTemplateColumns: `repeat(${visibleThumbnails.length}, minmax(0, 1fr))`,
          }}
        >
          {visibleThumbnails.map(({ src: imgSrc, originalIndex }) => {
            const isSelected = originalIndex === activeIndex;

            return (
              <button
                key={`${imgSrc}-${originalIndex}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={cn(
                  'media-display-thumbnail thumbnail-btn',
                  isSelected && 'active',
                )}
                onClick={() => handleThumbnailClick(originalIndex)}
                aria-label={
                  t('gallery.thumbnail', { number: originalIndex + 1 }) ||
                  `View image ${originalIndex + 1}`
                }
                data-testid={`gallery-thumbnail-${originalIndex}`}
              >
                <img
                  src={getAssetPath(imgSrc)}
                  alt={`${alt} ${originalIndex + 1}`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaDisplay;
