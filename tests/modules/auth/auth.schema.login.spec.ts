import { describe, it, expect } from 'vitest';
import { loginSchema } from '../../../src/modules/auth/auth.schemas';

describe('loginSchema Unit Tests', () => {
  it('should pass with valid email and password', () => {
    const validAuth = {
      email: 'User@test.com',
      password: 'Password1',
    };

    const result = loginSchema.safeParse(validAuth);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toStrictEqual(validAuth.email.toLowerCase());
      expect(result.data.password).toStrictEqual(validAuth.password);
    }
  });

  it('should fail validation when required fields are missing', () => {
    const invalidAuth = {};

    const result = loginSchema.safeParse(invalidAuth);

    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.email?._errors).toContain('O e-mail é obrigatório.');
      expect(errors.password?._errors).toContain('A senha é obrigatória.');
    }
  });

  it('should fail validation for invalid email format', () => {
    // Arrange
    const invalidAuth = {
      email: 'invalid-email',
      password: 'Password1',
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.email?._errors).toContain('Formato de e-mail inválido.');
    }
  });

  it('should fail validation for short password', () => {
    // Arrange
    const invalidAuth = {
      email: 'user@test.com',
      password: 'Aa1',
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain(
        'Senha deve ter no mínimo 8 caracteres.',
      );
    }
  });

  it('should fail validation for long password', () => {
    // Arrange
    const invalidAuth = {
      email: 'user@test.com',
      password: 'Aa1'.padEnd(65, 'a'),
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain(
        'Senha deve ter no máximo 64 caracteres.',
      );
    }
  });

  it('should fail validation for password missing uppercase letter', () => {
    // Arrange
    const invalidAuth = {
      email: 'user@test.com',
      password: '1a'.padEnd(8, 'a'),
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain(
        'Senha deve conter letra maiúscula.',
      );
    }
  });

  it('should fail validation for password missing lowercase letter', () => {
    // Arrange
    const invalidAuth = {
      email: 'user@test.com',
      password: '1A'.padEnd(8, 'A'),
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain(
        'Senha deve conter letra minúscula.',
      );
    }
  });

  it('should fail validation for password missing number', () => {
    // Arrange
    const invalidAuth = {
      email: 'user@test.com',
      password: 'Aa'.padEnd(8, 'a'),
    };

    // Act
    const result = loginSchema.safeParse(invalidAuth);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain('Senha deve conter número.');
    }
  });
});
