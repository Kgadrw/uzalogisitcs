import mongoose, { Schema, Document } from 'mongoose';
import { User, UserRole } from '../types';

export interface IUser extends Document, Omit<User, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['client', 'warehouse', 'admin'],
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export const UserModel = mongoose.model<IUser>('User', UserSchema);
