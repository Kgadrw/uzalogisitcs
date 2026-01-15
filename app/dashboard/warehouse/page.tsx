'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiTruck, 
  HiClock, 
  HiCube,
  HiUsers
} from 'react-icons/hi';
import { formatDate } from '@/lib/utils';

export default function WarehouseDashboard() {
  // Mock data - replace with API call
  const stats = {
    incomingShipments: 12,
    pendingConfirmations: 5,
    storageUsed: '75%',
    activeClients: 28,
  };

  // Mock recent actions data - replace with API call
  const [recentActions] = useState([
    {
      id: '1',
      action: 'Confirmed shipment #1 from John Doe (Electronics)',
      shipmentId: '1',
      date: new Date('2024-01-25T10:30:00'),
    },
    {
      id: '2',
      action: 'Updated status for shipment #2 to "In Transit to Warehouse"',
      shipmentId: '2',
      date: new Date('2024-01-25T09:15:00'),
    },
    {
      id: '3',
      action: 'Viewed incoming shipment #3 details',
      shipmentId: '3',
      date: new Date('2024-01-24T16:45:00'),
    },
    {
      id: '4',
      action: 'Confirmed shipment #4 from Sarah Williams (Electronics)',
      shipmentId: '4',
      date: new Date('2024-01-24T14:20:00'),
    },
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

      {/* Recent Actions Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <HiClock className="w-6 h-6 text-primary" />
          <h2 className="text-primary text-2xl">Recent Actions</h2>
        </div>

        {recentActions.length > 0 ? (
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div
                key={action.id}
                className="border border-primary border-opacity-20 p-4 rounded hover:bg-primary hover:bg-opacity-5 transition-colors"
              >
                <Link
                  href={`/dashboard/warehouse/confirm/${action.shipmentId}`}
                  className="block"
                >
                  <p className="text-primary mb-1">{action.action}</p>
                  <p className="text-primary text-sm text-opacity-70">
                    {formatDate(action.date)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-primary text-opacity-70">No recent actions</p>
          </div>
        )}
      </Card>
    </div>
  );
}

