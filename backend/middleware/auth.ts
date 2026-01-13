import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../types';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Mock JWT verification - replace with actual JWT implementation
export function verifyToken(token: string): User | null {
  // In production, verify JWT token here
  // For now, return mock user
  try {
    // Decode and verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // return decoded as User;
    return null; // Placeholder
  } catch (error) {
    return null;
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }

  req.user = user;
  next();
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    next();
  };
}

// Role-specific middleware
export const requireAdmin = authorize('admin');
export const requireClient = authorize('client');
export const requireWarehouse = authorize('warehouse');
export const requireClientOrAdmin = authorize('client', 'admin');
export const requireWarehouseOrAdmin = authorize('warehouse', 'admin');
