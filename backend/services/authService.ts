import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app';
import { User } from '../types';

export class AuthService {
  /**
   * Initialize default admin account if it doesn't exist
   * Default credentials:
   * Email: admin@uzalogistics.com
   * Password: Admin123!
   */
  static async initializeDefaultAdmin() {
    try {
      const adminEmail = 'admin@uzalogistics.com';
      const existingAdmin = await UserModel.findByEmail(adminEmail);

      if (existingAdmin) {
        console.log('✅ Default admin account already exists');
        return;
      }

      // Create default admin with hashed password
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await UserModel.create({
        name: 'System Administrator',
        email: adminEmail,
        role: 'admin',
        password: hashedPassword,
      });

      console.log('✅ Default admin account created');
      console.log('📧 Email: admin@uzalogistics.com');
      console.log('🔑 Password: Admin123!');
      console.log('⚠️  Please change the default password after first login!');
    } catch (error) {
      console.error('❌ Failed to initialize default admin:', error);
    }
  }

  /**
   * Verify user credentials
   */
  static async verifyCredentials(email: string, password: string) {
    const user = await UserModel.findByEmailWithPassword(email);
    if (!user) {
      return null;
    }

    // Verify password with bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };
  }

  /**
   * Generate JWT token for user
   */
  static generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      appConfig.jwtSecret,
      { expiresIn: appConfig.jwtExpiresIn }
    );
  }

  /**
   * Verify JWT token and return user data
   */
  static verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret) as {
        id: string;
        email: string;
        role: string;
      };
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role as any,
        name: '', // Will be fetched from DB if needed
        phone: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      return null;
    }
  }
}
