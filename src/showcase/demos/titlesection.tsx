'use client';

import Button from '@components/ui/button';
import TitleSection from '@components/ui/titlesection';
import { ButtonVariant } from '@typing/components/button';

import { Stack } from './_shared';

const TitleSectionDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Centered (e.g., O que nos guia)">
      <TitleSection
        eyebrow="O que nos guia"
        title="Carinho em cada detalhe"
        description="Escolhas conscientes para peças bonitas, seguras e cheias de personalidade."
        align="center"
      />
    </Stack>

    <Stack label="Left-aligned with Action (e.g., Pequenos tesouros)">
      <TitleSection
        eyebrow="Pequenos tesouros"
        title="Os mais queridos"
        description="Amigurumis favoritos feitos à mão com dedicação."
        align="left"
        action={<Button variant={ButtonVariant.Ghost}>Ver tudo</Button>}
      />
    </Stack>
  </div>
);

export default TitleSectionDemo;
