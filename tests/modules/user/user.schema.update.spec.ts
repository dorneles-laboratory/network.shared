import { describe, expect, it } from 'vitest';
import { updateUserSchema } from '../../../src/modules/users/users.schemas';

describe('updateUserSchema Unit Tests', () => {
  it('should fail when no fields are provided', () => {
    // Arrange
    const invalidUser = {};

    // Act
    const result = updateUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors._errors).toContain(
        'Pelo menos um campo deve ser fornecido para atualização.',
      );
    }
  });

  it('should allow partial update', () => {
    // Arrange
    const validUser = {
      name: 'user test ',
    };

    // Act
    const result = updateUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);
  });

  it('should allow updating isActive', () => {
    // Arrange
    const validUser = {
      isActive: false,
    };

    // Act
    const result = updateUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.isActive).toBe(false);
    }
  });

  it('should fail validation password', () => {
    // Arrange
    const invalidUser = {
      password: '',
    };

    // Act
    const result = updateUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain(
        'Senha deve ter no mínimo 8 caracteres.',
      );
      expect(errors.password?._errors).toContain(
        'Senha deve conter letra maiúscula.',
      );
      expect(errors.password?._errors).toContain(
        'Senha deve conter letra minúscula.',
      );
      expect(errors.password?._errors).toContain('Senha deve conter número.');
    }
  });

  it('should allow updating multiple fields', () => {
    // Arrange
    const invalidUser = {
      name: 'user test',
      email: 'user@test.com',
      birth_date: '03-02-2026',
    };

    // Act
    const result = updateUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(true);
  });
});
