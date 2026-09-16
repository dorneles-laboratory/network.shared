import { z, registry } from '../../lib/registry';
import { TimeLogNature } from './time-log.enums';

export const createTimeLogSchema = registry.register(
  'CreateTimeLogRequest',
  z.object({
    taskId: z.string().uuid().openapi({
      description: 'ID da tarefa relacionada',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    date: z.coerce.date().openapi({
      description: 'Data em que o trabalho foi realizado',
      example: '2023-10-10',
    }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato deve ser HH:MM')
      .openapi({
        description: 'Hora de início',
        example: '14:00',
      }),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato deve ser HH:MM')
      .openapi({
        description: 'Hora de fim',
        example: '16:30',
      }),
    nature: z.nativeEnum(TimeLogNature).openapi({
      description: 'Natureza da atividade',
      example: TimeLogNature.DEV,
    }),
    description: z.string().min(10).max(2000).openapi({
      description: 'Relato detalhado do que foi feito',
      example:
        'Refatoração da camada de autenticação e ajuste de tipagens no shared.',
    }),
  }),
);

// Schema para atualização
export const updateTimeLogSchema = registry.register(
  'UpdateTimeLogRequest',
  createTimeLogSchema.omit({ taskId: true }).partial(),
);

export const timeLogResponseSchema = registry.register(
  'TimeLogResponse',
  z.object({
    id: z.string().uuid(),
    taskId: z.string().uuid(),
    userId: z.string().uuid(),
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    loggedMinutes: z.number().int().default(0),
    nature: z.nativeEnum(TimeLogNature),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const paginatedTimeLogsResponseSchema = registry.register(
  'PaginatedTimeLogsResponse',
  z.object({
    data: z.array(timeLogResponseSchema),
    meta: z.object({
      totalItems: z.number().int(),
      totalPages: z.number().int(),
      currentPage: z.number().int(),
      itemsPerPage: z.number().int(),
    }),
  }),
);

export const toggleTimerResponseSchema = registry.register(
  'ToggleTimerResponse',
  z.object({
    isTimerActive: z.boolean().openapi({
      description:
        'Indica se o cronômetro passou a rodar (Play) ou pausou (Pause)',
      example: true,
    }),
  }),
);

export const pendingTimeResponseSchema = registry.register(
  'PendingTimeResponse',
  z.object({
    totalMinutes: z.number().openapi({
      description: 'Total de minutos acumulados nas sessões abertas',
      example: 120,
    }),
    firstStart: z.date().nullable().openapi({
      description: 'Data e hora do primeiro Play acionado',
    }),
    lastEnd: z.date().nullable().openapi({
      description:
        'Data e hora do último Pause acionado (ou data atual se estiver rodando)',
    }),
  }),
);
