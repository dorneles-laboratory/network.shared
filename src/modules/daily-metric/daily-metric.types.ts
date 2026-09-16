import { z } from '../../lib/registry';
import {
  createDailyMetricSchema,
  updateDailyMetricSchema,
  dailyMetricResponseSchema,
  dailyMetricIdSchema,
} from './daily-metric.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateDailyMetricDTO = z.infer<typeof createDailyMetricSchema>;
export type UpdateDailyMetricDTO = z.infer<typeof updateDailyMetricSchema>;
export type DailyMetricResponseDTO = z.infer<typeof dailyMetricResponseSchema>;
export type DailyMetricIdDTO = z.infer<typeof dailyMetricIdSchema>;

export type PaginatedDailyMetricsDTO =
  PaginatedResultDTO<DailyMetricResponseDTO>;
