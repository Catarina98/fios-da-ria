import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

import GalleryPage from '../page';

describe('<GalleryPage />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders gallery page with title, search input, filters toggle and catalog products', async () => {
    render(<GalleryPage />);

    expect(screen.getByTestId('gallery-page-container')).toBeInTheDocument();

    // 1. Breadcrumbs & Title section
    expect(screen.getByTestId('breadcrumbs-component')).toBeInTheDocument();
    expect(screen.getByTestId('titlesection-component')).toBeInTheDocument();
    expect(screen.getByText('Coleções')).toBeInTheDocument();
    expect(screen.getByText('Peças com alma')).toBeInTheDocument();

    // 2. Filter aside, toggle, search & range slider
    expect(screen.getByTestId('gallery-aside')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-filter-toggle')).toBeInTheDocument();
    expect(screen.getByText('Mostrar filtros')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('range-slider-component')).toBeInTheDocument();

    // 3. Category options
    expect(screen.getByTestId('filter-category-All')).toBeInTheDocument();
    expect(screen.getByTestId('filter-category-Anime')).toBeInTheDocument();

    // 4. Products grid
    expect(screen.getByTestId('gallery-product-grid')).toBeInTheDocument();
    expect(screen.getByText('Toy Story Collection')).toBeInTheDocument();
    expect(
      screen.getByText('Disney Princesses Collection'),
    ).toBeInTheDocument();
    expect(screen.getByText('Spy × Family Collection')).toBeInTheDocument();
  });

  it('toggles mobile filter panel when clicking the toggle button', async () => {
    render(<GalleryPage />);

    const toggleBtn = screen.getByTestId('gallery-filter-toggle');
    const panel = screen.getByTestId('gallery-filter-panel');

    // Initially closed
    expect(panel).not.toHaveClass('filter-panel-open');
    expect(toggleBtn).toHaveTextContent('Mostrar filtros');

    // Click to open
    fireEvent.click(toggleBtn);
    expect(panel).toHaveClass('filter-panel-open');
    expect(toggleBtn).toHaveTextContent('Ocultar filtros');

    // Click to close
    fireEvent.click(toggleBtn);
    expect(panel).not.toHaveClass('filter-panel-open');
    expect(toggleBtn).toHaveTextContent('Mostrar filtros');
  });

  it('filters products by search input query matching variants', async () => {
    render(<GalleryPage />);

    const searchInput = screen.getByTestId('gallery-search-input');

    // Search for "Woody" (variant of Toy Story collection)
    fireEvent.change(searchInput, { target: { value: 'Woody' } });

    expect(screen.getByText('Toy Story Collection')).toBeInTheDocument();
    expect(
      screen.queryByText('Disney Princesses Collection'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Spy × Family Collection'),
    ).not.toBeInTheDocument();

    // Clear search using clear button
    const clearBtn = screen.getByTestId('gallery-search-clear');
    fireEvent.click(clearBtn);

    expect(screen.getByText('Toy Story Collection')).toBeInTheDocument();
    expect(
      screen.getByText('Disney Princesses Collection'),
    ).toBeInTheDocument();
    expect(screen.getByText('Spy × Family Collection')).toBeInTheDocument();
  });

  it('filters products when selecting a category', async () => {
    render(<GalleryPage />);

    // Filter by 'Anime' (One Piece and Spy x Family)
    const animeBtn = screen.getByTestId('filter-category-Anime');
    fireEvent.click(animeBtn);

    expect(screen.getByText('Spy × Family Collection')).toBeInTheDocument();
    expect(screen.getByText('One Piece Collection')).toBeInTheDocument();
    expect(screen.queryByText('Toy Story Collection')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Disney Princesses Collection'),
    ).not.toBeInTheDocument();
  });

  it('filters products using the RangeSlider inputs', async () => {
    render(<GalleryPage />);

    const minInput = screen.getByTestId('range-slider-min');

    fireEvent.change(minInput, { target: { value: '44' } });

    expect(
      screen.getByText('Disney Princesses Collection'),
    ).toBeInTheDocument();
    expect(screen.queryByText('One Piece Collection')).not.toBeInTheDocument();
    expect(screen.queryByText('Toy Story Collection')).not.toBeInTheDocument();
  });

  it('sorts products by price ascending and descending', async () => {
    render(<GalleryPage />);

    const sortAscBtn = screen.getByTestId('filter-sort-sortPriceAsc');
    fireEvent.click(sortAscBtn);

    const titlesAsc = screen
      .getAllByTestId('product-card-title')
      .map(el => el.textContent);

    expect(titlesAsc[0]).toBe('One Piece Collection');

    const sortDescBtn = screen.getByTestId('filter-sort-sortPriceDesc');
    fireEvent.click(sortDescBtn);

    const titlesDesc = screen
      .getAllByTestId('product-card-title')
      .map(el => el.textContent);

    expect(titlesDesc[0]).toBe('Disney Princesses Collection');
  });

  it('displays empty state and resets filters when clear button is clicked', async () => {
    render(<GalleryPage />);

    // Search query with no match
    const searchInput = screen.getByTestId('gallery-search-input');
    fireEvent.change(searchInput, { target: { value: 'xyz123nonexistent' } });

    expect(screen.getByTestId('gallery-empty-state')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma peça encontrada')).toBeInTheDocument();

    // Click clear filters button
    const clearBtn = screen.getByTestId('gallery-clear-filters-btn');
    fireEvent.click(clearBtn);

    expect(screen.queryByTestId('gallery-empty-state')).not.toBeInTheDocument();
    expect(screen.getByTestId('gallery-product-grid')).toBeInTheDocument();
    expect(screen.getByText('Toy Story Collection')).toBeInTheDocument();
  });
});
