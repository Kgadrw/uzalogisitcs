import mongoose, { Schema, Document } from 'mongoose';
import { Shipment, ShipmentStatus } from '../types';

export interface IShipment extends Document, Omit<Shipment, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ShipmentSchema = new Schema<IShipment>(
  {
    clientId: {
      type: String,
      required: true,
      ref: 'User',
    },
    warehouseId: {
      type: String,
      ref: 'Warehouse',
      default: null,
    },
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productCategoryOther: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    estimatedWeight: {
      type: Number,
      required: true,
      min: 0.1,
    },
    estimatedVolume: {
      type: Number,
      required: true,
      min: 0.1,
    },
    actualWeight: {
      type: Number,
      min: 0.1,
    },
    actualVolume: {
      type: Number,
      min: 0.1,
    },
    packagingType: {
      type: String,
      required: true,
    },
    specialHandling: {
      type: [String],
      default: [],
    },
    productImages: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      required: true,
      enum: [
        'Waiting for Confirmation',
        'Confirmed',
        'In Transit to Warehouse',
        'Received at Warehouse',
        'In Transit to Destination',
        'Delivered',
        'Cancelled',
      ],
      default: 'Waiting for Confirmation',
    },
    pickupCountry: {
      type: String,
      required: true,
    },
    pickupCity: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    pickupContactName: {
      type: String,
      required: true,
    },
    pickupContactPhone: {
      type: String,
      required: true,
    },
    pickupCoordinates: {
      lat: Number,
      lng: Number,
    },
    transportFee: {
      type: Number,
      required: true,
      default: 0,
    },
    storageFee: {
      type: Number,
      required: true,
      default: 0,
    },
    handlingFee: {
      type: Number,
      required: true,
      default: 0,
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    finalCost: {
      type: Number,
    },
    submittedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    confirmedDate: {
      type: Date,
    },
    receivedDate: {
      type: Date,
    },
    deliveredDate: {
      type: Date,
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
ShipmentSchema.index({ clientId: 1 });
ShipmentSchema.index({ warehouseId: 1 });
ShipmentSchema.index({ status: 1 });
ShipmentSchema.index({ submittedDate: -1 });

export const ShipmentModel = mongoose.model<IShipment>('Shipment', ShipmentSchema);
