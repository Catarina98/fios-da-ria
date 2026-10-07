'use client';

import Card from '@components/ui/card';
import { Flower, Shield } from 'lucide-react';

import { Stack } from './_shared';

const CardDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Feature Cards (e.g., O que nos guia)">
      <div className="grid grid-cols-1 gap-24 desktop:grid-cols-2">
        <Card
          icon={<Flower size={20} />}
          iconVariant="primary"
          title="Materiais naturais"
          items={[
            'Fio 100% algodão',
            'Olhos com travas de segurança',
            'Enchimento antialérgico',
          ]}
        />
        <Card
          icon={<Shield size={20} />}
          iconVariant="secondary"
          title="Cuidados com o seu amigurumi"
          items={[
            'Lavar à mão',
            'Não torcer',
            'Secar à sombra',
            'Tratar com carinho',
          ]}
        />
      </div>
    </Stack>
  </div>
);

export default CardDemo;
