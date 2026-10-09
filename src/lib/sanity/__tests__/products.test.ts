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
    stock: 3,
    vintedUrl: 'https://www.vinted.pt/items/1',
    images: ['https://cdn.sanity.io/images/mock-toy-story.jpg'],
    variants: [
      {
        id: 'woody',
        name: { pt: 'Woody', en: 'Woody' },
        price: 38,
        stock: 1,
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
    stock: 4,
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
    stock: 2,
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
});
