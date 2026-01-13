import mongoose, { Schema, Document } from 'mongoose';
import { Warehouse, WarehouseStatus } from '../types';

export interface IWarehouse extends Document, Omit<Warehouse, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const WarehouseSchema = new Schema<IWarehouse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    usedCapacity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    pricePerCBM: {
      type: Number,
      required: true,
      min: 0,
    },
    services: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'pending', 'suspended'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
WarehouseSchema.index({ status: 1 });
WarehouseSchema.index({ name: 1 });

export const WarehouseModel = mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);
