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
  HiBell,
  HiCheckCircle,
  HiTrash
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

  // Mock notifications data - replace with API call
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'system_alert',
      message: 'New warehouse registration pending approval',
      warehouseId: '3',
      date: new Date('2024-01-25T10:00:00'),
      isNew: true,
    },
    {
      id: '2',
      type: 'system_alert',
      message: 'High storage usage at Central Warehouse (95%)',
      warehouseId: '1',
      date: new Date('2024-01-25T09:00:00'),
      isNew: true,
    },
    {
      id: '3',
      type: 'system_alert',
      message: 'New client registration: Sarah Williams',
      clientId: '5',
      date: new Date('2024-01-24T16:00:00'),
      isNew: false,
    },
    {
      id: '4',
      type: 'system_alert',
      message: 'Shipment issue reported: #123 - Damaged goods',
      shipmentId: '123',
      date: new Date('2024-01-24T14:00:00'),
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

      {/* Notifications Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <HiBell className="w-6 h-6 text-primary" />
          <h2 className="text-primary text-2xl">Notifications</h2>
        </div>

        {/* New Alerts */}
        {newNotifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-primary text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              New Alerts ({newNotifications.length})
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
                        href={
                          notification.warehouseId 
                            ? '/dashboard/admin/warehouses'
                            : notification.clientId
                            ? '/dashboard/admin/clients'
                            : notification.shipmentId
                            ? '/dashboard/admin/shipments'
                            : '#'
                        }
                        className="block"
                      >
                        <p className="text-primary font-medium mb-1">{notification.message}</p>
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

