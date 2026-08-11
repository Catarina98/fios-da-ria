import React, { ReactElement, ReactNode } from 'react';
import { Providers } from "@providers/Providers";
import { render } from '@testing-library/react';
import type { MessagesType } from '@typing/messages';
import { getMessages } from '@utils/getMessages';
import { IncomingForm } from 'formidable';
import fetch from 'node-fetch';
import { Mock, vi } from 'vitest';

vi.mock('formidable', () => {
  return {
    IncomingForm: vi.fn(),
  };
});

export const wrapper = ({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: MessagesType;
  locale?: string;
}) => {
  return (
    <Providers messages={messages} locale={locale}>
      {children}
    </Providers>
  );
};

const customRender = (ui: ReactElement) => {
  const locale = 'en';
  const messages = getMessages(locale) ?? {};

  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) =>
      wrapper({ children, messages, locale }),
  });
};

export const createWrapper = (
  messages: MessagesType = {},
  locale: string = 'en',
) => {
  return ({ children }: { children: React.ReactNode }) =>
    wrapper({ children, messages, locale });
};

export const getTextFromBlock = (block: {
  children: Array<{ text?: string } | { type: string }>; // Adjust this for other node types you might have
}) => {
  return block.children
    .map(child => ('text' in child ? child.text : ''))
    .join(' ');
};

export const mockFormData = (fields: any, files: any) => {
  vi.mocked(IncomingForm).mockImplementation(function () {
    return {
      parse: vi.fn((_, cb) => {
        cb(null, fields, files);
      }),
    } as any;
  });
};

export const getBodyEntries = () => {
  const fetchCall = (fetch as Mock).mock.calls[0];
  const bodySent = fetchCall[1].body;
  const entries: Record<string, string[]> = {};

  for (const [key, value] of bodySent.entries()) {
    if (!entries[key]) entries[key] = [];
    entries[key].push(value as string);
  }

  return entries;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
