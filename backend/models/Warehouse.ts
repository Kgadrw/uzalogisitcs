import { Warehouse, WarehouseStatus } from '../types';
import { WarehouseModel as MongooseWarehouseModel, IWarehouse } from '../schemas/WarehouseSchema';
import mongoose from 'mongoose';

export class WarehouseModel {
  static async create(warehouseData: Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt'>): Promise<Warehouse> {
    const warehouse = await MongooseWarehouseModel.create(warehouseData);
    return this.toWarehouse(warehouse);
  }

  static async findById(id: string): Promise<Warehouse | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const warehouse = await MongooseWarehouseModel.findById(id);
    return warehouse ? this.toWarehouse(warehouse) : null;
  }

  static async findAll(): Promise<Warehouse[]> {
    const warehouses = await MongooseWarehouseModel.find().sort({ createdAt: -1 });
    return warehouses.map(w => this.toWarehouse(w));
  }

  static async findByStatus(status: WarehouseStatus): Promise<Warehouse[]> {
    const warehouses = await MongooseWarehouseModel.find({ status }).sort({ createdAt: -1 });
    return warehouses.map(w => this.toWarehouse(w));
  }

  static async findActive(): Promise<Warehouse[]> {
    const warehouses = await MongooseWarehouseModel.find({ status: 'active' }).sort({ createdAt: -1 });
    return warehouses.map(w => this.toWarehouse(w));
  }

  static async update(id: string, updates: Partial<Warehouse>): Promise<Warehouse | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const warehouse = await MongooseWarehouseModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return warehouse ? this.toWarehouse(warehouse) : null;
  }

  static async updateStatus(id: string, status: WarehouseStatus): Promise<Warehouse | null> {
    return this.update(id, { status });
  }

  static async updateCapacity(id: string, usedCapacity: number): Promise<Warehouse | null> {
    return this.update(id, { usedCapacity });
  }

  static async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await MongooseWarehouseModel.findByIdAndDelete(id);
    return !!result;
  }

  private static toWarehouse(doc: IWarehouse): Warehouse {
    return {
      id: doc._id.toString(),
      name: doc.name,
      location: doc.location,
      address: doc.address,
      city: doc.city,
      country: doc.country,
      capacity: doc.capacity,
      usedCapacity: doc.usedCapacity,
      pricePerCBM: doc.pricePerCBM,
      services: doc.services,
      rating: doc.rating,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
