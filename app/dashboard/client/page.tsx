'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiPlusCircle, 
  HiTruck, 
  HiCurrencyDollar,
  HiChat,
  HiBell,
  HiCheckCircle,
  HiTrash
} from 'react-icons/hi';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';

export default function ClientDashboard() {
  // Mock notifications data - replace with API call
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'shipment_update',
      message: 'Your shipment #1 (Electronics) has been confirmed',
      shipmentId: '1',
      status: 'Confirmed',
      date: new Date('2024-01-25T11:00:00'),
      isNew: true,
    },
    {
      id: '2',
      type: 'shipment_update',
      message: 'Your shipment #2 (Furniture) is in transit to warehouse',
      shipmentId: '2',
      status: 'In Transit to Warehouse',
      date: new Date('2024-01-25T08:30:00'),
      isNew: true,
    },
    {
      id: '3',
      type: 'shipment_update',
      message: 'Your shipment #3 (Clothing) has been received',
      shipmentId: '3',
      status: 'Received at Warehouse',
      date: new Date('2024-01-24T15:20:00'),
      isNew: false,
    },
    {
      id: '4',
      type: 'shipment_update',
      message: 'Cost adjustment for shipment #1: -$20',
      shipmentId: '1',
      status: 'Confirmed',
      date: new Date('2024-01-24T12:00:00'),
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
      <PageHeader description="Welcome. Create, track, and manage your shipments in one place." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Link href="/dashboard/client/shipments/new">
          <Card className="cursor-pointer hover:border-primary">
            <div className="flex items-start gap-4">
              <HiPlusCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-primary text-xl mb-2">Create New Shipment</h3>
                <p className="text-primary text-opacity-70">
                  Start a new shipment request with step-by-step guidance.
                </p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/client/shipments">
          <Card className="cursor-pointer hover:border-primary">
            <div className="flex items-start gap-4">
              <HiTruck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-primary text-xl mb-2">View My Shipments</h3>
                <p className="text-primary text-opacity-70">
                  Track and manage all your active and past shipments.
                </p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Card>
          <div className="flex items-start gap-4">
            <HiCurrencyDollar className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-primary text-xl mb-2">Get Cost Estimate</h3>
              <p className="text-primary text-opacity-70">
                Calculate estimated shipping costs before creating a shipment.
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-4">
            <HiChat className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-primary text-xl mb-2">Contact Support</h3>
              <p className="text-primary text-opacity-70">
                Get help with your shipments or ask questions.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <HiBell className="w-6 h-6 text-primary" />
          <h2 className="text-primary text-2xl">Notifications</h2>
        </div>

        {/* New Updates */}
        {newNotifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-primary text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              New Updates ({newNotifications.length})
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
                        href={`/dashboard/client/shipments/${notification.shipmentId}`}
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

