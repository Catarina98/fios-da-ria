import { render, screen } from '@tests/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockNotFound, mockSetRequestLocale } = vi.hoisted(() => ({
  mockNotFound: vi.fn(() => {
    throw new Error('notFound');
  }),
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

vi.mock('@/showcase/ShowcaseContent', () => ({
  default: ({ slug }: { slug: string }) => (
    <div data-testid="showcase-content">Content for {slug}</div>
  ),
}));

import ShowcaseComponentPage, { generateStaticParams } from '../page';

describe('ShowcaseComponentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateStaticParams', () => {
    it('generates static params for each locale and slug combination', () => {
      const params = generateStaticParams();

      expect(params.length).toBeGreaterThan(0);
      expect(params[0]).toHaveProperty('locale');
      expect(params[0]).toHaveProperty('slug');
    });
  });

  describe('page component', () => {
    it('sets request locale and renders showcase content for valid slug', async () => {
      const pageResult = await ShowcaseComponentPage({
        params: Promise.resolve({ locale: 'en', slug: 'button' }),
      });

      render(pageResult);

      expect(mockSetRequestLocale).toHaveBeenCalledWith('en');
      expect(screen.getByTestId('showcase-content')).toHaveTextContent(
        'Content for button',
      );
    });

    it('calls notFound when slug does not exist in registry', async () => {
      await expect(
        ShowcaseComponentPage({
          params: Promise.resolve({ locale: 'en', slug: 'invalid-component' }),
        }),
      ).rejects.toThrow('notFound');

      expect(mockNotFound).toHaveBeenCalled();
    });
  });
});
