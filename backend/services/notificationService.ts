import { Notification } from '../types';
import { NotificationModel } from '../models/Notification';

export class NotificationService {
  static async getUserNotifications(userId: string): Promise<Notification[]> {
    return NotificationModel.findByUserId(userId);
  }

  static async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return NotificationModel.findUnreadByUserId(userId);
  }

  static async markAsRead(notificationId: string): Promise<Notification | null> {
    return NotificationModel.markAsRead(notificationId);
  }

  static async markAllAsRead(userId: string): Promise<number> {
    return NotificationModel.markAllAsRead(userId);
  }

  static async deleteNotification(notificationId: string): Promise<boolean> {
    return NotificationModel.delete(notificationId);
  }

  static async createNotification(
    userId: string,
    type: string,
    message: string,
    relatedId?: string
  ): Promise<Notification> {
    return NotificationModel.create({
      userId,
      type: type as any,
      message,
      isRead: false,
      relatedId,
    });
  }
}
