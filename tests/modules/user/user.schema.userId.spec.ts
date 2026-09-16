import { describe, expect, it } from 'vitest';
import { userIdSchema } from '../../../src/modules/users/users.schemas';

describe('userIdSchema Unit Tests', () => {
  it('should accept a valid UUID', () => {
    // Arrange
    const validUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
    };

    // Act
    const result = userIdSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toStrictEqual(validUser.id);
    }
  });

  it('should fail with invalid UUID', () => {
    // Arrange
    const invalidUser = {
      id: 'teste',
    };

    // Act
    const result = userIdSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.id?._errors).toContain(
        'O ID do usuário deve ser um UUID válido.',
      );
    }
  });

  it('should fail if id is missing', () => {
    // Arrange
    const invalidUser = {};

    // Act
    const result = userIdSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.id?._errors).toContain('O Id é obrigatório.');
    }
  });
});
