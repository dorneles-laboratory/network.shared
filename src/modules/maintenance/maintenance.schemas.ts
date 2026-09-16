import { z, registry } from '../../lib/registry';
import { MaintenanceStatus } from './maintenance.enums';

export const createMaintenanceSchema = registry.register(
  'CreateMaintenanceRequest',
  z.object({
    title: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O título da manutenção é obrigatório.'
            : 'O título deve ser um texto.',
      })
      .min(3, { message: 'Título muito curto.' })
      .max(150, { message: 'Título muito longo.' })
      .trim()
      .openapi({
        description: 'Título ou resumo da manutenção',
        example: 'Atualização do banco de dados principal',
      }),

    description: z
      .string()
      .max(2000, { message: 'Descrição muito longa.' })
      .trim()
      .nullable()
      .optional()
      .openapi({
        description: 'Detalhes da janela de manutenção',
      }),

    serviceId: z
      .string()
      .uuid({ message: 'O ID do serviço deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description:
          'UUID do serviço afetado. Nulo representa manutenção global.',
      }),

    status: z
      .nativeEnum(MaintenanceStatus)
      .default(MaintenanceStatus.SCHEDULED)
      .openapi({
        description: 'Status atual da manutenção',
        example: 'SCHEDULED',
      }),

    scheduledStart: z.coerce
      .date({
        message: 'A data/hora de início programada é obrigatória.',
      })
      .openapi({
        description: 'Início programado da manutenção',
      }),

    scheduledEnd: z.coerce
      .date({
        message: 'A data/hora de término programada é obrigatória.',
      })
      .openapi({
        description: 'Fim programado da manutenção',
      }),

    actualEnd: z.coerce.date().nullable().optional().openapi({
      description: 'Término real da manutenção (preenchido ao concluir)',
    }),
  }),
);

export const updateMaintenanceSchema = registry.register(
  'UpdateMaintenanceRequest',
  createMaintenanceSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

// Schema de Resposta
export const maintenanceResponseSchema = registry.register(
  'MaintenanceResponse',
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    serviceId: z.string().uuid().nullable(),
    status: z.nativeEnum(MaintenanceStatus),
    scheduledStart: z.date(),
    scheduledEnd: z.date(),
    actualEnd: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

// Schema de Resposta Pública
export const maintenancePublicResponseSchema = registry.register(
  'MaintenancePublicResponse',
  z.object({
    id: z.string().uuid(),
    serviceId: z.string().uuid().nullable().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: z.nativeEnum(MaintenanceStatus),
    scheduledStart: z.date(),
    scheduledEnd: z.date(),
    // actualEnd: z.date().nullable().optional(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    service: z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .nullable()
      .optional(),
  }),
);

export const maintenanceIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID da manutenção deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo da manutenção',
    }),
});
