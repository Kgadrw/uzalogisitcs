import { Request, Response } from 'express';
import { ApiResponse } from '../types';
import { DashboardService } from '../services/dashboardService';
import { ShipmentService } from '../services/shipmentService';
import { NotificationService } from '../services/notificationService';
import { CreateShipmentRequest } from '../types';

export class ClientController {
  static async getDashboardStats(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const stats = await DashboardService.getClientStats(userId);
      const response: ApiResponse<typeof stats> = {
        success: true,
        data: stats,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getShipments(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const shipments = await ShipmentService.getClientShipments(userId);
      const response: ApiResponse<typeof shipments> = {
        success: true,
        data: shipments,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getShipmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const userRole = req.user!.role;
      const shipment = await ShipmentService.getShipmentById(id, userId, userRole);
      
      if (!shipment) {
        return res.status(404).json({
          success: false,
          error: 'Shipment not found',
        });
      }

      const response: ApiResponse<typeof shipment> = {
        success: true,
        data: shipment,
      };
      res.json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async createShipment(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const data = req.body as CreateShipmentRequest;
      const shipment = await ShipmentService.createShipment(userId, data);
      const response: ApiResponse<typeof shipment> = {
        success: true,
        data: shipment,
        message: 'Shipment created successfully',
      };
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getNotifications(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const notifications = await NotificationService.getUserNotifications(userId);
      const response: ApiResponse<typeof notifications> = {
        success: true,
        data: notifications,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
