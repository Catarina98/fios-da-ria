import { redirect } from 'next/navigation';

import { showcaseList } from '@/showcase/registry';

/*
 * TEMPORARY — redirects to the component showcase for design review.
 * To restore the real homepage, revert this file and delete `src/showcase/`
 * plus `src/app/[locale]/showcase/`. See src/showcase/README.md.
 */
type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  redirect(`/${locale}/showcase/${showcaseList[0].slug}`);
}
