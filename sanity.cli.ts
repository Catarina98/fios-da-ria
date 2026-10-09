import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  studioHost: 'fios-da-ria',
  deployment: {
    appId: 'lpy54wgg85utg6azthp88mlt',
  },
});
