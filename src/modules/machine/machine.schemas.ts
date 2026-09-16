import { z, registry } from '../../lib/registry';

const baseMachineFields = {
  name: z
    .string({
      error: ({ input }) =>
        input === undefined
          ? 'O nome da máquina é obrigatório.'
          : 'O nome da máquina deve ser um texto.',
    })
    .min(2, { message: 'Nome da máquina muito curto.' })
    .max(100, { message: 'Nome da máquina muito longo.' })
    .trim()
    .openapi({
      description: 'Nome de exibição da máquina',
      example: 'Server Prod 01',
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
      example: 'server-prod-01',
    }),

  os: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'Ubuntu 24.04 LTS' }),
  cpu: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'Intel Core i7-12700H' }),
  ramTotal: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: '32 GB DDR5' }),
  localIp: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: '192.168.0.10' }),
  publicIp: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: '200.181.10.15' }),

  agentToken: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'hlth_agt_9b7c2a1e84' }),
  diskTotal: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: '512 GB SSD NVMe' }),
  ramUsagePercent: z.number().nullable().optional(),
  cpuUsagePercent: z.number().nullable().optional(),
  diskUsagePercent: z.number().nullable().optional(),
  uptimeSeconds: z.number().nullable().optional(),
  lastHeartbeat: z.coerce.date().nullable().optional(),
  lastHeartbeatInterval: z.number().int().nullable().optional(),

  description: z
    .string()
    .max(1000, { message: 'Descrição muito longa.' })
    .trim()
    .nullable()
    .optional()
    .openapi({
      description: 'Descrição detalhada ou anotações sobre a máquina',
    }),

  heartbeatInterval: z
    .number()
    .int()
    .min(5, { message: 'Intervalo mínimo de 5 segundos.' })
    .max(3600, { message: 'Intervalo máximo de 3600 segundos (1 hora).' })
    .optional()
    .openapi({
      description: 'Intervalo de coleta de telemetria do agente em segundos',
      example: 60,
    }),

  online: z.boolean().optional().openapi({
    description: 'Status atual da máquina (Online/Offline)',
    example: true,
  }),
};

export const baseMachineSchema = z.object(baseMachineFields);

export const createMachineSchema = registry.register(
  'CreateMachineRequest',
  baseMachineSchema.extend({
    heartbeatInterval: z
      .number()
      .int()
      .min(5, { message: 'Intervalo mínimo de 5 segundos.' })
      .max(3600, { message: 'Intervalo máximo de 3600 segundos (1 hora).' })
      .default(60)
      .optional(),
    online: z.boolean().default(false).optional(),
  }),
);

export const updateMachineSchema = registry.register(
  'UpdateMachineRequest',
  baseMachineSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualização.',
  }),
);

// Schema de Heartbeat do Agente
export const machineHeartbeatSchema = registry.register(
  'MachineHeartbeatRequest',
  z.object({
    os: z.string().optional(),
    cpu: z.string().optional(),
    ramTotal: z.string().optional(),
    diskTotal: z.string().optional(),
    ramUsagePercent: z.number().optional(),
    cpuUsagePercent: z.number().optional(),
    diskUsagePercent: z.number().optional(),
    uptimeSeconds: z.number().optional(),
    localIp: z.string().optional(),
    publicIp: z.string().optional(),
  }),
);

// Schema de Resposta
export const machineResponseSchema = registry.register(
  'MachineResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    agentToken: z.string().nullable().optional(),
    os: z.string().nullable(),
    cpu: z.string().nullable(),
    ramTotal: z.string().nullable(),
    diskTotal: z.string().nullable().optional(),
    ramUsagePercent: z.number().nullable().optional(),
    cpuUsagePercent: z.number().nullable().optional(),
    diskUsagePercent: z.number().nullable().optional(),
    uptimeSeconds: z.number().nullable().optional(),
    lastHeartbeat: z.date().nullable().optional(),
    lastHeartbeatInterval: z.number().int().nullable().optional(),
    localIp: z.string().nullable(),
    publicIp: z.string().nullable(),
    description: z.string().nullable(),
    online: z.boolean(),
    heartbeatInterval: z.number().int().default(60).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const machineDetailResponseSchema = registry.register(
  'MachineDetailResponse',
  machineResponseSchema.extend({
    services: z
      .array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          slug: z.string(),
          url: z.string(),
          status: z.string(),
          uptime30d: z.number(),
          avgResponseMs: z.number(),
          ports: z
            .array(
              z.object({
                id: z.string().uuid(),
                port: z.number(),
                protocol: z.string(),
                description: z.string().nullable().optional(),
                status: z.string().optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
    ports: z
      .array(
        z.object({
          id: z.string().uuid(),
          port: z.number(),
          protocol: z.string(),
          label: z.string().nullable().optional(),
          description: z.string().nullable().optional(),
          status: z.string(),
          isPublic: z.boolean(),
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
        }),
      )
      .optional(),
  }),
);

export const machineIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O ID é obrigatório.'
          : 'O ID da máquina deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo da máquina',
    }),
});
