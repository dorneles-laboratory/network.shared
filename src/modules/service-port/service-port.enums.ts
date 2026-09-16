export const ServicePortProtocol = {
  TCP: 'TCP',
  UDP: 'UDP',
  HTTP: 'HTTP',
  HTTPS: 'HTTPS',
} as const;

export type EnumServicePortProtocol =
  (typeof ServicePortProtocol)[keyof typeof ServicePortProtocol];

export const PortStatus = {
  ACTIVE: 'ACTIVE',
  RESERVED: 'RESERVED',
  INACTIVE: 'INACTIVE',
} as const;

export type EnumPortStatus = (typeof PortStatus)[keyof typeof PortStatus];
