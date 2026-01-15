import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/authService';

const router = Router();

// Client registration endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Only allow client registration
    if (role && role !== 'client') {
      return res.status(403).json({
        success: false,
        error: 'Only client registration is allowed',
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters',
      });
    }

    // Check if email already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered',
      });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client account
    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      phone: phone || undefined,
      role: 'client',
      password: hashedPassword,
    });

    // Generate JWT token
    const token = AuthService.generateToken(user);

    const response: ApiResponse<{ user: typeof user; token: string }> = {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        } as any,
        token,
      },
      message: 'Account created successfully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Registration failed',
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    // Verify credentials
    const user = await AuthService.verifyCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = AuthService.generateToken(user);

    const response: ApiResponse<{ user: typeof user; token: string }> = {
      success: true,
      data: {
        user,
        token,
      },
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  // In production, invalidate token or remove from session
  const response: ApiResponse<null> = {
    success: true,
    message: 'Logged out successfully',
  };
  res.json(response);
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // Verify token and get user
    const tokenData = AuthService.verifyToken(token);
    if (!tokenData) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }

    const user = await UserModel.findById(tokenData.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const response: ApiResponse<typeof user> = {
      success: true,
      data: user,
    };
    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
