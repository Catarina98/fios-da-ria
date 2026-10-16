import React, { ReactElement, ReactNode } from 'react';
import { Providers } from '@providers/Providers';
import { render } from '@testing-library/react';
import type { MessagesType } from '@typing/messages';
import { getMessages } from '@utils/getMessages';

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
  const locale = 'pt';
  const messages = getMessages(locale) ?? {};

  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) =>
      wrapper({ children, messages, locale }),
  });
};

export const createWrapper = (
  messages: MessagesType = {},
  locale: string = 'pt',
) => {
  return ({ children }: { children: React.ReactNode }) =>
    wrapper({ children, messages, locale });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
