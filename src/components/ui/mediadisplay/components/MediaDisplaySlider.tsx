'use client';

import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MediaDisplayType } from '@typing/components/mediadisplay';
import { ArrowLeft, ArrowRight,X } from 'lucide-react';

import { useViewport } from '@/hooks/useViewport';

import './MediaDisplaySlider.scss';

const MediaDisplaySlider: FC<MediaDisplayType> = ({
  images,
  activeIndex: propActiveIndex = 0,
  showFullScreen: propShowFullScreen,
  onIndexChange,
  onToggleFullScreen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);
  const { isDesktop } = useViewport();

  const [internalFullScreen, setInternalFullScreen] = useState(false);
  const [internalActiveIndex, setInternalActiveIndex] =
    useState(propActiveIndex);

  const isFullScreen = propShowFullScreen ?? internalFullScreen;
  const activeIndex =
    propActiveIndex !== undefined && onIndexChange
      ? propActiveIndex
      : internalActiveIndex;

  useEffect(() => {
    console.log('propActiveIndex');
    setInternalActiveIndex(propActiveIndex);
  }, [propActiveIndex]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    if (width === 0) return;

    const targetLeft = activeIndex * width;

    if (container.scrollLeft !== targetLeft) {
      container.scrollLeft = targetLeft;
    }
  }, [isFullScreen, activeIndex]);

  const handleToggleFullScreen = useCallback(
    (show: boolean) => {
      setInternalFullScreen(show);
      onToggleFullScreen?.(show);
    },
    [onToggleFullScreen],
  );

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setInternalActiveIndex(newIndex);
      onIndexChange?.(newIndex);
    },
    [onIndexChange],
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (isNavigatingRef.current) return;

    const container = event.currentTarget;
    const width = container.clientWidth;
    if (width === 0) return;

    const newIndex = Math.round(container.scrollLeft / width);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      handleIndexChange(newIndex);
    }
  };

  const goToSlide = useCallback(
    (index: number) => {
      let targetIndex = index;
      if (targetIndex < 0) targetIndex = images.length - 1;
      if (targetIndex >= images.length) targetIndex = 0;

      isNavigatingRef.current = true;

      handleIndexChange(targetIndex);

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 400);
    },
    [images.length, handleIndexChange],
  );

  return (
    <div className={isFullScreen ? 'media-display-component-fullscreen' : ''}>
      <div className="media-display-container">
        {isFullScreen && (
          <button
            type="button"
            className="close-button icon-media-display"
            aria-label="Close"
            onClick={() => handleToggleFullScreen(false)}
          >
            <X />
          </button>
        )}

        <div
          data-testid="media-display-component"
          className="slider-container"
          ref={containerRef}
          {...(isDesktop ? {} : { onScroll: handleScroll })}
        >
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className="slide"
              {...(isDesktop && !isFullScreen
                ? { onClick: () => handleToggleFullScreen(true) }
                : {})}
            >
              <img
                src={imgUrl}
                alt={`Gallery slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="dot-container">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          className="arrow arrow-left icon-media-display"
          aria-label="Previous slide"
          onClick={() => goToSlide(activeIndex - 1)}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="arrow arrow-right icon-media-display"
          aria-label="Next slide"
          onClick={() => goToSlide(activeIndex + 1)}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MediaDisplaySlider;
