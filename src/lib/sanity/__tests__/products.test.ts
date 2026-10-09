import { describe, expect, it } from 'vitest';

import { getAllProductIds, getProductById, getProducts } from '../products';

describe('Sanity & Catalog Data Fetching', () => {
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
});
