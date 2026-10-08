import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

import GalleryPage, { generateStaticParams } from '../page';

describe('<GalleryPage />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders gallery page with title, search input, filters toggle and all products', async () => {
    const params = Promise.resolve({ locale: 'pt' });

    const pageResult = await GalleryPage({ params });
    render(pageResult);

    expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
    expect(screen.getByTestId('gallery-page-container')).toBeInTheDocument();

    // 1. Title section
    expect(screen.getByTestId('titlesection-component')).toBeInTheDocument();
    expect(screen.getByText('Coleções')).toBeInTheDocument();
    expect(screen.getByText('Peças com alma')).toBeInTheDocument();

    // 2. Filter aside, toggle & search
    expect(screen.getByTestId('gallery-aside')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-filter-toggle')).toBeInTheDocument();
    expect(screen.getByText('Mostrar filtros')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-search-input')).toBeInTheDocument();

    // 3. Category options
    expect(screen.getByTestId('filter-category-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-category-toy_story')).toBeInTheDocument();
    expect(
      screen.getByTestId('filter-category-princesas_disney'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('filter-category-spy_family'),
    ).toBeInTheDocument();

    // 4. Products grid
    expect(screen.getByTestId('gallery-product-grid')).toBeInTheDocument();
    expect(screen.getByText('Woody')).toBeInTheDocument();
    expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
    expect(screen.getByText('Anya Forger')).toBeInTheDocument();
  });

  it('toggles mobile filter panel when clicking the toggle button', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

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

  it('filters products by search input query', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

    const searchInput = screen.getByTestId('gallery-search-input');

    // Search for "Woody"
    fireEvent.change(searchInput, { target: { value: 'Woody' } });

    expect(screen.getByText('Woody')).toBeInTheDocument();
    expect(screen.queryByText('Branca de Neve')).not.toBeInTheDocument();
    expect(screen.queryByText('Anya Forger')).not.toBeInTheDocument();

    // Clear search using clear button
    const clearBtn = screen.getByTestId('gallery-search-clear');
    fireEvent.click(clearBtn);

    expect(screen.getByText('Woody')).toBeInTheDocument();
    expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
    expect(screen.getByText('Anya Forger')).toBeInTheDocument();
  });

  it('filters products when selecting a category', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

    // Filter by 'Spy x Family'
    const spyBtn = screen.getByTestId('filter-category-spy_family');
    fireEvent.click(spyBtn);

    expect(screen.getByText('Anya Forger')).toBeInTheDocument();
    expect(screen.queryByText('Woody')).not.toBeInTheDocument();
    expect(screen.queryByText('Branca de Neve')).not.toBeInTheDocument();

    // Filter by 'Princesas Disney'
    const disneyBtn = screen.getByTestId('filter-category-princesas_disney');
    fireEvent.click(disneyBtn);

    expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
    expect(screen.queryByText('Anya Forger')).not.toBeInTheDocument();
    expect(screen.queryByText('Woody')).not.toBeInTheDocument();
  });

  it('filters products when selecting a price range', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

    // Select 'Mais de €50' (Snow White is €65)
    const over50Btn = screen.getByTestId('filter-price-over50');
    fireEvent.click(over50Btn);

    expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
    expect(screen.queryByText('Woody')).not.toBeInTheDocument();
    expect(screen.queryByText('Anya Forger')).not.toBeInTheDocument();

    // Select 'Até €50' (Woody is €48, Anya is €42)
    const under50Btn = screen.getByTestId('filter-price-under50');
    fireEvent.click(under50Btn);

    expect(screen.getByText('Woody')).toBeInTheDocument();
    expect(screen.getByText('Anya Forger')).toBeInTheDocument();
    expect(screen.queryByText('Branca de Neve')).not.toBeInTheDocument();
  });

  it('sorts products by price ascending and descending', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

    const sortAscBtn = screen.getByTestId('filter-sort-sortPriceAsc');
    fireEvent.click(sortAscBtn);

    const titlesAsc = screen
      .getAllByTestId('product-card-title')
      .map(el => el.textContent);

    // Anya is cheapest at €42
    expect(titlesAsc[0]).toBe('Anya Forger');

    const sortDescBtn = screen.getByTestId('filter-sort-sortPriceDesc');
    fireEvent.click(sortDescBtn);

    const titlesDesc = screen
      .getAllByTestId('product-card-title')
      .map(el => el.textContent);

    // Snow White is most expensive at €65
    expect(titlesDesc[0]).toBe('Branca de Neve');
  });

  it('displays empty state and resets filters when clear button is clicked', async () => {
    const params = Promise.resolve({ locale: 'pt' });
    const pageResult = await GalleryPage({ params });
    render(pageResult);

    // Spy x Family (Anya is €42) + Over €50 -> 0 items
    fireEvent.click(screen.getByTestId('filter-category-spy_family'));
    fireEvent.click(screen.getByTestId('filter-price-over50'));

    expect(screen.getByTestId('gallery-empty-state')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma peça encontrada')).toBeInTheDocument();

    // Click clear filters button
    const clearBtn = screen.getByTestId('gallery-clear-filters-btn');
    fireEvent.click(clearBtn);

    expect(screen.queryByTestId('gallery-empty-state')).not.toBeInTheDocument();
    expect(screen.getByTestId('gallery-product-grid')).toBeInTheDocument();
    expect(screen.getByText('Woody')).toBeInTheDocument();
  });

  it('generates static params for all supported locales', () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: 'pt' }, { locale: 'en' }]);
  });
});
