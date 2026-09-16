import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../../../src/modules/users/users.schemas';

describe('createUserSchema Unit Tests', () => {
  it('should validate a valid user creation successfully', () => {
    // Arrange
    const validUser = {
      name: 'test user  ',
      email: 'User@Test.com',
      password: 'Password1',
      cellphone: '1234567890  ',
      birth_date: '1990-01-01',
      address: '123 Test St  ',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // debugger
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      // check if equal and trimmed (except the password)
      expect(result.data.name).toStrictEqual(validUser.name.trim());
      expect(result.data.password).toStrictEqual(validUser.password);
      // expect(result.data.cellphone).toStrictEqual(validUser.cellphone.trim());
      // expect(result.data.address).toStrictEqual(validUser.address.trim());
      // Verifica se a string virou Date (z.coerce)
      // expect(result.data.birthDate).toBeInstanceOf(Date);
      // Verifica se o default do isActive funcionou
      expect(result.data.isActive).toBe(true);
      // Verifica se o email foi transformado para lowercase
      expect(result.data.email).toBe(validUser.email.toLowerCase());
    }
  });

  it('should validate only required fields', () => {
    // Arrange
    const validUser = {
      name: 'test user',
      email: 'user@test.com',
      password: 'Password1',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // debugger
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      // check if equal and trimmed (except the password)
      expect(result.data.name).toStrictEqual(validUser.name.trim());
      expect(result.data.password).toStrictEqual(validUser.password);
      // Verifica se o email foi transformado para lowercase
      expect(result.data.email).toBe(validUser.email.toLowerCase());
      // Verifica se o default do isActive funcionou
      expect(result.data.isActive).toBe(true);
    }
  });

  it('should fail validation when required fields are missing', () => {
    // Arrange
    const invalidUser = {};

    // Act
    const result = createUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors).toContain('O nome é obrigatório.');
      expect(errors.email?._errors).toContain('O e-mail é obrigatório.');
      expect(errors.password?._errors).toContain('A senha é obrigatória.');
    }
  });

  it('should fail validation for short name', () => {
    // Arrange
    const validUser = {
      name: 'a',
      email: 'user@test.com',
      password: 'Password1',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors).toContain('Nome muito curto.');
    }
  });

  it('should fail validation for long name', () => {
    // Arrange
    const validUser = {
      name: 'a'.padEnd(121, 'a'),
      email: 'user@test.com',
      password: 'Password1',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.name?._errors).toContain('Nome muito longo.');
    }
  });

  it('should fail validation for invalid email format', () => {
    // Arrange
    const invalidUser = {
      name: 'Valid Name',
      email: 'invalid-email',
      password: 'Password1',
    };

    // Act
    const result = createUserSchema.safeParse(invalidUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.email?._errors).toContain('Formato de e-mail inválido.');
    }
  });

  it('should fail validation for short password', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa1',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

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
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa1'.padEnd(65, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

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
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: '1a'.padEnd(8, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

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
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: '1A'.padEnd(8, 'A'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

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
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: 'Aa'.padEnd(8, 'a'),
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.format();
      expect(errors.password?._errors).toContain('Senha deve conter número.');
    }
  });

  it('should validate birth_date as optional and valid date', () => {
    // Arrange
    const validUser = {
      name: 'user test',
      email: 'user@test.com',
      password: '1Aa'.padEnd(8, 'a'),
      birth_date: '2006-02-04',
    };

    // Act
    const result = createUserSchema.safeParse(validUser);

    // Assert
    expect(result.success).toBe(true);

    if (result.success) {
      // expect(result.data.birth_date).toBeInstanceOf(Date);
    }
  });

  //   it('should fail validation for invalid birth_date', () => {
  //     // Arrange
  //     const validUser = {
  //       name: 'user test',
  //       email: 'user@test.com',
  //       password: '1Aa'.padEnd(8, 'a'),
  //       birth_date: 'not-a-date',
  //     };

  //     // Act
  //     const result = createUserSchema.safeParse(validUser);

  //     // Assert
  //     expect(result.success).toBe(false);

  //     if (!result.success) {
  //       const errors = result.error.format();
  //       expect(errors.birth_date?._errors).toContain(
  //         'A data de nascimento deve ser válida.',
  //       );
  //     }
  //   });
});
