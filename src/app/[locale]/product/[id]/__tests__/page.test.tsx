import { render, screen } from '@tests/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale, mockGetAllProductIds } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
  mockGetAllProductIds: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

vi.mock('@lib/sanity/products', () => ({
  getAllProductIds: mockGetAllProductIds,
}));

vi.mock('../../page', () => ({
  default: ({ productId }: { productId: string }) => (
    <div data-testid="product-page">Product ID: {productId}</div>
  ),
}));

import ProductDetailPage, { generateStaticParams } from '../page';

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});
