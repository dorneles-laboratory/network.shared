import { z, registry } from '../../lib/registry';

export const loginSchema = registry.register(
  'LoginRequest',
  z.object({
    email: z
      .email({
        error: ({ input }) =>
          input === undefined
            ? 'O e-mail é obrigatório.'
            : 'Formato de e-mail inválido.',
      })
      .min(1, { message: 'O e-mail é obrigatório.' })
      .transform((value) => value.toLowerCase())
      .openapi({
        description: 'E-mail do usuário',
        example: 'teste@teste.com.br',
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
  }),
);

export const refreshTokenSchema = registry.register(
  'RefreshTokenRequest',
  z.object({
    refreshToken: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O token de atualização é obrigatório.'
            : 'O token de atualização deve ser um texto.',
      })
      .openapi({
        description: 'Token de atualização obtido no login',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      }),
  }),
);
