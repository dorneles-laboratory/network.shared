import { describe, it, expect } from 'vitest';
import { refreshTokenSchema } from '../../../src/modules/auth/auth.schemas';

describe('refreshTokenSchema Unit Tests', () => {
  it('should pass with valid refresh token', () => {
    const validToken = {
      refreshToken: 'some-valid-refresh-token',
    };

    const result = refreshTokenSchema.safeParse(validToken);

    expect(result.success).toBe(true);
  });

  it('should fail validation when refresh token is missing', () => {
    const invalidToken = {};

    const result = refreshTokenSchema.safeParse(invalidToken);

    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.refreshToken?._errors).toContain(
        'O token de atualização é obrigatório.',
      );
    }
  });
});
