import { render, screen } from '@tests/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetRequestLocale } = vi.hoisted(() => ({
  mockSetRequestLocale: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mockSetRequestLocale,
}));

import Home from '../page';

describe('<Home />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders homepage with Highlights section and sets request locale to pt', async () => {
    const params = Promise.resolve({ locale: 'pt' });

    const pageResult = await Home({ params });
    render(pageResult);

    expect(mockSetRequestLocale).toHaveBeenCalledWith('pt');
    expect(screen.getByTestId('highlights-component')).toBeInTheDocument();
    expect(screen.getByText('Feito à mão em Portugal')).toBeInTheDocument();

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(
      'Histórias feitas de fio, ponto a ponto.',
    );
    expect(heading.querySelector('.highlights-highlight')).toHaveTextContent(
      'ponto a ponto.',
    );

    expect(screen.getByText('Ver Galeria')).toBeInTheDocument();
    expect(screen.getByText('Conhecer a Catarina')).toBeInTheDocument();
  });
});
