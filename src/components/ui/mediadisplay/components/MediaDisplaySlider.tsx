'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { MediaDisplayType } from '@typing/components/mediadisplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import './MediaDisplaySlider.scss';

const MediaDisplaySlider: FC<MediaDisplayType> = ({
  images,
  activeIndex = 0,
  onIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [localActiveIndex, setLocalActiveIndex] = useState(0);

  useEffect(() => {
    if (localActiveIndex === activeIndex) return;
    const container = containerRef.current;
    if (container) {
      const width = container.clientWidth;
      const targetScrollLeft = activeIndex * width;

      if (Math.abs(container.scrollLeft - targetScrollLeft) > 5) {
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });
      }

      setLocalActiveIndex(activeIndex);
    }
  }, [activeIndex]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const width = container.clientWidth;
    if (width === 0) return;
    const newIndex = Math.round(container.scrollLeft / width);

    if (
      newIndex !== localActiveIndex &&
      newIndex >= 0 &&
      newIndex < images.length
    ) {
      setLocalActiveIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    let targetIndex = index;
    if (targetIndex < 0) targetIndex = images.length - 1;
    if (targetIndex >= images.length) targetIndex = 0;

    const width = container.clientWidth;

    container.scrollTo({
      left: targetIndex * width,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="media-display-container">
        <div
          data-testid="media-display-component"
          className="slider-container"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {images.map((imgUrl, index) => (
            <div key={index} className="slide">
              <img src={imgUrl} alt={`Gallery slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="dot-container">
          {images.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={`dot ${index === localActiveIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="arrow arrow-left"
          aria-label="Previous slide"
          onClick={() => goToSlide(localActiveIndex - 1)}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="arrow arrow-right"
          aria-label="Next slide"
          onClick={() => goToSlide(localActiveIndex + 1)}
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default MediaDisplaySlider;
