import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ptMessages from '@/../messages/pt.json';

const getNestedValue = (obj: unknown, path: string): string => {
  const result = path
    .split('.')
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === 'object' && part in acc
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      obj,
    );

  return typeof result === 'string' ? result : path;
};

const { mockSetRequestLocale, mockGetTranslations } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
  mockGetTranslations: vi.fn((namespace: string) => {
    const namespaceMessages =
      (ptMessages as Record<string, unknown>)[namespace] || {};

    return (key: string) => getNestedValue(namespaceMessages, key);
  }),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
  getTranslations: mockGetTranslations,
}));

import AboutPage, { generateStaticParams } from '../page';

describe('<AboutPage />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders breadcrumbs, hero section, process steps, and contact section', async () => {
    const page = await AboutPage({ params: Promise.resolve({ locale: 'pt' }) });
    render(page);

    expect(screen.getByTestId('about-page-container')).toBeInTheDocument();

    // 1. Breadcrumbs inside Hero Section
    expect(screen.getByTestId('highlights-breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs-component')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();

    // 2. Hero Section
    const heroSection = screen.getByTestId('about-hero-section');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('highlights-full-height');
    expect(screen.getByText('A artesã')).toBeInTheDocument();
    expect(screen.getByText('Olá, sou a Catarina! 👋')).toBeInTheDocument();
    expect(screen.getByText(/Em 2024, descobri o croché/)).toBeInTheDocument();

    const galleryBtn = screen.getByTestId('about-gallery-btn');
    expect(galleryBtn).toHaveTextContent('Descobrir as peças');
    expect(galleryBtn).toHaveAttribute('href', '/gallery');

    const heroImage = screen.getByAltText(
      'Catarina a trabalhar no seu atelier',
    );
    expect(heroImage).toBeInTheDocument();

    // 3. Process Section
    expect(screen.getByTestId('about-process-section')).toBeInTheDocument();
    expect(screen.getByText('O processo')).toBeInTheDocument();
    expect(screen.getByText('Devagar, como deve ser')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Três gestos simples transformam um fio numa peça para guardar.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByTestId('process-card-01')).toBeInTheDocument();
    expect(screen.getByTestId('process-title-01')).toHaveTextContent('A ideia');
    expect(screen.getByTestId('process-desc-01')).toHaveTextContent(
      'Tudo começa num desenho e numa paleta inspirada na ria.',
    );

    expect(screen.getByTestId('process-card-02')).toBeInTheDocument();
    expect(screen.getByTestId('process-title-02')).toHaveTextContent('O ponto');
    expect(screen.getByTestId('process-desc-02')).toHaveTextContent(
      'Cada forma cresce lentamente, carreira após carreira.',
    );

    expect(screen.getByTestId('process-card-03')).toBeInTheDocument();
    expect(screen.getByTestId('process-title-03')).toHaveTextContent('A alma');
    expect(screen.getByTestId('process-desc-03')).toHaveTextContent(
      'Os últimos detalhes dão expressão e tornam a peça única.',
    );

    // 4. Contact Section
    const contactSection = screen.getByTestId('about-contact-section');
    expect(contactSection).toBeInTheDocument();
    expect(contactSection).toHaveAttribute('id', 'contact');
    expect(screen.getByText('Vamos conversar')).toBeInTheDocument();
    expect(screen.getByTestId('about-contact-title')).toHaveTextContent(
      'Vamos conversar?',
    );
    expect(screen.getByTestId('about-contact-lead')).toHaveTextContent(
      'Queres encomendar uma personagem especial',
    );

    const emailLink = screen.getByTestId('about-email-link');
    expect(emailLink).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:fiosdaria@gmail.com'),
    );

    const instagramLink = screen.getByTestId('about-instagram-link');
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/fiosdaria',
    );
    expect(instagramLink).toHaveAttribute('target', '_blank');

    expect(screen.getByTestId('about-hand-delivery')).toHaveTextContent(
      'Entregas em mão: Disponíveis em Faro e Olhão.',
    );
    expect(screen.getByTestId('about-market-info')).toHaveTextContent(
      'Mercadinho Local: Avenida 18 de Julho',
    );

    const sendMessageBtn = screen.getByTestId('about-send-message-btn');
    expect(sendMessageBtn).toHaveTextContent('Enviar mensagem');
    expect(sendMessageBtn).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:fiosdaria@gmail.com'),
    );
  });

  it('sets the request locale on server render', async () => {
    await AboutPage({ params: Promise.resolve({ locale: 'pt' }) });
    expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
  });

  it('generates static params for all supported locales', () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: 'pt' }, { locale: 'en' }]);
  });
});
