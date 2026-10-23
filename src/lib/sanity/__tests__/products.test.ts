import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAllProductIds, getProductById, getProducts } from '../products';

const { mockFetch, mockIsSanityConfigured } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
  mockIsSanityConfigured: vi.fn(() => true),
}));

vi.mock('../client', () => ({
  isSanityConfigured: () => mockIsSanityConfigured(),
  sanityClient: {
    fetch: (...args: any[]) => mockFetch(...args),
  },
  urlFor: vi.fn((src: any) =>
    typeof src === 'string' ? src : 'https://cdn.sanity.io/mock.jpg',
  ),
}));

const mockRawProducts = [
  {
    _id: 'product-toy-story',
    id: { current: 'collection-toy-story' },
    title: {
      pt: 'Coleção Toy Story',
      en: 'Toy Story Collection',
    },
    category: {
      pt: 'Filmes e séries',
      en: 'Movies & Series',
    },
    description: {
      pt: 'Woody, Jessie e Buzz numa coleção artesanal para quem nunca deixou de acreditar na magia dos brinquedos.',
      en: 'Woody, Jessie, and Buzz in a handcrafted collection for everyone who never stopped believing in the magic of toys.',
    },
    price: 38,
    vintedUrl: 'https://www.vinted.pt/items/1',
    images: ['https://cdn.sanity.io/images/mock-toy-story.jpg'],
    variants: [
      {
        id: 'woody',
        name: { pt: 'Woody', en: 'Woody' },
        price: 38,
        vintedUrl: 'https://www.vinted.pt',
      },
    ],
  },
  {
    _id: 'product-one-piece',
    id: { current: 'collection-one-piece' },
    title: {
      pt: 'Coleção One Piece',
      en: 'One Piece Collection',
    },
    category: {
      pt: 'Anime',
      en: 'Anime',
    },
    description: {
      pt: 'A tripulação mais aventureira dos mares.',
      en: 'The most adventurous crew of the seas.',
    },
    price: 35,
    vintedUrl: 'https://www.vinted.pt/items/2',
    images: ['https://cdn.sanity.io/images/mock-one-piece.jpg'],
    variants: [
      { id: 'luffy', name: { pt: 'Luffy', en: 'Luffy' }, price: 35 },
      { id: 'zoro', name: { pt: 'Zoro', en: 'Zoro' }, price: 35 },
      { id: 'nami', name: { pt: 'Nami', en: 'Nami' }, price: 35 },
      { id: 'usopp', name: { pt: 'Usopp', en: 'Usopp' }, price: 35 },
      { id: 'sanji', name: { pt: 'Sanji', en: 'Sanji' }, price: 35 },
    ],
  },
  {
    _id: 'product-wednesday',
    id: { current: 'wednesday' },
    title: {
      pt: 'Wednesday',
      en: 'Wednesday',
    },
    category: {
      pt: 'Filmes e séries',
      en: 'Movies & Series',
    },
    description: {
      pt: 'Wednesday Addams em crochet.',
      en: 'Wednesday Addams handcrafted in crochet.',
    },
    price: 30,
    vintedUrl: 'https://www.vinted.pt/items/3',
    images: ['https://cdn.sanity.io/images/mock-wednesday.jpg'],
    variants: [],
  },
];

