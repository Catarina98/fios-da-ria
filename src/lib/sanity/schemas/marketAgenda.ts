import { defineArrayMember, defineField, defineType } from 'sanity';

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const marketAgendaSchema = defineType({
  name: 'marketAgenda',
  title: 'Agenda de mercados',
  type: 'document',
  initialValue: {
    events: [
      {
        _key: 'mercadinho-olhao',
        _type: 'market',
        title: {
          pt: 'Mercadinho dos Artesãos e Produtores de Olhão',
          en: 'Olhão Artisans and Producers Market',
        },
        location: 'Avenida da República, Olhão',
        recurrence: 'weekly',
        weekday: 6,
        startTime: '09:00',
        endTime: '12:30',
      },
    ],
  },
  fields: [
    defineField({
      name: 'events',
      title: 'Mercados',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'market',
          title: 'Mercado',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nome',
              type: 'localeString',
              validation: rule =>
                rule
                  .required()
                  .custom(value =>
                    (value as { pt?: string } | undefined)?.pt?.trim()
                      ? true
                      : 'Indica o nome em português.',
                  ),
            }),
            defineField({
              name: 'location',
              title: 'Local',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'recurrence',
              title: 'Frequência',
              type: 'string',
              initialValue: 'once',
              options: {
                list: [
                  { title: 'Pontual', value: 'once' },
                  { title: 'Semanal', value: 'weekly' },
                ],
              },
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'date',
              title: 'Data do mercado',
              type: 'date',
              hidden: ({ parent }) => parent?.recurrence !== 'once',
              validation: rule =>
                rule.custom((value, { parent }) =>
                  (parent as { recurrence?: string })?.recurrence !== 'once' ||
                  value
                    ? true
                    : 'Escolhe a data do mercado.',
                ),
            }),
            defineField({
              name: 'weekday',
              title: 'Dia da semana',
              type: 'number',
              options: {
                list: weekdays.map((title, value) => ({ title, value })),
              },
              hidden: ({ parent }) => parent?.recurrence !== 'weekly',
              validation: rule =>
                rule.custom((value, { parent }) =>
                  (parent as { recurrence?: string })?.recurrence !==
                    'weekly' ||
                  (typeof value === 'number' &&
                    Number.isInteger(value) &&
                    value >= 0 &&
                    value <= 6)
                    ? true
                    : 'Escolhe o dia da semana.',
                ),
            }),
            defineField({
              name: 'startTime',
              title: 'Hora de início (HH:MM)',
              type: 'string',
              validation: rule =>
                rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
            }),
            defineField({
              name: 'endTime',
              title: 'Hora de fim (HH:MM)',
              type: 'string',
              validation: rule =>
                rule
                  .required()
                  .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
                  .custom((value, { parent }) => {
                    const start = (parent as { startTime?: string })?.startTime;
                    
return !start || !value || value > start
                      ? true
                      : 'A hora de fim deve ser posterior à hora de início.';
                  }),
            }),
            defineField({
              name: 'exceptions',
              title: 'Datas em que não estarei presente',
              description: 'Escolhe os dias deste mercado em que vais faltar.',
              type: 'array',
              of: [defineArrayMember({ type: 'date' })],
              hidden: ({ parent }) => parent?.recurrence !== 'weekly',
              validation: rule =>
                rule.unique().custom((dates, { parent }) => {
                  const market = parent as {
                    recurrence?: string;
                    weekday?: number;
                  };
                  if (
                    market?.recurrence !== 'weekly' ||
                    market.weekday === undefined
                  )
                    return true;
                  
return (
                    !dates?.some(
                      date =>
                        new Date(String(date)).getUTCDay() !== market.weekday,
                    ) ||
                    'As exceções devem corresponder ao dia da semana escolhido.'
                  );
                }),
            }),
          ],
          preview: { select: { title: 'title.pt', subtitle: 'location' } },
        }),
      ],
    }),
  ],
});
