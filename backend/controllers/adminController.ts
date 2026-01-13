import { Request, Response } from 'express';
import { ApiResponse } from '../types';
import { DashboardService } from '../services/dashboardService';
import { WarehouseService } from '../services/warehouseService';
import { ClientService } from '../services/clientService';
import { ShipmentService } from '../services/shipmentService';
import { NotificationService } from '../services/notificationService';

export class AdminController {
  static async getDashboardStats(req: Request, res: Response) {
    try {
      const stats = await DashboardService.getAdminStats();
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

  static async getAllShipments(req: Request, res: Response) {
    try {
      const shipments = await ShipmentService.getAllShipments();
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

  static async getAllWarehouses(req: Request, res: Response) {
    try {
      const warehouses = await WarehouseService.getAllWarehouses();
      const response: ApiResponse<typeof warehouses> = {
        success: true,
        data: warehouses,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async approveWarehouse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warehouse = await WarehouseService.approveWarehouse(id);
      const response: ApiResponse<typeof warehouse> = {
        success: true,
        data: warehouse,
        message: 'Warehouse approved successfully',
      };
      res.json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async suspendWarehouse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warehouse = await WarehouseService.suspendWarehouse(id);
      const response: ApiResponse<typeof warehouse> = {
        success: true,
        data: warehouse,
        message: 'Warehouse suspended successfully',
      };
      res.json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllClients(req: Request, res: Response) {
    try {
      const clients = await ClientService.getAllClients();
      const response: ApiResponse<typeof clients> = {
        success: true,
        data: clients,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
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

  static async createWarehouseAccount(req: Request, res: Response) {
    try {
      const accountData = await WarehouseService.createWarehouseAccount(req.body);
      const response: ApiResponse<typeof accountData> = {
        success: true,
        data: accountData,
        message: 'Warehouse account created successfully',
      };
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
