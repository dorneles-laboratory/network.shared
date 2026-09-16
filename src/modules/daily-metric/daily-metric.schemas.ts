import { z, registry } from '../../lib/registry';

export const createDailyMetricSchema = registry.register(
  'CreateDailyMetricRequest',
  z.object({
    serviceId: z
      .string({ message: 'O ID do serviço é obrigatório.' })
      .uuid({ message: 'O ID do serviço deve ser um UUID válido.' })
      .openapi({
        description: 'UUID do serviço ao qual a métrica pertence',
      }),

    date: z.coerce
      .date({
        message: 'A data da métrica é obrigatória.',
      })
      .openapi({
        description: 'Data de referência para as métricas',
        example: '2026-07-28',
      }),

    uptimePercent: z
      .number({ message: 'O percentual de uptime é obrigatório.' })
      .min(0)
      .max(100)
      .openapi({
        description: 'Percentual de disponibilidade no dia (0 a 100)',
        example: 99.9,
      }),

    incidentCount: z.number().int().min(0).default(0).openapi({
      description: 'Número de incidentes registrados no dia',
      example: 0,
    }),

    downtimeMinutes: z.number().int().min(0).default(0).openapi({
      description: 'Tempo total de indisponibilidade em minutos',
      example: 5,
    }),

    avgResponseMs: z
      .number({ message: 'O tempo médio de resposta é obrigatório.' })
      .int()
      .min(0)
      .openapi({
        description: 'Tempo médio de resposta em milissegundos',
        example: 120,
      }),
  }),
);

export const updateDailyMetricSchema = registry.register(
  'UpdateDailyMetricRequest',
  createDailyMetricSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const dailyMetricResponseSchema = registry.register(
  'DailyMetricResponse',
  z.object({
    id: z.string().uuid(),
    serviceId: z.string().uuid(),
    date: z.date(),
    uptimePercent: z.number(),
    incidentCount: z.number().int(),
    downtimeMinutes: z.number().int(),
    avgResponseMs: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const dailyMetricIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID da métrica deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo da métrica',
    }),
});
