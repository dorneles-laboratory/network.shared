import { z } from '../../lib/registry';
import {
  monitorResultSchema,
  processResultsSchema,
  monitorTargetSchema,
} from './monitor.schemas';

export type MonitorResultDTO = z.infer<typeof monitorResultSchema>;
export type ProcessResultsDTO = z.infer<typeof processResultsSchema>;
export type MonitorTargetDTO = z.infer<typeof monitorTargetSchema>;
