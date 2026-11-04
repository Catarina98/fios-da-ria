import type { StoryBannerEvent } from '@typing/components/storybanner';

import { sanityClient } from './client';

type Market = {
  _key: string;
  title: { pt?: string; en?: string };
  location: string;
  recurrence: 'once' | 'weekly';
  date?: string;
  weekday?: number;
  startTime: string;
  endTime: string;
  exceptions?: string[];
};

const timeZone = 'Europe/Lisbon';
const localDate = new Intl.DateTimeFormat('sv-SE', { timeZone });
const localTime = new Intl.DateTimeFormat('pt-PT', {
  timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const asDate = (date: string) => new Date(`${date}T00:00:00Z`);

export function formatMarkets(
  markets: Market[],
  locale: string,
  now = new Date(),
): StoryBannerEvent[] {
  const english = locale === 'en';
  const language = english ? 'en-GB' : 'pt-PT';
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  } as const;
  const absenceFormat = new Intl.DateTimeFormat(language, dateOptions);
  const dateFormat = new Intl.DateTimeFormat(language, {
    ...dateOptions,
    weekday: 'long',
  });
  const today = localDate.format(now);
  const time = localTime.format(now);
  const hasNotEnded = (date: string, endTime: string) =>
    date > today || (date === today && time < endTime);

  return markets
    .flatMap(market => {
      const weekly = market.recurrence === 'weekly';
      const exceptions = weekly ? [...(market.exceptions ?? [])].sort() : [];
      let nextDate = market.date;
      let frequency = '';

      if (weekly) {
        if (market.weekday === undefined) return [];
        const next = asDate(today);
        const offset = (market.weekday - next.getUTCDay() + 7) % 7;
        next.setUTCDate(next.getUTCDate() + offset);
        nextDate = next.toISOString().slice(0, 10);

        while (
          exceptions.includes(nextDate) ||
          !hasNotEnded(nextDate, market.endTime)
        ) {
          next.setUTCDate(next.getUTCDate() + 7);
          nextDate = next.toISOString().slice(0, 10);
        }

        frequency = english
          ? `Every ${new Intl.DateTimeFormat(language, { weekday: 'long', timeZone: 'UTC' }).format(next)}`
          : [
              'Todos os domingos',
              'Todas as segundas-feiras',
              'Todas as terças-feiras',
              'Todas as quartas-feiras',
              'Todas as quintas-feiras',
              'Todas as sextas-feiras',
              'Todos os sábados',
            ][market.weekday];
      }

      if (!nextDate || !hasNotEnded(nextDate, market.endTime)) return [];

      return [
        {
          nextDate,
          startTime: market.startTime,
          event: {
            id: market._key,
            title:
              (english ? market.title.en : market.title.pt) ||
              market.title.pt ||
              '',
            location: market.location,
            frequency: weekly ? frequency : dateFormat.format(asDate(nextDate)),
            schedule: `${market.startTime} ${english ? 'to' : 'às'} ${market.endTime}`,
            absences: exceptions
              .filter(date => date >= today)
              .map(date => absenceFormat.format(asDate(date))),
          },
        },
      ];
    })
    .sort(
      (a, b) =>
        a.nextDate.localeCompare(b.nextDate) ||
        a.startTime.localeCompare(b.startTime),
    )
    .map(({ event }) => event);
}

export async function fetchMarketAgenda(
  locale: string,
): Promise<StoryBannerEvent[] | null> {
  if (!sanityClient) return null;

  try {
    const agenda = await sanityClient.fetch<{ events?: Market[] } | null>(
      '*[_type == "marketAgenda" && _id == "marketAgenda"][0]{events}',
    );
    
return agenda ? formatMarkets(agenda.events ?? [], locale) : null;
  } catch (error) {
    console.warn('Failed to fetch market agenda from Sanity:', error);
    
return null;
  }
}
