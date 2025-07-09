import { PERMISSIONS } from "@/types/permissions";

export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

// in the future if access based control is needed, this can be used.
export const ROLES = {
  admin: [
    PERMISSIONS.UPDATE_COMMENTS,
    "view:comments",
    "create:comments",
    "delete:comments",
  ],
  moderator: ["view:comments", "create:comments", "delete:comments"],
  user: ["view:comments", "create:comments"],
} as const;

export function hasPermission(
  user: { id: string | number; role: string },
  permission: string
) {
  if (!(user.role in ROLES)) return false;
  return (ROLES[user.role as Role] as readonly string[]).includes(permission);
}
