import { describe, it, expect } from 'vitest';
import {
  createServicePortSchema,
  checkPortAvailabilitySchema,
  suggestFreePortsQuerySchema,
  ServicePortProtocol,
  PortStatus,
} from '../../../src/modules/service-port';

describe('Service Port Schemas Unit Tests', () => {
  it('should validate valid port creation with machineId and status', () => {
    const payload = {
      port: 5432,
      protocol: ServicePortProtocol.TCP,
      machineId: '123e4567-e89b-12d3-a456-426614174000',
      label: 'PostgreSQL Main DB',
      status: PortStatus.ACTIVE,
      isPublic: false,
    };

    const parsed = createServicePortSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.port).toBe(5432);
      expect(parsed.data.status).toBe('ACTIVE');
      expect(parsed.data.isPublic).toBe(false);
    }
  });

  it('should reject invalid port numbers', () => {
    const payload = {
      port: 70000, // Invalid: exceeds 65535
      protocol: ServicePortProtocol.TCP,
    };

    const parsed = createServicePortSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });

  it('should validate port check query', () => {
    const query = {
      machineId: '123e4567-e89b-12d3-a456-426614174000',
      port: '3000',
    };

    const parsed = checkPortAvailabilitySchema.safeParse(query);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.port).toBe(3000);
      expect(parsed.data.protocol).toBe('TCP');
    }
  });

  it('should parse free ports suggestion query with defaults', () => {
    const query = {};
    const parsed = suggestFreePortsQuerySchema.safeParse(query);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.startPort).toBe(3000);
      expect(parsed.data.count).toBe(5);
    }
  });
});
