import { act, cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { ButtonVariant } from '@typing/components/button';
import { HighlightItem } from '@typing/components/highlights';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import HighlightsCarousel from '../HighlightsCarousel';

const mockItems: HighlightItem[] = [
  {
    id: 'highlight-1',
    badge: 'Badge 1',
    title: 'Highlight One',
    description: 'Description 1',
    imageSrc: '/images/toystory-highlight.jpg',
    imageAlt: 'Alt 1',
    button: { children: 'Botão 1', variant: ButtonVariant.Primary },
    note: { text: 'Nota 1' },
  },
  {
    id: 'highlight-2',
    badge: 'Badge 2',
    title: 'Highlight Two',
    description: 'Description 2',
    imageSrc: '/images/catarina-highlight.jpg',
    imageAlt: 'Alt 2',
    button: { children: 'Botão 2', variant: ButtonVariant.Primary },
    note: { text: 'Nota 2' },
  },
  {
    id: 'highlight-3',
    badge: 'Badge 3',
    title: 'Highlight Three',
    description: 'Description 3',
    imageSrc: '/images/toystory-highlight.jpg',
    imageAlt: 'Alt 3',
    button: { children: 'Botão 3', variant: ButtonVariant.Primary },
    note: { text: 'Nota 3' },
  },
];

describe('HighlightsCarousel Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders nothing when items array is empty', () => {
    const { container } = render(<HighlightsCarousel items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders static Highlights component without carousel controls when there is only one item', () => {
    render(<HighlightsCarousel items={[mockItems[0]]} />);

    expect(screen.getByTestId('highlights-component')).toBeInTheDocument();
    expect(screen.getByText('Highlight One')).toBeInTheDocument();
    expect(
      screen.queryByTestId('highlights-carousel-controls'),
    ).not.toBeInTheDocument();
  });

  it('renders multiple slides with controls and navigation dots', () => {
    render(<HighlightsCarousel items={mockItems} />);

    expect(screen.getByTestId('highlights-carousel')).toBeInTheDocument();
    expect(
      screen.getByTestId('highlights-carousel-controls'),
    ).toBeInTheDocument();

    const slide0 = screen.getByTestId('highlights-slide-0');
    expect(slide0).toHaveClass('is-active');

    const dot0 = screen.getByTestId('highlights-dot-0');
    expect(dot0).toHaveClass('is-active');
  });

  it('navigates to specific slide when dot is clicked', () => {
    render(<HighlightsCarousel items={mockItems} />);

    const dot2 = screen.getByTestId('highlights-dot-2');
    fireEvent.click(dot2);

    expect(screen.getByTestId('highlights-slide-2')).toHaveClass('is-active');
    expect(dot2).toHaveClass('is-active');
  });

  it('advances slides automatically with autoPlay timer', () => {
    render(<HighlightsCarousel items={mockItems} autoPlayInterval={3000} />);

    expect(screen.getByTestId('highlights-slide-0')).toHaveClass('is-active');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('highlights-slide-1')).toHaveClass('is-active');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('highlights-slide-2')).toHaveClass('is-active');
  });

  it('pauses autoPlay on mouse enter and resumes on mouse leave', () => {
    render(<HighlightsCarousel items={mockItems} autoPlayInterval={3000} />);

    const carousel = screen.getByTestId('highlights-carousel');

    // Mouse enter
    fireEvent.mouseEnter(carousel);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should still be slide 0 because paused
    expect(screen.getByTestId('highlights-slide-0')).toHaveClass('is-active');

    // Mouse leave
    fireEvent.mouseLeave(carousel);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Now advances to slide 1
    expect(screen.getByTestId('highlights-slide-1')).toHaveClass('is-active');
  });

  it('navigates using keyboard arrow keys', () => {
    render(<HighlightsCarousel items={mockItems} />);

    const carousel = screen.getByTestId('highlights-carousel');

    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(screen.getByTestId('highlights-slide-1')).toHaveClass('is-active');

    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(screen.getByTestId('highlights-slide-0')).toHaveClass('is-active');
  });

  it('handles touch swipe gestures', () => {
    render(<HighlightsCarousel items={mockItems} />);

    const carousel = screen.getByTestId('highlights-carousel');

    // Swipe left (next)
    fireEvent.touchStart(carousel, {
      touches: [{ clientX: 200 }],
    });
    fireEvent.touchEnd(carousel, {
      changedTouches: [{ clientX: 100 }],
    });
    expect(screen.getByTestId('highlights-slide-1')).toHaveClass('is-active');

    // Swipe right (prev)
    fireEvent.touchStart(carousel, {
      touches: [{ clientX: 100 }],
    });
    fireEvent.touchEnd(carousel, {
      changedTouches: [{ clientX: 200 }],
    });
    expect(screen.getByTestId('highlights-slide-0')).toHaveClass('is-active');
  });

  it('passes isFullHeight and breadcrumbs to slides and wrapper', () => {
    render(
      <HighlightsCarousel
        items={mockItems}
        isFullHeight
        breadcrumbs={<span data-testid="carousel-crumbs">Home / Carousel</span>}
      />,
    );

    expect(screen.getByTestId('highlights-carousel')).toHaveClass(
      'highlights-full-height',
    );
    expect(screen.getAllByTestId('carousel-crumbs').length).toBeGreaterThan(0);
  });
});
