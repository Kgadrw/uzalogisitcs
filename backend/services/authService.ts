import { UserModel } from '../models/User';
// import bcrypt from 'bcrypt';

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

      // Create default admin
      // In production, hash the password: const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await UserModel.create({
        name: 'System Administrator',
        email: adminEmail,
        role: 'admin',
        password: 'Admin123!', // In production, use hashedPassword
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

    // In production, verify password with bcrypt
    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) return null;

    // For now, simple comparison (NOT FOR PRODUCTION)
    if (user.password !== password) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };
  }
}
