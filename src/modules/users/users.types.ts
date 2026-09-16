import { z } from '../../lib/registry';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  userResponseSchema,
} from './users.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UserIdDTO = z.infer<typeof userIdSchema>;
export type UserResponseDTO = z.infer<typeof userResponseSchema>;
export type PaginatedUsersDTO = PaginatedResultDTO<UserResponseDTO>;
