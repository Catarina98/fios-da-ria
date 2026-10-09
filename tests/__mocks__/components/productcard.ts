import { ProductCardType } from '@typing/components/productcard';

export const woodyProductMock: ProductCardType = {
  title: 'Woody',
  category: 'Toy Story',
  description:
    'O xerife mais leal de Toy Story, recriado ponto a ponto com todos os detalhes do seu traje.',
  image: '/images/toystory-highlight.jpg',
  price: '€48',
  url: '/product/collection-toy-story',
};

export const snowWhiteProductMock: ProductCardType = {
  title: 'Branca de Neve',
  category: 'Disney Princess',
  description:
    'A primeira princesa Disney numa versão delicada, com o icónico vestido azul e amarelo.',
  image: '/images/snow-white.jpg',
  price: '€65',
  url: '/product/collection-disney-princesses',
};
