export const IncidentStatus = {
  INVESTIGATING: 'INVESTIGATING',
  IDENTIFIED: 'IDENTIFIED',
  MONITORING: 'MONITORING',
  RESOLVED: 'RESOLVED',
} as const;

export type EnumIncidentStatus =
  (typeof IncidentStatus)[keyof typeof IncidentStatus];

export const IncidentSeverity = {
  DEGRADED: 'DEGRADED',
  PARTIAL_OUTAGE: 'PARTIAL_OUTAGE',
  MAJOR_OUTAGE: 'MAJOR_OUTAGE',
} as const;

export type EnumIncidentSeverity =
  (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export const IncidentType = {
  OUTAGE: 'OUTAGE',
  HTTP_ERROR: 'HTTP_ERROR',
  PERFORMANCE: 'PERFORMANCE',
  SSL_CERTIFICATE: 'SSL_CERTIFICATE',
  MAINTENANCE: 'MAINTENANCE',
  OTHER: 'OTHER',
} as const;

export type EnumIncidentType = (typeof IncidentType)[keyof typeof IncidentType];
