import { Warehouse, WarehouseStatus, CreateWarehouseAccountRequest, WarehouseAccountResponse } from '../types';
import { WarehouseModel } from '../models/Warehouse';
import { ShipmentModel } from '../models/Shipment';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';

export class WarehouseService {
  static async getAllWarehouses(): Promise<Warehouse[]> {
    return WarehouseModel.findAll();
  }

  static async getActiveWarehouses(): Promise<Warehouse[]> {
    return WarehouseModel.findActive();
  }

  static async getWarehouseById(id: string): Promise<Warehouse | null> {
    return WarehouseModel.findById(id);
  }

  static async createWarehouse(data: Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt'>): Promise<Warehouse> {
    return WarehouseModel.create({
      ...data,
      status: 'pending', // New warehouses need admin approval
    });
  }

  static async approveWarehouse(id: string): Promise<Warehouse> {
    const warehouse = await WarehouseModel.updateStatus(id, 'active');
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }
    return warehouse;
  }

  static async suspendWarehouse(id: string): Promise<Warehouse> {
    const warehouse = await WarehouseModel.updateStatus(id, 'suspended');
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }
    return warehouse;
  }

  static async updateWarehouse(id: string, updates: Partial<Warehouse>): Promise<Warehouse> {
    const warehouse = await WarehouseModel.update(id, updates);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }
    return warehouse;
  }

  static async updateCapacity(id: string, usedCapacity: number): Promise<Warehouse> {
    const warehouse = await WarehouseModel.findById(id);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    if (usedCapacity > warehouse.capacity) {
      throw new Error('Used capacity cannot exceed total capacity');
    }

    const updated = await WarehouseModel.updateCapacity(id, usedCapacity);
    if (!updated) {
      throw new Error('Failed to update capacity');
    }

    return updated;
  }

  static async deleteWarehouse(id: string): Promise<boolean> {
    // Check if warehouse has active shipments
    const shipments = await ShipmentModel.findByWarehouseId(id);
    const activeShipments = shipments.filter(
      s => s.status !== 'Delivered' && s.status !== 'Cancelled'
    );

    if (activeShipments.length > 0) {
      throw new Error('Cannot delete warehouse with active shipments');
    }

    return WarehouseModel.delete(id);
  }

  static async createWarehouseAccount(data: CreateWarehouseAccountRequest): Promise<WarehouseAccountResponse> {
    // Check if email already exists
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create warehouse
    const warehouse = await WarehouseModel.create({
      name: data.name,
      location: data.location,
      address: data.address,
      city: data.city,
      country: data.country,
      capacity: data.capacity,
      usedCapacity: 0,
      pricePerCBM: data.pricePerCBM,
      services: data.services,
      rating: 0, // New warehouse starts with 0 rating
      status: 'active', // Admin creates it, so it's immediately active
    });

    // Create warehouse user account with hashed password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const warehouseUser = await UserModel.create({
      name: data.contactName,
      email: data.email,
      phone: data.contactPhone,
      role: 'warehouse',
      password: hashedPassword,
    });

    return {
      warehouse,
      user: {
        id: warehouseUser.id,
        email: warehouseUser.email,
        password: data.password, // Return plain password only once for admin to share
      },
    };
  }
}
