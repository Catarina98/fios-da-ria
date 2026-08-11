'use client'

import { ReactNode } from "react";
import { type AbstractIntlMessages,NextIntlClientProvider } from 'next-intl';

export function IntlProvider({
  children,
  messages,
  locale
}: {
  children: ReactNode;
  messages: AbstractIntlMessages;
  locale?: string;
}) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone={timezone}>
      {children}
    </NextIntlClientProvider>
  );
}
