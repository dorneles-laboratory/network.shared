import { z } from '../../lib/registry';
import {
  createIncidentUpdateSchema,
  updateIncidentUpdateSchema,
  incidentUpdateResponseSchema,
  incidentUpdateIdSchema,
} from './incident-update.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateIncidentUpdateDTO = z.infer<
  typeof createIncidentUpdateSchema
>;
export type UpdateIncidentUpdateDTO = z.infer<
  typeof updateIncidentUpdateSchema
>;
export type IncidentUpdateResponseDTO = z.infer<
  typeof incidentUpdateResponseSchema
>;
export type IncidentUpdateIdDTO = z.infer<typeof incidentUpdateIdSchema>;

export type PaginatedIncidentUpdatesDTO =
  PaginatedResultDTO<IncidentUpdateResponseDTO>;