describe('Sanity & Catalog Data Fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockImplementation(async (query: string) => {
      if (query.includes('id.current') && !query.includes('variants')) {
        return ['collection-toy-story', 'collection-one-piece', 'wednesday'];
      }

      return mockRawProducts;
    });
  });

  it('fetches all products localized for Portuguese by default', async () => {
    const products = await getProducts('pt');
    expect(products.length).toBeGreaterThan(0);
    const toyStory = products.find(p => p.id === 'collection-toy-story');
    expect(toyStory).toBeDefined();
    expect(toyStory?.description).toContain('Woody, Jessie e Buzz');
  });

  it('fetches all products localized for English', async () => {
    const products = await getProducts('en');
    const toyStory = products.find(p => p.id === 'collection-toy-story');
    expect(toyStory).toBeDefined();
    expect(toyStory?.description).toContain(
      'never stopped believing in the magic of toys',
    );
  });

  it('fetches a single product by ID', async () => {
    const productPt = await getProductById('collection-one-piece', 'pt');
    expect(productPt).toBeDefined();
    expect(productPt?.title).toBe('Coleção One Piece');
    expect(productPt?.variants).toHaveLength(5);

    const productEn = await getProductById('collection-one-piece', 'en');
    expect(productEn).toBeDefined();
    expect(productEn?.title).toBe('One Piece Collection');
  });

  it('fetches newly added products like Wednesday from Sanity', async () => {
    const products = await getProducts('pt');
    const wednesday = products.find(
      p => p.id === 'wednesday' || p.title === 'Wednesday',
    );
    expect(wednesday).toBeDefined();
    expect(wednesday?.title).toBe('Wednesday');
  });

  it('returns null for nonexistent product ID', async () => {
    const product = await getProductById('nonexistent-id');
    expect(product).toBeNull();
  });

  it('returns all product IDs for static params', async () => {
    const ids = await getAllProductIds();
    expect(ids).toContain('collection-toy-story');
    expect(ids).toContain('collection-one-piece');
    expect(ids).toContain('wednesday');
  });

  it('returns empty array when Sanity is not configured', async () => {
    mockIsSanityConfigured.mockReturnValue(false);

    const products = await getProducts('pt');
    expect(products).toEqual([]);

    const ids = await getAllProductIds();
    expect(ids).toEqual([]);
  });

  it('returns empty array when Sanity fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockFetch.mockRejectedValue(new Error('Network error'));

    const products = await getProducts('pt');
    expect(products).toEqual([]);

    const ids = await getAllProductIds();
    expect(ids).toEqual([]);

    consoleSpy.mockRestore();
  });

  it('filters out products belonging to unavailable categories', async () => {
    mockFetch.mockResolvedValueOnce([
      ...mockRawProducts,
      {
        _id: 'product-hidden',
        id: { current: 'product-hidden' },
        title: { pt: 'Produto Oculto', en: 'Hidden Product' },
        category: {
          pt: 'Indisponível',
          en: 'Unavailable',
          available: false,
        },
        price: 20,
      },
    ]);

    const products = await getProducts('pt');
    expect(products.find(p => p.id === 'product-hidden')).toBeUndefined();
    expect(products.map(p => p.id)).toContain('collection-toy-story');
  });

  it('maps custom category tag colors when provided', async () => {
    mockFetch.mockResolvedValueOnce([
      {
        _id: 'product-colored',
        id: { current: 'product-colored' },
        title: { pt: 'Produto Colorido', en: 'Colored Product' },
        category: {
          pt: 'Especial',
          en: 'Special',
          tagBackgroundColor: '#123456',
          tagTextColor: '#ffffff',
        },
        price: 25,
      },
    ]);

    const products = await getProducts('pt');
    const coloredProduct = products.find(p => p.id === 'product-colored');
    expect(coloredProduct).toBeDefined();
    expect(coloredProduct?.categoryTagBg).toBe('#123456');
    expect(coloredProduct?.categoryTagColor).toBe('#ffffff');
  });

  it('calculates stock as sum of variants that have non-empty vintedUrl (or product vintedUrl if no variants)', async () => {
    mockFetch.mockResolvedValueOnce([
      {
        _id: 'prod-variants',
        id: { current: 'prod-variants' },
        title: { pt: 'Com Variantes' },
        price: 20,
        variants: [
          { id: 'v1', vintedUrl: 'https://vinted.pt/item/1' },
          { id: 'v2', vintedUrl: '' },
          { id: 'v3', vintedUrl: 'https://vinted.pt/item/3' },
          { id: 'v4' },
        ],
      },
      {
        _id: 'prod-single-vinted',
        id: { current: 'prod-single-vinted' },
        title: { pt: 'Sem Variantes com Stock' },
        price: 15,
        vintedUrl: 'https://vinted.pt/item/single',
        variants: [],
      },
      {
        _id: 'prod-single-no-stock',
        id: { current: 'prod-single-no-stock' },
        title: { pt: 'Sem Variantes sem Stock' },
        price: 15,
        vintedUrl: '',
      },
    ]);

    const products = await getProducts('pt');
    const withVariants = products.find(p => p.id === 'prod-variants');
    const singleWithStock = products.find(p => p.id === 'prod-single-vinted');
    const singleNoStock = products.find(p => p.id === 'prod-single-no-stock');

    expect(withVariants?.stock).toBe(2);
    expect(singleWithStock?.stock).toBe(1);
    expect(singleNoStock?.stock).toBe(0);
  });

  it('sorts products by order property ascending and then by stock descending', async () => {
    mockFetch.mockResolvedValueOnce([
      {
        _id: 'p-no-order-low-stock',
        id: { current: 'p-no-order-low-stock' },
        title: { pt: 'No Order Low Stock' },
        price: 10,
        vintedUrl: 'https://vinted.pt/item/1',
      },
      {
        _id: 'p-order-1-sold-out',
        id: { current: 'p-order-1-sold-out' },
        title: { pt: 'Order 1 Sold Out' },
        order: 1,
        price: 10,
      },
      {
        _id: 'p-order-2-low-stock',
        id: { current: 'p-order-2-low-stock' },
        title: { pt: 'Order 2 Low Stock' },
        order: 2,
        price: 10,
        vintedUrl: 'https://vinted.pt/item/2',
      },
      {
        _id: 'p-order-2-high-stock',
        id: { current: 'p-order-2-high-stock' },
        title: { pt: 'Order 2 High Stock' },
        order: 2,
        price: 10,
        variants: [
          { id: 'v1', vintedUrl: 'https://vinted.pt/1' },
          { id: 'v2', vintedUrl: 'https://vinted.pt/2' },
          { id: 'v3', vintedUrl: 'https://vinted.pt/3' },
        ],
      },
      {
        _id: 'p-no-order-high-stock',
        id: { current: 'p-no-order-high-stock' },
        title: { pt: 'No Order High Stock' },
        price: 10,
        variants: [
          { id: 'v1', vintedUrl: 'https://vinted.pt/1' },
          { id: 'v2', vintedUrl: 'https://vinted.pt/2' },
        ],
      },
      {
        _id: 'p-no-order-sold-out',
        id: { current: 'p-no-order-sold-out' },
        title: { pt: 'No Order Sold Out' },
        price: 10,
      },
    ]);

    const products = await getProducts('pt');
    const ids = products.map(p => p.id);

    expect(ids).toEqual([
      'p-order-1-sold-out',
      'p-order-2-high-stock',
      'p-order-2-low-stock',
      'p-no-order-high-stock',
      'p-no-order-low-stock',
      'p-no-order-sold-out',
    ]);
  });
});

