export type UserRole = 'client' | 'warehouse' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  phone?: string;
}

// Mock auth - replace with actual auth implementation
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  return JSON.parse(userStr);
}

export function setCurrentUser(user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
}

