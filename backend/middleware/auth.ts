import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../types';
import { AuthService } from '../services/authService';
import { UserModel } from '../models/User';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // Verify token
    const tokenData = AuthService.verifyToken(token);
    if (!tokenData) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }

    // Get full user data from database
    const user = await UserModel.findById(tokenData.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to authenticate user',
    });
  }
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
