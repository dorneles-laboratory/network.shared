import { z } from '../lib/registry';
import {
  rfc7807ErrorSchema,
  paginationMetaSchema,
  paginationSchema,
} from './common.schemas';

// --- Tipagens de Erro ---
export type ProblemDetailsDTO = z.infer<typeof rfc7807ErrorSchema>;

// --- Tipagens de Paginação ---
export type PaginationMetaDTO = z.infer<typeof paginationMetaSchema>;
export type PaginationQueryDTO = z.infer<typeof paginationSchema>;

// Tipo genérico para uso nos Services e Controllers
// Exemplo de uso: PaginatedResultDTO<TaskResponseDTO>
export interface PaginatedResultDTO<T> {
  data: T[];
  meta: PaginationMetaDTO;
}
