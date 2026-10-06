import { ButtonVariant } from '@typing/components/button';
import { HighlightsType } from '@typing/components/highlights';

export const toyStoryHighlightMock = {
  badge: 'Feito à mão em Portugal',
  title: 'Histórias feitas de fio, ponto a ponto.',
  description:
    'Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras amigurumi detalhadas e feitas à mão. Macias, fofinhas e cheias de personalidade.',
  imageSrc: '/images/toystory-highlight.jpg',
  imageAlt: 'Toy Story amigurumi dolls (Buzz, Woody and Jessie)',
  button: {
    children: 'Ver Galeria',
    variant: ButtonVariant.Primary,
  },
  secondaryButton: {
    children: 'Conhecer a Catarina',
    variant: ButtonVariant.Ghost,
  },
  note: {
    text: 'Peças únicas, feitas com carinho',
  },
} satisfies HighlightsType;

export const woodyHighlightMock = toyStoryHighlightMock;
export const wizardHighlightMock = toyStoryHighlightMock;

export const catarinaHighlightMock = {
  title: 'Olá, sou a Catarina.',
  description:
    'Começou com uma simples agulha de crochê e muita vontade de criar. Hoje, dedico os meus dias a tecer histórias em pontos, dando vida a criaturas em amigurumi, pensadas para encantar miúdos e graúdos. Bem-vindos ao cantinho da Fios da Ria.',
  imageSrc: '/images/catarina-highlight.jpg',
  imageAlt: 'Catarina smiling while crocheting amigurumi in studio',
  button: {
    children: 'Explorar o meu trabalho',
    variant: ButtonVariant.Primary,
  },
} satisfies HighlightsType;
