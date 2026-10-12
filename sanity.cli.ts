import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'fios-da-ria',
  deployment: {
    appId: 'lpy54wgg85utg6azthp88mlt',
  },
});
