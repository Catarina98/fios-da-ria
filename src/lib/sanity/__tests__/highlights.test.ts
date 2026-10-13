import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  formatSanityHighlight,
  getDefaultHighlights,
  getHighlights,
} from '../highlights';

vi.mock('../client', () => ({
  isSanityConfigured: vi.fn(),
  sanityClient: {
    fetch: vi.fn(),
  },
  urlFor: vi.fn(
    (img: any) => `https://cdn.sanity.io/${img.asset?._ref || 'img'}`,
  ),
}));

import { isSanityConfigured, sanityClient } from '../client';

describe('Sanity Highlights service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns default highlights when sanity is not configured', async () => {
    vi.mocked(isSanityConfigured).mockReturnValue(false);

    const highlightsPt = await getHighlights('pt');
    expect(highlightsPt.length).toBeGreaterThan(0);
    expect(highlightsPt[0].badge).toBe('Feito à mão em Portugal');

    const highlightsEn = await getHighlights('en');
    expect(highlightsEn.length).toBeGreaterThan(0);
    expect(highlightsEn[0].badge).toBe('Handmade in Portugal');
  });

  it('formats raw sanity highlight correctly with localized strings and images', () => {
    const raw = {
      _id: 'highlight-1',
      title: { pt: 'Título PT', en: 'Title EN' },
      badge: { pt: 'Tag PT', en: 'Badge EN' },
      description: { pt: 'Descrição PT', en: 'Description EN' },
      buttonText: { pt: 'Ver mais', en: 'See more' },
      buttonUrl: '/gallery',
      secondaryButtonText: { pt: 'Sobre', en: 'About' },
      secondaryButtonUrl: '/about',
      image: { asset: { _ref: 'image-ref-123' } },
      imageAlt: { pt: 'Alt PT', en: 'Alt EN' },
      imageTag: { pt: 'Nota PT', en: 'Note EN' },
      order: 1,
    };

    const formattedPt = formatSanityHighlight(raw, 'pt');
    expect(formattedPt.id).toBe('highlight-1');
    expect(formattedPt.title).toBe('Título PT');
    expect(formattedPt.badge).toBe('Tag PT');
    expect(formattedPt.description).toBe('Descrição PT');
    expect(formattedPt.button?.children).toBe('Ver mais');
    expect(formattedPt.button?.url).toBe('/gallery');
    expect(formattedPt.secondaryButton?.children).toBe('Sobre');
    expect(formattedPt.secondaryButton?.url).toBe('/about');
    expect(formattedPt.imageSrc).toContain('image-ref-123');
    expect(formattedPt.imageAlt).toBe('Alt PT');
    expect(formattedPt.note?.text).toBe('Nota PT');
    expect(formattedPt.order).toBe(1);

    const formattedEn = formatSanityHighlight(raw, 'en');
    expect(formattedEn.title).toBe('Title EN');
    expect(formattedEn.badge).toBe('Badge EN');
    expect(formattedEn.button?.children).toBe('See more');
  });

  it('fetches highlights from Sanity client when configured', async () => {
    vi.mocked(isSanityConfigured).mockReturnValue(true);
    const mockRawHighlights = [
      {
        _id: 'hl-1',
        title: { pt: 'Primeiro Destaque' },
        description: { pt: 'Desc 1' },
        order: 1,
        image: { asset: { _ref: 'img-1' } },
      },
      {
        _id: 'hl-2',
        title: { pt: 'Segundo Destaque' },
        description: { pt: 'Desc 2' },
        order: 2,
        image: { asset: { _ref: 'img-2' } },
      },
    ];

    (sanityClient!.fetch as any).mockResolvedValueOnce(mockRawHighlights);

    const result = await getHighlights('pt');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Primeiro Destaque');
    expect(result[1].title).toBe('Segundo Destaque');
  });

  it('returns default highlights if sanity fetch throws', async () => {
    vi.mocked(isSanityConfigured).mockReturnValue(true);
    (sanityClient!.fetch as any).mockRejectedValueOnce(
      new Error('Network error'),
    );

    const result = await getHighlights('pt');
    expect(result).toEqual(getDefaultHighlights('pt'));
  });

  it('returns default highlights if sanity returns empty array', async () => {
    vi.mocked(isSanityConfigured).mockReturnValue(true);
    (sanityClient!.fetch as any).mockResolvedValueOnce([]);

    const result = await getHighlights('pt');
    expect(result).toEqual(getDefaultHighlights('pt'));
  });
});
