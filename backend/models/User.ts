import { User, UserRole } from '../types';
import { UserModel as MongooseUserModel, IUser } from '../schemas/UserSchema';
import mongoose from 'mongoose';

export class UserModel {
  static async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await MongooseUserModel.create(userData);
    return this.toUser(user);
  }

  static async findById(id: string): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const user = await MongooseUserModel.findById(id);
    return user ? this.toUser(user) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await MongooseUserModel.findOne({ email: email.toLowerCase() });
    return user ? this.toUser(user) : null;
  }

  static async findByEmailWithPassword(email: string): Promise<(User & { password: string }) | null> {
    const user = await MongooseUserModel.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return null;
    return {
      ...this.toUser(user),
      password: user.password,
    };
  }

  static async findAll(role?: UserRole): Promise<User[]> {
    const query = role ? { role } : {};
    const users = await MongooseUserModel.find(query);
    return users.map(u => this.toUser(u));
  }

  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const user = await MongooseUserModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return user ? this.toUser(user) : null;
  }

  static async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await MongooseUserModel.findByIdAndDelete(id);
    return !!result;
  }

  static async getClients(): Promise<User[]> {
    const users = await MongooseUserModel.find({ role: 'client' });
    return users.map(u => this.toUser(u));
  }

  static async getWarehouseUsers(): Promise<User[]> {
    const users = await MongooseUserModel.find({ role: 'warehouse' });
    return users.map(u => this.toUser(u));
  }

  static async getAdmins(): Promise<User[]> {
    const users = await MongooseUserModel.find({ role: 'admin' });
    return users.map(u => this.toUser(u));
  }

  private static toUser(doc: IUser): User {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
