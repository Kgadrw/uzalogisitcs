import mongoose, { Schema, Document } from 'mongoose';
import { Notification, NotificationType } from '../types';

export interface INotification extends Document, Omit<Notification, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: [
        'system_alert',
        'shipment_update',
        'new_shipping',
        'warehouse_alert',
        'cost_adjustment',
      ],
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, isRead: 1 });

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
