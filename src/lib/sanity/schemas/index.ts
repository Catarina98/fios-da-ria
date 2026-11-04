import { categorySchema } from './category';
import { highlightSchema } from './highlight';
import { localeString, localeText } from './localeFields';
import { marketAgendaSchema } from './marketAgenda';
import { productSchema } from './product';

export const schemaTypes = [
  localeString,
  localeText,
  categorySchema,
  productSchema,
  highlightSchema,
  marketAgendaSchema,
];
