import { Shipment, ShipmentStatus } from '../types';
import { ShipmentModel as MongooseShipmentModel, IShipment } from '../schemas/ShipmentSchema';
import mongoose from 'mongoose';

export class ShipmentModel {
  static async create(shipmentData: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Shipment> {
    const shipment = await MongooseShipmentModel.create(shipmentData);
    return this.toShipment(shipment);
  }

  static async findById(id: string): Promise<Shipment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const shipment = await MongooseShipmentModel.findById(id);
    return shipment ? this.toShipment(shipment) : null;
  }

  static async findByClientId(clientId: string): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find({ clientId }).sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  static async findByWarehouseId(warehouseId: string): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find({ warehouseId }).sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  static async findAll(): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find().sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  static async findByStatus(status: ShipmentStatus): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find({ status }).sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  static async update(id: string, updates: Partial<Shipment>): Promise<Shipment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const shipment = await MongooseShipmentModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return shipment ? this.toShipment(shipment) : null;
  }

  static async updateStatus(id: string, status: ShipmentStatus): Promise<Shipment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    
    const shipment = await MongooseShipmentModel.findById(id);
    if (!shipment) return null;

    const updates: Partial<Shipment> = { status, updatedAt: new Date() };
    
    // Set appropriate dates based on status
    if (status === 'Confirmed' && !shipment.confirmedDate) {
      updates.confirmedDate = new Date();
    } else if (status === 'Received at Warehouse' && !shipment.receivedDate) {
      updates.receivedDate = new Date();
    } else if (status === 'Delivered' && !shipment.deliveredDate) {
      updates.deliveredDate = new Date();
    }

    const updated = await MongooseShipmentModel.findByIdAndUpdate(id, updates, { new: true });
    return updated ? this.toShipment(updated) : null;
  }

  static async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await MongooseShipmentModel.findByIdAndDelete(id);
    return !!result;
  }

  static async getIncomingShipments(warehouseId: string): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find({
      warehouseId,
      status: { $in: ['Waiting for Confirmation', 'In Transit to Warehouse'] },
    }).sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  static async getPendingConfirmations(warehouseId: string): Promise<Shipment[]> {
    const shipments = await MongooseShipmentModel.find({
      warehouseId,
      status: 'Waiting for Confirmation',
    }).sort({ createdAt: -1 });
    return shipments.map(s => this.toShipment(s));
  }

  private static toShipment(doc: IShipment): Shipment {
    return {
      id: doc._id.toString(),
      clientId: doc.clientId,
      warehouseId: doc.warehouseId,
      productName: doc.productName,
      productCategory: doc.productCategory,
      productCategoryOther: doc.productCategoryOther,
      quantity: doc.quantity,
      estimatedWeight: doc.estimatedWeight,
      estimatedVolume: doc.estimatedVolume,
      actualWeight: doc.actualWeight,
      actualVolume: doc.actualVolume,
      packagingType: doc.packagingType,
      specialHandling: doc.specialHandling,
      productImages: doc.productImages,
      status: doc.status,
      pickupCountry: doc.pickupCountry,
      pickupCity: doc.pickupCity,
      pickupAddress: doc.pickupAddress,
      pickupContactName: doc.pickupContactName,
      pickupContactPhone: doc.pickupContactPhone,
      pickupCoordinates: doc.pickupCoordinates,
      transportFee: doc.transportFee,
      storageFee: doc.storageFee,
      handlingFee: doc.handlingFee,
      totalCost: doc.totalCost,
      finalCost: doc.finalCost,
      submittedDate: doc.submittedDate,
      confirmedDate: doc.confirmedDate,
      receivedDate: doc.receivedDate,
      deliveredDate: doc.deliveredDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
