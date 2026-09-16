import { z, registry } from '../../lib/registry';

export const createUserSchema = registry.register(
  'CreateUserRequest',
  z.object({
    name: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O nome é obrigatório.'
            : 'O nome deve ser um texto.',
      })
      .min(2, { message: 'Nome muito curto.' })
      .max(120, { message: 'Nome muito longo.' })
      .trim()
      .openapi({
        description: 'Nome completo do usuário',
        example: 'Usuário de Teste',
      }),

    email: z
      .email({
        error: ({ input }) =>
          input === undefined
            ? 'O e-mail é obrigatório.'
            : 'Formato de e-mail inválido.',
      })
      .transform((v) => v.toLowerCase())
      .openapi({
        description: 'E-mail exclusivo do usuário para login',
        example: 'test@example.com',
      }),

    password: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'A senha é obrigatória.'
            : 'A senha deve ser um texto.',
      })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
      .max(64, { message: 'Senha deve ter no máximo 64 caracteres.' })
      .regex(/[A-Z]/, { message: 'Senha deve conter letra maiúscula.' })
      .regex(/[a-z]/, { message: 'Senha deve conter letra minúscula.' })
      .regex(/[0-9]/, { message: 'Senha deve conter número.' })
      .openapi({
        description: 'Senha do usuário com critérios de segurança',
        example: 'Senha@123',
      }),

    // cellphone: z.string().trim().optional().openapi({
    //   description: 'Número de celular do usuário',
    //   example: '(55) 99999-9999',
    // }),

    // birthDate: z.coerce
    //   .date({
    //     message: 'A data de nascimento deve ser válida.',
    //   })
    //   .optional()
    //   .openapi({
    //     description: 'Data de nascimento do usuário (YYYY-MM-DD)',
    //     example: '1990-01-01',
    //   }),

    // address: z.string().trim().optional().openapi({
    //   description: 'Endereço do usuário',
    //   example: 'Rua Exemplo, 123 - Cidade/UF',
    // }),

    isActive: z.boolean().default(true).optional(),
  }),
);

export const updateUserSchema = createUserSchema
  .partial()
  .omit({ password: true })
  .extend({
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
      .max(64, { message: 'Senha deve ter no máximo 64 caracteres.' })
      .regex(/[A-Z]/, { message: 'Senha deve conter letra maiúscula.' })
      .regex(/[a-z]/, { message: 'Senha deve conter letra minúscula.' })
      .regex(/[0-9]/, { message: 'Senha deve conter número.' })
      .optional()
      .openapi({
        description:
          'Nova senha do usuário (opcional, com critérios de segurança)',
        example: 'NovaSenha@123',
      }),

    imageUrl: z.string().url().optional().openapi({
      description: 'URL da foto de perfil do usuário',
      example: 'http://localhost:9009/network-media/avatar.png',
    }),

    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualização.',
  });

// O Schema de Resposta
export const userResponseSchema = registry.register(
  'UserResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    imageUrl: z.string().nullable().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

export const userIdSchema = z.object({
  id: z
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O Id é obrigatório.'
          : 'O ID do usuário deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo do usuário',
      example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
    }),
});
