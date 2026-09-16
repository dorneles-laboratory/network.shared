export const ServiceStatus = {
  OPERATIONAL: 'OPERATIONAL',
  DEGRADED: 'DEGRADED',
  PARTIAL_OUTAGE: 'PARTIAL_OUTAGE',
  MAJOR_OUTAGE: 'MAJOR_OUTAGE',
  MAINTENANCE: 'MAINTENANCE',
} as const;

export type EnumServiceStatus =
  (typeof ServiceStatus)[keyof typeof ServiceStatus];
