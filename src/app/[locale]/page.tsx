import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  ButtonStyled,
  Card,
  CardContent,
  Page,
  TextContainer,
} from '@/styles/Global.styles';

export default function Home() {
  const t = useTranslations('Homepage');

  return (
    <Page>
      <Card>
        <Image
          className=""
          src="/metyis-logo.svg"
          alt="Metyis logo"
          width={200}
          height={20}
          priority
        />
        <CardContent>
          <TextContainer>
            <h1>{t('title')}</h1>
            <span>{t('description')}</span>
          </TextContainer>
        </CardContent>
        <ButtonStyled url="https://github.com/Metyis-Porto/polaris">
          {t('githubButton')}
        </ButtonStyled>
      </Card>
    </Page>
  );
}
