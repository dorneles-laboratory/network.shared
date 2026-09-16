import { z } from '../../lib/registry';
import {
  createTimeLogSchema,
  paginatedTimeLogsResponseSchema,
  timeLogResponseSchema,
  updateTimeLogSchema,
} from './time-log.schemas';

export type CreateTimeLogDTO = z.infer<typeof createTimeLogSchema>;
export type TimeLogResponseDTO = z.infer<typeof timeLogResponseSchema>;
export type UpdateTimeLogDTO = z.infer<typeof updateTimeLogSchema>;
export type PaginatedTimeLogsDTO = z.infer<
  typeof paginatedTimeLogsResponseSchema
>;
