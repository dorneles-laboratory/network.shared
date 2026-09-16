import { z } from '../../lib/registry';
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  maintenanceResponseSchema,
  maintenancePublicResponseSchema,
  maintenanceIdSchema,
} from './maintenance.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateMaintenanceDTO = z.infer<typeof createMaintenanceSchema>;
export type UpdateMaintenanceDTO = z.infer<typeof updateMaintenanceSchema>;
export type MaintenanceResponseDTO = z.infer<typeof maintenanceResponseSchema>;
export type MaintenancePublicResponseDTO = z.infer<
  typeof maintenancePublicResponseSchema
>;
export type MaintenanceIdDTO = z.infer<typeof maintenanceIdSchema>;

export type PaginatedMaintenancesDTO =
  PaginatedResultDTO<MaintenanceResponseDTO>;
