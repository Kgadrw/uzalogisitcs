'use client';

import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiTruck, 
  HiClock, 
  HiCube,
  HiUsers
} from 'react-icons/hi';

export default function WarehouseDashboard() {
  // Mock data - replace with API call
  const stats = {
    incomingShipments: 12,
    pendingConfirmations: 5,
    storageUsed: '75%',
    activeClients: 28,
  };

  return (
    <div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiTruck className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Incoming Shipments</h3>
          </div>
          <p className="text-primary text-3xl">{stats.incomingShipments}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiClock className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Pending Confirmations</h3>
          </div>
          <p className="text-primary text-3xl">{stats.pendingConfirmations}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiCube className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Storage Used</h3>
          </div>
          <p className="text-primary text-3xl">{stats.storageUsed}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiUsers className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Active Clients</h3>
          </div>
          <p className="text-primary text-3xl">{stats.activeClients}</p>
        </Card>
      </div>
    </div>
  );
}

