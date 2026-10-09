import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'always',
  localeDetection: false, //this disables automatic locale detection (by browser)
});
