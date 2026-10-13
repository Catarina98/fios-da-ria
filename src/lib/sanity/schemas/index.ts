import { categorySchema } from './category';
import { highlightSchema } from './highlight';
import { localeString, localeText } from './localeFields';
import { productSchema } from './product';

export const schemaTypes = [
  localeString,
  localeText,
  categorySchema,
  productSchema,
  highlightSchema,
];
