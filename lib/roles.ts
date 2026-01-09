import { UserRole } from './auth';

export const ROLES = {
  CLIENT: 'client' as UserRole,
  WAREHOUSE: 'warehouse' as UserRole,
  ADMIN: 'admin' as UserRole,
};

export function hasRole(userRole: UserRole | null, requiredRole: UserRole): boolean {
  if (!userRole) return false;
  if (requiredRole === ROLES.ADMIN) return userRole === ROLES.ADMIN;
  return userRole === requiredRole;
}

export function canAccessRoute(userRole: UserRole | null, route: string): boolean {
  if (!userRole) return false;
  
  if (route.startsWith('/admin')) {
    return userRole === ROLES.ADMIN;
  }
  if (route.startsWith('/warehouse')) {
    return userRole === ROLES.WAREHOUSE;
  }
  if (route.startsWith('/client')) {
    return userRole === ROLES.CLIENT;
  }
  
  return true;
}

