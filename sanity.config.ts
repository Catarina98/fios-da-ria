import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './src/lib/sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Fios da Ria',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Agenda de mercados')
              .id('marketAgenda')
              .child(
                S.document()
                  .schemaType('marketAgenda')
                  .documentId('marketAgenda'),
              ),
            ...S.documentTypeListItems().filter(
              item => item.getId() !== 'marketAgenda',
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
