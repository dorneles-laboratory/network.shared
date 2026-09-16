import { z, registry } from '../../lib/registry';

export const telegramTestSchema = registry.register(
  'TelegramTestRequest',
  z.object({
    botId: z.string().uuid().optional().openapi({
      description: 'ID do bot cadastrado para teste (opcional)',
    }),
    customMessage: z
      .string()
      .max(500, { message: 'Mensagem muito longa.' })
      .optional()
      .openapi({
        description: 'Mensagem personalizada opcional para o teste',
        example: 'Mensagem de teste disparada pelo painel administrativo',
      }),
    botToken: z.string().trim().optional().openapi({
      description: 'Token opcional do bot para testar antes de salvar',
    }),
    chatId: z.string().trim().optional().openapi({
      description: 'Chat ID opcional para testar antes de salvar',
    }),
  }),
);

export const telegramTestResponseSchema = registry.register(
  'TelegramTestResponse',
  z.object({
    success: z.boolean(),
    message: z.string(),
    chatId: z.string().optional(),
  }),
);

export const updateTelegramConfigSchema = registry.register(
  'UpdateTelegramConfigRequest',
  z.object({
    botToken: z.string().trim().nullable().optional().openapi({
      description:
        'Token de autenticação do Bot do Telegram (obtido no @BotFather)',
      example: '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ',
    }),
    chatId: z.string().trim().nullable().optional().openapi({
      description: 'ID do Chat, Grupo ou Canal de destino no Telegram',
      example: '-1001234567890',
    }),
    enabled: z.boolean().default(false).openapi({
      description:
        'Habilitar ou desabilitar o envio automático de alertas via Telegram',
      example: true,
    }),
    alertsOnMachineHighLoad: z.boolean().default(true).openapi({
      description:
        'Enviar alerta quando máquina estiver com alta carga (CPU/RAM/Disco)',
      example: true,
    }),
    alertsOnServiceDown: z.boolean().default(true).openapi({
      description: 'Enviar alerta quando um serviço monitorado cair ou falhar',
      example: true,
    }),
    cpuThreshold: z.number().min(10).max(100).default(85).openapi({
      description: 'Limite percentual de CPU para disparo de alerta (10-100%)',
      example: 85,
    }),
    ramThreshold: z.number().min(10).max(100).default(85).openapi({
      description:
        'Limite percentual de Memória RAM para disparo de alerta (10-100%)',
      example: 85,
    }),
    diskThreshold: z.number().min(10).max(100).default(90).openapi({
      description:
        'Limite percentual de Disco para disparo de alerta (10-100%)',
      example: 90,
    }),
  }),
);

export const telegramConfigResponseSchema = registry.register(
  'TelegramConfigResponse',
  z.object({
    id: z.string().uuid().optional(),
    botToken: z.string().nullable().optional(),
    chatId: z.string().nullable().optional(),
    enabled: z.boolean(),
    alertsOnMachineHighLoad: z.boolean(),
    alertsOnServiceDown: z.boolean(),
    cpuThreshold: z.number(),
    ramThreshold: z.number(),
    diskThreshold: z.number(),
    updatedAt: z.date().optional(),
  }),
);

// =============================================================
// SCHEMAS PARA N BOTS DO TELEGRAM
// =============================================================

