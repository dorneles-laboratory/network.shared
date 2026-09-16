import { z, registry } from '../../lib/registry';
import { ServiceStatus } from './service.enums';

export const createServiceSchema = registry.register(
  'CreateServiceRequest',
  z.object({
    name: z
      .string({
        message: 'O nome do serviço é obrigatório.',
      })
      .min(2, { message: 'Nome do serviço muito curto.' })
      .max(100, { message: 'Nome do serviço muito longo.' })
      .trim()
      .openapi({
        description: 'Nome de exibição do serviço',
        example: 'API de Pagamentos',
      }),

    slug: z
      .string({
        message: 'O slug é obrigatório.',
      })
      .min(2)
      .max(100)
      .trim()
      .openapi({
        description: 'Identificador único amigável (URL-safe)',
        example: 'api-pagamentos',
      }),

    machineSlug: z.string().trim().nullable().optional().openapi({
      description: 'Slug da máquina onde o serviço está hospedado',
      example: 'server-prod-01',
    }),

    machineId: z
      .string()
      .uuid({ message: 'O ID da máquina deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description: 'ID da máquina associada ao serviço',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),

    url: z
      .string({
        message: 'A URL do serviço é obrigatória.',
      })
      .url({ message: 'Deve ser uma URL válida.' })
      .trim()
      .openapi({
        description: 'URL principal do serviço para monitoramento/acesso',
        example: 'https://api.meusistema.com',
      }),

    status: z
      .nativeEnum(ServiceStatus)
      .default(ServiceStatus.OPERATIONAL)
      .openapi({
        description: 'Status atual de operação do serviço',
        example: 'OPERATIONAL',
      }),

    description: z
      .string()
      .max(1000, { message: 'Descrição muito longa.' })
      .trim()
      .nullable()
      .optional()
      .openapi({
        description: 'Descrição detalhada do serviço',
      }),

    groupId: z
      .string()
      .uuid({ message: 'O ID do grupo deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description: 'UUID do grupo de serviços ao qual este serviço pertence',
      }),
    isMonitored: z.boolean().default(false).openapi({
      description: 'Indica se o serviço está sendo monitorado',
      example: false,
    }),
    isStandalone: z.boolean().default(false).openapi({
      description: 'Indica se o serviço é independente (standalone)',
      example: false,
    }),
    isPrivate: z.boolean().default(false).openapi({
      description:
        'Indica se o serviço é privado (não exibido publicamente no painel)',
      example: false,
    }),
    showExternalLink: z.boolean().default(false).openapi({
      description: 'Indica se deve exibir botão direto para o serviço',
      example: false,
    }),
    externalUrl: z.string().trim().nullable().optional().openapi({
      description: 'URL de acesso ao serviço se diferente da URL de ping',
      example: 'https://app.meusistema.com',
    }),
  }),
);

export const updateServiceSchema = registry.register(
  'UpdateServiceRequest',
  createServiceSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualização.',
  }),
);

// Schema de Resposta (Reflete todos os campos que o banco vai devolver)
export const serviceResponseSchema = registry.register(
  'ServiceResponse',
  z.object({
    id: z.string().uuid(),
    groupId: z.string().uuid().nullable().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    url: z.string(),
    status: z.nativeEnum(ServiceStatus),
    isStandalone: z.boolean(),
    orderIndex: z.number().int(),
    uptime30d: z.number(),
    avgResponseMs: z.number().int(),
    machineId: z.string().uuid().nullable().optional(),
    machineSlug: z.string().nullable().optional(),
    isMonitored: z.boolean(),
    isPrivate: z.boolean().default(false),
    showExternalLink: z.boolean().default(false),
    externalUrl: z.string().nullable().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

// Schema de Resposta Pública (Exclui campos sensíveis ou internos)
export const servicePublicResponseSchema = registry.register(
  'ServicePublicResponse',
  z.object({
    id: z.string().uuid(),
    groupId: z.string().uuid().nullable().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    url: z.string().optional(),
    status: z.nativeEnum(ServiceStatus),
    isStandalone: z.boolean(),
    orderIndex: z.number().int(),
    uptime30d: z.number(),
    avgResponseMs: z.number().int(),
    showExternalLink: z.boolean().default(false),
    externalUrl: z.string().nullable().optional(),
  }),
);

export const serviceIdSchema = z.object({
  id: z
    .string()
    .uuid({
      message: 'O ID do serviço deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo do serviço',
    }),
});
