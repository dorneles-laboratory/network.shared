import { z } from '../../lib/registry';
import {
  createMachineSchema,
  updateMachineSchema,
  machineResponseSchema,
  machineDetailResponseSchema,
  machineHeartbeatSchema,
  machineIdSchema,
} from './machine.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateMachineDTO = z.infer<typeof createMachineSchema>;
export type UpdateMachineDTO = z.infer<typeof updateMachineSchema>;
export type MachineHeartbeatDTO = z.infer<typeof machineHeartbeatSchema>;
export type MachineResponseDTO = z.infer<typeof machineResponseSchema>;
export type MachineDetailResponseDTO = z.infer<
  typeof machineDetailResponseSchema
>;
export type MachineIdDTO = z.infer<typeof machineIdSchema>;

export type PaginatedMachinesDTO = PaginatedResultDTO<MachineResponseDTO>;
