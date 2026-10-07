import { StoryBannerType } from '@typing/components/storybanner';

export const storyBannerMock: StoryBannerType = {
  badge: 'Agenda',
  title: 'Próximos eventos',
  imageSrc: '/images/mercadinho.jpg',
  imageAlt: 'Banca da Fios da Ria num mercado de artesanato',
  events: [
    {
      title: 'Mercadinho dos Artesãos e Produtores de Olhão',
      location: 'Avenida 18 de Julho, Olhão',
      frequency: 'Todos os sábados',
      schedule: '9h às 13h',
    },
  ],
};
