import Accordion from '@components/ui/accordion';
import Label from '@components/ui/label';
import TitleSection from '@components/ui/titlesection';
import { LabelVariant } from '@typing/components/label';
import {
  TitleSectionAlign,
  TitleSectionColor,
  TitleSectionSize,
} from '@typing/components/titlesection';
import { useTranslations } from 'next-intl';

import '../../styles/globals.css';

const accordionData = {
  items: [
    { title: 'Title 1', content: 'Content 1' },
    { title: 'Title 2', content: 'Content 2' },
    { title: 'Title 3', content: 'Content 3' },
  ],
};

export default function Home() {
  const t = useTranslations('Homepage');

  return (
    <>
      <p className="text-2xl font-bold" data-testid="heading-component">
        {t('title')}
      </p>
      <Label text="Cinema" variant={LabelVariant.Secondary} />
      <Accordion {...accordionData} />
      <Label text="Cinema" variant={LabelVariant.Primary} />
      <TitleSection
        align={TitleSectionAlign.Center}
        title={`Trazendo magia à vida,
um ponto de cada vez.`}
        subtitle={`Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras
amigurumi detalhadas e feitas à mão. Macias, fofinhas e
cheias de personalidade.`}
      />
      <TitleSection
        title="O Processo"
        titleColor={TitleSectionColor.Secondary}
        titleSize={TitleSectionSize.Small}
        subtitle={`Da primeira faísca de inspiração ao último fio rematado, cada criatura é feita com
intenção e um toque de magia.`}
      />
    </>
  );
}
