import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import MediaDisplay from '../MediaDisplay';

const sampleImages = [
  '/images/catalog/toy-story-woody.JPG',
  '/images/catalog/toy-story-jessie.JPG',
  '/images/catalog/toy-story-buzz.JPG',
];

describe('<MediaDisplay />', () => {
  afterEach(cleanup);

  it('renders nothing when images list is empty', () => {
    const { container } = render(<MediaDisplay images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a single image without arrows or thumbnails', () => {
    render(<MediaDisplay images={['/images/single.jpg']} alt="Single piece" />);

    expect(screen.getByTestId('product-main-image')).toHaveAttribute(
      'src',
      '/images/single.jpg',
    );
    expect(screen.queryByTestId('gallery-prev-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery-next-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-thumbnails')).not.toBeInTheDocument();
  });

  it('renders multiple images, arrows, counter and thumbnails', () => {
    render(
      <MediaDisplay images={sampleImages} selectedIndex={0} alt="Toy Story" />,
    );

    expect(screen.getByTestId('product-main-image')).toHaveAttribute(
      'src',
      sampleImages[0],
    );
    expect(screen.getByTestId('gallery-prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-next-button')).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    const thumbnails = screen.getAllByRole('tab');
    expect(thumbnails).toHaveLength(3);
    expect(thumbnails[0]).toHaveAttribute('aria-selected', 'true');
    expect(thumbnails[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onSelectImage when next or prev buttons are clicked', () => {
    const onSelect = vi.fn();
    render(
      <MediaDisplay
        images={sampleImages}
        selectedIndex={1}
        onSelectImage={onSelect}
      />,
    );

    // Next from index 1 -> index 2
    fireEvent.click(screen.getByTestId('gallery-next-button'));
    expect(onSelect).toHaveBeenCalledWith(2);

    // Prev from index 1 -> index 0
    fireEvent.click(screen.getByTestId('gallery-prev-button'));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('calls onSelectImage when a thumbnail is clicked', () => {
    const onSelect = vi.fn();
    render(
      <MediaDisplay
        images={sampleImages}
        selectedIndex={0}
        onSelectImage={onSelect}
      />,
    );

    fireEvent.click(screen.getByTestId('gallery-thumbnail-2'));
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('cycles images when uncontrolled', () => {
    render(<MediaDisplay images={sampleImages} />);

    const mainImg = screen.getByTestId('product-main-image');
    expect(mainImg).toHaveAttribute('src', sampleImages[0]);

    fireEvent.click(screen.getByTestId('gallery-next-button'));
    expect(mainImg).toHaveAttribute('src', sampleImages[1]);

    fireEvent.click(screen.getByTestId('gallery-thumbnail-2'));
    expect(mainImg).toHaveAttribute('src', sampleImages[2]);
  });
});
