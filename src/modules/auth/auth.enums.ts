/**
 * Enums global object, exports all domains used within the system.
 */
export const AuthEnums = {
  LoginStatus: {
    Pending: 'PENDING',
    Authenticated: 'AUTHENTICATED',
    Unauthenticated: 'UNAUTHENTICATED',
  } as const,
};

// Export the types to control values.
export type EnumLoginStatus =
  (typeof AuthEnums.LoginStatus)[keyof typeof AuthEnums.LoginStatus];
