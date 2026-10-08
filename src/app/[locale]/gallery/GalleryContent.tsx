'use client';

import { useMemo, useState } from 'react';
import Button from '@components/ui/button';
import Card from '@components/ui/card';
import ProductCard from '@components/ui/productcard';
import TitleSection from '@components/ui/titlesection';
import { Body, Heading } from '@components/ui/typography';
import { ButtonVariant } from '@typing/components/button';
import clsx from 'clsx';
import { Plus, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type CategoryFilterKey =
  'all' | 'toy_story' | 'princesas_disney' | 'spy_family';

export type PriceFilterKey = 'all' | 'under50' | 'over50';

export type SortKey = 'sortRelevance' | 'sortPriceAsc' | 'sortPriceDesc';

export interface GalleryProduct {
  id: string;
  categoryKey: Exclude<CategoryFilterKey, 'all'>;
  image: string;
  rawPrice: number;
}

export const GALLERY_PRODUCTS: GalleryProduct[] = [
  {
    id: 'woody',
    categoryKey: 'toy_story',
    image: '/images/woody.jpg',
    rawPrice: 48,
  },
  {
    id: 'snowWhite',
    categoryKey: 'princesas_disney',
    image: '/images/snow-white.jpg',
    rawPrice: 65,
  },
  {
    id: 'anya',
    categoryKey: 'spy_family',
    image: '/images/anya.jpg',
    rawPrice: 42,
  },
];

const CATEGORIES: CategoryFilterKey[] = [
  'all',
  'toy_story',
  'princesas_disney',
  'spy_family',
];

const PRICE_FILTERS: PriceFilterKey[] = ['all', 'under50', 'over50'];

const SORT_OPTIONS: SortKey[] = [
  'sortRelevance',
  'sortPriceAsc',
  'sortPriceDesc',
];

export default function GalleryContent() {
  const t = useTranslations('Gallery');

  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterKey>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilterKey>('all');
  const [sortOption, setSortOption] = useState<SortKey>('sortRelevance');

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredProducts = useMemo(() => {
    return GALLERY_PRODUCTS.filter(product => {
      if (!normalizedQuery) return true;

      const title = t(`products.${product.id}.title`).toLocaleLowerCase();
      const category = t(`products.${product.id}.category`).toLocaleLowerCase();
      const description = t(
        `products.${product.id}.description`,
      ).toLocaleLowerCase();
      const searchTarget = `${title} ${category} ${description}`;

      return searchTarget.includes(normalizedQuery);
    })
      .filter(product => {
        if (categoryFilter === 'all') return true;

        return product.categoryKey === categoryFilter;
      })
      .filter(product => {
        if (priceFilter === 'under50') return product.rawPrice <= 50;
        if (priceFilter === 'over50') return product.rawPrice > 50;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'sortPriceAsc') return a.rawPrice - b.rawPrice;
        if (sortOption === 'sortPriceDesc') return b.rawPrice - a.rawPrice;

        return 0;
      });
  }, [categoryFilter, priceFilter, sortOption, normalizedQuery, t]);

  const getCategoryCount = (categoryKey: CategoryFilterKey) => {
    if (categoryKey === 'all') return GALLERY_PRODUCTS.length;

    return GALLERY_PRODUCTS.filter(p => p.categoryKey === categoryKey).length;
  };

  const handleResetFilters = () => {
    setQuery('');
    setCategoryFilter('all');
    setPriceFilter('all');
    setSortOption('sortRelevance');
  };

  return (
    <main className="gallery-page" data-testid="gallery-page-container">
      <div className="gallery-container">
        <TitleSection
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          align="left"
        />

        <div className="gallery-layout">
          <aside
            className="gallery-sidebar"
            aria-label={t('filters.title')}
            data-testid="gallery-aside"
          >
            <Card className="gallery-aside">
              <div className="gallery-aside-header">
                <Heading as="h3" size="M" className="filter-title">
                  {t('filters.title')}
                </Heading>
                <button
                  type="button"
                  className="filter-toggle"
                  aria-controls="gallery-filter-panel"
                  aria-expanded={filtersOpen}
                  onClick={() => setFiltersOpen(open => !open)}
                  data-testid="gallery-filter-toggle"
                >
                  <span>
                    {filtersOpen
                      ? t('filters.hideFilters')
                      : t('filters.showFilters')}
                  </span>
                  {filtersOpen ? <X size={15} /> : <Plus size={15} />}
                </button>
              </div>

              <div
                className={clsx(
                  'filter-panel',
                  filtersOpen && 'filter-panel-open',
                )}
                id="gallery-filter-panel"
                data-testid="gallery-filter-panel"
              >
                <div
                  className="search-field"
                  data-testid="gallery-search-field"
                >
                  <Search
                    size={16}
                    className="search-field-icon"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    className="search-field-input"
                    aria-label={t('filters.searchPlaceholder')}
                    placeholder={t('filters.searchPlaceholder')}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    data-testid="gallery-search-input"
                  />
                  {query && (
                    <button
                      type="button"
                      className="search-field-clear"
                      aria-label={t('filters.clearSearch')}
                      onClick={() => setQuery('')}
                      data-testid="gallery-search-clear"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div
                  className="filter-group"
                  data-testid="filter-group-category"
                >
                  <span className="filter-label">{t('filters.category')}</span>
                  {CATEGORIES.map(category => {
                    const isActive = categoryFilter === category;

                    return (
                      <Button
                        key={category}
                        className={clsx(
                          'filter-option',
                          isActive && 'filter-option-active',
                        )}
                        variant={ButtonVariant.Tertiary}
                        aria-pressed={isActive}
                        data-testid={`filter-category-${category}`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        <span>{t(`categories.${category}`)}</span>
                        <span className="filter-count">
                          {getCategoryCount(category)}
                        </span>
                      </Button>
                    );
                  })}
                </div>

                <div className="filter-group" data-testid="filter-group-price">
                  <span className="filter-label">{t('filters.price')}</span>
                  {PRICE_FILTERS.map(price => {
                    const isActive = priceFilter === price;

                    return (
                      <Button
                        key={price}
                        className={clsx(
                          'filter-option',
                          isActive && 'filter-option-active',
                        )}
                        variant={ButtonVariant.Tertiary}
                        aria-pressed={isActive}
                        data-testid={`filter-price-${price}`}
                        onClick={() => setPriceFilter(price)}
                      >
                        <span>{t(`filters.${price}`)}</span>
                      </Button>
                    );
                  })}
                </div>

                <div className="filter-group" data-testid="filter-group-sort">
                  <span className="filter-label">{t('filters.sort')}</span>
                  {SORT_OPTIONS.map(sort => {
                    const isActive = sortOption === sort;

                    return (
                      <Button
                        key={sort}
                        className={clsx(
                          'filter-option',
                          isActive && 'filter-option-active',
                        )}
                        variant={ButtonVariant.Tertiary}
                        aria-pressed={isActive}
                        data-testid={`filter-sort-${sort}`}
                        onClick={() => setSortOption(sort)}
                      >
                        <span>{t(`filters.${sort}`)}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </aside>

          <section
            className="gallery-main"
            aria-label={t('title')}
            data-testid="gallery-products-section"
          >
            {filteredProducts.length > 0 ? (
              <div
                className="product-grid gallery-grid"
                data-testid="gallery-product-grid"
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    title={t(`products.${product.id}.title`)}
                    category={t(`products.${product.id}.category`)}
                    description={t(`products.${product.id}.description`)}
                    image={product.image}
                    price={t(`products.${product.id}.price`)}
                  />
                ))}
              </div>
            ) : (
              <div className="gallery-empty" data-testid="gallery-empty-state">
                <span className="gallery-empty-icon" aria-hidden="true">
                  <Search size={24} />
                </span>
                <Heading as="h3" size="M" className="gallery-empty-title">
                  {t('filters.emptyTitle')}
                </Heading>
                <Body size="S" className="gallery-empty-description">
                  {t('filters.emptyDescription')}
                </Body>
                <Button
                  variant={ButtonVariant.Primary}
                  onClick={handleResetFilters}
                  data-testid="gallery-clear-filters-btn"
                >
                  {t('filters.clearFilters')}
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
