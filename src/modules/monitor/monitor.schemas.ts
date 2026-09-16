import { ServiceStatus } from '../service/service.enums';
import { z, registry } from '../../lib/registry';

export const monitorResultSchema = registry.register(
  'MonitorResult',
  z.object({
    serviceId: z
      .string()
      .uuid({ message: 'O ID do serviço deve ser um UUID válido.' })
      .openapi({ description: 'ID do serviço testado' }),
    status: z
      .enum(ServiceStatus)
      .openapi({ description: 'Status retornado pelo ping' }),
    latency: z
      .number()
      .min(0)
      .openapi({ description: 'Latência em milissegundos' }),
  }),
);

export const processResultsSchema = registry.register(
  'ProcessResultsRequest',
  z.object({
    results: z.array(monitorResultSchema).min(1, {
      message: 'A lista de resultados não pode estar vazia.',
    }),
  }),
);

// Schemas de resposta para o Swagger
export const monitorTargetSchema = registry.register(
  'MonitorTarget',
  z.object({
    id: z.string().uuid(),
    url: z.string().url(),
  }),
);

export const monitorTargetsResponseSchema = registry.register(
  'MonitorTargetsResponse',
  z.object({
    data: z.array(monitorTargetSchema),
  }),
);
