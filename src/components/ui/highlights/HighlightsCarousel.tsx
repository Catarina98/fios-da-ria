'use client';

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { HighlightsCarouselProps } from '@typing/components/highlights';
import { cn } from '@utils/cn';

import Highlights from './Highlights';

import './HighlightsCarousel.scss';

const DEFAULT_INTERVAL = 6000;

export const HighlightsCarousel: FC<HighlightsCarouselProps> = ({
  items,
  autoPlayInterval = DEFAULT_INTERVAL,
  autoPlay = true,
  className,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (total <= 1) return;
      setCurrentIndex((index + total) % total);
    },
    [total],
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }

      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [autoPlay, isPaused, total, autoPlayInterval]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (total <= 1) return;
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }

    touchStartXRef.current = null;
  };

  if (total === 0) {
    return null;
  }

  if (total === 1) {
    return <Highlights {...items[0]} className={className} {...props} />;
  }

  return (
    <section
      className={cn('highlights-carousel-wrapper', className)}
      data-testid="highlights-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Destaques do Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      {...props}
    >
      <div className="highlights-carousel-viewport">
        {items.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={item.id || index}
              className={cn(
                'highlights-carousel-slide',
                isActive && 'is-active',
              )}
              aria-hidden={!isActive}
              data-testid={`highlights-slide-${index}`}
            >
              <Highlights {...item} />
            </div>
          );
        })}
      </div>

      <div
        className="highlights-carousel-controls"
        data-testid="highlights-carousel-controls"
      >
        <div
          className="highlights-carousel-dots"
          role="tablist"
          aria-label="Escolher destaque"
        >
          {items.map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir para destaque ${index + 1}`}
                className={cn(
                  'highlights-carousel-dot',
                  isActive && 'is-active',
                )}
                onClick={() => goToSlide(index)}
                data-testid={`highlights-dot-${index}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsCarousel;
