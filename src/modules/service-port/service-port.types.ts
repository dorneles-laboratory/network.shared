import { z } from '../../lib/registry';
import {
  createServicePortSchema,
  updateServicePortSchema,
  servicePortResponseSchema,
  servicePortIdSchema,
  checkPortAvailabilitySchema,
  suggestFreePortsQuerySchema,
} from './service-port.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateServicePortDTO = z.infer<typeof createServicePortSchema>;
export type UpdateServicePortDTO = z.infer<typeof updateServicePortSchema>;
export type ServicePortResponseDTO = z.infer<typeof servicePortResponseSchema>;
export type ServicePortIdDTO = z.infer<typeof servicePortIdSchema>;
export type CheckPortAvailabilityDTO = z.infer<
  typeof checkPortAvailabilitySchema
>;
export type SuggestFreePortsDTO = z.infer<typeof suggestFreePortsQuerySchema>;

export type PaginatedServicePortsDTO =
  PaginatedResultDTO<ServicePortResponseDTO>;
