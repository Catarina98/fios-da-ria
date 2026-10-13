'use client';

import Highlights, { HighlightsCarousel } from '@components/ui/highlights';
import { ButtonVariant } from '@typing/components/button';
import { Heart, Sparkles } from 'lucide-react';

import { Stack } from './_shared';

const HighlightsDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Carousel View (Auto-play & Multi-slide)">
      <HighlightsCarousel
        items={[
          {
            id: 'demo-1',
            badge: 'Feito à mão em Portugal',
            title:
              'Histórias feitas de fio, <highlight>ponto a ponto.</highlight>',
            description:
              'Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras amigurumi detalhadas e feitas à mão. Macias, fofinhas e cheias de personalidade.',
            imageSrc: '/images/toystory-highlight.jpg',
            imageAlt: 'Três bonecos de crochet coloridos na natureza',
            button: {
              children: 'Ver Galeria',
              variant: ButtonVariant.Primary,
              url: '/gallery',
            },
            secondaryButton: {
              children: 'Conhecer a Catarina',
              variant: ButtonVariant.Ghost,
              url: '/about',
            },
            note: {
              text: 'Peças únicas, feitas com carinho',
              icon: <Heart size={16} />,
            },
          },
          {
            id: 'demo-2',
            badge: 'Nova Coleção',
            title:
              'O encanto do crochet em <highlight>cada detalhe.</highlight>',
            description:
              'Descubra a nossa nova coleção inspirada na natureza e personagens mágicos.',
            imageSrc: '/images/catarina-highlight.jpg',
            imageAlt: 'Catarina a crochetar amigurumi',
            button: {
              children: 'Explorar Coleção',
              variant: ButtonVariant.Primary,
              url: '/gallery',
            },
            note: {
              text: 'Edição limitada',
              icon: <Sparkles size={16} />,
            },
          },
        ]}
      />
    </Stack>

    <Stack label="Single Highlight View (Static)">
      <Highlights
        badge="Feito à mão em Portugal"
        title="Histórias feitas de fio, <highlight>ponto a ponto.</highlight>"
        description="Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras amigurumi detalhadas e feitas à mão. Macias, fofinhas e cheias de personalidade."
        imageSrc="/images/toystory-highlight.jpg"
        imageAlt="Três bonecos de crochet coloridos na natureza"
        button={{
          children: 'Ver Galeria',
          variant: ButtonVariant.Primary,
        }}
        secondaryButton={{
          children: 'Conhecer a Catarina',
          variant: ButtonVariant.Ghost,
        }}
        note={{
          text: 'Peças únicas, feitas com carinho',
          icon: <Heart size={16} />,
        }}
      />
    </Stack>
  </div>
);

export default HighlightsDemo;
