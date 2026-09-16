import { z, registry } from '../../lib/registry';
import { ProjectStatus, ProjectPriority } from './projects.enums';

export const createProjectSchema = registry.register(
  'CreateProjectRequest',
  z.object({
    name: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O nome do projeto é obrigatório.'
            : 'O nome do projeto deve ser um texto.',
      })
      .min(3, { message: 'Nome do projeto muito curto.' })
      .max(120, { message: 'Nome do projeto muito longo.' })
      .trim()
      .openapi({
        description: 'Nome do projeto',
        example: 'Network Traffic Analyzer',
      }),

    // description: z
    //   .string()
    //   .max(2000, { message: 'Descrição muito longa.' })
    //   .trim()
    //   .optional()
    //   .openapi({
    //     description: 'Descrição detalhada do projeto e seus objetivos',
    //   }),

    // status: z.nativeEnum(ProjectStatus).default(ProjectStatus.Draft).openapi({
    //   description: 'Status inicial do projeto',
    //   example: 'draft',
    // }),

    // priority: z
    //   .nativeEnum(ProjectPriority)
    //   .default(ProjectPriority.Medium)
    //   .openapi({
    //     description: 'Prioridade estratégica do projeto',
    //     example: 'medium',
    //   }),

    // startDate: z.coerce.date().optional().openapi({
    //   description: 'Data de início oficial do projeto',
    // }),

    // endDate: z.coerce.date().optional().openapi({
    //   description: 'Data de término estimada ou prazo final',
    // }),

    // managerId: z
    //   .string()
    //   .uuid({ message: 'O ID do gerente deve ser um UUID válido.' })
    //   .optional()
    //   .openapi({
    //     description:
    //       'UUID do usuário responsável pelo gerenciamento do projeto',
    //   }),
  }),
);

export const updateProjectSchema = registry.register(
  'UpdateProjectRequest',
  createProjectSchema
    // .extend({
    //   memberIds: z
    //     .array(z.string().uuid())
    //     .optional()
    //     .openapi({
    //       description: 'Membros do projeto (IDs de usuários)',
    //       example: [
    //         '123e4567-e89b-12d3-a456-426614174000',
    //         '123e4567-e89b-12d3-a456-426614174001',
    //       ],
    //     }),
    // })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

// O Schema de Resposta
export const projectResponseSchema = registry.register(
  'ProjectResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.nativeEnum(ProjectStatus),
    priority: z.nativeEnum(ProjectPriority),
    startDate: z.date().nullable(),
    // endDate: z.date().nullable(),
    // managerId: z.string().uuid().nullable(),
    // memberIds: z.array(z.string().uuid()).nullable(),
    // createdById: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const projectIdSchema = z.object({
  id: z
    .string()
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O Id é obrigatório.'
          : 'O ID do projeto deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo do projeto',
    }),
});
