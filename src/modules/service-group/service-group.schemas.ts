import { z, registry } from '../../lib/registry';

export const createServiceGroupSchema = registry.register(
  'CreateServiceGroupRequest',
  z.object({
    name: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O nome do grupo é obrigatório.'
            : 'O nome do grupo deve ser um texto.',
      })
      .min(2, { message: 'Nome do grupo muito curto.' })
      .max(100, { message: 'Nome do grupo muito longo.' })
      .trim()
      .openapi({
        description: 'Nome de exibição do grupo',
        example: 'Core APIs',
      }),

    slug: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O slug é obrigatório.'
            : 'O slug deve ser um texto.',
      })
      .min(2)
      .max(100)
      .trim()
      .openapi({
        description: 'Identificador único amigável (URL-safe)',
        example: 'core-apis',
      }),

    description: z
      .string()
      .max(1000, { message: 'Descrição muito longa.' })
      .trim()
      .optional()
      .nullable()
      .openapi({
        description: 'Descrição detalhada do grupo de serviços',
      }),

    orderIndex: z.number().int().default(0).openapi({
      description: 'Índice usado para ordenação na interface',
      example: 1,
    }),
    icon: z.string().max(100, { message: 'Ícone muito longo.' }).openapi({
      description: 'Ícone representativo do grupo de serviços',
      example: 'globe',
    }),
  }),
);

export const updateServiceGroupSchema = registry.register(
  'UpdateServiceGroupRequest',
  createServiceGroupSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

// O Schema de Resposta
export const serviceGroupResponseSchema = registry.register(
  'ServiceGroupResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    icon: z.string(),
    orderIndex: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const serviceGroupIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID do grupo deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo do grupo de serviço',
    }),
});
