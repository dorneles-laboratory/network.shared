export const TimeLogNature = {
  DEV: 'DEV',
  MEETING: 'MEETING',
  TESTING: 'TESTING',
  DOCUMENTATION: 'DOCUMENTATION',
  CODE_REVIEW: 'CODE_REVIEW',
  OTHER: 'OTHER',
} as const;

export type EnumTimeLogNature =
  (typeof TimeLogNature)[keyof typeof TimeLogNature];
