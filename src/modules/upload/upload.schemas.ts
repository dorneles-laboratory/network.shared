import { z, registry } from '../../lib/registry';

export const uploadResponseSchema = registry.register(
  'UploadResponse',
  z.object({
    url: z.string().openapi({
      description: 'URL pública estática do arquivo salvo no servidor ou MinIO',
      example: 'http://localhost:9009/network-media/a1b2c3d4e5f6g7h8.jpg',
    }),
  }),
);