describe('Wallapop listings and product details', () => {
  beforeEach(() => {
    mockIsSanityConfigured.mockReturnValue(true);
  });

  it('prefers the Wallapop link and keeps stock tied to listings', async () => {
    mockFetch.mockResolvedValue([
      {
        id: 'new',
        wallapopUrl: ' https://pt.wallapop.com/item/new ',
        vintedUrl: 'https://legacy.example/item',
      },
      { id: 'missing', wallapopUrl: '   ' },
      { id: 'old', vintedUrl: 'https://pt.wallapop.com/item/old' },
    ]);
    const products = await getProducts('pt');
    expect(products.find(p => p.id === 'new')).toMatchObject({
      stock: 1,
      vintedUrl: 'https://pt.wallapop.com/item/new',
    });
    expect(products.find(p => p.id === 'missing')?.stock).toBe(0);
    expect(products.find(p => p.id === 'old')?.stock).toBe(1);
  });

  it('does not mark unlisted collection variants as available using a collection link', async () => {
    mockFetch.mockResolvedValue([
      {
        id: 'collection',
        wallapopUrl: 'https://pt.wallapop.com/item/set',
        variants: [
          { id: 'a', wallapopUrl: 'https://pt.wallapop.com/item/a' },
          { id: 'b', wallapopUrl: '  ' },
        ],
      },
    ]);
    const [product] = await getProducts('pt');
    expect(product.stock).toBe(1);
    expect(product.variants.map(v => v.stock)).toEqual([1, 0]);
  });

  it('localizes product and variant details without inventing an age approval', async () => {
    mockFetch.mockResolvedValue([
      {
        id: 'piece',
        acceptsOrders: false,
        dimensions: { pt: '20 cm', en: '8 inches' },
        included: { pt: 'Uma peça' },
        care: { pt: 'Limpar suavemente', en: 'Gently clean' },
        minimumAge: 4,
        variants: [
          {
            id: 'small',
            dimensions: { pt: '10 cm' },
            warnings: { pt: 'Aviso específico' },
          },
        ],
      },
    ]);
    const [product] = await getProducts('en');
    expect(product).toMatchObject({
      dimensions: '8 inches',
      included: 'Uma peça',
      care: 'Gently clean',
      minimumAge: 4,
      safetyReviewed: false,
      acceptsOrders: false,
    });
    expect(product.variants[0]).toMatchObject({
      dimensions: '10 cm',
      warnings: 'Aviso específico',
    });
    const query = mockFetch.mock.calls.at(-1)?.[0] as string;
    for (const field of [
      'wallapopUrl',
      'acceptsOrders',
      'dimensions',
      'included',
      'materials',
      'care',
      'warnings',
      'minimumAge',
      'safetyReviewed',
    ]) {
      expect(query).toContain(field);
    }
  });
});
