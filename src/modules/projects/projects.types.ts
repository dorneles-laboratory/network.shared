import { z } from '../../lib/registry';
import {
  createProjectSchema,
  updateProjectSchema,
  projectResponseSchema,
  projectIdSchema,
} from './projects.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
export type ProjectResponseDTO = z.infer<typeof projectResponseSchema>;
export type ProjectIdDTO = z.infer<typeof projectIdSchema>;

export type PaginatedProjectsDTO = PaginatedResultDTO<ProjectResponseDTO>;
