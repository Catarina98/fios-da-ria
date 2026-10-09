import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

import ProductDetailPage, {
  generateStaticParams as generateDetailStaticParams,
} from '../[id]/page';
import ProductPage, {
  generateStaticParams as generateRootStaticParams,
} from '../page';

describe('Product Pages', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('<ProductPage /> (Root)', () => {
    it('renders the default featured product and sets request locale', async () => {
      const params = Promise.resolve({ locale: 'pt' });
      const pageResult = await ProductPage({ params });
      render(pageResult);

      expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Toy Story Collection',
      );
      expect(screen.getByText('€38')).toBeInTheDocument();
      expect(screen.getByText('Woody')).toBeInTheDocument();
    });

    it('generates static params for all supported locales', () => {
      const params = generateRootStaticParams();
      expect(params).toEqual([{ locale: 'pt' }, { locale: 'en' }]);
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
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Toy Story Collection',
      );

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

    it('handles add to bag interaction', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      const addBtn = screen.getByRole('button', {
        name: /adicionar ao carrinho/i,
      });
      expect(addBtn).toBeInTheDocument();

      fireEvent.click(addBtn);

      expect(
        screen.getByRole('button', { name: /adicionado ao carrinho/i }),
      ).toBeInTheDocument();
    });

    it('renders materials and care guidance cards', async () => {
      const params = Promise.resolve({
        locale: 'pt',
        id: 'collection-toy-story',
      });
      const pageResult = await ProductDetailPage({ params });
      render(pageResult);

      expect(
        screen.getByTestId('guidance-cards-component'),
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
        screen.getByRole('heading', {
          level: 2,
          name: 'Produto não encontrado',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /voltar à galeria/i }),
      ).toBeInTheDocument();
    });

    it('generates static params for all locales and catalog products', () => {
      const params = generateDetailStaticParams();
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
