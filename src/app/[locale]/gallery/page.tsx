'use client';

import { useEffect, useMemo, useState } from 'react';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import Card from '@components/ui/card';
import ProductCard from '@components/ui/productcard';
import RangeSlider from '@components/ui/rangeslider';
import TitleSection from '@components/ui/titlesection';
import { Body, Heading } from '@components/ui/typography';
import { getProducts } from '@lib/sanity/products';
import { ButtonVariant } from '@typing/components/button';
import clsx from 'clsx';
import { Plus, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { getProductDisplayPrice, getProductPrices, StoreProduct } from './data';

import './page.scss';

export type SortKey = 'sortPriceAsc' | 'sortPriceDesc';

const SORT_OPTIONS: SortKey[] = ['sortPriceAsc', 'sortPriceDesc'];

export default function GalleryPage() {
  const locale = useLocale();
  const [products, setProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    getProducts(locale).then(fetched => {
      setProducts(fetched || []);
    });
  }, [locale]);

  const t = useTranslations('Gallery');
  const tNav = useTranslations('Navigation');

  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortKey>('sortPriceAsc');

  const normalizedProducts = useMemo(() => {
    return (Array.isArray(products) ? products : []).flatMap(product => {
      if (!product) return [];
      const hasStock = Boolean(
        product.vintedUrl ||
        (product.variants ?? []).some(v => Boolean(v.vintedUrl)),
      );

      return [
        {
          ...product,
          title: product.title ?? 'Untitled Product',
          category: product.category ?? 'Uncategorized',
          description: product.description ?? '',
          image: product.image,
          price: typeof product.price === 'string' ? product.price : '€0',
          stock: hasStock ? 1 : 0,
          variants: Array.isArray(product.variants)
            ? product.variants.filter(Boolean)
            : [],
        },
      ];
    });
  }, [products]);

  const usedCategories = useMemo(() => {
    return Array.from(
      new Set(
        normalizedProducts.map(product => product.category).filter(Boolean),
      ),
    );
  }, [normalizedProducts]);

  const filters = useMemo(() => ['All', ...usedCategories], [usedCategories]);

  const catalogMaxPrice = useMemo(() => {
    return Math.ceil(
      Math.max(
        0,
        ...normalizedProducts.flatMap(product => getProductPrices(product)),
      ),
    );
  }, [normalizedProducts]);

  const effectiveMaxPrice = maxPrice ?? catalogMaxPrice;

  useEffect(() => {
    if (!filters.includes(filter)) setFilter('All');
  }, [filter, filters]);

  const categoryCount = (category: string) =>
    category === 'All'
      ? normalizedProducts.length
      : normalizedProducts.filter(product => product.category === category)
          .length;

  const getCategoryLabel = (categoryName: string) => {
    if (categoryName === 'All') return t('filters.all');
    if (t.has(`categories.${categoryName}`)) {
      return t(`categories.${categoryName}`);
    }

    return categoryName;
  };

  const getProductCategory = (categoryName: string) => {
    if (t.has(`categories.${categoryName}`)) {
      return t(`categories.${categoryName}`);
    }

    return categoryName;
  };

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredProducts = useMemo(() => {
    return normalizedProducts
      .filter(product => {
        if (!normalizedQuery) return true;
        const matchString = [
          product.title,
          product.category,
          product.description,
          ...(product.variants ?? []).map(v => v.name),
        ]
          .join(' ')
          .toLocaleLowerCase();

        return matchString.includes(normalizedQuery);
      })
      .filter(product => filter === 'All' || product.category === filter)
      .filter(product =>
        getProductPrices(product).some(
          price => price >= minPrice && price <= effectiveMaxPrice,
        ),
      )
      .sort((a, b) => {
        if (sortOption === 'sortPriceAsc') {
          return (
            Math.min(...getProductPrices(a)) - Math.min(...getProductPrices(b))
          );
        }
        if (sortOption === 'sortPriceDesc') {
          return (
            Math.max(...getProductPrices(b)) - Math.max(...getProductPrices(a))
          );
        }

        return 0;
      });
  }, [
    normalizedProducts,
    normalizedQuery,
    filter,
    minPrice,
    effectiveMaxPrice,
    sortOption,
  ]);

  const handleResetFilters = () => {
    setQuery('');
    setFilter('All');
    setMinPrice(0);
    setMaxPrice(null);
    setSortOption('sortPriceAsc');
  };

  return (
    <div className="gallery-page" data-testid="gallery-page-container">
      <div className="container gallery-container">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('gallery') },
          ]}
        />
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
                  {filters.map(item => {
                    const isActive = filter === item;

                    return (
                      <Button
                        key={item}
                        className={clsx(
                          'filter-option',
                          isActive && 'filter-option-active',
                        )}
                        variant={ButtonVariant.Tertiary}
                        aria-pressed={isActive}
                        data-testid={`filter-category-${item}`}
                        onClick={() => setFilter(item)}
                      >
                        <span>{getCategoryLabel(item)}</span>
                        <span className="filter-count">
                          {categoryCount(item)}
                        </span>
                      </Button>
                    );
                  })}
                </div>

                <div className="filter-group" data-testid="filter-group-price">
                  <RangeSlider
                    min={0}
                    max={catalogMaxPrice}
                    minValue={minPrice}
                    maxValue={effectiveMaxPrice}
                    onMinChange={value =>
                      setMinPrice(Math.min(value, effectiveMaxPrice))
                    }
                    onMaxChange={value =>
                      setMaxPrice(Math.max(value, minPrice))
                    }
                    label={t('filters.price')}
                    minLabel={t('filters.minPrice')}
                    maxLabel={t('filters.maxPrice')}
                  />
                </div>

                <div className="filter-group" data-testid="filter-group-sort">
                  <span className="filter-label">
                    {t('filters.sortByPrice')}
                  </span>
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
                    title={product.title}
                    category={getProductCategory(product.category)}
                    description={product.description}
                    image={product.image}
                    price={getProductDisplayPrice(product, t('filters.from'))}
                    variantCount={(product.variants ?? []).length}
                    stock={product.stock}
                    variantTextSingular={t('filters.variant')}
                    variantTextPlural={t('filters.variants')}
                    inStockText={t('filters.inStock')}
                    soldOutText={t('filters.soldOut')}
                    actionText={t('filters.viewDetails')}
                    url={`/product/${product.id}`}
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
    </div>
  );
}
