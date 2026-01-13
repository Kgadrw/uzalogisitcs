import { Client } from '../types';
import { UserModel } from '../models/User';
import { ShipmentModel } from '../models/Shipment';

export class ClientService {
  static async getAllClients(): Promise<Client[]> {
    const clients = await UserModel.getClients();
    
    // Add shipment counts
    return Promise.all(
      clients.map(async (client) => {
        const shipments = await ShipmentModel.findByClientId(client.id);
        return {
          ...client,
          shipmentsCount: shipments.length,
        };
      })
    );
  }

  static async getClientById(id: string): Promise<Client | null> {
    const user = await UserModel.findById(id);
    if (!user || user.role !== 'client') return null;
    
    const shipments = await ShipmentModel.findByClientId(id);
    return {
      ...user,
      shipmentsCount: shipments.length,
      status: 'active', // This should come from the database
    };
  }

  static async updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
    const user = await UserModel.findById(id);
    if (!user || user.role !== 'client') return null;
    
    const updated = await UserModel.update(id, updates);
    if (!updated) return null;
    
    return {
      ...updated,
      role: 'client',
      shipmentsCount: 0, // Will be calculated when needed
      status: 'active',
    };
  }

  static async deleteClient(id: string): Promise<boolean> {
    // Check if client has active shipments
    const shipments = await ShipmentModel.findByClientId(id);
    const activeShipments = shipments.filter(
      s => s.status !== 'Delivered' && s.status !== 'Cancelled'
    );

    if (activeShipments.length > 0) {
      throw new Error('Cannot delete client with active shipments');
    }

    return UserModel.delete(id);
  }
}
