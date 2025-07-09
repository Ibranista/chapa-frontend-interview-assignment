// Permission string constants for RBAC

export const PERMISSIONS = {
  UPDATE_COMMENTS: "update:comments",
  // Add more permissions here as needed
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[PermissionKey]; 