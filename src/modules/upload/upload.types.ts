import { z } from 'zod';
import { uploadResponseSchema } from './upload.schemas';

export type UploadResponseDTO = z.infer<typeof uploadResponseSchema>;
