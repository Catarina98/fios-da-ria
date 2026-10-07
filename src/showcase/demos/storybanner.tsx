'use client';

import StoryBanner from '@components/ui/storybanner';

import { Stack } from './_shared';

const StoryBannerDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Agenda Story Banner">
      <StoryBanner
        badge="Agenda"
        title="Próximos eventos"
        imageSrc="/images/mercadinho.jpg"
        imageAlt="Banca da Fios da Ria num mercado de artesanato"
        events={[
          {
            title: 'Mercadinho dos Artesãos e Produtores de Olhão',
            location: 'Avenida 18 de Julho, Olhão',
            frequency: 'Todos os sábados',
            schedule: '9h às 13h',
          },
        ]}
      />
    </Stack>
  </div>
);

export default StoryBannerDemo;
