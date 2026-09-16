import { z, registry } from '../../lib/registry';
import { IncidentStatus } from '../incident/incident.enums';

export const createIncidentUpdateSchema = registry.register(
  'CreateIncidentUpdateRequest',
  z.object({
    incidentId: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O ID do incidente é obrigatório.'
            : 'O ID deve ser um UUID válido.',
      })
      .uuid({ message: 'O ID do incidente deve ser um UUID válido.' })
      .openapi({
        description: 'UUID do incidente ao qual esta atualização pertence',
      }),

    message: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'A mensagem da atualização é obrigatória.'
            : 'A mensagem deve ser um texto.',
      })
      .min(3, { message: 'Mensagem muito curta.' })
      .max(2000, { message: 'Mensagem muito longa.' })
      .trim()
      .openapi({
        description: 'Texto descrevendo a atualização do incidente',
        example:
          'Identificamos a causa raiz no banco de dados e estamos aplicando o fix.',
      }),

    status: z.nativeEnum(IncidentStatus).openapi({
      description: 'Status do incidente no momento desta atualização',
      example: 'IDENTIFIED',
    }),

    createdAt: z.coerce.date().optional().openapi({
      description:
        'Data customizada da atualização (se omitida, usará o default do banco)',
    }),
  }),
);

export const updateIncidentUpdateSchema = registry.register(
  'UpdateIncidentUpdateRequest',
  createIncidentUpdateSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const incidentUpdateResponseSchema = registry.register(
  'IncidentUpdateResponse',
  z.object({
    id: z.string().uuid(),
    incidentId: z.string().uuid(),
    message: z.string(),
    status: z.nativeEnum(IncidentStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const incidentUpdateIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID da atualização deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo da atualização do incidente',
    }),
});
