import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

const mockProduct = {
  id: 'collection-toy-story',
  title: 'Toy Story Collection',
  category: 'Filmes e séries',
  description:
    'Woody, Jessie, and Buzz in a handcrafted collection for everyone who never stopped believing in the magic of toys.',
  image: '/images/catalog/toy-story-woody.JPG',
  images: [
    '/images/catalog/toy-story-woody.JPG',
    '/images/catalog/toy-story-jessie.JPG',
    '/images/catalog/toy-story-buzz.JPG',
  ],
  price: '€38',
  stock: 3,
  variants: [
    {
      id: 'woody',
      name: 'Woody',
      image: '/images/catalog/toy-story-woody.JPG',
      price: '€38',
      stock: 1,
      vintedUrl: 'https://www.vinted.pt',
    },
    {
      id: 'jessie',
      name: 'Jessie',
      image: '/images/catalog/toy-story-jessie.JPG',
      price: '€38',
      stock: 1,
      vintedUrl: 'https://www.vinted.pt',
    },
    {
      id: 'buzz',
      name: 'Buzz Lightyear',
      image: '/images/catalog/toy-story-buzz.JPG',
      price: '€42',
      stock: 1,
      vintedUrl: 'https://www.vinted.pt',
    },
  ],
};

vi.mock('@lib/sanity/products', () => ({
  getProducts: vi.fn(async () => [mockProduct]),
  getProductById: vi.fn(async (id: string) =>
    id === 'collection-toy-story' ? mockProduct : null,
  ),
  getAllProductIds: vi.fn(async () => ['collection-toy-story']),
}));

import ProductDetailPage, {
  generateStaticParams as generateDetailStaticParams,
} from '../[id]/page';
import ProductPage from '../page';

describe('Product Pages', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('<ProductPage /> (Root)', () => {
    it('renders the default featured product', async () => {
      render(<ProductPage />);

      expect(
        await screen.findByRole('heading', { level: 1 }),
      ).toHaveTextContent('Toy Story Collection');
      expect(screen.getByText('€38')).toBeInTheDocument();
      expect(screen.getByText('Woody')).toBeInTheDocument();
    });
  });

  describe('<ProductDetailPage />', () => {
    it('renders product details, breadcrumbs and allows selecting variants', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
      expect(
        await screen.findByRole('heading', { level: 1 }),
      ).toHaveTextContent('Toy Story Collection');

      // Breadcrumbs
      expect(screen.getByText('Início')).toBeInTheDocument();
      expect(screen.getByText('Galeria')).toBeInTheDocument();

      // Variants
      const jessieBtn = screen.getByRole('radio', { name: /Jessie/i });
      expect(jessieBtn).toBeInTheDocument();

      // Switch variant to Jessie
      fireEvent.click(jessieBtn);
      expect(jessieBtn).toHaveAttribute('aria-checked', 'true');
    });

    it('renders the Vinted buy link button with external redirect', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      const buyLink = await screen.findByTestId('product-buy-button');
      expect(buyLink).toBeInTheDocument();
      expect(buyLink).toHaveAttribute('href', 'https://www.vinted.pt');
      expect(buyLink).toHaveAttribute('target', '_blank');
      expect(buyLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders Instagram contact link when product or variant has no vintedUrl', async () => {
      const outOfStockProduct = {
        ...mockProduct,
        id: 'sold-out-collection',
        vintedUrl: undefined,
        variants: [
          {
            id: 'unlisted-variant',
            name: 'Special Piece',
            image: '/images/catalog/toy-story-woody.JPG',
            price: '€50',
            stock: 0,
            vintedUrl: undefined,
          },
        ],
      };
      const { getProductById } = await import('@lib/sanity/products');
      vi.mocked(getProductById).mockResolvedValueOnce(outOfStockProduct as any);

      const params = Promise.resolve({
        locale: 'pt',
        id: 'sold-out-collection',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      const contactBtn = await screen.findByTestId('product-buy-button');
      expect(contactBtn).toBeInTheDocument();
      expect(contactBtn).toHaveAttribute(
        'href',
        expect.stringContaining('https://ig.me/m/fiosdaria'),
      );
      expect(contactBtn).toHaveAttribute(
        'href',
        expect.stringContaining(encodeURIComponent('Special Piece')),
      );
    });

    it('navigates gallery images via next/prev buttons and thumbnails', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      const mainImg = await screen.findByTestId('product-main-image');
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-woody.JPG',
      );

      const nextBtn = screen.getByTestId('gallery-next-button');
      const prevBtn = screen.getByTestId('gallery-prev-button');

      // Click next image -> Jessie
      fireEvent.click(nextBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-jessie.JPG',
      );

      // Click next image -> Buzz
      fireEvent.click(nextBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-buzz.JPG',
      );

      // Click next again -> wraps to Woody
      fireEvent.click(nextBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-woody.JPG',
      );

      // Click prev -> wraps to Buzz
      fireEvent.click(prevBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-buzz.JPG',
      );

      // Click thumbnail 1 -> Jessie
      const thumb1 = screen.getByTestId('gallery-thumbnail-1');
      fireEvent.click(thumb1);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-jessie.JPG',
      );
    });

    it('syncs gallery image when selecting a variant and vice versa', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      const mainImg = await screen.findByTestId('product-main-image');
      const jessieBtn = screen.getByRole('radio', { name: /Jessie/i });
      const buzzBtn = screen.getByRole('radio', { name: /Buzz Lightyear/i });

      // Click Jessie variant -> changes image to Jessie
      fireEvent.click(jessieBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-jessie.JPG',
      );
      expect(jessieBtn).toHaveAttribute('aria-checked', 'true');

      // Click Buzz variant -> changes image to Buzz
      fireEvent.click(buzzBtn);
      expect(mainImg).toHaveAttribute(
        'src',
        '/images/catalog/toy-story-buzz.JPG',
      );
      expect(buzzBtn).toHaveAttribute('aria-checked', 'true');
    });

    it('renders materials and care guidance cards', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      expect(
        await screen.findByTestId('guidance-cards-component'),
      ).toBeInTheDocument();
      expect(screen.getByText('Materiais naturais')).toBeInTheDocument();
      expect(screen.getByText('Fio 100% algodão')).toBeInTheDocument();
      expect(
        screen.getByText('Cuidados com o seu amigurumi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Lavar à mão')).toBeInTheDocument();
    });

    it('renders product not found state for nonexistent product ID', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'nonexistent-id',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      expect(
        await screen.findByRole('heading', {
          level: 2,
          name: 'Produto não encontrado',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /voltar à galeria/i }),
      ).toBeInTheDocument();
    });

    it('generates static params for all locales and catalog products', async () => {
      const params = await generateDetailStaticParams();
      expect(params.length).toBeGreaterThan(0);
      expect(params).toContainEqual({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      expect(params).toContainEqual({
        locale: 'en',
        id: 'collection-toy-story',
      });
    });
  });
});
