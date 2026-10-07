import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { noop, Row, Stack } from '../_shared';
import AccordionDemo from '../accordion';
import BadgeDemo from '../badge';
import ButtonDemo from '../button';
import CardDemo from '../card';
import ColorsDemo from '../colors';
import HighlightsDemo from '../highlights';
import ProductCardDemo from '../productcard';
import StoryBannerDemo from '../storybanner';
import TitleSectionDemo from '../titlesection';
import TypographyDemo from '../typography';

describe('Showcase Demos', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('_shared', () => {
    it('executes noop function', () => {
      expect(noop()).toBeUndefined();
    });

    it('renders Row component with label and children', () => {
      render(
        <Row label="Test Row">
          <span>Row child</span>
        </Row>,
      );

      expect(screen.getByText('Test Row')).toBeInTheDocument();
      expect(screen.getByText('Row child')).toBeInTheDocument();
    });

    it('renders Stack component with label and children', () => {
      render(
        <Stack label="Test Stack">
          <span>Stack child</span>
        </Stack>,
      );

      expect(screen.getByText('Test Stack')).toBeInTheDocument();
      expect(screen.getByText('Stack child')).toBeInTheDocument();
    });
  });

  describe('ButtonDemo', () => {
    it('renders all button demo variants', () => {
      render(<ButtonDemo />);

      expect(screen.getByText('Primary Button')).toBeInTheDocument();
      expect(screen.getByText('Secondary Button')).toBeInTheDocument();
      expect(screen.getByText('Tertiary Button')).toBeInTheDocument();
      expect(screen.getByText('Ghost Button')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Next Step')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
      expect(screen.getByText('Loading State')).toBeInTheDocument();
    });
  });

  describe('CardDemo', () => {
    it('renders feature card variants with list items', () => {
      render(<CardDemo />);

      expect(screen.getByText('Materiais naturais')).toBeInTheDocument();
      expect(screen.getByText('Fio 100% algodão')).toBeInTheDocument();
      expect(
        screen.getByText('Cuidados com o seu amigurumi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Tratar com carinho')).toBeInTheDocument();
    });
  });

  describe('AccordionDemo', () => {
    it('renders accordion demo items', () => {
      render(<AccordionDemo />);

      expect(screen.getByText('What does Flaga deliver?')).toBeInTheDocument();
      expect(screen.getByText('How fast is delivery?')).toBeInTheDocument();
      expect(screen.getByText('Disabled item')).toBeInTheDocument();
    });
  });

  describe('ColorsDemo', () => {
    it('renders background and border color swatches', () => {
      render(<ColorsDemo />);

      expect(screen.getByText('Backgrounds — bg-*')).toBeInTheDocument();
      expect(screen.getByText('Borders — border-*')).toBeInTheDocument();
      expect(screen.getByText('bg-primary')).toBeInTheDocument();
      expect(screen.getByText('border-primary')).toBeInTheDocument();
    });
  });

  describe('TypographyDemo', () => {
    it('renders all typography demo elements', () => {
      render(<TypographyDemo />);

      expect(screen.getByText('Display L')).toBeInTheDocument();
      expect(screen.getByText('Heading XL')).toBeInTheDocument();
      expect(screen.getByText('Body L')).toBeInTheDocument();
      expect(screen.getByText('Label primary')).toBeInTheDocument();
      expect(screen.getByText('Label secondary')).toBeInTheDocument();
      expect(screen.getByText('Caption')).toBeInTheDocument();
    });
  });

  describe('BadgeDemo', () => {
    it('renders all badge demo variants and sizes', () => {
      render(<BadgeDemo />);

      expect(
        screen.getAllByText('Feito à mão em Portugal')[0],
      ).toBeInTheDocument();
      expect(screen.getAllByText('Novo Padrão')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText('Peças únicas, feitas com carinho')[0],
      ).toBeInTheDocument();
      expect(screen.getByText('Destaque')).toBeInTheDocument();
      expect(screen.getByText('Small (sm)')).toBeInTheDocument();
      expect(screen.getByText('Medium (md)')).toBeInTheDocument();
    });
  });

  describe('HighlightsDemo', () => {
    it('renders highlights demo cards', () => {
      render(<HighlightsDemo />);

      expect(
        screen.getAllByText(/Histórias feitas de fio/)[0],
      ).toBeInTheDocument();
      expect(screen.getAllByText('Ver Galeria')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText('Feito à mão em Portugal')[0],
      ).toBeInTheDocument();
      expect(screen.getAllByText('Conhecer a Catarina')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText('Peças únicas, feitas com carinho')[0],
      ).toBeInTheDocument();
    });
  });

  describe('ProductCardDemo', () => {
    it('renders product cards with titles and categories', () => {
      render(<ProductCardDemo />);

      expect(screen.getByText('Woody')).toBeInTheDocument();
      expect(screen.getByText('Toy Story')).toBeInTheDocument();
      expect(screen.getByText('Branca de Neve')).toBeInTheDocument();
      expect(screen.getByText('Anya Forger')).toBeInTheDocument();
    });
  });

  describe('TitleSectionDemo', () => {
    it('renders centered and left-aligned title sections', () => {
      render(<TitleSectionDemo />);

      expect(screen.getByText('O que nos guia')).toBeInTheDocument();
      expect(screen.getByText('Carinho em cada detalhe')).toBeInTheDocument();
      expect(screen.getByText('Pequenos tesouros')).toBeInTheDocument();
      expect(screen.getByText('Os mais queridos')).toBeInTheDocument();
      expect(screen.getByText('Ver tudo')).toBeInTheDocument();
    });
  });

  describe('StoryBannerDemo', () => {
    it('renders story banner with agenda and event details', () => {
      render(<StoryBannerDemo />);

      expect(screen.getByText('Agenda')).toBeInTheDocument();
      expect(screen.getByText('Próximos eventos')).toBeInTheDocument();
      expect(
        screen.getByText('Mercadinho dos Artesãos e Produtores de Olhão'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Avenida 18 de Julho, Olhão'),
      ).toBeInTheDocument();
    });
  });
});