const baseTelegramBotFields = {
  name: z
    .string({
      error: ({ input }) =>
        input === undefined
          ? 'O nome do bot é obrigatório.'
          : 'O nome do bot deve ser um texto.',
    })
    .min(2, { message: 'Nome do bot muito curto (mínimo 2 caracteres).' })
    .max(100, { message: 'Nome do bot muito longo (máximo 100 caracteres).' })
    .trim()
    .openapi({
      description: 'Nome de identificação do bot ou função',
      example: 'Bot Alertas DevOps',
    }),

  description: z
    .string()
    .max(1000, { message: 'Descrição muito longa.' })
    .trim()
    .nullable()
    .optional()
    .openapi({
      description: 'Finalidade ou anotações sobre o bot',
      example: 'Notifica a equipe de infraestrutura sobre quedas e sobrecargas',
    }),

  botToken: z
    .string({
      error: ({ input }) =>
        input === undefined
          ? 'O token do bot é obrigatório.'
          : 'O token deve ser um texto.',
    })
    .min(5, { message: 'Token do bot inválido.' })
    .trim()
    .openapi({
      description: 'Token HTTP da API do Telegram (obtido com @BotFather)',
      example: '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ',
    }),

  chatId: z
    .string({
      error: ({ input }) =>
        input === undefined
          ? 'O Chat ID é obrigatório.'
          : 'O Chat ID deve ser um texto.',
    })
    .min(1, { message: 'Chat ID inválido.' })
    .trim()
    .openapi({
      description: 'ID do Chat, Grupo ou Canal de destino no Telegram',
      example: '-1001234567890',
    }),

  enabled: z.boolean().optional().openapi({
    description: 'Status ativo/inativo do bot',
    example: true,
  }),

  alertsOnServiceDown: z.boolean().optional().openapi({
    description: 'Receber alertas de queda e restauração de serviços',
    example: true,
  }),

  alertsOnMachineHighLoad: z.boolean().optional().openapi({
    description: 'Receber alertas de alta carga e perda de sinal de máquinas',
    example: true,
  }),

  alertsOnMaintenance: z.boolean().optional().openapi({
    description: 'Receber alertas de início e conclusão de manutenções',
    example: true,
  }),

  cpuThreshold: z.number().min(10).max(100).optional().openapi({
    description: 'Limiar percentual de CPU (10-100%)',
    example: 85,
  }),

  ramThreshold: z.number().min(10).max(100).optional().openapi({
    description: 'Limiar percentual de RAM (10-100%)',
    example: 85,
  }),

  diskThreshold: z.number().min(10).max(100).optional().openapi({
    description: 'Limiar percentual de Disco (10-100%)',
    example: 90,
  }),

  allServices: z.boolean().optional().openapi({
    description: 'Se true, monitora todos os serviços do sistema',
    example: true,
  }),

  serviceIds: z.array(z.string().uuid()).optional().openapi({
    description:
      'Lista de IDs de serviços específicos monitorados (quando allServices é false)',
  }),

  allMachines: z.boolean().optional().openapi({
    description: 'Se true, monitora todas as máquinas do sistema',
    example: true,
  }),

  machineIds: z.array(z.string().uuid()).optional().openapi({
    description:
      'Lista de IDs de máquinas específicas monitoradas (quando allMachines é false)',
  }),
};

export const baseTelegramBotSchema = z.object(baseTelegramBotFields);

export const createTelegramBotSchema = registry.register(
  'CreateTelegramBotRequest',
  baseTelegramBotSchema.extend({
    name: z
      .string()
      .min(2)
      .max(100)
      .trim()
      .default('Bot do Telegram')
      .optional(),
    enabled: z.boolean().default(true).optional(),
    alertsOnServiceDown: z.boolean().default(true).optional(),
    alertsOnMachineHighLoad: z.boolean().default(true).optional(),
    alertsOnMaintenance: z.boolean().default(true).optional(),
    cpuThreshold: z.number().min(10).max(100).default(85).optional(),
    ramThreshold: z.number().min(10).max(100).default(85).optional(),
    diskThreshold: z.number().min(10).max(100).default(90).optional(),
    allServices: z.boolean().default(true).optional(),
    serviceIds: z.array(z.string().uuid()).default([]).optional(),
    allMachines: z.boolean().default(true).optional(),
    machineIds: z.array(z.string().uuid()).default([]).optional(),
  }),
);

export const updateTelegramBotSchema = registry.register(
  'UpdateTelegramBotRequest',
  baseTelegramBotSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const telegramBotIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID do bot deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
      description: 'Identificador único do bot do Telegram',
    }),
});

export const telegramBotResponseSchema = registry.register(
  'TelegramBotResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable().optional(),
    botToken: z.string(),
    chatId: z.string(),
    enabled: z.boolean(),
    alertsOnServiceDown: z.boolean(),
    alertsOnMachineHighLoad: z.boolean(),
    alertsOnMaintenance: z.boolean(),
    cpuThreshold: z.number(),
    ramThreshold: z.number(),
    diskThreshold: z.number(),
    allServices: z.boolean(),
    serviceIds: z.array(z.string().uuid()),
    services: z
      .array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          slug: z.string(),
        }),
      )
      .optional(),
    allMachines: z.boolean(),
    machineIds: z.array(z.string().uuid()),
    machines: z
      .array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          slug: z.string(),
        }),
      )
      .optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const telegramBotListResponseSchema = registry.register(
  'TelegramBotListResponse',
  z.array(telegramBotResponseSchema),
);
