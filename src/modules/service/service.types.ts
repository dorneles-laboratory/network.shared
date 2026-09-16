import { z } from '../../lib/registry';
import {
  createServiceSchema,
  updateServiceSchema,
  serviceResponseSchema,
  serviceIdSchema,
  servicePublicResponseSchema,
} from './service.schemas';

export type CreateServiceDTO = z.infer<typeof createServiceSchema>;
export type UpdateServiceDTO = z.infer<typeof updateServiceSchema>;
export type ServiceResponseDTO = z.infer<typeof serviceResponseSchema>;
export type ServicePublicResponseDTO = z.infer<
  typeof servicePublicResponseSchema
>;
export type ServiceIdDTO = z.infer<typeof serviceIdSchema>;
