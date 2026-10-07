import { ReactNode } from 'react';

import ShowcaseShell from '@/showcase/ShowcaseShell';

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <ShowcaseShell>{children}</ShowcaseShell>;
}
