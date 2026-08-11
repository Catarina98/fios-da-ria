import type { MessagesType } from '@typing/messages';
import fs from 'node:fs';
import path from 'node:path';
import sanitize from 'sanitize-filename';

export const getMessages = (locale?: string) => {
  if (!locale) {
    return;
  }

  const sanitazedLocale = sanitize(locale);

  if (!sanitazedLocale) {
    throw new Error('Invalid locale format.');
  }
  const filePath = path.join(process.cwd(), `messages/${sanitazedLocale}.json`);
  const messages: MessagesType | undefined = JSON.parse(
    fs.readFileSync(filePath, 'utf8'),
  );

  return messages ?? {};
};
