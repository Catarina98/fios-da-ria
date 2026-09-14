'use client';

import { Suspense } from 'react';
import { Body, Heading } from '@components/ui/typography';

import { demoMap } from './demos';
import { findShowcaseEntry } from './registry';

const ShowcaseContent = ({ slug }: { slug: string }) => {
  const entry = findShowcaseEntry(slug);
  const Demo = demoMap[slug];

  if (!entry || !Demo) return null;

  return (
    <div className="flex flex-col items-center gap-40 py-40 desktop:py-60">
      <div className="flex w-full max-w-5xl flex-col gap-40 px-20 desktop:px-60">
        <div className="flex flex-col gap-8">
          <Heading size="L" className="text-primary">
            {entry.name}
          </Heading>
          <Body size="M" className="text-tertiary">
            {entry.summary}
          </Body>
        </div>

        {!entry.fullWidth && (
          <div className="rounded-18 bg-grey p-24 shadow-[0_4px_4px_0_rgba(0,0,0,0.04)] desktop:p-40">
            <Suspense fallback={null}>
              <Demo />
            </Suspense>
          </div>
        )}
      </div>

      {entry.fullWidth && (
        <div className="w-full">
          <Suspense fallback={null}>
            <Demo />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ShowcaseContent;
