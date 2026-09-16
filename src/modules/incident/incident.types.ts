import { z } from '../../lib/registry';
import {
  createIncidentSchema,
  updateIncidentSchema,
  incidentResponseSchema,
  incidentIdSchema,
  incidentPublicResponseSchema,
} from './incident.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateIncidentDTO = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentDTO = z.infer<typeof updateIncidentSchema>;
export type IncidentResponseDTO = z.infer<typeof incidentResponseSchema>;
export type IncidentPublicResponseDTO = z.infer<
  typeof incidentPublicResponseSchema
>;
export type IncidentIdDTO = z.infer<typeof incidentIdSchema>;

export type PaginatedIncidentsDTO = PaginatedResultDTO<IncidentResponseDTO>;
