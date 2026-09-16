import { z, registry } from '../lib/registry';

// --- Padrão RFC 7807 para Erros (Problem Details) ---
export const rfc7807ErrorSchema = registry.register(
  'ProblemDetails',
  z.object({
    type: z.string().url().optional().openapi({
      description: 'URI que identifica o tipo do erro',
      example: 'https://api.dorneles.dev/errors/validation-error',
    }),
    title: z.string().openapi({
      description: 'Um resumo curto e legível para humanos do problema',
      example: 'Erro de validação nos dados enviados.',
    }),
    status: z.number().openapi({
      description: 'O código de status HTTP correspondente',
      example: 400,
    }),
    detail: z.string().optional().openapi({
      description: 'Uma explicação específica para esta ocorrência do problema',
      example: 'O campo email não possui um formato válido.',
    }),
    instance: z.string().optional().openapi({
      description: 'URI que identifica a ocorrência específica deste problema',
      example: '/tasks/123e4567-e89b-12d3-a456-426614174000',
    }),
    errors: z
      .record(z.string(), z.array(z.string()))
      .optional()
      .openapi({
        description: 'Detalhes de validação campo a campo (opcional)',
        example: {
          dueDate: ['A data de vencimento deve estar no futuro.'],
        },
      }),
  }),
);

// --- Schema de Metadados de Paginação ---
export const paginationMetaSchema = registry.register(
  'PaginationMeta',
  z.object({
    totalItems: z.number().openapi({ example: 150 }),
    totalPages: z.number().openapi({ example: 15 }),
    currentPage: z.number().openapi({ example: 1 }),
    itemsPerPage: z.number().openapi({ example: 10 }),
  }),
);

// --- Schema de Entrada para Paginação (Query Params) ---
export const paginationSchema = registry.register(
  'PaginationQuery',
  z.object({
    page: z.coerce
      .number({ message: 'A página deve ser um número.' })
      .int('A página deve ser um número inteiro.')
      .min(1, 'A página deve ser no mínimo 1.')
      .optional()
      .default(1),

    limit: z.coerce
      .number({ message: 'O limite deve ser um número.' })
      .int('O limite deve ser um número inteiro.')
      .min(1, 'O limite deve ser no mínimo 1.')
      .optional()
      .default(10),
  }),
);

// --- Função Utilitária para Criar Respostas Paginadas ---
export function createPaginatedResponseSchema(
  schema: z.ZodTypeAny,
  schemaName: string,
) {
  return registry.register(
    schemaName,
    z.object({
      data: z.array(schema),
      meta: paginationMetaSchema,
    }),
  );
}
