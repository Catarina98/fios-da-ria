import { render, screen } from '@tests/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale, mockGetAllProductIds, mockGetProductById } =
  vi.hoisted(() => ({
    mockSetRequestLocale: vi.fn(),
    mockGetAllProductIds: vi.fn(),
    mockGetProductById: vi.fn(),
  }));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

vi.mock('@lib/sanity/products', () => ({
  getAllProductIds: mockGetAllProductIds,
  getProductById: mockGetProductById,
}));

vi.mock('../../ProductDetails', () => ({
  default: ({ initialProduct }: { initialProduct: { id: string } }) => (
    <div data-testid="product-page">Product ID: {initialProduct.id}</div>
  ),
}));

import ProductDetailPage, {
  generateMetadata,
  generateStaticParams,
} from '../page';

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetProductById.mockResolvedValue({
      id: 'toy-story',
      title: 'Toy Story',
    });
  });

  describe('generateStaticParams', () => {
    it('generates static params for each locale and product id combination', async () => {
      mockGetAllProductIds.mockResolvedValue(['toy-story', 'one-piece']);
      const params = await generateStaticParams();

      expect(params).toEqual([
        { locale: 'pt', id: 'toy-story' },
        { locale: 'pt', id: 'one-piece' },
        { locale: 'en', id: 'toy-story' },
        { locale: 'en', id: 'one-piece' },
      ]);
    });

    it('falls back to safe placeholder when product ids list is empty', async () => {
      mockGetAllProductIds.mockResolvedValue([]);
      const params = await generateStaticParams();

      expect(params).toEqual([
        { locale: 'pt', id: '_' },
        { locale: 'en', id: '_' },
      ]);
    });
  });

  describe('page component', () => {
    it('sets request locale and renders ProductPage with productId', async () => {
      const pageResult = await ProductDetailPage({
        params: Promise.resolve({ locale: 'pt', id: 'toy-story' }),
      });

      render(pageResult);

      expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
      expect(screen.getByTestId('product-page')).toHaveTextContent(
        'Product ID: toy-story',
      );
    });
  });

  describe('generateMetadata', () => {
    it('returns localized not-found metadata when the product is missing', async () => {
      mockGetProductById.mockResolvedValue(null);

      await expect(
        generateMetadata({
          params: Promise.resolve({ locale: 'en', id: 'unknown' }),
        }),
      ).resolves.toEqual({ title: 'Product not found' });
    });

    it('generates localized metadata for a product', async () => {
      mockGetProductById.mockResolvedValue({
        id: 'toy-story',
        title: 'Woody',
        description: 'Handmade amigurumi Woody.',
        image: 'https://cdn.example/woody.jpg',
      });

      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: 'en', id: 'toy-story' }),
      });

      expect(metadata).toMatchObject({
        title: 'Woody',
        description: 'Handmade amigurumi Woody.',
        alternates: {
          canonical: 'https://fiosdaria.pt/en/product/toy-story/',
          languages: {
            pt: 'https://fiosdaria.pt/product/toy-story/',
            en: 'https://fiosdaria.pt/en/product/toy-story/',
          },
        },
        openGraph: {
          images: [
            {
              url: 'https://cdn.example/woody.jpg',
              alt: 'Woody',
            },
          ],
        },
      });
    });
  });
});
