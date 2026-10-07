'use client';

import Highlights from '@components/ui/highlights';
import { ButtonVariant } from '@typing/components/button';
import { Heart } from 'lucide-react';

import { Stack } from './_shared';

const HighlightsDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Desktop View (Hero Highlights Design)">
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
