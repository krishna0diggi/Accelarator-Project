export const ROLES = {
    USER:"user",
    ADMIN:"admin",
    SUPER_ADMIN:"superAdmin"   
}
  export type UserRole = typeof ROLES[keyof typeof ROLES];
  
  export const ROLE_ROUTES = {
    [ROLES.USER]: "/user/dashboard",
    [ROLES.ADMIN]: "/admin/dashboard",
    [ROLES.SUPER_ADMIN]: "/superadmin/dashboard"
  } as const;

  export const ROLE_LABELS = {
    [ROLES.USER]: "Employee",
    [ROLES.ADMIN]:"Admin",
    [ROLES.SUPER_ADMIN]:"Super Admin",
  }
  