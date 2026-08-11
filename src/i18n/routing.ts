import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localeDetection: false, //this disables automatic locale detection (by browser)
});
