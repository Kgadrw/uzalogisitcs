import { 
  AdminDashboardStats, 
  ClientDashboardStats, 
  WarehouseDashboardStats 
} from '../types';
import { ShipmentModel } from '../models/Shipment';
import { WarehouseModel } from '../models/Warehouse';
import { UserModel } from '../models/User';

export class DashboardService {
  static async getAdminStats(): Promise<AdminDashboardStats> {
    const allShipments = await ShipmentModel.findAll();
    const activeWarehouses = await WarehouseModel.findActive();
    const clients = await UserModel.getClients();
    // All registered clients are considered active for now
    const assistedClients = clients.length;

    // Count pending issues (shipments with issues or warehouses pending approval)
    const pendingWarehouses = await WarehouseModel.findByStatus('pending');
    const pendingIssues = pendingWarehouses.length; // Simplified

    return {
      totalShipments: allShipments.length,
      activeWarehouses: activeWarehouses.length,
      registeredClients: clients.length,
      assistedClients,
      pendingIssues,
    };
  }

  static async getClientStats(clientId: string): Promise<ClientDashboardStats> {
    const shipments = await ShipmentModel.findByClientId(clientId);
    
    const activeShipments = shipments.filter(
      s => s.status !== 'Delivered' && s.status !== 'Cancelled'
    ).length;
    
    const pendingShipments = shipments.filter(
      s => s.status === 'Waiting for Confirmation'
    ).length;
    
    const completedShipments = shipments.filter(
      s => s.status === 'Delivered'
    ).length;

    return {
      totalShipments: shipments.length,
      activeShipments,
      pendingShipments,
      completedShipments,
    };
  }

  static async getWarehouseStats(warehouseId: string): Promise<WarehouseDashboardStats> {
    const incomingShipments = await ShipmentModel.getIncomingShipments(warehouseId);
    const pendingConfirmations = await ShipmentModel.getPendingConfirmations(warehouseId);
    
    const warehouse = await WarehouseModel.findById(warehouseId);
    const storageUsed = warehouse 
      ? `${Math.round((warehouse.usedCapacity / warehouse.capacity) * 100)}%`
      : '0%';

    // Get unique clients for this warehouse
    const allShipments = await ShipmentModel.findByWarehouseId(warehouseId);
    const uniqueClients = new Set(allShipments.map(s => s.clientId));
    const activeClients = uniqueClients.size;

    return {
      incomingShipments: incomingShipments.length,
      pendingConfirmations: pendingConfirmations.length,
      storageUsed,
      activeClients,
    };
  }
}
