import { z } from 'zod';
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

// 1. Estende o Zod com os métodos do OpenAPI (.openapi)
extendZodWithOpenApi(z);

// 2. Cria a instância que vai armazenar os paths e schemas
export const registry = new OpenAPIRegistry();

// 3. (Opcional, mas recomendado) Reexporta o 'z' já estendido para ser usado nos schemas
export { z, OpenApiGeneratorV3 };
