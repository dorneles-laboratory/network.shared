import { z, registry } from '../../lib/registry';
import { ServicePortProtocol, PortStatus } from './service-port.enums';

export const createServicePortSchema = registry.register(
  'CreateServicePortRequest',
  z.object({
    port: z
      .number({ message: 'O número da porta é obrigatório.' })
      .int('A porta deve ser um número inteiro.')
      .min(1, 'A porta mínima é 1.')
      .max(65535, 'A porta máxima é 65535.')
      .openapi({
        description: 'Número da porta (1 a 65535)',
        example: 443,
      }),

    protocol: z
      .nativeEnum(ServicePortProtocol, {
        message: 'O protocolo é obrigatório.',
      })
      .openapi({
        description: 'Protocolo de comunicação',
        example: 'HTTPS',
      }),

    machineId: z
      .string()
      .uuid({ message: 'O ID da máquina deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description: 'UUID da máquina/host em que a porta está alocada',
      }),

    serviceId: z
      .string()
      .uuid({ message: 'O ID do serviço deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description: 'UUID do serviço associado a esta porta',
      }),

    projectId: z
      .string()
      .uuid({ message: 'O ID do projeto deve ser um UUID válido.' })
      .nullable()
      .optional()
      .openapi({
        description: 'UUID do projeto associado a esta porta',
      }),

    label: z
      .string()
      .max(100, { message: 'Rótulo muito longo.' })
      .trim()
      .nullable()
      .optional()
      .openapi({
        description:
          'Identificador ou nome curto da aplicação (ex: Backend API)',
        example: 'Backend API',
      }),

    description: z
      .string()
      .max(255, { message: 'Descrição muito longa.' })
      .trim()
      .nullable()
      .optional()
      .openapi({
        description: 'Descrição ou anotações sobre a alocação da porta',
        example: 'Porta principal da API em produção',
      }),

    status: z.nativeEnum(PortStatus).default(PortStatus.ACTIVE).openapi({
      description: 'Status da alocação da porta',
      example: PortStatus.ACTIVE,
    }),

    isPublic: z.boolean().default(false).openapi({
      description: 'Indica se a porta está exposta publicamente na internet',
      example: false,
    }),
  }),
);

export const updateServicePortSchema = registry.register(
  'UpdateServicePortRequest',
  createServicePortSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const servicePortResponseSchema = registry.register(
  'ServicePortResponse',
  z.object({
    id: z.string().uuid(),
    port: z.number().int(),
    protocol: z.nativeEnum(ServicePortProtocol),
    machineId: z.string().uuid().nullable().optional(),
    serviceId: z.string().uuid().nullable().optional(),
    projectId: z.string().uuid().nullable().optional(),
    label: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    status: z.nativeEnum(PortStatus),
    isPublic: z.boolean(),
    machine: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
      })
      .nullable()
      .optional(),
    service: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
      })
      .nullable()
      .optional(),
    project: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
      })
      .nullable()
      .optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const checkPortAvailabilitySchema = registry.register(
  'CheckPortAvailabilityQuery',
  z.object({
    machineId: z.string().uuid({ message: 'O ID da máquina é obrigatório.' }),
    port: z.coerce.number().int().min(1).max(65535),
    protocol: z
      .nativeEnum(ServicePortProtocol)
      .optional()
      .default(ServicePortProtocol.TCP),
  }),
);

export const suggestFreePortsQuerySchema = registry.register(
  'SuggestFreePortsQuery',
  z.object({
    machineId: z.string().uuid().optional(),
    startPort: z.coerce
      .number()
      .int()
      .min(1)
      .max(65535)
      .optional()
      .default(3000),
    count: z.coerce.number().int().min(1).max(50).optional().default(5),
  }),
);

export const servicePortIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID da porta deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo da porta',
    }),
});
