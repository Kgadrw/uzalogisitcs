'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { UserRole } from '@/lib/auth';
import StatusBadge from '@/components/StatusBadge';
import { HiOutlineBell, HiOutlineArrowRightOnRectangle, HiOutlineCheckCircle, HiOutlineTrash } from 'react-icons/hi2';
import { formatDate } from '@/lib/utils';

interface TopbarProps {
  title: string;
  role: UserRole;
  userName: string;
}

export default function Topbar({ title, role, userName }: TopbarProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Load notifications based on role
  useEffect(() => {
    // Mock notifications data - replace with API call
    if (role === 'warehouse') {
      const mockNotifications = [
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
      ];
      setNotifications(mockNotifications);
    } else if (role === 'client') {
      const mockNotifications = [
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
      ];
      setNotifications(mockNotifications);
    } else if (role === 'admin') {
      const mockNotifications = [
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
      ];
      setNotifications(mockNotifications);
    }
  }, [role]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleLogout = () => {
    logout();
    // Redirect to role-specific login page
    if (role === 'client') {
      router.push('/auth/login/client');
    } else if (role === 'warehouse') {
      router.push('/auth/login/warehouse');
    } else {
      router.push('/auth/login/admin');
    }
  };

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

  const roleLabel = 
    role === 'client' ? 'Client' :
    role === 'warehouse' ? 'Warehouse Partner' :
    'Admin';

  const newNotifications = notifications.filter(n => n.isNew);
  const newCount = newNotifications.length;

  return (
    <div className="sticky top-0 z-10 bg-secondary border-b border-primary border-opacity-20 px-4 md:px-6 py-4 flex items-center justify-between">
      <h2 className="text-primary text-lg md:text-2xl truncate">{title}</h2>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="text-primary text-xs md:text-sm hidden md:block">
          <span>{userName}</span>
          <span className="ml-2 opacity-70">({roleLabel})</span>
        </div>
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-primary hover:bg-primary hover:bg-opacity-5 rounded transition-colors"
            aria-label="Notifications"
          >
            <HiOutlineBell className="w-5 h-5" />
            {newCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {newCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-secondary border border-primary border-opacity-20 rounded shadow-lg max-h-96 overflow-y-auto z-50">
              <div className="p-4 border-b border-primary border-opacity-20">
                <h3 className="text-primary text-lg font-semibold">Notifications</h3>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {/* New Notifications */}
                {newNotifications.length > 0 && (
                  <div className="p-4 border-b border-primary border-opacity-10">
                    <h4 className="text-primary text-sm font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {role === 'warehouse' && `New Shipping (${newNotifications.length})`}
                      {role === 'client' && `New Updates (${newNotifications.length})`}
                      {role === 'admin' && `New Alerts (${newNotifications.length})`}
                    </h4>
                    <div className="space-y-2">
                      {newNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="border border-primary border-opacity-20 p-3 rounded hover:bg-primary hover:bg-opacity-5 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <Link
                              href={
                                role === 'warehouse' 
                                  ? `/dashboard/warehouse/confirm/${notification.shipmentId}`
                                  : role === 'client'
                                  ? `/dashboard/client/shipments/${notification.shipmentId}`
                                  : role === 'admin'
                                  ? notification.warehouseId 
                                    ? `/dashboard/admin/warehouses`
                                    : notification.clientId
                                    ? `/dashboard/admin/clients`
                                    : notification.shipmentId
                                    ? `/dashboard/admin/shipments`
                                    : '#'
                                  : '#'
                              }
                              className="flex-1"
                              onClick={() => setShowNotifications(false)}
                            >
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <p className="text-primary text-sm font-medium">{notification.message}</p>
                                {notification.status && (
                                  <StatusBadge status={notification.status} />
                                )}
                              </div>
                              <p className="text-primary text-xs text-opacity-70">
                                {formatDate(notification.date)}
                              </p>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="ml-2 p-1 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition-colors"
                              title="Mark as read"
                            >
                              <HiOutlineCheckCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {notifications.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-primary text-opacity-70 text-sm">No notifications available</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-secondary hover:bg-opacity-90 transition-colors"
        >
          <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}

