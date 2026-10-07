import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

import Home, { generateStaticParams } from '../page';

describe('<Home />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders homepage with all sections and sets request locale to pt', async () => {
    const params = Promise.resolve({ locale: 'pt' });

    const pageResult = await Home({ params });
    render(pageResult);

    expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
    expect(screen.getByTestId('homepage-container')).toBeInTheDocument();

    // 1. Hero Highlights
    expect(screen.getByTestId('highlights-component')).toBeInTheDocument();
    expect(screen.getByText('Feito à mão em Portugal')).toBeInTheDocument();
    expect(screen.getByText('Ver Galeria')).toBeInTheDocument();
    expect(screen.getByText('Conhecer a Catarina')).toBeInTheDocument();
    expect(
      screen.getByText('Peças únicas, feitas com carinho'),
    ).toBeInTheDocument();

    // 2. Guidance Section ("O que nos guia")
    expect(screen.getByTestId('home-guidance-section')).toBeInTheDocument();
    expect(screen.getByText('O que nos guia')).toBeInTheDocument();
    expect(screen.getByText('Carinho em cada detalhe')).toBeInTheDocument();
    expect(screen.getByText('Materiais naturais')).toBeInTheDocument();
    expect(screen.getByText('Fio 100% algodão')).toBeInTheDocument();
    expect(
      screen.getByText('Cuidados com o seu amigurumi'),
    ).toBeInTheDocument();
    expect(screen.getByText('Lavar à mão')).toBeInTheDocument();

    // 3. Featured Section ("Pequenos tesouros")
    expect(screen.getByTestId('home-featured-section')).toBeInTheDocument();
    expect(screen.getByText('Pequenos tesouros')).toBeInTheDocument();
    expect(screen.getByText('Os mais queridos')).toBeInTheDocument();
    expect(screen.getByText('Ver tudo')).toBeInTheDocument();
    expect(screen.getByText('Woody')).toBeInTheDocument();
    expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
    expect(screen.getByText('Anya Forger')).toBeInTheDocument();

    // 4. Agenda Section ("Agenda / Próximos eventos")
    expect(screen.getByTestId('home-agenda-section')).toBeInTheDocument();
    expect(screen.getByTestId('story-banner-component')).toBeInTheDocument();
    expect(screen.getByText('Agenda')).toBeInTheDocument();
    expect(screen.getByText('Próximos eventos')).toBeInTheDocument();
    expect(
      screen.getByText('Mercadinho dos Artesãos e Produtores de Olhão'),
    ).toBeInTheDocument();
    expect(screen.getByText('Avenida 18 de Julho, Olhão')).toBeInTheDocument();
    expect(screen.getByText('Todos os sábados')).toBeInTheDocument();
    expect(screen.getByText('9h às 13h')).toBeInTheDocument();
  });

  it('generates static params for all supported locales', () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: 'pt' }, { locale: 'en' }]);
  });
});
