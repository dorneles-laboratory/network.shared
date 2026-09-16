import { describe, expect, it } from 'vitest';
import { paginationSchema } from '../../src/common/common.schemas';

describe('paginationSchema Unit Tests', () => {
  it('should apply default values when no params are provided', () => {
    const validInput = {};

    const result = paginationSchema.safeParse(validInput);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.page).toStrictEqual(1);
      expect(result.data.limit).toStrictEqual(10);
    }
  });

  it('should coerce string values to numbers', () => {
    const validInput = {
      page: '2',
      limit: '20',
    };

    const result = paginationSchema.safeParse(validInput);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.page).toStrictEqual(2);
      expect(result.data.limit).toStrictEqual(20);
    }
  });

  it('should fail if page is not an integer', () => {
    const validInput = {
      page: 1.5,
    };

    const result = paginationSchema.safeParse(validInput);

    expect(result.success).toBe(false);
  });

  it('should fail if limit is less than 1', () => {
    const validInput = {
      limit: 0,
    };

    const result = paginationSchema.safeParse(validInput);

    expect(result.success).toBe(false);
  });
});
