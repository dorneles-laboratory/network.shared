import { z } from '../../lib/registry';
import {
  createServiceGroupSchema,
  updateServiceGroupSchema,
  serviceGroupResponseSchema,
  serviceGroupIdSchema,
} from './service-group.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateServiceGroupDTO = z.infer<typeof createServiceGroupSchema>;
export type UpdateServiceGroupDTO = z.infer<typeof updateServiceGroupSchema>;
export type ServiceGroupResponseDTO = z.infer<
  typeof serviceGroupResponseSchema
>;
export type ServiceGroupIdDTO = z.infer<typeof serviceGroupIdSchema>;

// Caso futuramente seja implementada paginação em Service Groups
export type PaginatedServiceGroupsDTO =
  PaginatedResultDTO<ServiceGroupResponseDTO>;
