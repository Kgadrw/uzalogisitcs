'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiCube, 
  HiOfficeBuilding, 
  HiUsers,
  HiPhone,
  HiExclamation,
  HiClock
} from 'react-icons/hi';
import { formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  // Mock data - replace with API call
  const stats = {
    totalShipments: 156,
    activeWarehouses: 12,
    registeredClients: 89,
    assistedClients: 23,
    pendingIssues: 5,
  };

  // Mock recent actions data - replace with API call
  const [recentActions] = useState([
    {
      id: '1',
      action: 'Approved warehouse registration for Central Warehouse',
      warehouseId: '3',
      date: new Date('2024-01-25T10:00:00'),
    },
    {
      id: '2',
      action: 'Updated pricing for Transport Fee',
      date: new Date('2024-01-25T09:00:00'),
    },
    {
      id: '3',
      action: 'Created warehouse account for East Coast Hub',
      warehouseId: '5',
      date: new Date('2024-01-24T16:00:00'),
    },
    {
      id: '4',
      action: 'Viewed client details: Sarah Williams',
      clientId: '123',
      date: new Date('2024-01-24T14:00:00'),
    },
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
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
                  href={
                    action.warehouseId 
                      ? '/dashboard/admin/warehouses'
                      : action.clientId
                      ? '/dashboard/admin/clients'
                      : action.shipmentId
                      ? '/dashboard/admin/shipments'
                      : '#'
                  }
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

