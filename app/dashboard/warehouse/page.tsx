'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiTruck, 
  HiClock, 
  HiCube,
  HiUsers,
  HiBell,
  HiCheckCircle,
  HiTrash
} from 'react-icons/hi';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';

export default function WarehouseDashboard() {
  // Mock data - replace with API call
  const stats = {
    incomingShipments: 12,
    pendingConfirmations: 5,
    storageUsed: '75%',
    activeClients: 28,
  };

  // Mock notifications data - replace with API call
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'new_shipping',
      message: 'New shipment from John Doe - Electronics',
      shipmentId: '1',
      clientName: 'John Doe',
      productName: 'Electronics',
      status: 'Waiting for Confirmation',
      date: new Date('2024-01-25T10:30:00'),
      isNew: true,
    },
    {
      id: '2',
      type: 'new_shipping',
      message: 'New shipment from Jane Smith - Furniture',
      shipmentId: '2',
      clientName: 'Jane Smith',
      productName: 'Furniture',
      status: 'Waiting for Confirmation',
      date: new Date('2024-01-25T09:15:00'),
      isNew: true,
    },
    {
      id: '3',
      type: 'new_shipping',
      message: 'New shipment from Mike Johnson - Clothing',
      shipmentId: '3',
      clientName: 'Mike Johnson',
      productName: 'Clothing',
      status: 'In Transit to Warehouse',
      date: new Date('2024-01-24T16:45:00'),
      isNew: false,
    },
    {
      id: '4',
      type: 'new_shipping',
      message: 'New shipment from Sarah Williams - Electronics',
      shipmentId: '4',
      clientName: 'Sarah Williams',
      productName: 'Electronics',
      status: 'Received at Warehouse',
      date: new Date('2024-01-24T14:20:00'),
      isNew: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const newNotifications = notifications.filter(n => n.isNew);

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

      {/* Notifications Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <HiBell className="w-6 h-6 text-primary" />
          <h2 className="text-primary text-2xl">Notifications</h2>
        </div>

        {/* New Shipping Notifications */}
        {newNotifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-primary text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              New Shipping ({newNotifications.length})
            </h3>
            <div className="space-y-3">
              {newNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-primary border-opacity-20 p-4 rounded hover:bg-primary hover:bg-opacity-5 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/dashboard/warehouse/confirm/${notification.shipmentId}`}
                        className="block"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-primary font-medium">{notification.message}</p>
                          {notification.status && (
                            <StatusBadge status={notification.status} />
                          )}
                        </div>
                        <p className="text-primary text-sm text-opacity-70">
                          {formatDate(notification.date)}
                        </p>
                      </Link>
                    </div>
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-4 p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition-colors"
                      title="Mark as read"
                    >
                      <HiCheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {notifications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-primary text-opacity-70">No notifications available</p>
          </div>
        )}
      </Card>
    </div>
  );
}

