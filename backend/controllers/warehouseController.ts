import { Request, Response } from 'express';
import { ApiResponse } from '../types';
import { DashboardService } from '../services/dashboardService';
import { ShipmentService } from '../services/shipmentService';
import { NotificationService } from '../services/notificationService';
import { ConfirmShipmentRequest, UpdateShipmentStatusRequest } from '../types';

export class WarehouseController {
  static async getDashboardStats(req: Request, res: Response) {
    try {
      const warehouseId = req.user!.id; // Assuming warehouse user has warehouseId
      const stats = await DashboardService.getWarehouseStats(warehouseId);
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

  static async getIncomingShipments(req: Request, res: Response) {
    try {
      const warehouseId = req.user!.id;
      const shipments = await ShipmentService.getIncomingShipments(warehouseId);
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

  static async confirmShipment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warehouseId = req.user!.id;
      const data = req.body as ConfirmShipmentRequest;
      const shipment = await ShipmentService.confirmShipment(id, warehouseId, data);
      const response: ApiResponse<typeof shipment> = {
        success: true,
        data: shipment,
        message: 'Shipment confirmed successfully',
      };
      res.json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateShipmentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as UpdateShipmentStatusRequest;
      const shipment = await ShipmentService.updateShipmentStatus(id, data);
      const response: ApiResponse<typeof shipment> = {
        success: true,
        data: shipment,
        message: 'Shipment status updated successfully',
      };
      res.json(response);
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
