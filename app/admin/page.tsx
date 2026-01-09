'use client';

import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiCube, 
  HiOfficeBuilding, 
  HiUsers,
  HiPhone,
  HiExclamation
} from 'react-icons/hi';

export default function AdminDashboard() {
  // Mock data - replace with API call
  const stats = {
    totalShipments: 156,
    activeWarehouses: 12,
    registeredClients: 89,
    assistedClients: 23,
    pendingIssues: 5,
  };

  return (
    <div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiCube className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Total Shipments</h3>
          </div>
          <p className="text-primary text-3xl">{stats.totalShipments}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiOfficeBuilding className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Active Warehouses</h3>
          </div>
          <p className="text-primary text-3xl">{stats.activeWarehouses}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiUsers className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Registered Clients</h3>
          </div>
          <p className="text-primary text-3xl">{stats.registeredClients}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiPhone className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Assisted Clients</h3>
          </div>
          <p className="text-primary text-3xl">{stats.assistedClients}</p>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <HiExclamation className="w-5 h-5 text-primary" />
            <h3 className="text-primary text-sm text-opacity-70">Pending Issues</h3>
          </div>
          <p className="text-primary text-3xl">{stats.pendingIssues}</p>
        </Card>
      </div>
    </div>
  );
}

