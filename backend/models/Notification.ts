import { Notification, NotificationType } from '../types';
import { NotificationModel as MongooseNotificationModel, INotification } from '../schemas/NotificationSchema';
import mongoose from 'mongoose';

export class NotificationModel {
  static async create(notificationData: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const notification = await MongooseNotificationModel.create(notificationData);
    return this.toNotification(notification);
  }

  static async findById(id: string): Promise<Notification | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const notification = await MongooseNotificationModel.findById(id);
    return notification ? this.toNotification(notification) : null;
  }

  static async findByUserId(userId: string): Promise<Notification[]> {
    const notifications = await MongooseNotificationModel.find({ userId })
      .sort({ createdAt: -1 });
    return notifications.map(n => this.toNotification(n));
  }

  static async findUnreadByUserId(userId: string): Promise<Notification[]> {
    const notifications = await MongooseNotificationModel.find({
      userId,
      isRead: false,
    }).sort({ createdAt: -1 });
    return notifications.map(n => this.toNotification(n));
  }

  static async markAsRead(id: string): Promise<Notification | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const notification = await MongooseNotificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    return notification ? this.toNotification(notification) : null;
  }

  static async markAllAsRead(userId: string): Promise<number> {
    const result = await MongooseNotificationModel.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
    return result.modifiedCount;
  }

  static async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await MongooseNotificationModel.findByIdAndDelete(id);
    return !!result;
  }

  static async deleteByUserId(userId: string): Promise<number> {
    const result = await MongooseNotificationModel.deleteMany({ userId });
    return result.deletedCount;
  }

  static async createShipmentNotification(
    userId: string,
    shipmentId: string,
    message: string,
    type: NotificationType = 'shipment_update'
  ): Promise<Notification> {
    return this.create({
      userId,
      type,
      message,
      isRead: false,
      relatedId: shipmentId,
    });
  }

  static async createSystemNotification(
    userId: string,
    message: string,
    relatedId?: string
  ): Promise<Notification> {
    return this.create({
      userId,
      type: 'system_alert',
      message,
      isRead: false,
      relatedId,
    });
  }

  private static toNotification(doc: INotification): Notification {
    return {
      id: doc._id.toString(),
      userId: doc.userId,
      type: doc.type,
      message: doc.message,
      isRead: doc.isRead,
      relatedId: doc.relatedId,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
    };
  }
}
