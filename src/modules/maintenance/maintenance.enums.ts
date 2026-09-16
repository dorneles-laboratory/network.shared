export const MaintenanceStatus = {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const;

export type EnumMaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];
