export type Role = "owner" | "staff" | "client"

export type Permission =
  | "settings:read"
  | "projects:read"
  | "projects:write"

export interface User {
  id: string
  role: Role
  active: boolean
  permissions: Permission[]
}

export function canAccess(
  user: User,
  permission: Permission
): boolean {
  if (!user.active) {
    return false
  }

  if (user.role === "owner") {
    return true
  }

  if (user.role === "client") {
    return false
  }

  return user.permissions.includes(permission)
}
