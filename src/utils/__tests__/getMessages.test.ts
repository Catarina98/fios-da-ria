import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';

import { getMessages } from '../getMessages';

vi.mock('node:fs');
vi.mock('node:path');

describe('getMessages', () => {
  it('should return messages for a given locale', () => {
    const mockLocale = 'de';
    const mockMessages = { greeting: 'Taube' };

    vi.spyOn(path, 'join').mockReturnValue(
      `/mock/path/to/messages/${mockLocale}.json`,
    );
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockMessages));

    const result = getMessages(mockLocale);

    expect(result).toEqual(mockMessages);
    expect(path.join).toHaveBeenCalledWith(
      process.cwd(),
      `messages/${mockLocale}.json`,
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/mock/path/to/messages/de.json',
      'utf8',
    );
  });

  it('should throw an error if the file does not exist', () => {
    const mockLocale = 'es';

    vi.spyOn(path, 'join').mockReturnValue(
      `/mock/path/to/messages/${mockLocale}.json`,
    );
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => getMessages(mockLocale)).toThrow('File not found');
    expect(path.join).toHaveBeenCalledWith(
      process.cwd(),
      `messages/${mockLocale}.json`,
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/mock/path/to/messages/es.json',
      'utf8',
    );
  });

  it('should return undefined if no locale', () => {
    const result = getMessages();

    expect(result).toBeUndefined();
  });

  it('should throw an error for invalid locale format', () => {
    expect(() => getMessages('////')).toThrow('Invalid locale format.');
  });
});
