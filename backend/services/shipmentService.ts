import { Shipment, CreateShipmentRequest, UpdateShipmentStatusRequest, ConfirmShipmentRequest } from '../types';
import { ShipmentModel } from '../models/Shipment';
import { WarehouseModel } from '../models/Warehouse';
import { NotificationModel } from '../models/Notification';
import { calculateShipmentCost } from '../utils/pricing';

export class ShipmentService {
  static async createShipment(clientId: string, data: CreateShipmentRequest): Promise<Shipment> {
    // Validate warehouse exists
    const warehouse = await WarehouseModel.findById(data.warehouseId);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    // Calculate costs
    const costs = calculateShipmentCost(
      data.estimatedWeight,
      data.estimatedVolume,
      warehouse.pricePerCBM
    );

    // Create shipment
    const shipment = await ShipmentModel.create({
      clientId,
      warehouseId: data.warehouseId,
      productName: data.productName,
      productCategory: data.productCategory,
      productCategoryOther: data.productCategoryOther,
      quantity: data.quantity,
      estimatedWeight: data.estimatedWeight,
      estimatedVolume: data.estimatedVolume,
      packagingType: data.packagingType,
      specialHandling: data.specialHandling,
      productImages: [], // Will be handled by file upload service
      status: 'Waiting for Confirmation',
      pickupCountry: data.pickupCountry,
      pickupCity: data.pickupCity,
      pickupAddress: data.pickupAddress,
      pickupContactName: data.pickupContactName,
      pickupContactPhone: data.pickupContactPhone,
      transportFee: costs.transportFee,
      storageFee: costs.storageFee,
      handlingFee: costs.handlingFee,
      totalCost: costs.total,
      submittedDate: new Date(),
    });

    // Create notification for warehouse
    await NotificationModel.createSystemNotification(
      warehouse.id, // This should be the warehouse user ID
      `New shipment from client - ${data.productName}`,
      shipment.id
    );

    return shipment;
  }

  static async getShipmentById(id: string, userId: string, userRole: string): Promise<Shipment | null> {
    const shipment = await ShipmentModel.findById(id);
    if (!shipment) return null;

    // Check access permissions
    if (userRole === 'client' && shipment.clientId !== userId) {
      throw new Error('Unauthorized access');
    }
    if (userRole === 'warehouse' && shipment.warehouseId !== userId) {
      throw new Error('Unauthorized access');
    }

    return shipment;
  }

  static async getClientShipments(clientId: string): Promise<Shipment[]> {
    return ShipmentModel.findByClientId(clientId);
  }

  static async getAllShipments(): Promise<Shipment[]> {
    return ShipmentModel.findAll();
  }

  static async confirmShipment(
    shipmentId: string,
    warehouseId: string,
    data: ConfirmShipmentRequest
  ): Promise<Shipment> {
    const shipment = await ShipmentModel.findById(shipmentId);
    if (!shipment) {
      throw new Error('Shipment not found');
    }

    if (shipment.warehouseId !== warehouseId) {
      throw new Error('Unauthorized: This shipment is not assigned to your warehouse');
    }

    // Recalculate costs with actual measurements
    const warehouse = await WarehouseModel.findById(warehouseId);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    const costs = calculateShipmentCost(
      data.actualWeight,
      data.actualVolume,
      warehouse.pricePerCBM
    );

    // Update shipment
    const updated = await ShipmentModel.update(shipmentId, {
      actualWeight: data.actualWeight,
      actualVolume: data.actualVolume,
      finalCost: costs.total,
      status: 'Confirmed',
      confirmedDate: new Date(),
    });

    if (!updated) {
      throw new Error('Failed to update shipment');
    }

    // Create notification for client
    await NotificationModel.createShipmentNotification(
      shipment.clientId,
      shipmentId,
      `Your shipment ${shipment.productName} has been confirmed`,
      'shipment_update'
    );

    return updated;
  }

  static async updateShipmentStatus(
    shipmentId: string,
    data: UpdateShipmentStatusRequest
  ): Promise<Shipment> {
    const shipment = await ShipmentModel.findById(shipmentId);
    if (!shipment) {
      throw new Error('Shipment not found');
    }

    const updates: Partial<Shipment> = {
      status: data.status,
    };

    if (data.actualWeight) updates.actualWeight = data.actualWeight;
    if (data.actualVolume) updates.actualVolume = data.actualVolume;

    const updated = await ShipmentModel.update(shipmentId, updates);
    if (!updated) {
      throw new Error('Failed to update shipment');
    }

    // Create notification for client
    await NotificationModel.createShipmentNotification(
      shipment.clientId,
      shipmentId,
      `Your shipment ${shipment.productName} status updated to: ${data.status}`,
      'shipment_update'
    );

    return updated;
  }

  static async getIncomingShipments(warehouseId: string): Promise<Shipment[]> {
    return ShipmentModel.getIncomingShipments(warehouseId);
  }

  static async getPendingConfirmations(warehouseId: string): Promise<Shipment[]> {
    return ShipmentModel.getPendingConfirmations(warehouseId);
  }
}
