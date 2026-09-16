import { z } from '../../lib/registry';
import { loginSchema } from './auth.schemas';

export interface TokenPayloadDTO {
  sub: string;
}

export type LoginAuthDTO = z.infer<typeof loginSchema>;
