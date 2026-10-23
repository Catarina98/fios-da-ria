import { render, screen, within } from '@tests/test-utils';
import { describe, expect, it, vi } from 'vitest';

import en from '../../../../../messages/en.json';
import pt from '../../../../../messages/pt.json';

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async (
    options: string | { locale: string; namespace: string },
  ) => {
    const locale = typeof options === 'string' ? 'pt' : options.locale;
    const namespace = typeof options === 'string' ? options : options.namespace;
    const messages = locale === 'pt' ? pt : en;
    const content = messages[namespace as 'Buying' | 'Navigation'];
    const translate = (key: string) =>
      (content as Record<string, unknown>)[key];

    return Object.assign(translate, { raw: translate });
  },
}));

import BuyingPage, { generateMetadata, generateStaticParams } from '../page';

describe('Buying guide', () => {
  it('explains deposits, both delivery methods and custom requests before purchase', async () => {
    render(await BuyingPage({ params: Promise.resolve({ locale: 'pt' }) }));
    expect(
      screen.getByRole('heading', { name: 'Como comprar e encomendar' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/primeiras 24 horas após o pagamento inicial/),
    ).toBeInTheDocument();
    expect(screen.getByText(/restantes 50% no encontro/)).toBeInTheDocument();
    expect(
      screen.getByText(/CTT, o valor em falta e os portes/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/não perde esse direito apenas por/),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('region', { name: 'Pedir uma peça personalizada' }),
      ).getByRole('link', { name: 'Pedir uma peça personalizada' }),
    ).toHaveAttribute('href', 'https://ig.me/m/fiosdaria');
  });

  it.each(['pt', 'en'])('exports localized metadata for %s', async locale => {
    const result = await generateMetadata({
      params: Promise.resolve({ locale }),
    });
    expect(result.alternates.canonical).toBe(
      `https://fiosdaria.pt${locale === 'pt' ? '' : '/en'}/how-to-buy/`,
    );
    expect(result.description).toBeTruthy();
  });

  it('exports both languages', () => {
    expect(generateStaticParams()).toEqual([
      { locale: 'pt' },
      { locale: 'en' },
    ]);
  });
});
