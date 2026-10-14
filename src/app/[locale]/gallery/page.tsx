'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Breadcrumbs from '@components/ui/breadcrumbs';
import Button from '@components/ui/button';
import Card from '@components/ui/card';
import ProductCard from '@components/ui/productcard';
import RangeSlider from '@components/ui/rangeslider';
import TitleSection from '@components/ui/titlesection';
import { Body, Heading } from '@components/ui/typography';
import { usePathname, useRouter } from '@i18n/navigation';
import { getProducts } from '@lib/sanity/products';
import { ButtonVariant } from '@typing/components/button';
import clsx from 'clsx';
import { Plus, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { getProductDisplayPrice, getProductPrices, StoreProduct } from './data';

import './page.scss';

export type SortKey = 'default' | 'sortPriceAsc' | 'sortPriceDesc';

const SORT_OPTIONS: SortKey[] = ['sortPriceAsc', 'sortPriceDesc'];

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryContent />
    </Suspense>
  );
}

function GalleryContent() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    getProducts(locale).then(fetched => {
      setProducts(fetched || []);
    });
  }, [locale]);

  const t = useTranslations('Gallery');
  const tNav = useTranslations('Navigation');

  const [filtersOpen, setFiltersOpen] = useState(false);

  // Initialize filter states from URL search params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const inStockParam = searchParams.get('inStock') === 'true';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const sortParam = searchParams.get('sort') as SortKey | null;

  const [query, setQuery] = useState(() => searchParam || '');
  const [filter, setFilter] = useState(() => categoryParam || 'All');
  const [inStockOnly, setInStockOnly] = useState(() => inStockParam);
  const [minPrice, setMinPrice] = useState(() =>
    minPriceParam ? Number(minPriceParam) || 0 : 0,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(() =>
    maxPriceParam ? Number(maxPriceParam) || null : null,
  );
  const [sortOption, setSortOption] = useState<SortKey>(() =>
    sortParam && SORT_OPTIONS.includes(sortParam) ? sortParam : 'default',
  );

  const currentParamsString = searchParams.toString();
  const lastParamsStringRef = useRef(currentParamsString);

  // Synchronize state if URL changes externally (e.g. browser back/forward)
  useEffect(() => {
    if (currentParamsString !== lastParamsStringRef.current) {
      lastParamsStringRef.current = currentParamsString;

      const newCategory = searchParams.get('category') || 'All';
      const newSearch = searchParams.get('search') || '';
      const newInStock = searchParams.get('inStock') === 'true';
      const newMin = searchParams.get('minPrice')
        ? Number(searchParams.get('minPrice')) || 0
        : 0;
      const newMax = searchParams.get('maxPrice')
        ? Number(searchParams.get('maxPrice')) || null
        : null;
      const newSort = (searchParams.get('sort') as SortKey) || 'default';

      setFilter(newCategory);
      setQuery(newSearch);
      setInStockOnly(newInStock);
      setMinPrice(newMin);
      setMaxPrice(newMax);
      setSortOption(SORT_OPTIONS.includes(newSort) ? newSort : 'default');
    }
  }, [currentParamsString, searchParams]);

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
          order: product.order,
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

  const isCategoryMatch = useCallback(
    (product: StoreProduct, target: string) => {
      if (!target || target === 'All') return false;

      const slugifyCategory = (value: string) =>
        value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

      const targetSlug = slugifyCategory(target);
      const targetLower = target.toLowerCase();

      // 1. Match localized category name
      if (
        product.category.toLowerCase() === targetLower ||
        slugifyCategory(product.category) === targetSlug
      ) {
        return true;
      }

      // 2. Match categorySlug (e.g. from Sanity)
      if (product.categorySlug) {
        if (
          product.categorySlug.toLowerCase() === targetLower ||
          slugifyCategory(product.categorySlug) === targetSlug
        ) {
          return true;
        }
      }

      // 3. Match language translations (e.g. pt/en titles)
      if (product.categoryTranslations) {
        const { pt: ptCat, en: enCat } = product.categoryTranslations;
        if (
          ptCat &&
          (ptCat.toLowerCase() === targetLower ||
            slugifyCategory(ptCat) === targetSlug)
        ) {
          return true;
        }
        if (
          enCat &&
          (enCat.toLowerCase() === targetLower ||
            slugifyCategory(enCat) === targetSlug)
        ) {
          return true;
        }
      }

      // 4. Match message dictionary translations
      if (t.has(`categories.${product.category}`)) {
        const translated = t(`categories.${product.category}`);
        if (
          translated.toLowerCase() === targetLower ||
          slugifyCategory(translated) === targetSlug
        ) {
          return true;
        }
      }

      return false;
    },
    [t],
  );

  const activeFilter = useMemo(() => {
    if (!filter || filter === 'All') return 'All';

    // 1. Direct match in current locale usedCategories
    const directMatch = usedCategories.find(
      cat => cat.toLowerCase() === filter.toLowerCase(),
    );
    if (directMatch) return directMatch;

    // 2. Multi-lingual / slug match across products
    for (const cat of usedCategories) {
      const sampleProduct = normalizedProducts.find(p => p.category === cat);
      if (sampleProduct && isCategoryMatch(sampleProduct, filter)) {
        return cat;
      }
    }

    return filters.includes(filter) ? filter : 'All';
  }, [filter, usedCategories, filters, normalizedProducts, isCategoryMatch]);

  const categoryCount = (category: string) =>
    category === 'All'
      ? normalizedProducts.length
      : normalizedProducts.filter(product => product.category === category)
          .length;

  const inStockCount = useMemo(() => {
    return normalizedProducts.filter(product => product.stock > 0).length;
  }, [normalizedProducts]);

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
      .filter(
        product => activeFilter === 'All' || product.category === activeFilter,
      )
      .filter(product => !inStockOnly || product.stock > 0)
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

        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;

        return orderA - orderB;
      });
  }, [
    normalizedProducts,
    normalizedQuery,
    activeFilter,
    inStockOnly,
    minPrice,
    effectiveMaxPrice,
    sortOption,
  ]);

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(lastParamsStringRef.current);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      lastParamsStringRef.current = queryString;
      const newPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newPath, { scroll: false });
    },
    [pathname, router],
  );

  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      updateUrl({ search: trimmed ? trimmed : null });
    }, 300);
  };

  const handleSearchClear = () => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    setQuery('');
    updateUrl({ search: null });
  };

  const handleCategorySelect = (item: string) => {
    setFilter(item);
    if (item === 'All') {
      updateUrl({ category: null });

      return;
    }
    const matchingProduct = normalizedProducts.find(p => p.category === item);
    const categoryParamValue = matchingProduct?.categorySlug || item;
    updateUrl({ category: categoryParamValue });
  };

  const handleInStockToggle = () => {
    const nextInStock = !inStockOnly;
    setInStockOnly(nextInStock);
    updateUrl({ inStock: nextInStock ? 'true' : null });
  };

  const handleMinPriceChange = (value: number) => {
    const nextMin = Math.min(value, effectiveMaxPrice);
    setMinPrice(nextMin);
    if (priceDebounceRef.current) {
      clearTimeout(priceDebounceRef.current);
    }
    priceDebounceRef.current = setTimeout(() => {
      updateUrl({ minPrice: nextMin > 0 ? String(nextMin) : null });
    }, 300);
  };

  const handleMaxPriceChange = (value: number) => {
    const nextMax = Math.max(value, minPrice);
    setMaxPrice(nextMax);
    if (priceDebounceRef.current) {
      clearTimeout(priceDebounceRef.current);
    }
    priceDebounceRef.current = setTimeout(() => {
      updateUrl({
        maxPrice: nextMax < catalogMaxPrice ? String(nextMax) : null,
      });
    }, 300);
  };

  const handleSortSelect = (sort: SortKey) => {
    const nextSort = sortOption === sort ? 'default' : sort;
    setSortOption(nextSort);
    updateUrl({ sort: nextSort === 'default' ? null : nextSort });
  };

  const handleResetFilters = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    setQuery('');
    setFilter('All');
    setInStockOnly(false);
    setMinPrice(0);
    setMaxPrice(null);
    setSortOption('default');

    updateUrl({
      category: null,
      search: null,
      inStock: null,
      minPrice: null,
      maxPrice: null,
      sort: null,
    });
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
          align="center"
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
                    onChange={event => handleSearchChange(event.target.value)}
                    data-testid="gallery-search-input"
                  />
                  {query && (
                    <button
                      type="button"
                      className="search-field-clear"
                      aria-label={t('filters.clearSearch')}
                      onClick={handleSearchClear}
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
                    const isActive = activeFilter === item;

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
                        onClick={() => handleCategorySelect(item)}
                      >
                        <span>{getCategoryLabel(item)}</span>
                        <span className="filter-count">
                          {categoryCount(item)}
                        </span>
                      </Button>
                    );
                  })}
                </div>

                <div
                  className="filter-group"
                  data-testid="filter-group-availability"
                >
                  <span className="filter-label">
                    {t('filters.availability')}
                  </span>
                  <Button
                    className={clsx(
                      'filter-option',
                      inStockOnly && 'filter-option-active',
                    )}
                    variant={ButtonVariant.Tertiary}
                    aria-pressed={inStockOnly}
                    data-testid="filter-stock-only"
                    onClick={handleInStockToggle}
                  >
                    <span>{t('filters.inStockOnly')}</span>
                    <span className="filter-count">{inStockCount}</span>
                  </Button>
                </div>

                <div className="filter-group" data-testid="filter-group-price">
                  <RangeSlider
                    min={0}
                    max={catalogMaxPrice}
                    minValue={minPrice}
                    maxValue={effectiveMaxPrice}
                    onMinChange={handleMinPriceChange}
                    onMaxChange={handleMaxPriceChange}
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
                        onClick={() => handleSortSelect(sort)}
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
                    categoryTagBg={product.categoryTagBg}
                    categoryTagColor={product.categoryTagColor}
                    image={product.image}
                    price={getProductDisplayPrice(product, t('filters.from'))}
                    stock={product.stock}
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
